<script setup>
definePageMeta({ layout: "admin" });
const route = useRoute();
const { login, brandInfo, loadBrandInfo } = useAdmin();

const email = ref("");
const password = ref("");
const showPw = ref(false);
const err = ref("");
const busy = ref(false);

onMounted(loadBrandInfo);

async function submit() {
  err.value = "";
  busy.value = true;
  try {
    const ok = await login(email.value, password.value);
    if (!ok) {
      err.value = "Email atau password salah.";
      return;
    }
    const next = String(route.query.next || "");
    // hanya boleh kembali ke halaman admin lain, bukan ke alamat sembarang
    await navigateTo(/^\/admin\/(?!login)[\w-]+$/.test(next) ? next : "/admin/pesanan");
  } catch (e) {
    err.value = "Gagal terhubung ke server. Cek file .env dan koneksi internet.";
  } finally {
    busy.value = false;
  }
}
</script>

<template>
  <div class="adm-login">
    <div class="la">
      <div class="bm">
        <img v-if="brandInfo.logo" class="blg" :src="brandInfo.logo" alt="" /><span class="bnm">{{ brandInfo.name }}</span>
      </div>
      <div>
        <h1>Semua pesanan undangan, rapi di satu layar.</h1>
        <p>Lihat pesanan baru, hubungi pelanggan lewat WhatsApp, lalu atur promo dan harga paket tanpa ribet.</p>
      </div>
      <small>Khusus admin dan reseller</small>
    </div>
    <div class="lf">
      <form class="lb" @submit.prevent="submit">
        <div class="mb">
          <img v-if="brandInfo.logo" class="blg" :src="brandInfo.logo" alt="" /><span class="bnm">{{ brandInfo.name }}</span>
        </div>
        <h2>Masuk ke dashboard</h2>
        <p class="sub">Gunakan akun yang diberikan kepadamu.</p>
        <label for="login-email">Email</label>
        <input id="login-email" v-model="email" type="email" placeholder="nama@email.com" autocomplete="username" required />
        <label for="login-password">Password</label>
        <div class="pw">
          <input id="login-password" v-model="password" :type="showPw ? 'text' : 'password'" placeholder="Masukkan password" autocomplete="current-password" required />
          <button type="button" :aria-label="showPw ? 'Sembunyikan password' : 'Tampilkan password'" @click="showPw = !showPw"><AdminIcon name="eye" /></button>
        </div>
        <p class="adm-lerr" role="alert">{{ err }}</p>
        <button class="btn adm-lbtn" type="submit" :disabled="busy">{{ busy ? "Memproses..." : "Masuk" }}</button>
      </form>
    </div>
  </div>
</template>
