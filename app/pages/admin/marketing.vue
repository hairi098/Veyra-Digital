<script setup>
definePageMeta({
  layout: "admin-app",
  title: "Marketing Tools",
  sub: "Materi promosi dan alat bantu jualan untuk reseller",
});

// Alamat portal reseller tempat tombol "Get Tool" mengarah.
// Samakan dengan alamat di browser saat kamu membuka halaman Marketing Tools di portal.
const PORTAL_URL = "https://satumomen.com";
const ASSET_URL = "https://assets.satumomen.com/";

const TOOLS = [
  { id: 17, title: "Prompt AI - Landingpage Undangan Website", date: "10 Juli 2026", desc: "Prompt enginering untuk membuat landingpage rapi dengan AI", img: "images/posts/a7c136a5-cea8-4a2d-bfd1-e00864272549-1783680119.png" },
  { id: 16, title: "Kirim Undangan Ke Semua Tamu Dalam Sekali Klik", date: "4 Desember 2025", desc: "Kirim undangan digital ke semua tamu hanya dalam sekali klik saja.", img: "images/posts/whatsapp-image-2025-11-28-at-33930-pm-1764315894.jpg" },
  { id: 15, title: "Canva Template Promotion Kit", date: "15 Agustus 2025", desc: "Semua template tersedia di Canva, sehingga mudah untuk disesuaikan dan digunakan", img: "images/posts/canva-template-promotion-kit-1755254957.jpg" },
  { id: 14, title: "Kumpulan Kode Inspect Element", date: "15 September 2026", desc: "Kumpulan kode inspect elment untuk modifikasi desain tema undangan website", img: "images/posts/insepct-element-1750415780.jpg" },
  { id: 13, title: "Materi Promosi Edit Pake Canva", date: "2 Mei 2025", desc: "Template Bahan Promosi Khusus Reseller dari Satu Momen! Khusus untuk para reseller.", img: "images/posts/materi-promosi-1746174209.jpg" },
  { id: 12, title: "Recording Tema Undangan Website", date: "2 Mei 2025", desc: "Download dan edit materi promosi tema undangan website berupa video.", img: "images/posts/screen-record-tema-1745577935.jpg" },
  { id: 11, title: "Setup Google Search Console", date: "12 Februari 2025", desc: "Cara mendaftarkan website ke google agar mudah ditemukan oleh customer.", img: "images/posts/search-console-5-1739333991.jpg" },
  { id: 10, title: "Video Review Tema Undangan Website", date: "10 Februari 2025", desc: "Download koleksi beragam video promosi yang siap kamu gunakan untuk status sosmed.", img: "images/posts/recording-smart-phone-1739182340.jpg" },
  { id: 9, title: "454 Thumbnail Tema (JPG)", date: "10 Februari 2025", desc: "Download koleksi thumbnail tema undangan website sekaligus via google drive.", img: "images/posts/445-thumbnail-tema-1739181149.jpg" },
  { id: 8, title: "Video 3D Ucapan Hari Besar", date: "16 Agustus 2025", desc: "Tambah cuan dengan jualan undangan video dan ucapan hari raya idul fitri, idul adha, natal dan tahun baru.", img: "images/posts/video-ucapan-hari-raya-1741555222.jpg" },
  { id: 7, title: "Koleksi Pose Foto Untuk Konten", date: "22 Desember 2024", desc: "Download koleksi foto pose png tanpa background yang kami pakai untuk bikin konten.", img: "images/posts/pose-collection-1734605392.jpg" },
  { id: 6, title: "Tutorial Kirim Undangan [PDF]", date: "22 Desember 2024", desc: "Tinggal share file pdf tutorial kirim undangan melalui portal pelanggan ini aja ke customer.", img: "images/posts/tutorial-untuk-customer-1734604325.jpg" },
  { id: 5, title: "Form Order Undangan", date: "22 Desember 2024", desc: "Form order undangan, tinggal copy paste dan kirim ke calon customer.", img: "images/posts/form-order-1730980285.jpg" },
  { id: 4, title: "Materi Promosi Undangan Video 3D", date: "28 Desember 2024", desc: "Template materi promosi undangan video 3D yang bisa kamu edit menggunakan aplikasi Canva.", img: "images/posts/materi-promosi-undangan-3d-1725166869.jpg" },
  { id: 3, title: "100+ Materi Promosi", date: "1 September 2024", desc: "100+ Template materi promosi editable yang bisa di rebranding instant menggunakan figma.", img: "images/posts/100-template-figma-1724816874.jpg" },
  { id: 2, title: "25 Template Instagram Story", date: "28 Agustus 2024", desc: "Download gratis 25 template promosi instagram story yang bisa kamu edit melalui aplikasi canva.", img: "images/posts/25-template-story-1724816325.jpg" },
  { id: 1, title: "50 Template Instagram Feed", date: "28 Agustus 2024", desc: "Download gratis 50 template promosi instagram feed yang bisa kamu edit melalui aplikasi canva.", img: "images/posts/50-template-feed-1724816298.jpg" },
];

const q = ref("");
const list = computed(() => {
  const k = q.value.trim().toLowerCase();
  if (!k) return TOOLS;
  return TOOLS.filter((t) => (t.title + " " + t.desc).toLowerCase().includes(k));
});

const toolUrl = (t) => PORTAL_URL + "/app/marketing-tools/" + t.id;
const imgUrl = (t) => ASSET_URL + t.img;
const hidden = reactive({}); // gambar yang gagal dimuat
</script>

<template>
  <section>
    <div class="card">
      <div class="ch">
        <div>
          <h2>Marketing Tools</h2>
          <p class="hint">{{ TOOLS.length }} materi siap pakai: template Canva, video promosi, form order, dan lainnya. Tombol Get Tool membuka portal di tab baru.</p>
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
          <img v-if="!hidden[t.id]" :src="imgUrl(t)" :alt="t.title" loading="lazy" @error="hidden[t.id] = true" />
          <div v-else class="mt-noimg"><AdminIcon name="zap" :size="28" /></div>
        </div>
        <small class="mu">{{ t.date }}</small>
        <h3>{{ t.title }}</h3>
        <p>{{ t.desc }}</p>
        <a class="btn sm mt-btn" :href="toolUrl(t)" target="_blank" rel="noopener noreferrer"><AdminIcon name="dl" :size="15" />Get Tool</a>
      </article>
    </div>

    <div v-else class="card">
      <div class="empty"><AdminIcon name="search" /><b>Tidak ada hasil</b><span>Coba kata kunci lain.</span></div>
    </div>
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
</style>