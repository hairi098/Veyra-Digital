<script setup>
definePageMeta({
  layout: "admin-app",
  title: "Marketing Tools",
  sub: "Materi promosi dan alat bantu jualan untuk reseller",
});
const { toast } = useAdminUi();

const ASSET_URL = "https://assets.satumomen.com/";
const PLACEHOLDER = "{masukkan_link_tema_disini}";
const LINK_TYPE = { canva: "Canva", file: "Google Drive", folder: "Google Drive (folder)" };

// Paragraf pembuka untuk materi berbasis Canva (dipakai di tool 12, 13, 15)
const CANVA_INTRO = [
  { p: "Template bahan promosi khusus reseller untuk membantu mempromosikan undangan digital dengan lebih profesional dan menarik." },
  { h: "Desain siap pakai di Canva", p: "Semua template tersedia di Canva, jadi mudah disesuaikan dan digunakan, cocok untuk pemula maupun yang sudah berpengalaman. Tinggal edit, sesuaikan, dan bagikan!" },
  { h: "Langsung buka & gunakan", p: "Klik tombol di bawah untuk membuka template di Canva." },
];

/* ------------------------------------------------------------------
   Daftar materi. Tiap materi punya halaman sendiri (?tool=ID).
   links  : tombol ke Canva / Google Drive (type: canva | file | folder)
   forms  : teks form yang bisa disalin (khusus tool 5)
   ------------------------------------------------------------------ */
