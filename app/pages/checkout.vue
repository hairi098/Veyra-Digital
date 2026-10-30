<script setup>
const route = useRoute();
const { brand, logo, extra, paket, ready, waNumber } = useSite();
useHead({ title: computed(() => `Checkout — ${brand.value}`) });

const paketKey = String(route.query.paket || "");
const tema = String(route.query.tema || "");
if (!tema) navigateTo("/tema", { replace: true });

/* ---------- paket & harga ---------- */
const paketList = computed(() => (paket.value.length ? paket.value : DEFAULT_PAKET));
const currentPaket = computed(() => paketList.value.find((p) => p.key === paketKey));
const harga = computed(() => Number(currentPaket.value?.harga) || 0);
const paketLabel = computed(() => currentPaket.value?.nama || "-");

// kalau paket sudah pasti tidak ada (hilang/disembunyikan admin), balik ke daftar paket
watch(
  [ready, currentPaket],
  ([r, p]) => {
    if (r && !p && tema) navigateTo("/paket", { replace: true });
  },
  { immediate: true },
);

const unik = Math.floor(Math.random() * 899) + 100;
const invoice = "VEY" + Math.random().toString(36).substring(2, 7).toUpperCase();

/* ---------- promo ---------- */
const promoInput = ref("");
const diskon = ref(0);
const promo = ref("");
const promoMsg = reactive({ text: "", ok: false });
async function applyPromo() {
  const kode = promoInput.value.trim().toUpperCase();
  if (!kode) {
    Object.assign(promoMsg, { text: "Masukkan kode promo terlebih dahulu.", ok: false });
    return;
  }
  try {
    const r = await rpc("check_promo", { p_kode: kode, p_harga: harga.value });
    if (r && r.valid) {
      diskon.value = r.diskon;
      promo.value = kode;
      Object.assign(promoMsg, { text: "Kode promo berhasil diterapkan.", ok: true });
    } else {
      diskon.value = 0;
      promo.value = "";
      Object.assign(promoMsg, { text: "Kode promo tidak valid atau sudah tidak berlaku.", ok: false });
    }
  } catch (e) {
    Object.assign(promoMsg, { text: "Gagal mengecek promo, coba lagi.", ok: false });
  }
}
// harga berubah (data terbaru dari server): promo perlu dicek ulang
watch(harga, (n, o) => {
  if (o && n !== o && diskon.value > 0) {
    diskon.value = 0;
    promo.value = "";
    Object.assign(promoMsg, { text: "Harga paket diperbarui, silakan terapkan ulang kode promo.", ok: false });
  }
});

/* ---------- skema pembayaran (diatur admin: extra.payments.terms) ---------- */
const terms = computed(() => {
  const t = extra.value?.payments?.terms || {};
  const o = {
    full: t.full !== false,
    dp: !!t.dp,
    later: !!t.later,
    dp_mode: t.dp_mode === "nominal" ? "nominal" : "percent",
    dp_value: Number(t.dp_value) || 50,
    note: String(t.note || "").trim(),
  };
  if (!o.full && !o.dp && !o.later) o.full = true;
  return o;
});
const totalBayar = computed(() => Math.max(0, harga.value - unik - diskon.value));
function amtFor(id) {
  const t = terms.value;
  if (id === "later") return 0;
  if (id === "dp") {
    const d = t.dp_mode === "percent" ? Math.round((totalBayar.value * Math.min(100, t.dp_value)) / 100) : t.dp_value;
    return Math.min(totalBayar.value, Math.max(0, d));
  }
  return totalBayar.value;
}
const termList = computed(() => {
  const t = terms.value;
  const l = [];
  if (t.full) l.push({ id: "full", name: "Bayar Penuh", desc: "Lunasi sekarang juga" });
  if (t.dp)
    l.push({
      id: "dp",
      name: "DP " + (t.dp_mode === "percent" ? t.dp_value + "%" : rp(t.dp_value)),
      desc: "Bayar sebagian dulu, sisanya menyusul",
    });
  if (t.later) l.push({ id: "later", name: "Bayar Setelah Jadi", desc: "Tidak perlu bayar sekarang" });
  return l;
});
const skemaPick = ref("");
const skema = computed(() => (termList.value.some((x) => x.id === skemaPick.value) ? skemaPick.value : termList.value[0].id));
const nowAmt = computed(() => amtFor(skema.value));
const sisaAmt = computed(() => totalBayar.value - nowAmt.value);
const showTermBox = computed(() => termList.value.length > 1 || terms.value.note || termList.value[0].id !== "full");
const showTail = computed(() => skema.value === "dp" || skema.value === "later");

