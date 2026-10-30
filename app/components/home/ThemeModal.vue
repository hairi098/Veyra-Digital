<script setup>
const { modalTheme, closeModal } = useThemeModal();
const { chooseTheme } = useOrderFlow();
function pesan() {
  const t = modalTheme.value;
  closeModal();
  chooseTheme(t.slug, t.name);
}
</script>

<template>
  <Teleport to="body">
    <div class="tm-overlay" :class="{ hidden: !modalTheme }" @click.self="closeModal">
      <div v-if="modalTheme" class="tm-panel">
        <button class="tm-close" aria-label="Tutup" @click="closeModal">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
        </button>
        <div class="tm-img-wrap"><img :src="modalTheme.img" :alt="modalTheme.name" class="tm-img" /></div>
        <div class="tm-info">
          <span v-if="modalTheme.cat" class="tm-cat">{{ modalTheme.cat }}</span>
          <h3 class="tm-name">{{ modalTheme.name }}</h3>
          <div class="tm-actions">
            <a :href="modalTheme.previewUrl" class="btn-preview" target="_blank" rel="noopener noreferrer">Preview</a>
            <a href="/paket" class="btn-pilih" @click.prevent="pesan">Pesan</a>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
