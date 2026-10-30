<script setup>
definePageMeta({
  layout: "admin-app",
  title: "Pengaturan",
  sub: "Profil, email, dan password akun admin",
});
const { pw, profile, loadProfile, setCredential, adm } = useAdmin();
const { toast } = useAdminUi();

// email login = bagian sebelum ":" pada kredensial sesi
const emailNow = computed(() => {
  const i = pw.value.indexOf(":");
  return i > 0 ? pw.value.slice(0, i) : "";
});

/* ================= profil ================= */
const name = ref("");
const busyName = ref(false);
watch(
  () => profile.value.name,
  (v) => (name.value = v || ""),
  { immediate: true },
);
onMounted(loadProfile);

async function saveName() {
  busyName.value = true;
  try {
    const r = await adm("admin_update_profile", { p_name: name.value.trim() });
    if (r && r.ok) {
      profile.value = { ...profile.value, name: name.value.trim() };
      toast("Profil tersimpan");
    } else toast("Gagal menyimpan profil", "err");
  } catch (e) {
  } finally {
    busyName.value = false;
  }
}

/* ================= ganti email ================= */
const newEmail = ref("");
const emailPass = ref("");
const showEmailPass = ref(false);
const busyEmail = ref(false);

const ERR = {
  salah: "Password salah",
  format: "Format email tidak valid",
  dipakai: "Email itu sudah dipakai akun lain",
  pendek: "Password baru minimal 8 karakter",
  titikdua: "Password tidak boleh mengandung tanda titik dua (:)",
};

async function saveEmail() {
  const ne = newEmail.value.trim().toLowerCase();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(ne)) return toast(ERR.format, "err");
  if (ne === emailNow.value)
    return toast("Email baru sama dengan email sekarang", "err");
  if (!emailPass.value) return toast("Isi password untuk konfirmasi", "err");
  busyEmail.value = true;
  try {
    // password diverifikasi server dengan email sekarang + password yang diketik
    const r = await rpc("admin_change_email", {
      p_pw: emailNow.value + ":" + emailPass.value,
      p_new_email: ne,
    });
    if (r && r.ok) {
      setCredential(ne + ":" + emailPass.value); // sesi tetap aktif dengan email baru
      profile.value = { ...profile.value, email: ne };
      newEmail.value = "";
      emailPass.value = "";
      toast("Email berhasil diganti");
    } else toast(ERR[r && r.err] || "Gagal mengganti email", "err");
  } catch (e) {
    toast("Koneksi bermasalah, coba lagi", "err");
  } finally {
    busyEmail.value = false;
  }
}

/* ================= ganti password ================= */
const curPass = ref("");
const newPass = ref("");
const newPass2 = ref("");
const showPass = ref(false);
const busyPass = ref(false);

async function savePass() {
  if (!curPass.value) return toast("Isi password saat ini", "err");
  if (newPass.value.length < 8) return toast(ERR.pendek, "err");
  if (newPass.value.indexOf(":") >= 0) return toast(ERR.titikdua, "err");
  if (newPass.value !== newPass2.value)
    return toast("Konfirmasi password tidak sama", "err");
  if (newPass.value === curPass.value)
    return toast("Password baru harus berbeda dari yang lama", "err");
  busyPass.value = true;
  try {
    const r = await rpc("admin_change_password", {
      p_pw: emailNow.value + ":" + curPass.value,
      p_new_pass: newPass.value,
    });
    if (r && r.ok) {
      setCredential(emailNow.value + ":" + newPass.value);
      curPass.value = newPass.value = newPass2.value = "";
      toast("Password berhasil diganti");
    } else toast(ERR[r && r.err] || "Gagal mengganti password", "err");
  } catch (e) {
    toast("Koneksi bermasalah, coba lagi", "err");
  } finally {
    busyPass.value = false;
  }
}
</script>

<template>
  <section style="max-width: 720px">
    <!-- Profil -->
    <div class="card">
      <h2>Profil</h2>
      <p class="hint">
        Nama ini tampil sebagai inisial di pojok kanan atas dashboard.
      </p>
      <form @submit.prevent="saveName">
        <label for="pf-email">Email login</label>
        <input id="pf-email" :value="emailNow" disabled />
        <label for="pf-nama">Nama tampilan</label>
        <input
          id="pf-nama"
          v-model="name"
          maxlength="60"
          placeholder="Nama kamu"
          autocomplete="name"
        />
        <div style="margin-top: 16px">
          <button class="btn" type="submit" :disabled="busyName">
            <AdminIcon name="check" />{{
              busyName ? "Menyimpan..." : "Simpan profil"
            }}
          </button>
        </div>
      </form>
    </div>

    <!-- Ganti email -->
    <div class="card">
      <h2>Ganti email</h2>
      <p class="hint">
        Email ini dipakai untuk masuk ke dashboard. Kamu tidak akan keluar
        setelah menggantinya.
      </p>
      <form @submit.prevent="saveEmail">
        <label for="em-baru">Email baru</label>
        <input
          id="em-baru"
          v-model="newEmail"
          type="email"
          placeholder="nama@email.com"
          autocomplete="off"
          required
        />
        <label for="em-pass">Password saat ini</label>
        <div class="pw">
          <input
            id="em-pass"
            v-model="emailPass"
            :type="showEmailPass ? 'text' : 'password'"
            autocomplete="current-password"
            required
          />
          <button
            type="button"
            :aria-label="
              showEmailPass ? 'Sembunyikan password' : 'Tampilkan password'
            "
            @click="showEmailPass = !showEmailPass"
          >
            <AdminIcon name="eye" />
          </button>
        </div>
        <div style="margin-top: 16px">
          <button class="btn" type="submit" :disabled="busyEmail">
            <AdminIcon name="mail" />{{
              busyEmail ? "Memproses..." : "Ganti email"
            }}
          </button>
        </div>
      </form>
    </div>

    <!-- Ganti password -->
    <div class="card">
      <h2>Ganti password</h2>
      <p class="hint">
        Minimal 8 karakter dan tidak boleh mengandung tanda titik dua (:).
      </p>
      <form @submit.prevent="savePass">
        <label for="pw-lama">Password saat ini</label>
        <div class="pw">
          <input
            id="pw-lama"
            v-model="curPass"
            :type="showPass ? 'text' : 'password'"
            autocomplete="current-password"
            required
          />
          <button
            type="button"
            :aria-label="
              showPass ? 'Sembunyikan password' : 'Tampilkan password'
            "
            @click="showPass = !showPass"
          >
            <AdminIcon name="eye" />
          </button>
        </div>
        <div class="grid2">
          <div>
            <label for="pw-baru">Password baru</label>
            <input
              id="pw-baru"
              v-model="newPass"
              :type="showPass ? 'text' : 'password'"
              autocomplete="new-password"
              minlength="8"
              required
            />
          </div>
          <div>
            <label for="pw-baru2">Ulangi password baru</label>
            <input
              id="pw-baru2"
              v-model="newPass2"
              :type="showPass ? 'text' : 'password'"
              autocomplete="new-password"
              minlength="8"
              required
            />
          </div>
        </div>
        <div style="margin-top: 16px">
          <button class="btn" type="submit" :disabled="busyPass">
            <AdminIcon name="lock" />{{
              busyPass ? "Memproses..." : "Ganti password"
            }}
          </button>
        </div>
      </form>
    </div>
  </section>
</template>