const TOOLS = [
  {
    id: 15, title: "Canva Template Promotion Kit", date: "15 Agustus 2025",
    desc: "Semua template tersedia di Canva, sehingga mudah untuk disesuaikan dan digunakan",
    img: "images/posts/canva-template-promotion-kit-1755254957.jpg",
    intro: CANVA_INTRO,
    links: [
      { label: "Download #1", type: "canva", url: "https://www.canva.com/design/DAGs2THRLns/gnSKHxMsGhmxpgPOPnARHg/view?utm_content=DAGs2THRLns&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink&mode=preview" },
      { label: "Download #2", type: "canva", url: "https://www.canva.com/design/DAGubRB8zEY/d7OeGANGL_16eWzqxUZ4lQ/view?utm_content=DAGubRB8zEY&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink&mode=preview" },
      { label: "Download #3", type: "canva", url: "https://www.canva.com/design/DAGte0zo5L0/iuVZB00AJMRmZ5L3TibUTA/view?utm_content=DAGte0zo5L0&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink&mode=preview" },
    ],
  },
  {
    id: 13, title: "Materi Promosi Edit Pake Canva", date: "2 Mei 2025",
    desc: "Template bahan promosi khusus reseller yang bisa diedit lewat Canva.",
    img: "images/posts/materi-promosi-1746174209.jpg",
    intro: CANVA_INTRO,
    links: [
      { label: "Buka template di Canva", type: "canva", url: "https://www.canva.com/design/DAGkN0nCsNc/if1thj3NDbEh25ITz_Hwtw/view?utm_content=DAGkN0nCsNc&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink&mode=preview" },
    ],
  },
  {
    id: 12, title: "Recording Tema Undangan Website", date: "2 Mei 2025",
    desc: "Download dan edit materi promosi tema undangan website berupa video.",
    img: "images/posts/screen-record-tema-1745577935.jpg",
    intro: CANVA_INTRO,
    links: [
      { label: "Template 001", type: "canva", url: "https://www.canva.com/design/DAGg1qd5PKU/pGNYKoUvy7K4C3Zbt5c1QQ/view?utm_content=DAGg1qd5PKU&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink&mode=preview" },
      { label: "Template 002", type: "canva", url: "https://www.canva.com/design/DAGg1kcbUNQ/bk7nTgGoTzt_t8dRQqLAUQ/view?utm_content=DAGg1kcbUNQ&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink&mode=preview" },
      { label: "Template 003", type: "canva", url: "https://www.canva.com/design/DAGg1joItN0/T54lf-bwZH-o0sQIfx2fEw/view?utm_content=DAGg1joItN0&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink&mode=preview" },
      { label: "Template 004", type: "canva", url: "https://www.canva.com/design/DAGh-FzAy1w/gHFwCCUMQtED-Ap41nZelw/view?utm_content=DAGh-FzAy1w&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink&mode=preview" },
    ],
  },
  {
    id: 10, title: "Video Review Tema Undangan Website", date: "10 Februari 2025",
    desc: "Download koleksi beragam video promosi yang siap kamu gunakan untuk status sosmed.",
    img: "images/posts/recording-smart-phone-1739182340.jpg",
    intro: [{ p: "Koleksi video promosi yang siap dipakai untuk status sosial media. Buka folder di bawah, lalu unduh video yang kamu butuhkan." }],
    links: [{ label: "Buka folder di Google Drive", type: "folder", url: "https://drive.google.com/drive/folders/17FT23Jhz94FHQlhl4MQs7tSTGSx7XNk4?usp=sharing" }],
  },
  {
    id: 9, title: "454 Thumbnail Tema (JPG)", date: "10 Februari 2025",
    desc: "Download koleksi thumbnail tema undangan website sekaligus via google drive.",
    img: "images/posts/445-thumbnail-tema-1739181149.jpg",
    intro: [{ p: "Koleksi thumbnail tema undangan website dalam format JPG. Buka folder di bawah untuk mengunduhnya sekaligus." }],
    links: [{ label: "Buka folder di Google Drive", type: "folder", url: "https://drive.google.com/drive/folders/1wIPbD_h4fjFn6G90BMt51TBGCg1HdJIx" }],
  },
  {
    id: 7, title: "Koleksi Pose Foto Untuk Konten", date: "22 Desember 2024",
    desc: "Download koleksi foto pose png tanpa background yang kami pakai untuk bikin konten.",
    img: "images/posts/pose-collection-1734605392.jpg",
    intro: [{ p: "Koleksi foto pose berformat PNG tanpa background, siap dipakai untuk membuat konten promosi." }],
    links: [{ label: "Buka folder di Google Drive", type: "folder", url: "https://drive.google.com/drive/folders/1w221uKEHtNCfbOB112lW3oDe7sieL55c?usp=sharing" }],
  },
  {
    id: 6, title: "Tutorial Kirim Undangan [PDF]", date: "22 Desember 2024",
    desc: "File PDF tutorial cara mengirim undangan, tinggal bagikan ke customer.",
    img: "images/posts/tutorial-untuk-customer-1734604325.jpg",
    intro: [{ p: "Panduan dalam bentuk PDF yang menjelaskan cara mengirim undangan digital. Tinggal bagikan file ini ke customer." }],
    links: [{ label: "Buka file di Google Drive", type: "file", url: "https://drive.google.com/file/d/1KSE1OOJ9WXdgA9F8Ekl44tLt0YZA8m33/view?usp=sharing" }],
  },
  {
    id: 5, title: "Form Order Undangan", date: "22 Desember 2024",
    desc: "Form order undangan, tinggal salin dan kirim ke calon customer.",
    img: "images/posts/form-order-1730980285.jpg",
    intro: [{ p: "Pilih form sesuai jenis acara, klik Salin, lalu kirim ke calon customer lewat WhatsApp. Isi kolom link tema di bawah kalau mau tema langsung terisi di form." }],
    links: [],
    forms: [
      {
        title: "Form Order Wedding",
        text: `Silahkan isi data dibawah ini ya kak

Nama Pemesan :
No WA Aktif :
E-Mail :

Tema :
Pilih tema disini :
{masukkan_link_tema_disini}

1. CALON MEMPELAI WANITA
• Nama Lengkap :
• Nama Panggilan :
• Putri ke :
• Nama Ortu :

2. CALON MEMPELAI PRIA
• Nama Lengkap :
• Nama Panggilan :
• Putra ke :
• Nama Ortu :
• Pria/Wanita yang didahulukan :

3. AKAD / PEMBERKATAN
• Hari, TGL :
• Jam :
• Tempat :
• Alamat :

4. RESEPSI
• Hari, TGL :
• Jam :
• Tempat :
• Alamat :

5. DENAH LOKASI
• Akad :
• Resepsi :

6. KADO (Boleh Kosong)
• Jalan :
• No Rumah :
• Kelurahan :
• Kecamatan :
• Kota :
• Contact :

7. AMPLOP DIGITAL (Boleh Kosong)
• Contoh : BCA - Abu Bakar - 12345678
*
*

8. FOTO
• Foto bebas, disarankan maksimal 14 buah agar undangan tidak berat (ukuran file maksimal 2 MB)`,
      },
      {
        title: "Form Order Birthday Kids",
        text: `Silahkan isi data nya dibawah ini ya kak

Nama Pemesan :
Email :
No WA :

Pilih Tema
{masukkan_link_tema_disini}

1. DATA ANAK
• Nama Anak :
• Nama Panggilan Anak :
• dari Bapak ….
• dan Ibu ….
• Ultah ke :
• Dresscode :

2. ACARA
• Hari, TGL :
• Jam :
• Tempat :
• Alamat :

3. DENAH LOKASI
• Link Maps :

4. KADO (Boleh Kosong)
• Jalan :
• No Rumah :
• Kelurahan :
• Kecamatan :
• Kota :
• Contact :

5. AMPLOP DIGITAL (Boleh Kosong)
• Contoh : BCA - Abu Bakar - 12345678
*
*

NB
- Foto bebas, disarankan maksimal 14 buah agar undangan tidak berat (ukuran file maksimal 2 MB)
- Data fleksibel, bisa di-skip menyesuaikan dengan keperluan anda`,
      },
      {
        title: "Form Order Aqiqah & Tasmiyah",
        text: `Silahkan isi data nya dibawah ini ya kak

Nama Pemesan :
Email :
No WA :

Pilih Tema
{masukkan_link_tema_disini}

1. DATA ANAK
• Nama Anak :
• Nama Panggilan Anak :
• dari Bapak ….
• dan Ibu ….

2. ACARA
• Hari, TGL :
• Jam :
• Tempat :
• Alamat :

3. LAINNYA
• Tausiyah :
*
*

4. DENAH LOKASI
• Link Maps :

5. KADO (Boleh Kosong)
• Jalan :
• No Rumah :
• Kelurahan :
• Kecamatan :
• Kota :
• Contact :

6. AMPLOP DIGITAL (Boleh Kosong)
• Contoh : BCA - Abu Bakar - 12345678
*
*

NB
- Foto bebas, disarankan maksimal 14 buah agar undangan tidak berat (ukuran file maksimal 2 MB)
- Data fleksibel, bisa di-skip menyesuaikan dengan keperluan anda`,
      },
      {
        title: "Form Order Umum",
        text: `Silahkan isi data nya dibawah ini ya kak

Nama Pemesan :
Email :
No WA :

Pilih Tema
{masukkan_link_tema_disini}

1. DATA ACARA
• Nama Acara :
• Tema Acara :
*
*

2. WAKTU ACARA
• Hari, TGL :
• Jam :
• Tempat :
• Alamat :

3. LAINNYA
• Rundown :
• Pembicara :
*
*

4. DENAH LOKASI
• Link Maps :

5. INFORMASI TAMBAHAN (Boleh Kosong)
*
*

NB
- Foto bebas, disarankan maksimal 14 buah agar undangan tidak berat (ukuran file maksimal 2 MB)
- Data fleksibel, bisa di-skip menyesuaikan dengan keperluan anda`,
      },
    ],
  },
  {
    id: 3, title: "100+ Materi Promosi", date: "1 September 2024",
    desc: "100+ Template materi promosi editable yang bisa di rebranding instant menggunakan figma.",
    img: "images/posts/100-template-figma-1724816874.jpg",
    intro: [{ p: "Lebih dari 100 template materi promosi yang bisa diedit dan di-rebranding langsung menggunakan Figma." }],
    links: [{ label: "Buka file di Google Drive", type: "file", url: "https://drive.google.com/file/d/1w2R3rsFyyeSvQpdsK4fQX2fmz6AII6c3/view?pli=1" }],
  },
  {
    id: 2, title: "25 Template Instagram Story", date: "28 Agustus 2024",
    desc: "Download gratis 25 template promosi instagram story yang bisa kamu edit melalui aplikasi canva.",
    img: "images/posts/25-template-story-1724816325.jpg",
    intro: [{ p: "25 template promosi Instagram Story yang bisa kamu edit lewat Canva." }],
    links: [{ label: "Buka template di Canva", type: "canva", url: "https://www.canva.com/design/DAGO7q_4H0c/nms0LTzUlf04ouCq9QBzNQ/view?utm_content=DAGO7q_4H0c&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink&mode=preview" }],
  },
  {
    id: 1, title: "50 Template Instagram Feed", date: "28 Agustus 2024",
    desc: "Download gratis 50 template promosi instagram feed yang bisa kamu edit melalui aplikasi canva.",
    img: "images/posts/50-template-feed-1724816298.jpg",
    intro: [{ p: "50 template promosi Instagram Feed yang bisa kamu edit lewat Canva." }],
    links: [{ label: "Buka template di Canva", type: "canva", url: "https://www.canva.com/design/DAGO7u-eto0/5B93kg2-uOgGT1dRF6lOHg/view?utm_content=DAGO7u-eto0&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink&mode=preview" }],
  },
  {
    id: "tema", kind: "tema", title: "Katalog Tema Undangan", date: "",
    desc: "Telusuri semua tema, lihat preview, dan unduh thumbnail-nya untuk bahan promosi.",
    img: "",
    intro: [{ p: "Cari tema berdasarkan kategori atau kata kunci. Klik Preview untuk melihat tampilannya, atau Download untuk menyimpan thumbnail tema (gambar) sebagai bahan promosi." }],
    links: [],
  },
];

