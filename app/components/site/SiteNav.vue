<script setup>
const { brand, logo, loginUrl } = useSiteLinks();
const route = useRoute();
const menuOpen = ref(false);

const LINKS = [
  { key: "beranda", to: "/", label: "Beranda" },
  { key: "fitur", to: "/fitur", label: "Fitur" },
  { key: "tema", to: "/tema", label: "Tema" },
  { key: "paket", to: "/paket", label: "Paket" },
  { key: "tentang", to: "/tentang", label: "Tentang" },
];
const ICONS = {
  beranda: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z",
  fitur: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z",
  tema: "M3 3h8v8H3zm0 10h8v8H3zm10-10h8v8h-8zm0 10h8v8h-8z",
  paket: "M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z",
  tentang: "M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z",
};
// halaman aktif ditentukan dari URL, bukan dari state tab
const here = computed(() => route.path.replace(/\/+$/, "") || "/");
const isActive = (l) => (l.to === "/" ? here.value === "/" : here.value === l.to);
watch(here, () => (menuOpen.value = false));
</script>

<template>
  <!-- Desktop -->
  <nav class="navbar-desktop">
    <div class="nav-inner">
      <NuxtLink to="/" class="nav-logo">
        <img class="brand-logo" :src="logo" alt="Logo" width="40" height="40" />
        <span class="brand-name">{{ brand }}</span>
      </NuxtLink>
      <div class="nav-links">
        <NuxtLink v-for="l in LINKS" :key="l.key" :to="l.to" class="nav-link" :class="{ active: isActive(l) }">{{ l.label }}</NuxtLink>
      </div>
      <div class="nav-actions">
        <a :href="loginUrl" target="_blank" rel="noopener" class="btn-login">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="15" height="15"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><polyline points="10 17 15 12 10 7" /><line x1="15" y1="12" x2="3" y2="12" /></svg>
          Login
        </a>
      </div>
    </div>
  </nav>

  <!-- Mobile: top bar + menu -->
  <nav class="topbar">
    <input id="menu-toggle" v-model="menuOpen" type="checkbox" class="menu-checkbox" />
    <div class="topbar-container">
      <NuxtLink to="/" class="nav-logo">
        <img class="brand-logo" :src="logo" alt="Logo" width="40" height="40" />
        <span class="brand-name">{{ brand }}</span>
      </NuxtLink>
      <label for="menu-toggle" class="hamburger" aria-label="Menu">
        <svg class="icon-menu-open" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--sm-dark)" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
        <svg class="icon-menu-close" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--sm-dark)" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
      </label>
    </div>
    <div class="mobile-menu">
      <ul>
        <li v-for="l in LINKS" :key="l.key"><NuxtLink :to="l.to" :class="{ active: isActive(l) }">{{ l.label }}</NuxtLink></li>
      </ul>
      <div class="menu-cta-group">
        <a :href="loginUrl" target="_blank" rel="noopener" class="btn-login-full">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><polyline points="10 17 15 12 10 7" /><line x1="15" y1="12" x2="3" y2="12" /></svg>
          Login
        </a>
      </div>
    </div>
  </nav>

  <!-- Mobile: bottom nav -->
  <nav class="bottom-nav">
    <NuxtLink v-for="l in LINKS" :key="l.key" :to="l.to" class="nav-item" :class="{ active: isActive(l), 'nav-center': l.key === 'tema' }">
      <div class="nav-icon-wrap" :class="{ 'center-circle': l.key === 'tema' }">
        <svg :width="l.key === 'tema' ? 26 : 22" :height="l.key === 'tema' ? 26 : 22" viewBox="0 0 24 24" fill="currentColor"><path :d="ICONS[l.key]" /></svg>
      </div>
      <span class="nav-label">{{ l.label }}</span>
    </NuxtLink>
  </nav>
</template>
