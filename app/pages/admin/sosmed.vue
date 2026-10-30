<script setup>
definePageMeta({
  layout: "admin-app",
  title: "Sosial Media",
  sub: "Link sosial media yang tampil di footer",
});
const { form, loadSettings, saveSettings } = useAdmin();

onMounted(() => loadSettings());

const add = () => form.value.soc.push({ platform: "instagram", url: "" });
const del = (i) => form.value.soc.splice(i, 1);
</script>

<template>
  <section>
    <div class="bl" style="grid-template-columns: 1fr; max-width: 720px">
      <div class="card">
        <h2>Sosial media</h2>
        <p class="hint">Hanya yang diisi yang tampil di footer website.</p>
        <label>Sosial media</label>
        <div>
          <div v-for="(s, i) in form.soc" :key="i" class="srow">
            <select v-model="s.platform" aria-label="Platform">
              <option v-for="(v, k) in SOCIALS" :key="k" :value="k">{{ v.label }}</option>
            </select>
            <input v-model="s.url" placeholder="https://..." aria-label="Link" />
            <button type="button" class="ib r" aria-label="Hapus" @click="del(i)"><AdminIcon name="trash" /></button>
          </div>
          <p v-if="!form.soc.length" class="note">Belum ada sosial media.</p>
        </div>
        <button type="button" class="btn sec sm" @click="add"><AdminIcon name="plus" />Tambah sosial media</button>
        <p class="note">Hanya sosial media yang diisi yang tampil di footer website, lengkap dengan logonya.</p>

        <label for="sosmed-waask">Pesan WhatsApp saat tanya (tombol float &amp; footer)</label>
        <textarea id="sosmed-waask" v-model="form.waAsk" rows="3"></textarea>
        <p class="note">
          Pesan awal yang terisi saat pengunjung klik tombol WhatsApp melayang, “Hubungi Kami”, atau “Tanya via WhatsApp”.
          Variabel: {brand}.
        </p>
        <div class="df" style="padding: 18px 0 0; border: 0; background: 0; justify-content: flex-start">
          <button class="btn" @click="saveSettings"><AdminIcon name="check" />Simpan pengaturan</button>
        </div>
      </div>
    </div>
  </section>
</template>