/* ---------------- tampilan: daftar atau detail ---------------- */
const route = useRoute();
const current = computed(() => TOOLS.find((t) => String(t.id) === String(route.query.tool || "")));

const q = ref("");
const list = computed(() => {
  const k = q.value.trim().toLowerCase();
  if (!k) return TOOLS;
  return TOOLS.filter((t) => (t.title + " " + t.desc).toLowerCase().includes(k));
});

const imgUrl = (t) => ASSET_URL + t.img;
const hidden = reactive({}); // gambar yang gagal dimuat

/* ---------------- form order: salin teks ---------------- */
const temaLink = ref("");
const copied = ref("");
let copiedTimer;

function formText(f) {
  return f.text.split(PLACEHOLDER).join(temaLink.value.trim() || PLACEHOLDER);
}
async function copyForm(f) {
  const txt = formText(f);
  try {
    await navigator.clipboard.writeText(txt);
  } catch (e) {
    const ta = document.createElement("textarea"); // cadangan untuk browser lama
    ta.value = txt;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
  }
  copied.value = f.title;
  toast(f.title + " disalin");
  clearTimeout(copiedTimer);
  copiedTimer = setTimeout(() => (copied.value = ""), 2000);
}

/* ---------------- katalog tema: kategori + cari + Preview / Download thumbnail ---------------- */
const { categories, categoryMap, loadCategories, themeImg, previewUrl } = useThemes();
const TC_API = useRuntimeConfig().public.sellerSite.replace(/\/$/, "") + "/seller/api/v1/products/websites";
const TC_PER_PAGE = 24;
const TC_FALLBACK = "https://placehold.co/300x400/eee/999?text=Preview";

