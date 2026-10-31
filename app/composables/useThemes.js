// Tema, kategori, portofolio dari API reseller webinvit.id (port dari script.js lama)
const CACHE_TTL = 5 * 60 * 1000;
const API_CACHE = {};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** fetch API dengan cache 5 menit, auto-retry (jaringan / 429 / 5xx), bisa dibatalkan */
export function fetchAPI(url, opts) {
  const signal = opts && opts.signal;
  const hit = API_CACHE[url];
  if (hit && Date.now() - hit.ts < CACHE_TTL) return Promise.resolve(hit.data);
  const MAX_TRY = 3;
  function attempt(n) {
    return fetch(url, { headers: { Accept: "application/json" }, signal })
      .then((r) => {
        if (!r.ok) {
          const e = new Error("HTTP " + r.status);
          e.status = r.status;
          throw e;
        }
        return r.json();
      })
      .then((d) => {
        if (d && d.success === false) throw new Error(d.message || "API error");
        API_CACHE[url] = { ts: Date.now(), data: d };
        return d;
      })
      .catch((err) => {
        if (err && err.name === "AbortError") throw err;
        const retryable =
          !err.status || err.status === 429 || err.status >= 500;
        if (!retryable || n >= MAX_TRY) throw err;
        return sleep(500 * n).then(() => {
          if (signal && signal.aborted) {
            const ab = new Error("aborted");
            ab.name = "AbortError";
            throw ab;
          }
          return attempt(n + 1);
        });
      });
  }
  return attempt(1);
}

const ALL_CAT = { id: 0, name: "Semua Kategori", slug: "all" };
export const TEMA_PER_PAGE = 24;
export const BERANDA_LIMIT = 4;
let catPromise = null;
let themeAbort = null;
let themeReq = 0;

