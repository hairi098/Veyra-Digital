<script setup>
// Tidak ada di sidebar (sama seperti dashboard lama), tetap bisa dibuka lewat /admin/template
definePageMeta({
  layout: "admin-app",
  title: "Template Chat",
  sub: "Atur isi pesan WhatsApp ke pelanggan",
});
const { form, loadSettings, saveTemplate, resetTemplate } = useAdmin();

onMounted(() => loadSettings());

const FIELDS = [
  ["baru", "Pesanan baru"],
  ["diproses", "Sedang diproses"],
  ["selesai", "Selesai"],
  ["batal", "Dibatalkan"],
];
</script>

<template>
  <section>
    <div class="card">
      <div class="ch">
        <div>
          <h2>Template chat pelanggan</h2>
          <p class="hint">
            Dipakai saat kamu menekan tombol WhatsApp di daftar pesanan. Variabel: {nama} {invoice} {paket} {total} {tema} {acara}
          </p>
        </div>
      </div>
      <div>
        <template v-for="f in FIELDS" :key="f[0]">
          <label :for="'tpl-' + f[0]">{{ f[1] }}</label>
          <textarea :id="'tpl-' + f[0]" v-model="form.tpl[f[0]]" rows="3"></textarea>
        </template>
      </div>
      <div class="df" style="padding: 18px 0 0; border: 0; background: 0; justify-content: flex-start">
        <button class="btn" @click="saveTemplate"><AdminIcon name="check" />Simpan template</button>
        <button class="btn sec" @click="resetTemplate">Kembalikan bawaan</button>
      </div>
    </div>
  </section>
</template>
