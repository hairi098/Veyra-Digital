<script setup>
import "~/assets/css/style.css";
const { brand, logo } = useSite();
loadSite();
useHead({ link: [{ rel: "icon", type: "image/png", href: logo }] });
</script>

<template>
  <slot />
</template>
