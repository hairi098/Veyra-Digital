<script setup>
// Layout polos untuk halaman admin tanpa sidebar (login)
import "~/assets/css/admin.css";
useHead({
  title: "Dashboard Reseller",
  meta: [{ name: "robots", content: "noindex,nofollow" }],
  link: [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
    { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" },
  ],
});
</script>

<template>
  <slot />
</template>
