<script setup>
// Kerangka dashboard admin: sidebar, header, toast, dialog konfirmasi.
// Judul header diambil dari definePageMeta({ title, sub }) di tiap halaman.
import "~/assets/css/admin.css";
const route = useRoute();
const { pw, profile, loadProfile, brandInfo, newCount, loadOrders, loadBrandInfo, logout, saveLogo } = useAdmin();
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
  { to: "/admin/marketing", label: "Marketing Tools", ic: "zap", tag: "NEW" }, // hapus tag kalau sudah tidak baru
  { to: "/admin/pengaturan", label: "Pengaturan", ic: "user" },
];

const avatar = computed(() => ((profile.value.name || profile.value.email || pw.value).charAt(0) || "A").toUpperCase());
const menuOpen = ref(false);
watch(menuOpen, (v) => document.body.classList.toggle("menu", v));
watch(() => route.path, () => (menuOpen.value = false));

/* ---- menu akun (avatar pojok kanan atas) ---- */
const userOpen = ref(false);
const userEl = ref(null);
const fileEl = ref(null);
const photoBusy = ref(false);
let closeT;
const canHover = () => window.matchMedia && window.matchMedia("(hover: hover)").matches;
function onUserEnter() {
  if (!canHover()) return;
  clearTimeout(closeT);
  userOpen.value = true;
}
function onUserLeave() {
  if (!canHover()) return;
  clearTimeout(closeT);
  closeT = setTimeout(() => (userOpen.value = false), 180);
}
function onAvatarClick() {
  // di desktop menu sudah terbuka lewat hover; di HP klik = buka/tutup
  if (canHover()) userOpen.value = true;
  else userOpen.value = !userOpen.value;
}
const onDocClick = (e) => {
  if (userOpen.value && userEl.value && !userEl.value.contains(e.target)) userOpen.value = false;
};
watch(() => route.path, () => (userOpen.value = false));
function pickPhoto() {
  if (fileEl.value) fileEl.value.click();
}
/* foto profil = logo brand: disimpan ke kolom logo_url yang sama dengan halaman Brand & Kontak */
async function onPhoto(e) {
  const f = e.target.files && e.target.files[0];
  e.target.value = "";
  if (!f) return;
  if (!/^image\//.test(f.type)) return toast("File harus berupa gambar", "err");
  photoBusy.value = true;
  try {
    const url = await Promise.race([
      shrinkImg(f, 320, "image/png"),
      new Promise((_, no) => setTimeout(() => no(new Error("timeout")), 15000)),
    ]);
    await saveLogo(url);
  } catch (err) {
    toast("Gambar tidak bisa dibaca, coba file lain", "err");
  } finally {
    photoBusy.value = false;
  }
}
function doLogout() {
  userOpen.value = false;
  logout();
}

const refreshing = ref(false);
async function refresh() {
  refreshing.value = true;
  await loadOrders(true);
  refreshing.value = false;
  toast("Pesanan diperbarui");
}

let timer;
const onKey = (e) => {
  if (e.key === "Escape") menuOpen.value = userOpen.value = false;
};
onMounted(() => {
  loadBrandInfo();
  loadProfile();
  loadOrders();
  timer = setInterval(() => loadOrders(true), 6e4); // cek pesanan baru tiap menit
  window.addEventListener("keydown", onKey);
  document.addEventListener("click", onDocClick);
});
onBeforeUnmount(() => {
  clearInterval(timer);
  window.removeEventListener("keydown", onKey);
  document.removeEventListener("click", onDocClick);
  clearTimeout(closeT);
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
          <AdminIcon :name="l.ic" />{{ l.label }}<span v-if="l.badge && newCount" class="nb">{{ newCount }}</span><span v-if="l.tag" class="nb nb-new">{{ l.tag }}</span>
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
        <div ref="userEl" class="uw" @mouseenter="onUserEnter" @mouseleave="onUserLeave">
          <button type="button" class="av" :class="{ busy: photoBusy }" aria-haspopup="menu" :aria-expanded="userOpen" aria-label="Menu akun" @click="onAvatarClick">
            <img v-if="brandInfo.logo" :src="brandInfo.logo" alt="" /><span v-else>{{ avatar }}</span>
          </button>
          <div v-show="userOpen" class="um" role="menu">
            <div class="um-card">
              <div class="um-head">
                <div class="av lg"><img v-if="brandInfo.logo" :src="brandInfo.logo" alt="" /><span v-else>{{ avatar }}</span></div>
                <div class="um-id">
                  <b>{{ profile.name || brandInfo.name }}</b><small>{{ profile.email }}</small>
                </div>
              </div>
              <NuxtLink to="/admin/pengaturan" role="menuitem"><AdminIcon name="user" />Info akun</NuxtLink>
              <button type="button" class="mi" role="menuitem" :disabled="photoBusy" @click="pickPhoto"><AdminIcon name="edit" />{{ photoBusy ? "Mengunggah..." : "Ganti foto profil" }}</button>
              <button type="button" class="mi out" role="menuitem" @click="doLogout"><AdminIcon name="out" />Log out</button>
            </div>
          </div>
          <input ref="fileEl" type="file" accept="image/*" hidden aria-label="Upload foto profil" @change="onPhoto" />
        </div>
      </header>
      <main><slot /></main>
    </div>

    <AdminConfirm />
    <div class="adm-toast" :class="[toastState.type, { on: toastState.on }]" role="status">
      <AdminIcon :name="toastState.type === 'err' ? 'x' : 'check'" />{{ toastState.msg }}
    </div>
  </div>
</template>

<style scoped>
.nb.nb-new {
  min-width: 0;
  height: 18px;
  padding: 0 7px;
  border-radius: 9px;
  background: #22c55e;
  color: #052e16;
  font-size: 10px;
  letter-spacing: 0.6px;
}
</style>