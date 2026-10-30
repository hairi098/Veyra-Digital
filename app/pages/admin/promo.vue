<script setup>
definePageMeta({
  layout: "admin-app",
  title: "Promo",
  sub: "Atur kode promo dan kuota pemakaian",
});
const { promos, promosLoaded, loadPromos, adm } = useAdmin();
const { toast, ask } = useAdminUi();

onMounted(loadPromos);

const today = new Date().toISOString().slice(0, 10);
const isExpired = (p) => p.berlaku_sampai && p.berlaku_sampai < today;
const pct = (p) => (p.kuota ? Math.min(100, Math.round((p.terpakai / p.kuota) * 100)) : 0);
const copy = (t) => navigator.clipboard && navigator.clipboard.writeText(t).then(() => toast("Tersalin: " + t));

/* ---- dialog buat / ubah ---- */
const dlg = ref(null); // null = tertutup
const editing = computed(() => !!dlg.value?.edit);
function openNew() {
  dlg.value = { edit: false, kode: "", tipe: "persen", nilai: "", berlaku_sampai: "", kuota: "", aktif: true };
}
function openEdit(p) {
  dlg.value = {
    edit: true,
    kode: p.kode,
    tipe: p.tipe,
    nilai: p.nilai,
    berlaku_sampai: p.berlaku_sampai || "",
    kuota: p.kuota || "",
    aktif: !!p.aktif,
  };
}
async function save() {
  const f = dlg.value;
  const d = {
    kode: String(f.kode).trim().toUpperCase(),
    tipe: f.tipe,
    nilai: String(f.nilai ?? ""),
    aktif: !!f.aktif,
    berlaku_sampai: f.berlaku_sampai || "",
    kuota: String(f.kuota ?? ""),
  };
  if (!d.kode || !d.nilai) return toast("Kode dan besar diskon wajib diisi", "err");
  if (d.tipe === "persen" && (+d.nilai < 1 || +d.nilai > 100)) return toast("Persen harus antara 1 dan 100", "err");
  try {
    await adm("admin_save_promo", { p_data: d });
    toast("Promo tersimpan");
    dlg.value = null;
    loadPromos();
  } catch (e) {}
}

async function toggle(p, on) {
  try {
    await adm("admin_save_promo", {
      p_data: {
        kode: p.kode,
        tipe: p.tipe,
        nilai: String(p.nilai),
        aktif: on,
        berlaku_sampai: p.berlaku_sampai || "",
        kuota: p.kuota ? String(p.kuota) : "",
      },
    });
    toast(on ? "Promo diaktifkan" : "Promo dinonaktifkan");
  } catch (e) {}
  loadPromos();
}

async function remove(p) {
  if (!(await ask("Hapus promo?", "Kode promo ini tidak bisa dipakai lagi setelah dihapus.", "Hapus"))) return;
  try {
    await adm("admin_delete_promo", { p_id: p.id });
    toast("Promo dihapus");
    loadPromos();
  } catch (e) {}
}
</script>

<template>
  <section>
    <div class="card">
      <div class="ch">
        <div>
          <h2>Daftar promo</h2>
          <p class="hint">Kode promo dipakai pelanggan saat memesan di website.</p>
        </div>
        <button class="btn" @click="openNew"><AdminIcon name="plus" />Buat promo</button>
      </div>
      <div class="wrap">
        <table class="rt">
          <thead>
            <tr><th>Kode</th><th>Diskon</th><th>Berlaku s/d</th><th>Terpakai</th><th>Aktif</th><th></th></tr>
          </thead>
          <tbody>
            <tr v-if="!promosLoaded">
              <td colspan="6" class="nl"><div class="sk"></div><div class="sk"></div></td>
            </tr>
            <template v-else>
              <tr v-for="p in promos" :key="p.id">
                <td data-label="Kode"><span class="code" title="Salin kode" @click="copy(p.kode)">{{ p.kode }} <AdminIcon name="copy" :size="13" /></span></td>
                <td data-label="Diskon"><b>{{ p.tipe === "persen" ? p.nilai + "%" : rp(p.nilai) }}</b></td>
                <td data-label="Berlaku s/d">
                  <template v-if="p.berlaku_sampai">{{ p.berlaku_sampai }} <span v-if="isExpired(p)" class="pill gold">Kedaluwarsa</span></template>
                  <span v-else class="mu">Tanpa batas</span>
                </td>
                <td data-label="Terpakai">
                  <div class="usage">
                    <div v-if="p.kuota" class="bar" :class="{ full: pct(p) >= 100 }"><i :style="{ width: pct(p) + '%' }"></i></div>
                    <small>{{ p.terpakai }}{{ p.kuota ? " dari " + p.kuota : " kali" }}</small>
                  </div>
                </td>
                <td data-label="Aktif">
                  <label class="sw" style="margin: 0">
                    <input type="checkbox" class="ptog" aria-label="Aktifkan promo" :checked="p.aktif" @change="toggle(p, $event.target.checked)" /><i></i>
                  </label>
                </td>
                <td class="act">
                  <button class="ib" aria-label="Ubah" title="Ubah" @click="openEdit(p)"><AdminIcon name="edit" /></button>
                  <button class="ib r" aria-label="Hapus" title="Hapus" @click="remove(p)"><AdminIcon name="trash" /></button>
                </td>
              </tr>
              <tr v-if="!promos.length">
                <td colspan="6" class="nl"><div class="empty"><AdminIcon name="tag" /><b>Belum ada promo</b><span>Klik Buat promo untuk membuat kode pertamamu.</span></div></td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>

    <AdminDialog v-if="dlg" :title="editing ? 'Ubah promo ' + dlg.kode : 'Buat promo baru'" @close="dlg = null">
      <div class="grid2">
        <div>
          <label for="promo-kode">Kode promo</label>
          <input id="promo-kode" v-model="dlg.kode" placeholder="HEMAT20" autocapitalize="characters" :readonly="editing" />
        </div>
        <div>
          <label for="promo-tipe">Jenis diskon</label>
          <select id="promo-tipe" v-model="dlg.tipe">
            <option value="persen">Persen (%)</option>
            <option value="nominal">Nominal (Rp)</option>
          </select>
        </div>
        <div>
          <label for="promo-nilai">{{ dlg.tipe === "persen" ? "Besar diskon (%)" : "Besar diskon (Rp)" }}</label>
          <input id="promo-nilai" v-model="dlg.nilai" type="number" min="1" />
        </div>
        <div>
          <label for="promo-exp">Berlaku sampai (opsional)</label>
          <input id="promo-exp" v-model="dlg.berlaku_sampai" type="date" />
        </div>
        <div>
          <label for="promo-kuota">Kuota pemakaian (opsional)</label>
          <input id="promo-kuota" v-model="dlg.kuota" type="number" min="1" placeholder="Tanpa batas" />
        </div>
        <div>
          <label for="promo-aktif">Status</label>
          <select id="promo-aktif" v-model="dlg.aktif">
            <option :value="true">Aktif</option>
            <option :value="false">Nonaktif</option>
          </select>
        </div>
      </div>
      <template #footer>
        <button class="btn sec" @click="dlg = null">Batal</button>
        <button class="btn" @click="save">Simpan promo</button>
      </template>
    </AdminDialog>
  </section>
</template>