const tq = ref("");
const tCat = ref(0);
const tThemes = ref([]);
const tNext = ref(null);
const tStatus = ref("loading"); // loading | ok | error
const tMore = ref(false);
let tCtrl = null;
let tReq = 0;
let tTimer;
let tReady = false;

function tcFirstUrl() {
  const p = [];
  if (tq.value.trim()) p.push("q=" + encodeURIComponent(tq.value.trim()));
  if (tCat.value) p.push("categoryId=" + tCat.value);
  p.push("limit=" + TC_PER_PAGE);
  return TC_API + "?" + p.join("&");
}

/** reset=true: halaman pertama sesuai kategori + pencarian. false: halaman berikutnya. */
async function tcLoad(reset) {
  let url;
  if (reset) {
    url = tcFirstUrl();
    tNext.value = null;
    tMore.value = false;
    tThemes.value = [];
    tStatus.value = "loading";
    if (tCtrl) tCtrl.abort();
    tCtrl = new AbortController();
  } else {
    if (!tNext.value || tMore.value) return;
    url = tNext.value;
    tMore.value = true;
  }
  const id = reset ? ++tReq : tReq;
  try {
    const d = await fetchAPI(url, { signal: tCtrl && tCtrl.signal });
    if (id !== tReq) return; // ada request yang lebih baru
    const pg = (d && d.data) || {};
    tNext.value = pg.next_page_url || null;
    tThemes.value = tThemes.value.concat((pg.data || []).filter((t) => t.is_active !== 0));
    tStatus.value = "ok";
  } catch (e) {
    if (id !== tReq || (e && e.name === "AbortError")) return;
    if (reset) tStatus.value = "error";
  } finally {
    if (id === tReq) tMore.value = false;
  }
}

// dimuat sekali, saat halaman Katalog Tema dibuka
watch(
  () => !!(current.value && current.value.kind === "tema"),
  async (on) => {
    if (!on || tReady) return;
    tReady = true;
    await loadCategories();
    tcLoad(true);
  },
  { immediate: true },
);
onBeforeUnmount(() => {
  clearTimeout(tTimer);
  if (tCtrl) tCtrl.abort();
});

