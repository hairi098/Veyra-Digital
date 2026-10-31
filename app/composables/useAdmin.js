// Sesi + data dashboard admin. Dipakai semua halaman /admin/*.
// Login memakai RPC `admin_login` (email:password), sesi disimpan di localStorage
// supaya tetap login walau tab/browser ditutup. Hilang hanya saat klik Log out.
const PW_KEY = "adm_pw";
let restoreP = null;
let settingsP = null;
let lastBaru = -1;

function emptyForm() {
  return {
    brand: "",
    logo: "",
    wa: "",
    email: "",
    waTpl: DEFAULT_WA_TEMPLATE,
    waAsk: DEFAULT_WA_ASK,
    soc: [],
    qris: "",
    pay: [],
    terms: {
      full: true,
      dp: false,
      later: false,
      dp_mode: "percent",
      dp_value: 50,
      note: "",
    },
    tpl: { ...DEFAULT_WA_FOLLOW },
  };
}

function store(k, v) {
  try {
    if (v == null) {
      localStorage.removeItem(k);
      sessionStorage.removeItem(k); // bersihkan sesi versi lama
    } else localStorage.setItem(k, v);
  } catch (e) {}
}

export function useAdmin() {
  const pw = useState("adm-pw", () => "");
  const authed = useState("adm-authed", () => false);
  const orders = useState("adm-orders", () => []);
  const ordersLoaded = useState("adm-orders-loaded", () => false);
  const promos = useState("adm-promos", () => []);
  const promosLoaded = useState("adm-promos-loaded", () => false);
  const paket = useState("adm-paket", () => []);
  const paketLoaded = useState("adm-paket-loaded", () => false);
  const brandInfo = useState("adm-brand-info", () => ({
    name: "Dashboard",
    logo: "",
  }));
  const profile = useState("adm-profile", () => ({ name: "", email: "" })); // akun admin yang sedang login
  const settingsLoaded = useState("adm-settings-loaded", () => false);
  const form = useState("adm-form", emptyForm); // brand, sosmed, pembayaran, template
  const extra = useState("adm-extra", () => ({})); // isi get_site_extra apa adanya
  const { toast } = useAdminUi();

  const newCount = computed(
    () => orders.value.filter((o) => o.status === "baru").length,
  );

  /** panggil RPC admin (otomatis menyertakan kredensial sesi) */
  const adm = (fn, a) =>
    rpc(fn, Object.assign({}, a, { p_pw: pw.value })).catch((e) => {
      toast("Koneksi bermasalah, coba lagi", "err");
      throw e;
    });

  /* ================= sesi ================= */
  async function login(email, password) {
    const p = String(email).trim().toLowerCase() + ":" + password;
    const ok = await rpc("admin_login", { p_pw: p });
    if (!ok) return false;
    pw.value = p;
    authed.value = true;
    store(PW_KEY, p);
    return true;
  }

  /** cek sesi yang tersimpan (dipakai middleware setiap buka /admin/*) */
  function restore() {
    if (authed.value) return Promise.resolve(true);
    if (restoreP) return restoreP;
    let saved = "";
    try {
      saved = localStorage.getItem(PW_KEY) || "";
      if (!saved) {
        // pindahkan sesi versi lama (sessionStorage) supaya tidak perlu login ulang
        saved = sessionStorage.getItem(PW_KEY) || "";
        if (saved) localStorage.setItem(PW_KEY, saved);
      }
    } catch (e) {}
    if (!saved) return Promise.resolve(false);
    restoreP = rpc("admin_login", { p_pw: saved })
      .then((ok) => {
        if (ok) {
          pw.value = saved;
          authed.value = true;
        } else store(PW_KEY, null);
        return !!ok;
      })
      .catch(() => false)
      .finally(() => (restoreP = null));
    return restoreP;
  }

  function logout() {
    store(PW_KEY, null);
    pw.value = "";
    authed.value = false;
    orders.value = [];
    ordersLoaded.value = false;
    promos.value = [];
    promosLoaded.value = false;
    paket.value = [];
    paketLoaded.value = false;
    settingsLoaded.value = false;
    form.value = emptyForm();
    extra.value = {};
    profile.value = { name: "", email: "" };
    lastBaru = -1;
    return navigateTo("/admin/login");
  }

  /** ganti kredensial sesi setelah email/password diubah (supaya tidak ter-logout) */
  function setCredential(p) {
    pw.value = p;
    store(PW_KEY, p);
  }

  /** profil akun admin (nama tampilan + email) */
  async function loadProfile() {
    const i = pw.value.indexOf(":");
    const email = i > 0 ? pw.value.slice(0, i) : "";
    profile.value = { ...profile.value, email };
    try {
      const r = await rpc("admin_get_profile", { p_pw: pw.value });
      if (r)
        profile.value = { email: r.email || email, name: r.display_name || "" };
    } catch (e) {} // SQL pengaturan belum dijalankan -> abaikan
  }

  /* ================= brand untuk logo/nama di sidebar & login ================= */
  function loadBrandInfo() {
    return rpc("get_settings")
      .then((s) => {
        s = s || {};
        brandInfo.value = {
          name: s.brand_name || "Dashboard",
          logo: s.logo_url || "",
        };
      })
      .catch(() => {});
  }

  /* ================= pesanan ================= */
  async function loadOrders(silent) {
    try {
      const r = await adm("admin_list_orders");
      orders.value = r || [];
      const n = orders.value.filter((o) => o.status === "baru").length;
      if (silent && lastBaru >= 0 && n > lastBaru)
        toast("Ada pesanan baru masuk");
      lastBaru = n;
      ordersLoaded.value = true;
    } catch (e) {}
  }

  /** ubah status, atau st = "hapus" untuk menghapus. Mengembalikan true bila berhasil */
  async function setOrder(id, st) {
    const o = orders.value.find((x) => x.id === id);
    const old = o && o.status;
    if (o && st !== "hapus") o.status = st; // optimistis
    try {
      await adm("admin_set_order", { p_id: id, p_status: st });
      toast(st === "hapus" ? "Pesanan dihapus" : "Status diperbarui");
      loadOrders(true);
      return true;
    } catch (e) {
      if (o && old) o.status = old;
      return false;
    }
  }

  /* ================= promo ================= */
  async function loadPromos() {
    try {
      promos.value = (await adm("admin_list_promos")) || [];
    } catch (e) {}
    promosLoaded.value = true;
  }

  /* ================= paket ================= */
  async function loadPaket() {
    try {
      paket.value = (await adm("admin_list_paket")) || [];
    } catch (e) {}
    paketLoaded.value = true;
  }

  /* ================= brand, sosmed, pembayaran, template ================= */
  function loadSettings(force) {
    if (settingsLoaded.value && !force) return Promise.resolve();
    if (settingsP) return settingsP;
    settingsP = (async () => {
      try {
        const s = (await rpc("get_settings")) || {};
        const x = (await rpc("get_site_extra").catch(() => ({}))) || {};
        const pay = x.payments || {};
        const t = pay.terms || {};
        extra.value = x;
        form.value = {
          brand: s.brand_name || "",
          logo: s.logo_url || "",
          wa: s.wa_number || "",
          email: s.email || "",
          waTpl: x.wa_template || DEFAULT_WA_TEMPLATE,
          waAsk: x.wa_ask || DEFAULT_WA_ASK,
          soc: Array.isArray(x.socials)
            ? x.socials.map((o) => ({ platform: o.platform, url: o.url }))
            : ["instagram", "tiktok", "facebook"]
                .filter((k) => s[k])
                .map((k) => ({ platform: k, url: s[k] })),
          qris: pay.qris || "",
          pay: (pay.methods || []).map((m) => ({
            type: "bank",
            name: "",
            no: "",
            an: "",
            logo: "",
            ...m,
          })),
          terms: {
            full: t.full !== false,
            dp: !!t.dp,
            later: !!t.later,
            dp_mode: t.dp_mode === "nominal" ? "nominal" : "percent",
            dp_value: t.dp_value != null ? t.dp_value : 50,
            note: t.note || "",
          },
          tpl: { ...DEFAULT_WA_FOLLOW, ...(x.wa_follow || {}) },
        };
        brandInfo.value = {
          name: s.brand_name || "Dashboard",
          logo: s.logo_url || "",
        };
        settingsLoaded.value = true;
      } catch (e) {
      } finally {
        settingsP = null;
      }
    })();
    return settingsP;
  }

  function readTerms(t) {
    const o = {
      full: !!t.full,
      dp: !!t.dp,
      later: !!t.later,
      dp_mode: t.dp_mode === "nominal" ? "nominal" : "percent",
      dp_value: Number(t.dp_value) || 0,
      note: String(t.note || "").trim(),
    };
    if (!o.full && !o.dp && !o.later) {
      toast("Aktifkan minimal satu skema pembayaran", "err");
      return null;
    }
    if (
      o.dp &&
      (o.dp_value <= 0 || (o.dp_mode === "percent" && o.dp_value >= 100))
    ) {
      toast(
        o.dp_mode === "percent"
          ? "Persen DP harus antara 1 dan 99"
          : "Nominal DP harus lebih dari 0",
        "err",
      );
      return null;
    }
    return o;
  }

  /** Brand, sosmed, dan pembayaran disimpan bersamaan (satu paket pengaturan situs) */
  async function saveSettings() {
    if (!settingsLoaded.value)
      return toast("Data belum selesai dimuat, coba lagi sebentar", "err");
    const f = form.value;
    let wa = String(f.wa || "").replace(/\D/g, "");
    if (wa.indexOf("0") === 0) wa = "62" + wa.slice(1);
    const soc = f.soc
      .filter((s) => String(s.url || "").trim())
      .map((s) => ({ platform: s.platform, url: safeUrl(s.url) }));
    const pick = (k) => (soc.find((s) => s.platform === k) || {}).url || "";
    const d = {
      brand_name: String(f.brand || "").trim(),
      logo_url: String(f.logo || "").trim(),
      wa_number: wa,
      email: String(f.email || "").trim(),
      instagram: pick("instagram"),
      tiktok: pick("tiktok"),
      facebook: pick("facebook"),
    };
    if (!d.brand_name) return toast("Nama brand wajib diisi", "err");
    const terms = readTerms(f.terms);
    if (!terms) return;
    const ex = {
      ...extra.value,
      socials: soc,
      wa_template: String(f.waTpl || "").trim() || DEFAULT_WA_TEMPLATE,
      wa_ask: String(f.waAsk || "").trim() || DEFAULT_WA_ASK,
      payments: {
        qris: f.qris,
        terms,
        methods: f.pay
          .filter((p) => String(p.name || "").trim())
          .map((p) => ({
            type: p.type,
            name: String(p.name).trim(),
            no: String(p.no || "").trim(),
            an: String(p.an || "").trim(),
            logo: p.logo || "",
          })),
      },
    };
    try {
      const [a, b] = await Promise.all([
        adm("admin_save_settings", { p_data: d }),
        adm("admin_save_site_extra", { p_data: ex }),
      ]);
      const ok = a && b;
      toast(ok ? "Pengaturan tersimpan" : "Gagal menyimpan", ok ? "ok" : "err");
      if (ok) {
        extra.value = ex;
        f.soc = soc;
        brandInfo.value = { name: d.brand_name, logo: d.logo_url };
      }
    } catch (e) {}
  }

  /** Ganti foto profil = ganti logo brand (kolom logo_url yang sama dengan halaman Brand & Kontak).
   *  Data lain diambil segar dari database supaya perubahan yang belum disimpan di form tidak ikut tersimpan. */
  async function saveLogo(url) {
    try {
      const s = (await rpc("get_settings")) || {};
      const brand_name = String(s.brand_name || "").trim();
      if (!brand_name) {
        toast("Isi nama brand dulu di Brand & Kontak", "err");
        return false;
      }
      const d = {
        brand_name,
        logo_url: String(url || "").trim(),
        wa_number: s.wa_number || "",
        email: s.email || "",
        instagram: s.instagram || "",
        tiktok: s.tiktok || "",
        facebook: s.facebook || "",
      };
      const ok = await adm("admin_save_settings", { p_data: d });
      toast(
        ok ? "Foto profil diperbarui" : "Gagal menyimpan foto",
        ok ? "ok" : "err",
      );
      if (ok) {
        brandInfo.value = { name: brand_name, logo: d.logo_url };
        form.value = { ...form.value, logo: d.logo_url };
      }
      return !!ok;
    } catch (e) {
      return false;
    }
  }

  /** Atur promo berlaku di paket mana saja. keys = daftar kode paket; kosong/null = berlaku di semua paket.
   *  Disimpan di site_extra.promo_paket ({ KODE: ["gold", "silver"] }). Data extra diambil segar dulu
   *  supaya pengaturan lain di dalamnya tidak tertimpa. */
  async function savePromoPaket(kode, keys) {
    kode = String(kode || "")
      .trim()
      .toUpperCase();
    if (!kode) return false;
    try {
      const x = (await rpc("get_site_extra")) || {};
      const pp = { ...(x.promo_paket || {}) };
      if (Array.isArray(keys) && keys.length) pp[kode] = keys;
      else delete pp[kode];
      const ex = { ...x, promo_paket: pp };
      const ok = await adm("admin_save_site_extra", { p_data: ex });
      if (ok) extra.value = ex;
      return !!ok;
    } catch (e) {
      return false;
    }
  }

  async function saveTemplate() {
    if (!settingsLoaded.value)
      return toast("Data belum selesai dimuat, coba lagi sebentar", "err");
    const wf = {};
    STATUS_LIST.forEach(
      (k) =>
        (wf[k] =
          String(form.value.tpl[k] || "").trim() || DEFAULT_WA_FOLLOW[k]),
    );
    const ex = { ...extra.value, wa_follow: wf };
    try {
      const ok = await adm("admin_save_site_extra", { p_data: ex });
      toast(ok ? "Template tersimpan" : "Gagal menyimpan", ok ? "ok" : "err");
      if (ok) extra.value = ex;
    } catch (e) {}
  }

  function resetTemplate() {
    form.value.tpl = { ...DEFAULT_WA_FOLLOW };
    extra.value = { ...extra.value, wa_follow: {} };
    toast("Dikembalikan, klik Simpan template");
  }

  return {
    pw,
    authed,
    adm,
    login,
    restore,
    logout,
    profile,
    loadProfile,
    setCredential,
    brandInfo,
    loadBrandInfo,
    orders,
    ordersLoaded,
    newCount,
    loadOrders,
    setOrder,
    promos,
    promosLoaded,
    loadPromos,
    paket,
    paketLoaded,
    loadPaket,
    form,
    extra,
    settingsLoaded,
    loadSettings,
    saveSettings,
    saveLogo,
    savePromoPaket,
    saveTemplate,
    resetTemplate,
  };
}
