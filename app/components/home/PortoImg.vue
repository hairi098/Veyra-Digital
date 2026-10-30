<script setup>
const props = defineProps({ src: String, alt: String, fallback: String, cat: String });
const s = ref(props.src);
const loaded = ref(false);
function onError() { s.value = props.fallback; loaded.value = true; }
</script>

<template>
  <div class="porto-img-wrap" :class="{ loaded }">
    <img :src="s" :alt="alt" class="porto-img" :class="{ loaded }" loading="lazy" @load="loaded = true" @error="onError" />
    <div class="porto-overlay">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
    </div>
    <span v-if="cat" class="porto-cat-badge">{{ cat }}</span>
  </div>
</template>