function tcInput() {
  clearTimeout(tTimer);
  tTimer = setTimeout(() => tcLoad(true), 400);
}
function tcSearch() {
  clearTimeout(tTimer);
  tcLoad(true);
}
function tcSetCat(id) {
  tCat.value = id;
  tcLoad(true);
}
const tcCount = computed(() => {
  if (tStatus.value === "loading") return "Memuat tema...";
  if (tStatus.value === "error") return "Gagal memuat";
  return tThemes.value.length + (tNext.value ? "+" : "") + " tema";
});

const tcBad = reactive({});
const tcKey = (t) => t.slug || t.id;
const tcSrc = (t) => (tcBad[tcKey(t)] ? TC_FALLBACK : themeImg(t));
const tcCatName = (t) => (t.category_id ? categoryMap.value[t.category_id] || "" : "");

/** unduh thumbnail tema sebagai file gambar */
const tcBusy = reactive({});
async function tcDownload(t) {
  const key = tcKey(t);
  const url = themeImg(t);
  tcBusy[key] = true;
  try {
    const r = await fetch(url, { mode: "cors" });
    if (!r.ok) throw new Error("HTTP " + r.status);
    const b = await r.blob();
    const ext = (b.type.split("/")[1] || "webp").replace("jpeg", "jpg").replace(/[^a-z0-9]/g, "");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(b);
    a.download = (t.slug || "tema") + "." + ext;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 3000);
    toast("Thumbnail " + (t.name || "tema") + " diunduh");
  } catch (e) {
    // server gambar tidak mengizinkan unduh langsung -> buka di tab baru
    window.open(url, "_blank", "noopener,noreferrer");
    toast("Gambar dibuka di tab baru, simpan dari sana");
  } finally {
    tcBusy[key] = false;
  }
}
</script>

