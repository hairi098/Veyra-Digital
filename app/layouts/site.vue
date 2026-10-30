<script setup>
// Kerangka halaman publik: navbar, widget WhatsApp, footer.
// Dipakai oleh pages/index, fitur, tema, paket, tentang (checkout memakai layout default).
import "~/assets/css/style.css";
const { logo } = useSite();
const { loadApiBrand } = useThemes();
loadSite();
useHead({ link: [{ rel: "icon", type: "image/png", href: logo }] });
onMounted(loadApiBrand);
</script>

<template>
  <div>
    <SiteNav />
    <WaWidget />
    <PaketNotice />
    <ThemeModal />
    <div class="page">
      <slot />
      <SiteFooter />
    </div>
  </div>
</template>
