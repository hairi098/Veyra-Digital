<script setup>
// Kerangka dashboard admin: sidebar, header, toast, dialog konfirmasi.
// Judul header diambil dari definePageMeta({ title, sub }) di tiap halaman.
import "~/assets/css/admin.css";
const route = useRoute();
const { pw, profile, loadProfile, brandInfo, newCount, loadOrders, loadBrandInfo, logout } = useAdmin();
const { toastState, toast } = useAdminUi();

useHead({
  title: computed(() => (newCount.value ? `(${newCount.value}) ` : "") + "Dashboard Reseller"),
  meta: [{ name: "robots", content: "noindex,nofollow" }],
  link: [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
    { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" },
  ],
});

const NAV = [
  { to: "/admin/pesanan", label: "Pesanan", ic: "box", badge: true },
  { to: "/admin/ringkasan", label: "Ringkasan", ic: "chart" },
  { to: "/admin/promo", label: "Promo", ic: "tag" },
  { to: "/admin/paket", label: "Paket", ic: "card" },
  { to: "/admin/brand", label: "Brand & Kontak", ic: "store" },
  { to: "/admin/sosmed", label: "Sosial Media", ic: "link" },
  { to: "/admin/pembayaran", label: "Pembayaran", ic: "wallet" },
  { to: "/admin/pengaturan", label: "Pengaturan", ic: "user" },
];

const avatar = computed(() => ((profile.value.name || profile.value.email || pw.value).charAt(0) || "A").toUpperCase());
const menuOpen = ref(false);
watch(menuOpen, (v) => document.body.classList.toggle("menu", v));
watch(() => route.path, () => (menuOpen.value = false));

const refreshing = ref(false);
async function refresh() {
  refreshing.value = true;
  await loadOrders(true);
  refreshing.value = false;
  toast("Pesanan diperbarui");
}

let timer;
const onKey = (e) => e.key === "Escape" && (menuOpen.value = false);
onMounted(() => {
  loadBrandInfo();
  loadProfile();
  loadOrders();
  timer = setInterval(() => loadOrders(true), 6e4); // cek pesanan baru tiap menit
  window.addEventListener("keydown", onKey);
});
onBeforeUnmount(() => {
  clearInterval(timer);
  window.removeEventListener("keydown", onKey);
  document.body.classList.remove("menu");
});
</script>

<template>
  <div>
    <aside class="adm-side">
      <div class="sb">
        <img v-if="brandInfo.logo" class="blg" :src="brandInfo.logo" alt="" /><span class="bnm">{{ brandInfo.name }}</span>
      </div>
      <nav class="adm-tabs">
        <NuxtLink v-for="l in NAV" :key="l.to" :to="l.to" active-class="on">
          <AdminIcon :name="l.ic" />{{ l.label }}<span v-if="l.badge && newCount" class="nb">{{ newCount }}</span>
        </NuxtLink>
      </nav>
      <div class="sf">
        <button @click="logout"><AdminIcon name="out" />Keluar</button>
      </div>
    </aside>
    <div class="adm-ov" @click="menuOpen = false"></div>

    <div class="adm-content">
      <header class="adm-top">
        <button class="ib adm-burger" aria-label="Buka menu" @click="menuOpen = !menuOpen"><AdminIcon name="menu" /></button>
        <div class="tt">
          <b>{{ route.meta.title || "Dashboard" }}</b><small>{{ route.meta.sub }}</small>
        </div>
        <button v-if="route.meta.refresh" class="ib" :class="{ spin: refreshing }" aria-label="Muat ulang pesanan" title="Muat ulang" @click="refresh">
          <AdminIcon name="refresh" />
        </button>
        <div class="av">{{ avatar }}</div>
      </header>
      <main><slot /></main>
    </div>

    <AdminConfirm />
    <div class="adm-toast" :class="[toastState.type, { on: toastState.on }]" role="status">
      <AdminIcon :name="toastState.type === 'err' ? 'x' : 'check'" />{{ toastState.msg }}
    </div>
  </div>
</template>