function skemaLine() {
  if (skema.value === "full") return termList.value.length > 1 ? "Skema Pembayaran: Bayar Penuh" : "";
  const x = termList.value.find((y) => y.id === skema.value);
  if (!x) return "";
  if (skema.value === "dp")
    return `Skema Pembayaran: ${x.name}\nBayar Sekarang (DP): ${rp(nowAmt.value)}\nSisa Pembayaran: ${rp(sisaAmt.value)}`;
  return `Skema Pembayaran: Bayar Setelah Jadi\nBayar Sekarang: Rp0\nDibayar Setelah Jadi: ${rp(totalBayar.value)}`;
}

/* ---------- metode pembayaran (extra.payments) ---------- */
const pays = computed(() => {
  const p = extra.value?.payments || {};
  const l = [];
  if (p.qris) l.push({ id: "qris", type: "qris", name: "QRIS", img: p.qris });
  (p.methods || []).forEach((m, i) => {
    if (m && m.name)
      l.push({ id: "m" + i, type: m.type || "bank", name: m.name, logo: m.logo || "", no: m.no || "", an: m.an || "" });
  });
  return l;
});
const payId = ref("");
const curPay = computed(() => pays.value.find((x) => x.id === payId.value));
const showPayBox = computed(() => pays.value.length && nowAmt.value > 0);
const payErr = ref("");
const copyLabel = ref("Salin");
function pickPay(id) {
  payId.value = id;
  payErr.value = "";
  copyLabel.value = "Salin";
}
function pickSkema(id) {
  skemaPick.value = id;
  payErr.value = "";
}
function copyNo() {
  const no = curPay.value?.no;
  (navigator.clipboard ? navigator.clipboard.writeText(no) : Promise.reject())
    .then(() => (copyLabel.value = "Tersalin"))
    .catch(() => (copyLabel.value = "Salin manual"));
}
function payLine() {
  const x = curPay.value;
  if (!x || nowAmt.value <= 0) return "";
  if (x.type === "qris") return "Metode Pembayaran: QRIS";
  return "Metode Pembayaran: " + x.name + (x.no ? " (" + x.no + (x.an ? " a.n. " + x.an : "") + ")" : "");
}

/* ---------- form & submit ---------- */
const form = reactive({ nama: "", kontak: "", acara: "", acaraLain: "" });
const sending = ref(false);
const payBoxEl = ref(null);

async function submit() {
  const nama = form.nama.trim();
  const kontak = form.kontak.trim();
  const acara = form.acara === "Lainnya" ? form.acaraLain.trim() : form.acara;
  if (!ready.value || !nama || !kontak || !acara) return;
  if (showPayBox.value && !curPay.value) {
    payErr.value = "Pilih metode pembayaran terlebih dahulu.";
    payBoxEl.value?.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }
  sending.value = true;
  const win = window.open("", "_blank"); // dibuka dulu agar tidak diblokir browser

  let tpl = extra.value?.wa_template || DEFAULT_WA_TEMPLATE;
  // template lama yang belum punya {metode}: sisipkan sebelum baris total
  if (tpl.indexOf("{metode}") < 0) {
    const ls = tpl.split("\n");
    const ix = ls.findIndex((l) => l.indexOf("{total}") > -1);
    if (ix > -1) ls.splice(ix, 0, "{metode}");
    tpl = ls.join("\n");
  }
  // template lama yang belum punya {skema}: sisipkan sebelum {metode}
  if (tpl.indexOf("{skema}") < 0) {
    const ls = tpl.split("\n");
    const ix = ls.findIndex((l) => l.indexOf("{metode}") > -1);
    if (ix > -1) ls.splice(ix, 0, "{skema}");
    tpl = ls.join("\n");
  }
  const text = fillTpl(tpl, {
    nama, kontak, acara, tema,
    paket: paketLabel.value,
    invoice,
    harga: rp(harga.value),
    unik: rp(unik),
    diskon: rp(diskon.value),
    skema: skemaLine(),
    metode: payLine(),
    promo: diskon.value > 0 ? `Kode Promo: ${promo.value} (-${rp(diskon.value)})` : "",
    total: rp(totalBayar.value),
  });
  const url = `https://wa.me/${waNumber.value}?text=${encodeURIComponent(text)}`;
  const go = () => {
    sending.value = false;
    if (win) win.location = url;
    else location.href = url;
  };
  // kalau gagal simpan, customer tetap diarahkan ke WhatsApp
  rpc("create_order", {
    p_invoice: invoice, p_nama: nama, p_kontak: kontak, p_acara: acara, p_tema: tema,
    p_paket: paketLabel.value, p_harga: harga.value, p_unik: unik, p_promo: promo.value,
  })
    .then(go)
    .catch(go);
}
const ACARA = ["Pernikahan", "Ulang Tahun", "Khitanan", "Aqiqah", "Wisuda", "Syukuran", "Reuni", "Lainnya"];
</script>

