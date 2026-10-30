<script setup>
const { porto, loadPorto } = useThemes();
const PER_PAGE = 30;
const catOf = (p) => (p.category && p.category.name ? p.category.name.trim() : p.kategori || "");

onMounted(loadPorto);

const activeCat = ref("Semua Kategori");
const page = ref(1);
const cats = computed(() => {
  const seen = {};
  const out = ["Semua Kategori"];
  porto.value.items.forEach((p) => {
    const c = catOf(p);
    if (c && !seen[c]) { seen[c] = 1; out.push(c); }
  });
  return out;
});
const filtered = computed(() =>
  activeCat.value === "Semua Kategori" ? porto.value.items : porto.value.items.filter((p) => catOf(p) === activeCat.value),
);
const visible = computed(() => filtered.value.slice(0, page.value * PER_PAGE));
function setCat(c) { activeCat.value = c; page.value = 1; }

const card = (p) => ({
  img: p.cover_url || p.foto_url || "https://placehold.co/300x400/eee/999?text=Porto",
  cat: catOf(p),
  nama: p.heading || p.nama_klien || "Undangan Digital",
  tgl: p.created_at ? p.created_at.substring(0, 10) : "",
});
const cards = computed(() => visible.value.map(card));

/* lightbox */
const lb = ref(null);
const landscape = ref(false);
const ratio = ref("");
function onLbLoad(e) {
  const i = e.target;
  if (!i.naturalWidth || !i.naturalHeight) return;
  landscape.value = i.naturalWidth > i.naturalHeight;
  ratio.value = i.naturalWidth + " / " + i.naturalHeight;
}
function openLb(c) { landscape.value = false; ratio.value = ""; lb.value = c; }
const FALLBACK = "https://placehold.co/640x400/eee/999?text=Porto";
</script>

<template>
  <section class="portfolio-section">
    <div class="container">
      <div class="sec-header">
        <p class="sec-eyebrow">Hasil Karya</p>
        <h2 class="sec-title">Portofolio <span style="color: var(--sm-primary)">Undangan Digital</span></h2>
        <p class="sec-desc">Undangan nyata yang telah kami buat untuk klien di seluruh Indonesia</p>
      </div>

      <div v-if="porto.status === 'ok'" class="porto-filter-scroll">
        <button v-for="c in cats" :key="c" class="porto-filter-btn" :class="{ active: c === activeCat }" @click="setCat(c)">{{ c }}</button>
      </div>

      <div class="porto-grid">
        <template v-if="porto.status === 'idle' || porto.status === 'loading'">
          <div v-for="i in 6" :key="i" class="porto-card skeleton-card">
            <div class="skeleton-img"></div>
            <div class="skeleton-info"><div class="skeleton-line short"></div><div class="skeleton-line long"></div></div>
          </div>
        </template>
        <p v-else-if="porto.status === 'error'" style="grid-column: 1/-1; text-align: center; color: #9ca3af; padding: 40px">Gagal memuat portofolio.</p>
        <template v-else>
          <div v-for="(c, i) in cards" :key="i" class="porto-card" @click="openLb(c)">
            <PortoImg :src="c.img" :alt="c.nama" :fallback="FALLBACK" :cat="c.cat" />
            <div class="porto-info">
              <div class="porto-info-main">
                <p v-if="c.cat" class="porto-category">{{ c.cat }}</p>
                <h3 class="porto-name">{{ c.nama }}</h3>
              </div>
              <span class="porto-date">{{ c.tgl }}</span>
            </div>
          </div>
        </template>
      </div>

      <div v-if="porto.status === 'ok' && !filtered.length" class="porto-empty" style="display: flex">
        <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#cbd5e0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
        <p>Belum ada portofolio untuk kategori ini</p>
      </div>

      <div v-if="visible.length < filtered.length" class="porto-more" style="display: block">
        <button class="btn-lihat-semua" @click="page++">
          Lihat Lebih Banyak
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
        </button>
      </div>
    </div>

    <Teleport to="body">
      <div class="lb-overlay" :class="{ hidden: !lb }" @click.self="lb = null">
        <div v-if="lb" class="lb-panel" :class="{ landscape }">
          <button class="lb-close" aria-label="Tutup" @click="lb = null">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
          <img :src="lb.img" :alt="lb.nama" class="lb-img" :style="ratio ? { aspectRatio: ratio } : null" @load="onLbLoad" />
          <div class="lb-info">
            <span class="lb-cat">{{ lb.cat }}</span>
            <h3 class="lb-name">{{ lb.nama }}</h3>
            <p class="lb-date">{{ lb.tgl }}</p>
          </div>
        </div>
      </div>
    </Teleport>
  </section>
</template>
