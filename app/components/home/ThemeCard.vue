<script setup>
const props = defineProps({ theme: { type: Object, required: true } });
const { categoryMap, themeImg, previewUrl } = useThemes();
const { openModal } = useThemeModal();
const { chooseTheme } = useOrderFlow();

const FALLBACK = "https://placehold.co/300x400/eee/999?text=Preview";
const name = computed(() => props.theme.name || "Tema");
const slug = computed(() => props.theme.slug || "");
const cat = computed(() => (props.theme.category_id ? categoryMap.value[props.theme.category_id] || "" : ""));
const preview = computed(() => previewUrl(props.theme));
const src = ref(themeImg(props.theme));
const loaded = ref(false);
watch(() => props.theme, (t) => (src.value = themeImg(t)));
function onError() {
  src.value = FALLBACK;
  loaded.value = true;
}
function open() {
  openModal({ img: themeImg(props.theme), name: name.value, cat: cat.value, slug: slug.value, previewUrl: preview.value });
}
</script>

<template>
  <div class="theme-card">
    <div class="theme-thumb-wrap" :class="{ loaded }" @click="open">
      <span v-if="theme.is_premium" class="theme-premium-badge">Premium</span>
      <img :src="src" class="theme-thumb" :class="{ loaded }" :alt="name" loading="lazy" @load="loaded = true" @error="onError" />
      <div class="theme-thumb-zoom">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
      </div>
    </div>
    <div class="theme-info">
      <h3 class="theme-name">{{ name }}</h3>
      <p class="theme-cat-label" :style="cat ? null : 'visibility:hidden;'">{{ cat || "-" }}</p>
      <div class="theme-actions">
        <a :href="preview" class="btn-preview" target="_blank" rel="noopener noreferrer" @click.stop>Preview</a>
        <a href="/paket" class="btn-pilih" @click.stop.prevent="chooseTheme(slug, name)">Pesan</a>
      </div>
    </div>
  </div>
</template>