<template>
  <div>
    <div class="checkout-topbar">
      <div class="container checkout-topbar-inner">
        <NuxtLink to="/" class="nav-logo checkout-logo">
          <img class="brand-logo" :src="logo" alt="Logo" width="40" height="40" />
          <span class="brand-name">{{ brand }}</span>
        </NuxtLink>
        <NuxtLink to="/paket" class="checkout-back">&larr; Kembali ke Paket</NuxtLink>
      </div>
    </div>

    <section class="checkout-page">
      <div class="container checkout-wrap">
        <div class="checkout-card">
          <div class="checkout-card-header">
            <h1 class="checkout-title">Konfirmasi Pesanan</h1>
            <p class="checkout-sub">Lengkapi data pemesan, periksa ringkasan pesanan, lalu lanjutkan ke WhatsApp.</p>
          </div>

          <form id="checkoutForm" class="checkout-form" @submit.prevent="submit">
            <div class="form-group">
              <label for="ckNama">Nama Pemesan</label>
              <input id="ckNama" v-model="form.nama" type="text" required placeholder="Nama Pemesan" autocomplete="name" />
            </div>
            <div class="form-group">
              <label for="ckKontak">Nomor WhatsApp / Email</label>
              <input id="ckKontak" v-model="form.kontak" type="text" required placeholder="Masukkan E-Mail/WhatsApp" autocomplete="tel" />
            </div>
            <div class="form-group">
              <label for="ckAcara">Kategori Acara</label>
              <select id="ckAcara" v-model="form.acara" required>
                <option value="" disabled>Pilih kategori acara</option>
                <option v-for="a in ACARA" :key="a">{{ a }}</option>
              </select>
            </div>
            <div v-if="form.acara === 'Lainnya'" class="form-group">
              <label for="ckAcaraLainnya">Sebutkan Kategori Acara</label>
              <input id="ckAcaraLainnya" v-model="form.acaraLain" type="text" required placeholder="Tulis kategori acara Anda" />
            </div>
          </form>

          <div class="order-summary">
            <p class="order-summary-title">Ringkasan Pesanan</p>
            <div class="summary-row"><span>Tema Dipilih</span><span>{{ tema || "-" }}</span></div>
            <div class="summary-row"><span>Paket Layanan</span><span>{{ paketLabel }}</span></div>
            <div class="summary-row"><span>Nomor Invoice</span><span>{{ invoice }}</span></div>
            <hr />
            <div class="summary-row"><span>Harga Paket</span><span>{{ rp(harga) }}</span></div>
            <div class="summary-row unik-row"><span>Kode Unik Pembayaran</span><span>-{{ rp(unik) }}</span></div>
            <div v-if="diskon > 0" class="summary-row discount-row" style="display: flex"><span>Diskon Promo</span><span>-{{ rp(diskon) }}</span></div>
            <hr />
            <div class="summary-row summary-total"><span>Total Pembayaran</span><span>{{ rp(totalBayar) }}</span></div>
            <div v-if="showTail" class="summary-row now-row" style="display: flex"><span>{{ skema === "dp" ? "Bayar Sekarang (DP)" : "Bayar Sekarang" }}</span><span>{{ rp(nowAmt) }}</span></div>
            <div v-if="showTail" class="summary-row sisa-row" style="display: flex"><span>Sisa Pembayaran</span><span>{{ rp(sisaAmt) }}</span></div>
            <p class="unik-note">Kode unik ditambahkan otomatis untuk mempermudah verifikasi pembayaran.</p>
            <div class="form-group">
              <label for="ckPromo">Kode Promo <span class="opt-label">(Opsional)</span></label>
              <div class="promo-row">
                <input id="ckPromo" v-model="promoInput" type="text" placeholder="Masukkan kode promo Anda" autocomplete="off" />
                <button type="button" class="btn-apply-promo" @click="applyPromo">Terapkan</button>
              </div>
              <p class="promo-msg" :class="promoMsg.text ? (promoMsg.ok ? 'promo-success' : 'promo-error') : ''">{{ promoMsg.text }}</p>
            </div>
          </div>

          <div v-if="showTermBox" class="order-summary term-box" style="display: block">
            <p class="order-summary-title">Skema Pembayaran</p>
            <div class="term-opts">
              <button v-for="x in termList" :key="x.id" type="button" class="term-opt" :class="{ active: x.id === skema }" @click="pickSkema(x.id)">
                <span class="term-radio"></span>
                <span class="term-info"><span class="term-name">{{ x.name }}</span><span class="term-desc">{{ x.desc }}</span></span>
                <span class="term-amt"><small>{{ x.id === "later" ? "Bayar nanti" : "Bayar sekarang" }}</small>{{ x.id === "later" ? "Rp0" : rp(amtFor(x.id)) }}</span>
              </button>
            </div>
            <div v-if="terms.note" class="term-note" style="display: flex"><span class="term-note-ic">i</span><span>{{ terms.note }}</span></div>
          </div>

          <div v-if="showPayBox" ref="payBoxEl" class="order-summary" style="display: block">
            <p class="order-summary-title">Metode Pembayaran</p>
            <div class="pay-opts">
              <button v-for="x in pays" :key="x.id" type="button" class="pay-opt" :class="{ active: x.id === payId }" @click="pickPay(x.id)">
                <img v-if="x.logo" :src="x.logo" alt="" />
                <span v-else class="pay-ini">{{ x.name.charAt(0).toUpperCase() }}</span>
                <span>{{ x.name }}</span>
              </button>
            </div>
            <div class="pay-detail" :class="{ show: curPay }">
              <template v-if="curPay">
                <div class="pay-amount"><span>{{ skema === "dp" ? "DP yang dibayar sekarang" : "Total yang dibayar" }}</span><b>{{ rp(nowAmt) }}</b></div>
                <div class="pay-body">
                  <template v-if="curPay.type === 'qris'">
                    <div class="pay-qris-wrap"><img class="pay-qris" :src="curPay.img" alt="QRIS" /></div>
                    <p class="pay-hint pay-center">Scan QRIS di atas, lalu kirim bukti bayar lewat WhatsApp.</p>
                  </template>
                  <template v-else>
                    <div class="pay-acc-top">
                      <img v-if="curPay.logo" :src="curPay.logo" alt="" />
                      <span v-else class="pay-ini">{{ curPay.name.charAt(0).toUpperCase() }}</span>
                      <div>
                        <p class="pay-bank">{{ curPay.name }}</p>
                        <p v-if="curPay.an" class="pay-an">a.n. {{ curPay.an }}</p>
                      </div>
                    </div>
                    <div class="pay-no-row"><div class="pay-no">{{ curPay.no }}</div><button type="button" class="pay-copy" @click="copyNo">{{ copyLabel }}</button></div>
                    <p class="pay-hint">Transfer sesuai nominal di atas, lalu kirim bukti bayar lewat WhatsApp.</p>
                  </template>
                  <p v-if="skema === 'dp' && sisaAmt > 0" class="pay-hint">Sisa pembayaran {{ rp(sisaAmt) }} dilunasi sesuai kesepakatan dengan admin.</p>
                </div>
              </template>
            </div>
            <p class="promo-msg promo-error">{{ payErr }}</p>
          </div>

          <div class="checkout-form checkout-submit-block">
            <button type="submit" form="checkoutForm" class="btn-primary checkout-submit" :disabled="!ready || sending">
              <template v-if="!ready">Memuat harga...</template>
              <template v-else-if="sending">Memproses...</template>
              <template v-else>Pesan Sekarang &nbsp;&rarr;</template>
            </button>
            <p class="checkout-disclaimer">Anda akan diarahkan ke WhatsApp dengan rincian pesanan yang sudah terisi otomatis.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