<template>
  <section>
    <!-- ================= DETAIL SATU MATERI ================= -->
    <template v-if="current">
      <div class="card">
        <NuxtLink to="/admin/marketing" class="btn sec sm mt-link">← Semua materi</NuxtLink>
        <div class="mt-detail">
          <div v-if="current.img && !hidden[current.id]" class="mt-hero">
            <img :src="imgUrl(current)" :alt="current.title" @error="hidden[current.id] = true" />
          </div>
          <small v-if="current.date" class="mt-date">{{ current.date }}</small>
          <h2 class="mt-title">{{ current.title }}</h2>
          <template v-for="(s, i) in current.intro" :key="i">
            <h3 v-if="s.h" class="mt-sub">{{ s.h }}</h3>
            <p class="mt-text">{{ s.p }}</p>
          </template>
        </div>

        <div v-if="current.links.length" class="mt-links">
          <a v-for="l in current.links" :key="l.url" class="btn mt-linkbtn" :href="l.url" target="_blank" rel="noopener noreferrer">
            <span class="mt-linkmain"><AdminIcon name="link" :size="16" />{{ l.label }}</span>
            <small>{{ LINK_TYPE[l.type] }}</small>
          </a>
        </div>
      </div>

      <!-- katalog tema: kategori + cari + Preview / Download thumbnail -->
      <div v-if="current.kind === 'tema'" class="card tc">
        <div class="tc-search">
          <AdminIcon name="search" :size="18" />
          <label for="tc-cari" class="mt-sr">Cari tema</label>
          <input id="tc-cari" v-model="tq" type="search" placeholder="Cari tema..." autocomplete="off" @input="tcInput" @keydown.enter="tcSearch" />
        </div>

        <div class="tc-cats">
          <button v-for="c in categories" :key="c.id" type="button" class="tc-cat" :class="{ on: c.id === tCat }" @click="tcSetCat(c.id)">{{ c.name }}</button>
        </div>

        <div class="tc-count">{{ tcCount }}</div>

        <div class="tc-grid">
          <template v-if="tStatus === 'loading'">
            <div v-for="i in 8" :key="i" class="tc-card tc-skel"><div class="tc-thumb"></div><div class="tc-line"></div><div class="tc-line short"></div></div>
          </template>

          <template v-else-if="tStatus === 'ok'">
            <article v-for="t in tThemes" :key="tcKey(t)" class="tc-card">
              <div class="tc-thumb">
                <span v-if="t.is_premium" class="tc-badge">Premium</span>
                <img :src="tcSrc(t)" :alt="t.name || 'Tema'" loading="lazy" @error="tcBad[tcKey(t)] = true" />
              </div>
              <h4>{{ t.name || "Tema" }}</h4>
              <p>{{ tcCatName(t) || "-" }}</p>
              <div class="tc-actions">
                <a class="btn sec sm" :href="previewUrl(t)" target="_blank" rel="noopener noreferrer">Preview</a>
                <button class="btn sm" type="button" title="Download thumbnail" :disabled="tcBusy[tcKey(t)]" @click="tcDownload(t)">
                  <AdminIcon name="dl" :size="15" />{{ tcBusy[tcKey(t)] ? "..." : "Download" }}
                </button>
              </div>
            </article>
          </template>
        </div>

        <div v-if="tStatus === 'error'" class="tc-msg">
          Tema gagal dimuat. Periksa koneksi lalu coba lagi.<br />
          <button class="btn sm" type="button" @click="tcLoad(true)">Coba lagi</button>
        </div>
        <div v-else-if="tStatus === 'ok' && !tThemes.length" class="tc-msg"><b>Tema tidak ditemukan</b><br />Coba ubah kata kunci atau kategori.</div>

        <div v-if="tStatus === 'ok' && tNext" class="tc-more">
          <button class="btn sec" type="button" :disabled="tMore" @click="tcLoad(false)">{{ tMore ? "Memuat..." : "Lihat lebih banyak" }}</button>
        </div>
      </div>

      <!-- form order yang bisa disalin -->
      <template v-if="current.forms">
        <div class="card">
          <label for="mt-tema">Link tema (opsional)</label>
          <input id="mt-tema" v-model="temaLink" type="url" placeholder="https://..." autocomplete="off" />
          <p class="hint">Kalau diisi, link ini otomatis masuk menggantikan <b>{{ PLACEHOLDER }}</b> di semua form saat disalin.</p>
        </div>
        <div v-for="f in current.forms" :key="f.title" class="card">
          <div class="mt-formhead">
            <h3 class="mt-sub">{{ f.title }}</h3>
            <button class="btn sm" @click="copyForm(f)">
              <AdminIcon :name="copied === f.title ? 'check' : 'copy'" :size="15" />{{ copied === f.title ? "Tersalin" : "Salin" }}
            </button>
          </div>
          <pre class="mt-pre">{{ formText(f) }}</pre>
        </div>
      </template>
    </template>

    <!-- ================= DAFTAR MATERI ================= -->
    <template v-else>
      <div class="card">
        <div class="ch">
          <div>
            <h2>Marketing Tools</h2>
            <p class="hint">{{ TOOLS.length }} materi siap pakai. Klik salah satu untuk melihat isi dan linknya.</p>
          </div>
        </div>
        <label for="mt-cari" class="mt-sr">Cari marketing tools</label>
        <div class="mt-search">
          <AdminIcon name="search" :size="18" />
          <input id="mt-cari" v-model="q" type="search" placeholder="Cari marketing tools..." autocomplete="off" />
        </div>
      </div>

      <div v-if="list.length" class="mt-grid">
        <article v-for="t in list" :key="t.id" class="card mt-card">
          <div class="mt-thumb">
            <img v-if="t.img && !hidden[t.id]" :src="imgUrl(t)" :alt="t.title" loading="lazy" @error="hidden[t.id] = true" />
            <div v-else class="mt-noimg"><AdminIcon name="zap" :size="28" /></div>
          </div>
          <small v-if="t.date" class="mt-date">{{ t.date }}</small>
          <h3>{{ t.title }}</h3>
          <p>{{ t.desc }}</p>
          <NuxtLink class="btn sm mt-btn" :to="{ path: '/admin/marketing', query: { tool: t.id } }">Buka</NuxtLink>
        </article>
      </div>

      <div v-else class="card">
        <div class="empty"><AdminIcon name="search" /><b>Tidak ada hasil</b><span>Coba kata kunci lain.</span></div>
      </div>
    </template>
  </section>
</template>

<style scoped>
.mt-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
.mt-search { position: relative; }
.mt-search svg { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--mu); pointer-events: none; }
.mt-search input { padding-left: 40px; }

