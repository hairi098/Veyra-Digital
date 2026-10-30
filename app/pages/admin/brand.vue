<script setup>
definePageMeta({
  layout: "admin-app",
  title: "Brand & Kontak",
  sub: "Nama brand, logo, dan kontak website",
});
const { form, loadSettings, saveSettings } = useAdmin();

onMounted(() => loadSettings());

const tplEl = ref(null);

/* logo: diperkecil otomatis agar ringan */
function onLogoFile(e) {
  const f = e.target.files[0];
  if (!f) return;
  const im = new Image();
  const rd = new FileReader();
  rd.onload = () => (im.src = rd.result);
  im.onload = () => {
    const k = Math.min(1, 320 / Math.max(im.width, im.height));
    const c = document.createElement("canvas");
    c.width = Math.round(im.width * k);
    c.height = Math.round(im.height * k);
    c.getContext("2d").drawImage(im, 0, 0, c.width, c.height);
    form.value.logo = c.toDataURL("image/png");
  };
  rd.readAsDataURL(f);
}

/* sisipkan {variabel} di posisi kursor */
function insertToken(v) {
  const t = tplEl.value;
  const s = t.selectionStart || 0;
  const e = t.selectionEnd || s;
  form.value.waTpl = form.value.waTpl.slice(0, s) + v + form.value.waTpl.slice(e);
  nextTick(() => {
    t.focus();
    t.selectionStart = t.selectionEnd = s + v.length;
  });
}
function resetWa() {
  form.value.waTpl = DEFAULT_WA_TEMPLATE;
  form.value.waAsk = DEFAULT_WA_ASK;
}

/* pratinjau */
const contacts = computed(() =>
  [["WhatsApp", form.value.wa], ["Email", form.value.email]]
    .concat(form.value.soc.map((s) => [(SOCIALS[s.platform] || SOCIALS.website).label, s.url]))
    .filter((x) => x[1]),
);
</script>

<template>
  <section>
    <div class="bl">
      <div class="card">
        <h2>Brand &amp; kontak</h2>
        <p class="hint">Tampil di website dan halaman login ini.</p>
        <label for="brand-nama">Nama brand</label>
        <input id="brand-nama" v-model="form.brand" />
        <label for="brand-logo-file">Logo brand</label>
        <input id="brand-logo-file" type="file" accept="image/*" @change="onLogoFile" />
        <input v-model="form.logo" placeholder="atau tempel link gambar logo" style="margin-top: 8px" aria-label="Link logo" />
        <p class="note">Logo diperkecil otomatis agar ringan.</p>
        <div class="grid2">
          <div>
            <label for="brand-wa">Nomor WhatsApp</label>
            <input id="brand-wa" v-model="form.wa" placeholder="08xxxxxxxxxx" inputmode="tel" />
          </div>
          <div>
            <label for="brand-email">Email</label>
            <input id="brand-email" v-model="form.email" type="email" />
          </div>
          <div style="grid-column: 1/-1">
            <label for="brand-watpl">Pesan WhatsApp saat checkout</label>
            <textarea id="brand-watpl" ref="tplEl" v-model="form.waTpl" rows="11"></textarea>
            <div class="tok">
              <button v-for="t in WA_TOKENS" :key="t" type="button" @click="insertToken('{' + t + '}')">{{ "{" + t + "}" }}</button>
            </div>
            <p class="note">
              Ini isi pesan yang terkirim ke WhatsApp-mu saat pelanggan menekan Pesan Sekarang. Klik variabel untuk menyisipkan.
              Baris {promo} hilang otomatis jika tanpa promo.
            </p>
            <button type="button" class="btn sec sm" style="margin-top: 8px" @click="resetWa">Kembalikan ke bawaan</button>
          </div>
        </div>
        <div class="df" style="padding: 18px 0 0; border: 0; background: 0; justify-content: flex-start">
          <button class="btn" @click="saveSettings"><AdminIcon name="check" />Simpan pengaturan</button>
        </div>
      </div>

      <div class="card bs">
        <h2>Pratinjau</h2>
        <p class="hint">Begini brand-mu tampil di website.</p>
        <div class="bp">
          <img v-if="form.logo" :src="form.logo" alt="" /><span>{{ form.brand || "Nama brand" }}</span>
        </div>
        <div class="kv" style="display: block; border: 0; margin-top: 10px">
          <div v-for="c in contacts" :key="c[0] + c[1]" class="kv"><span>{{ c[0] }}</span><b>{{ c[1] }}</b></div>
          <p v-if="!contacts.length" class="note">Isi kontak untuk melihat pratinjau.</p>
        </div>
      </div>
    </div>
  </section>
</template>
