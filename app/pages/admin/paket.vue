<script setup>
definePageMeta({
  layout: "admin-app",
  title: "Paket",
  sub: "Ubah harga dan isi paket layanan",
});
const { paket, paketLoaded, loadPaket, adm } = useAdmin();
const { toast } = useAdminUi();

onMounted(loadPaket);

/* ---- dialog tambah / edit ---- */
const dlg = ref(null);
const isNew = computed(() => !!(dlg.value && dlg.value.isNew));

/** "Paket Gold 2" -> "paket-gold-2" (dipakai di link checkout) */
function slug(t) {
  return String(t || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 30);
}
function openNew() {
  dlg.value = {
    isNew: true,
    keyTouched: false,
    key: "",
    nama: "",
    harga: "",
    tagline: "",
    badge: "",
    aktif: true,
    fitur: "Semua fitur undangan digital\nMasa aktif 30 hari\n-Prioritas pengerjaan",
  };
}
// kode paket terisi otomatis dari nama, selama belum diubah manual
watch(
  () => dlg.value && dlg.value.nama,
  (v) => {
    if (dlg.value && dlg.value.isNew && !dlg.value.keyTouched) dlg.value.key = slug(v);
  },
);

function openEdit(p) {
  dlg.value = {
    key: p.key,
    nama: p.nama || "",
    harga: p.harga,
    tagline: p.tagline || "",
    badge: p.badge || "",
    aktif: !!p.aktif,
    fitur: (p.fitur || []).map((x) => (x.on === false ? "-" : "") + x.t).join("\n"),
  };
}
const preview = computed(() => (dlg.value ? parseFitur(dlg.value.fitur) : []));

async function save() {
  const f = dlg.value;
  const d = {
    key: f.key,
    nama: String(f.nama).trim(),
    harga: parseInt(f.harga, 10),
    tagline: String(f.tagline).trim(),
    badge: String(f.badge).trim(),
    aktif: !!f.aktif,
    fitur: parseFitur(f.fitur),
  };
  if (!d.nama) return toast("Nama paket wajib diisi", "err");
  if (isNaN(d.harga) || d.harga < 0) return toast("Harga tidak valid", "err");
  if (f.isNew) {
    d.key = slug(d.key);
    if (!/^[a-z0-9-]{2,30}$/.test(d.key)) return toast("Kode paket 2–30 karakter: huruf kecil, angka, atau tanda -", "err");
    if (paket.value.some((p) => p.key === d.key)) return toast("Kode paket sudah dipakai, ganti yang lain", "err");
  }
  try {
    const ok = await adm("admin_save_paket", { p_data: d });
    toast(ok ? (f.isNew ? "Paket ditambahkan" : "Paket tersimpan") : "Gagal menyimpan", ok ? "ok" : "err");
    if (ok) {
      dlg.value = null;
      loadPaket();
    }
  } catch (e) {}
}
</script>

<template>
  <section>
    <div class="card">
      <div class="ch">
        <div>
          <h2>Harga &amp; isi paket</h2>
          <p class="hint">Klik Edit untuk mengubah harga, tagline, badge, dan isi paket.</p>
        </div>
        <button class="btn sm" @click="openNew"><AdminIcon name="plus" :size="15" />Tambah paket</button>
      </div>
      <div class="wrap">
        <table class="rt">
          <thead>
            <tr><th>Paket</th><th>Harga</th><th>Badge</th><th>Fitur</th><th>Status</th><th></th></tr>
          </thead>
          <tbody>
            <tr v-if="!paketLoaded">
              <td colspan="6" class="nl"><div class="sk"></div><div class="sk"></div></td>
            </tr>
            <template v-else>
              <tr v-for="p in paket" :key="p.key">
                <td data-label="Paket"><b>{{ p.nama }}</b><br /><small class="mono">{{ p.key }}</small></td>
                <td data-label="Harga"><b>{{ rp(p.harga) }}</b></td>
                <td data-label="Badge"><span v-if="p.badge" class="pill gold">{{ p.badge }}</span><span v-else class="mu">-</span></td>
                <td data-label="Fitur"><small>{{ (p.fitur || []).filter((f) => f.on !== false).length }} aktif dari {{ (p.fitur || []).length }}</small></td>
                <td data-label="Status"><span class="pill">{{ p.aktif ? "Tampil" : "Disembunyikan" }}</span></td>
                <td class="act"><button class="btn sec sm" @click="openEdit(p)"><AdminIcon name="edit" :size="15" />Edit</button></td>
              </tr>
              <tr v-if="!paket.length">
                <td colspan="6" class="nl"><div class="empty"><AdminIcon name="card" /><b>Belum ada paket</b><span></span></div></td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>

    <AdminDialog v-if="dlg" :title="isNew ? 'Tambah paket baru' : 'Edit paket ' + dlg.nama" wide @close="dlg = null">
      <div class="grid2">
        <div><label for="pk-nama">Nama paket</label><input id="pk-nama" v-model="dlg.nama" :placeholder="isNew ? 'Gold' : ''" /></div>
        <div><label for="pk-harga">Harga (Rp)</label><input id="pk-harga" v-model="dlg.harga" type="number" min="0" /></div>
        <div><label for="pk-tag">Tagline</label><input id="pk-tag" v-model="dlg.tagline" /></div>
        <div><label for="pk-badge">Badge (opsional)</label><input id="pk-badge" v-model="dlg.badge" placeholder="TERLARIS" /></div>
        <div>
          <label for="pk-aktif">Status</label>
          <select id="pk-aktif" v-model="dlg.aktif">
            <option :value="true">Tampil</option>
            <option :value="false">Sembunyikan</option>
          </select>
        </div>
      </div>
      <template v-if="isNew">
        <label for="pk-key">Kode paket</label>
        <input id="pk-key" v-model="dlg.key" placeholder="gold" @input="dlg.keyTouched = true" />
        <p class="note">Dipakai di link checkout (/checkout?paket={{ dlg.key || "kode" }}). Huruf kecil, angka, atau tanda -. Tidak bisa diubah setelah dibuat.</p>
      </template>
      <label for="pk-fitur">Isi paket (satu per baris)</label>
      <textarea id="pk-fitur" v-model="dlg.fitur" rows="7"></textarea>
      <p class="note">Awali baris dengan tanda - untuk fitur yang tidak termasuk.</p>
      <ul class="feat">
        <li v-for="(f, i) in preview" :key="i" :class="f.on ? 'on' : 'off'"><AdminIcon :name="f.on ? 'check' : 'x'" /><span>{{ f.t }}</span></li>
      </ul>
      <template #footer>
        <button class="btn sec" @click="dlg = null">Batal</button>
        <button class="btn" @click="save">{{ isNew ? "Tambah paket" : "Simpan paket" }}</button>
      </template>
    </AdminDialog>
  </section>
</template>