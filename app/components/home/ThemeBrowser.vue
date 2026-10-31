<script setup>
const {
  categories,
  categoryMap,
  activeCatId,
  query,
  themes,
  nextUrl,
  status,
  loadingMore,
  total,
  loadCategories,
  fetchThemes,
} = useThemes();
const route = useRoute();
// kategori dipilih lewat URL: /tema?kategori=pernikahan
const slug = computed(() => String(route.query.kategori || ""));

/* ---- muat saat halaman Tema dibuka ---- */
async function applySlug() {
  await loadCategories();
  if (!slug.value) return;
  const c = categories.value.find((x) => x.slug === slug.value);
  if (c) activeCatId.value = c.id;
}
onMounted(async () => {
  await applySlug();
  fetchThemes(true);
});
// link kategori di footer diklik saat sudah berada di /tema
watch(slug, async (s) => {
  if (!s) return;
  const before = activeCatId.value;
  await applySlug();
  if (activeCatId.value !== before) fetchThemes(true);
});

/* ---- pencarian ---- */
let timer;
function onInput() {
  clearTimeout(timer);
  timer = setTimeout(() => fetchThemes(true), 400);
}
function searchNow() {
  clearTimeout(timer);
  fetchThemes(true);
}

/* ---- kategori ---- */
function setCat(id) {
  activeCatId.value = id;
  fetchThemes(true);
}
const activeName = computed(
  () => categoryMap.value[activeCatId.value] || "Kategori",
);

/* ---- modal filter ---- */
const modalOpen = ref(false);
const tempCat = ref(0);
const showLabel = ref(false);
onMounted(() => (showLabel.value = window.innerWidth >= 380));
function toggleModal() {
  if (!modalOpen.value) tempCat.value = activeCatId.value;
  modalOpen.value = !modalOpen.value;
  document.body.style.overflow = modalOpen.value ? "hidden" : "";
}
function applyFilter() {
  activeCatId.value = tempCat.value;
  toggleModal();
  fetchThemes(true);
}
onBeforeUnmount(() => (document.body.style.overflow = ""));

const countText = computed(() => {
  if (status.value === "loading") return "Memuat tema...";
  if (status.value === "error") return "Gagal memuat";
  if (total.value !== null) return total.value + " Tema"; // total keseluruhan: semua kategori / kategori yang dipilih
  return themes.value.length + (nextUrl.value ? "+" : "") + " Tema"; // cadangan kalau API tidak memberi total
});
</script>

<template>
  <div>
    <div class="sticky-search-bar">
      <div class="search-bar-inner">
        <button class="filter-btn" aria-label="Filter" @click="toggleModal">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="8" y1="12" x2="16" y2="12" />
            <line x1="11" y1="18" x2="13" y2="18" />
          </svg>
          <span v-show="showLabel" style="font-size: 13.5px; font-weight: 600"
            >Filter</span
          >
          <span
            v-show="activeCatId !== 0"
            class="filter-badge"
            style="display: inline-flex"
            >1</span
          >
        </button>
        <div class="search-divider"></div>
        <input
          v-model="query"
          type="search"
          placeholder="Cari tema..."
          class="search-input"
          @input="onInput"
          @keydown.enter="searchNow"
        />
        <button class="search-btn" aria-label="Cari" @click="searchNow">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </div>
    </div>

    <section class="tema-section">
      <div class="container">
        <div
          v-if="activeCatId !== 0"
          class="active-filters"
          style="display: flex"
        >
          <span class="active-filter-pill"
            >{{ activeName }} <button @click="setCat(0)">×</button></span
          >
          <button class="clear-all-filters" @click="setCat(0)">
            Hapus Semua
          </button>
        </div>

        <div
          style="
            overflow-x: auto;
            scrollbar-width: none;
            padding-bottom: 4px;
            margin-bottom: 16px;
          "
        >
          <div
            style="
              display: flex;
              gap: 8px;
              min-width: max-content;
              padding: 4px 0 2px;
            "
          >
            <button
              v-for="c in categories"
              :key="c.id"
              class="tema-cat-btn"
              :class="{ active: c.id === activeCatId }"
              @click="setCat(c.id)"
            >
              {{ c.name }}
            </button>
          </div>
        </div>

        <div class="list-header">
          <h2 class="list-title">
            {{ activeCatId !== 0 ? activeName : "Semua Tema" }}
          </h2>
          <span class="list-count">{{ countText }}</span>
        </div>

        <div class="tema-grid">
          <template v-if="status === 'loading'"
            ><ThemeSkeleton v-for="i in 12" :key="i"
          /></template>
          <template v-else-if="status === 'ok'"
            ><ThemeCard v-for="t in themes" :key="t.slug || t.id" :theme="t"
          /></template>
          <div
            v-else-if="status === 'error'"
            style="
              grid-column: 1/-1;
              text-align: center;
              padding: 40px;
              color: #9ca3af;
            "
          >
            Tema gagal dimuat. Periksa koneksi lalu coba lagi.<br />
            <button
              class="btn-load-more"
              style="margin-top: 14px"
              @click="fetchThemes(true)"
            >
              Coba Lagi
            </button>
          </div>
        </div>

        <div
          v-if="status === 'ok' && !themes.length"
          class="empty-state"
          style="display: flex"
        >
          <svg
            width="56"
            height="56"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#9ca3af"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <p>Tema tidak ditemukan</p>
          <span>Coba ubah kata kunci atau filter</span>
        </div>

        <div
          v-if="status === 'ok' && nextUrl"
          class="load-more"
          style="display: block"
        >
          <button
            class="btn-load-more"
            :disabled="loadingMore"
            @click="fetchThemes(false)"
          >
            Lihat Lebih Banyak
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>
      </div>
    </section>

    <Teleport to="body">
      <div
        class="modal-overlay"
        :class="{ hidden: !modalOpen }"
        @click.self="toggleModal"
      >
        <div class="modal-panel">
          <div class="modal-header">
            <span class="modal-title">Filter Tema</span>
            <button class="modal-close" aria-label="Tutup" @click="toggleModal">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <div class="modal-body">
            <div class="filter-section">
              <div class="filter-section-label">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Kategori
              </div>
              <div class="filter-tags">
                <button
                  v-for="c in categories"
                  :key="c.id"
                  class="tag"
                  :class="{ 'tag-active': c.id === tempCat }"
                  @click="tempCat = c.id"
                >
                  {{ c.name }}
                </button>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn-reset-filter" @click="tempCat = 0">
              Reset Filter
            </button>
            <button class="btn-apply-filter" @click="applyFilter">
              Terapkan Filter
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
