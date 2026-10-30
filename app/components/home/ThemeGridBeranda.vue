<script setup>
const { beranda, loadBeranda } = useThemes();
onMounted(loadBeranda);
</script>

<template>
  <div id="themes-grid-beranda" class="themes-grid">
    <template v-if="beranda.status === 'ok' && beranda.items.length">
      <ThemeCard v-for="t in beranda.items" :key="t.slug || t.id" :theme="t" />
    </template>
    <p v-else-if="beranda.status === 'ok'" style="grid-column: 1/-1; text-align: center; color: #9ca3af; padding: 40px">Tidak ada tema tersedia.</p>
    <p v-else-if="beranda.status === 'error'" style="grid-column: 1/-1; text-align: center; color: #9ca3af; padding: 40px">Gagal memuat tema. Coba muat ulang halaman.</p>
    <div v-else style="grid-column: 1/-1; text-align: center; padding: 40px; color: #9ca3af">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin: 0 auto 8px; display: block; animation: spin 1s linear infinite"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
      Memuat tema...
    </div>
  </div>
</template>