.mt-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 18px; }
.mt-card { display: flex; flex-direction: column; margin-bottom: 0; padding: 14px; }
.mt-thumb { aspect-ratio: 16 / 9; border-radius: 10px; overflow: hidden; background: var(--tint); margin-bottom: 12px; }
.mt-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
.mt-noimg { width: 100%; height: 100%; display: grid; place-items: center; color: var(--p); }
.mt-card h3 { font-size: 15px; font-weight: 700; color: var(--dark); margin: 4px 0 6px; line-height: 1.35; }
.mt-card p { font-size: 13px; color: var(--mu); line-height: 1.5; flex: 1; margin-bottom: 14px; }
.mt-btn { width: 100%; justify-content: center; text-decoration: none; }
.mt-date { font-size: 12px; color: var(--mu); }

.mt-link { text-decoration: none; margin-bottom: 16px; }
.mt-detail { max-width: 760px; }
.mt-hero { aspect-ratio: 16 / 9; border-radius: 12px; overflow: hidden; background: var(--tint); margin-bottom: 16px; }
.mt-hero img { width: 100%; height: 100%; object-fit: cover; display: block; }
.mt-title { font-size: 22px; font-weight: 800; color: var(--dark); margin: 4px 0 12px; line-height: 1.3; }
.mt-sub { font-size: 16px; font-weight: 700; color: var(--dark); margin: 16px 0 6px; }
.mt-text { font-size: 14px; color: var(--tx); line-height: 1.65; }

.mt-links { display: grid; gap: 10px; margin-top: 20px; max-width: 760px; }
.mt-linkbtn { display: flex; align-items: center; justify-content: space-between; gap: 12px; text-decoration: none; }
.mt-linkmain { display: inline-flex; align-items: center; gap: 8px; }
.mt-linkbtn small { opacity: 0.8; font-weight: 500; font-size: 12px; }

.mt-formhead { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 10px; }
.mt-formhead .mt-sub { margin: 0; }
.mt-pre { white-space: pre-wrap; word-break: break-word; font-family: inherit; font-size: 13px; line-height: 1.6; color: var(--tx); background: var(--bg); border: 1px solid var(--line); border-radius: 10px; padding: 14px 16px; margin: 0; }

/* katalog tema */
.tc-search { position: relative; }
.tc-search svg { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--mu); pointer-events: none; }
.tc-search input { padding-left: 40px; }
.tc-cats { display: flex; gap: 8px; overflow-x: auto; padding: 14px 0 6px; scrollbar-width: none; }
.tc-cats::-webkit-scrollbar { display: none; }
.tc-cat { flex: none; padding: 7px 14px; border-radius: 8px; border: 1px solid var(--line); background: #fff; color: var(--tx); font-size: 13px; font-weight: 600; cursor: pointer; font-family: inherit; }
.tc-cat:hover { border-color: var(--p); color: var(--p); }
.tc-cat.on { background: var(--dark); border-color: var(--dark); color: #fff; }
.tc-count { font-size: 12.5px; color: var(--mu); margin: 8px 0 14px; }
.tc-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(170px, 1fr)); gap: 16px; }
.tc-card { display: flex; flex-direction: column; border: 1px solid var(--line); border-radius: 12px; padding: 10px; background: #fff; }
.tc-thumb { position: relative; aspect-ratio: 3 / 4; border-radius: 8px; overflow: hidden; background: var(--tint); margin-bottom: 10px; }
.tc-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
.tc-badge { position: absolute; top: 8px; left: 8px; z-index: 1; background: var(--dark); color: #fff; font-size: 10.5px; font-weight: 700; padding: 3px 8px; border-radius: 4px; }
.tc-card h4 { font-size: 14px; font-weight: 700; color: var(--dark); margin: 0 0 2px; line-height: 1.3; }
.tc-card p { font-size: 12px; color: var(--mu); margin: 0 0 10px; flex: 1; }
.tc-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
.tc-actions .btn { justify-content: center; text-decoration: none; padding-left: 8px; padding-right: 8px; }
.tc-skel .tc-line { height: 12px; border-radius: 6px; background: var(--tint); margin-bottom: 8px; }
.tc-skel .tc-line.short { width: 60%; }
.tc-skel .tc-thumb { animation: tcp 1.2s ease-in-out infinite; }
@keyframes tcp { 50% { opacity: 0.55; } }
.tc-msg { text-align: center; color: var(--mu); padding: 36px 12px; font-size: 14px; line-height: 1.6; }
.tc-msg .btn { margin-top: 12px; }
.tc-more { text-align: center; margin-top: 20px; }
</style>