export function useThemes() {
  const site = useRuntimeConfig().public.sellerSite.replace(/\/$/, "");
  const API_BASE = site + "/seller/api/v1";

  const categories = useState("th-cats", () => [ALL_CAT]);
  const categoryMap = computed(() => {
    const m = {};
    categories.value.forEach((c) => {
      if (c.id) m[c.id] = c.name;
    });
    return m;
  });

  const activeCatId = useState("th-active-cat", () => 0);
  const query = useState("th-query", () => "");
  const themes = useState("th-list", () => []);
  const nextUrl = useState("th-next", () => null);
  const status = useState("th-status", () => "idle"); // idle | loading | ok | error
  const loadingMore = useState("th-more", () => false);
  const total = useState("th-total", () => null); // jumlah tema keseluruhan (sesuai kategori + pencarian aktif)

  const beranda = useState("th-beranda", () => ({ status: "idle", items: [] }));

  const porto = useState("th-porto", () => ({ status: "idle", items: [] }));

  function themeUrl(params) {
    const qs = [];
    Object.keys(params).forEach((k) => {
      const v = params[k];
      if (v !== "" && v !== null && v !== undefined && v !== 0)
        qs.push(k + "=" + encodeURIComponent(v));
    });
    return (
      API_BASE + "/products/websites" + (qs.length ? "?" + qs.join("&") : "")
    );
  }

  function loadCategories() {
    if (catPromise) return catPromise;
    catPromise = fetchAPI(API_BASE + "/categories")
      .then((d) => {
        const list = d && Array.isArray(d.data) ? d.data : [];
        categories.value = [
          ALL_CAT,
          ...list.map((c) => ({
            id: c.id,
            slug: c.slug,
            name: (c.name || "").trim(),
          })),
        ];
      })
      .catch((err) => {
        console.error("Gagal memuat kategori:", err);
        catPromise = null; // coba lagi di panggilan berikutnya
      });
    return catPromise;
  }

  /** reset=true: halaman pertama sesuai search + kategori. false: halaman berikut (next_page_url). */
  async function fetchThemes(reset) {
    let url;
    if (reset) {
      url = themeUrl({
        q: query.value.trim(),
        categoryId: activeCatId.value,
        limit: TEMA_PER_PAGE,
      });
      nextUrl.value = null;
      loadingMore.value = false;
      themes.value = [];
      total.value = null;
      status.value = "loading";
      if (themeAbort) themeAbort.abort();
      themeAbort = new AbortController();
    } else {
      if (!nextUrl.value || loadingMore.value) return;
      url = nextUrl.value;
      loadingMore.value = true;
    }
    const reqId = reset ? ++themeReq : themeReq;
    try {
      await loadCategories();
      const d = await fetchAPI(url, {
        signal: themeAbort && themeAbort.signal,
      });
      if (reqId !== themeReq) return; // ada request yang lebih baru
      const pg = (d && d.data) || {};
      const items = (pg.data || []).filter((t) => t.is_active !== 0);
      nextUrl.value = pg.next_page_url || null;
      themes.value = themes.value.concat(items);
      status.value = "ok";
      if (reset) countTotal(pg, items.length, reqId);
    } catch (err) {
      if (reqId !== themeReq || (err && err.name === "AbortError")) return;
      console.error("Gagal memuat tema:", err);
      if (reset) status.value = "error";
    } finally {
      if (reqId === themeReq) loadingMore.value = false;
    }
  }

  /** jumlah tema keseluruhan: pakai "total" dari API; kalau tidak ada, hitung dari halaman terakhir */
  async function countTotal(pg, firstCount, id) {
    let t =
      pg.total != null
        ? pg.total
        : pg.meta && pg.meta.total != null
          ? pg.meta.total
          : null;
    t = t !== null && Number.isFinite(Number(t)) ? Number(t) : null;
    if (t === null) {
      if (!pg.next_page_url)
        t = firstCount; // hanya satu halaman
      else if (pg.last_page_url && pg.last_page && pg.per_page) {
        try {
          const d2 = await fetchAPI(pg.last_page_url);
          const last = ((d2 && d2.data && d2.data.data) || []).filter(
            (x) => x.is_active !== 0,
          ).length;
          t = (pg.last_page - 1) * pg.per_page + last;
        } catch (e) {}
      }
    }
    if (id === themeReq) total.value = t;
  }

  async function loadBeranda() {
    if (beranda.value.status === "loading" || beranda.value.status === "ok")
      return;
    beranda.value = { status: "loading", items: [] };
    try {
      await loadCategories();
      const d = await fetchAPI(themeUrl({ limit: BERANDA_LIMIT }));
      const items = ((d && d.data && d.data.data) || [])
        .filter((t) => t.is_active !== 0)
        .slice(0, BERANDA_LIMIT);
      beranda.value = { status: "ok", items };
    } catch (err) {
      console.error("Gagal memuat tema beranda:", err);
      beranda.value = { status: "error", items: [] };
    }
  }

  async function loadPorto() {
    if (porto.value.status === "loading" || porto.value.status === "ok") return;
    porto.value = { status: "loading", items: [] };
    const KEY = "pm_porto_v1";
    try {
      const c = JSON.parse(localStorage.getItem(KEY));
      if (c && Date.now() - c.ts < 60 * 60 * 1000) {
        porto.value = { status: "ok", items: c.data };
        return;
      }
    } catch (e) {}
    try {
      let results = [];
      let url = API_BASE + "/portfolios";
      while (url) {
        const d = await fetch(url, {
          headers: { Accept: "application/json" },
        }).then((r) => r.json());
        results = results.concat((d.data && d.data.data) || []);
        url = (d.data && d.data.next_page_url) || null;
      }
      if (results.length) {
        try {
          localStorage.setItem(
            KEY,
            JSON.stringify({ ts: Date.now(), data: results }),
          );
        } catch (e) {}
      }
      porto.value = { status: "ok", items: results };
    } catch (err) {
      porto.value = { status: "error", items: [] };
    }
  }

  function themeImg(t) {
    const slug = t.slug || "";
    return (
      t.featured_image || t.image_url || `${site}/themes/${slug}/${slug}.webp`
    );
  }
  const previewUrl = (t) => `${site}/preview/${t.slug || ""}`;

  /** Brand dari API reseller; dipakai hanya jika admin belum mengisi brand di Supabase. */
  function loadApiBrand() {
    const { apiBrand } = useSite();
    fetchAPI(API_BASE + "/brand")
      .then((d) => {
        let o = d && d.data ? d.data : d || {};
        if (o.data && typeof o.data === "object") o = o.data;
        const b = {
          name:
            o.brand_name ||
            o.nama_brand ||
            o.site_name ||
            o.name ||
            o.nama ||
            "",
          logo: o.brand_logo || o.logo_url || o.logo || "",
        };
        if (!b.name && !b.logo) return;
        apiBrand.value = b;
        try {
          localStorage.setItem("lv_brand_v1", JSON.stringify(b));
        } catch (e) {}
      })
      .catch(() => {});
  }

  return {
    categories,
    categoryMap,
    activeCatId,
    query,
    themes,
    nextUrl,
    status,
    loadingMore,
    total,
    beranda,
    porto,
    loadCategories,
    fetchThemes,
    loadBeranda,
    loadPorto,
    loadApiBrand,
    themeImg,
    previewUrl,
  };
}

/** Tema yang dipilih (disimpan di sessionStorage, dipakai halaman paket & checkout) */
export function useSelectedTheme() {
  const sel = useState("sel-theme", () => null);
  if (import.meta.client && sel.value === null) {
    try {
      sel.value = JSON.parse(sessionStorage.getItem("selTheme")) || false;
    } catch (e) {
      sel.value = false;
    }
  }
  function select(slug, name) {
    sel.value = { slug, name };
    try {
      sessionStorage.setItem("selTheme", JSON.stringify(sel.value));
    } catch (e) {}
  }
  return { selectedTheme: sel, selectTheme: select };
}
