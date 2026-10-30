<script setup>
definePageMeta({
  layout: "admin-app",
  title: "Pesanan",
  sub: "Catatan pesanan masuk. Tandai yang sudah bayar dan sudah dikirim ke admin",
  refresh: true,
});
const { orders, ordersLoaded, setOrder } = useAdmin();
const { toast, ask } = useAdminUi();

const status = ref(""); // filter status ("" = semua)
const q = ref("");
const periode = ref(0);
const limit = ref(20);
const curId = ref(null); // pesanan yang detailnya sedang dibuka
const searchEl = ref(null);

/* ---- penyaringan ---- */
const base = computed(() => {
  const days = +periode.value;
  const term = q.value.trim().toLowerCase();
  const start = days ? new Date(new Date().setHours(0, 0, 0, 0) - (days - 1) * 864e5) : null;
  return orders.value.filter(
    (o) =>
      (!start || new Date(o.created_at) >= start) &&
      (!term || [o.nama, o.invoice, o.kontak].join(" ").toLowerCase().indexOf(term) > -1),
  );
});
const list = computed(() => base.value.filter((o) => !status.value || o.status === status.value));
const visible = computed(() => list.value.slice(0, limit.value));
const by = computed(() => {
  const r = { baru: 0, diproses: 0, selesai: 0, batal: 0 };
  base.value.forEach((o) => (r[o.status] = (r[o.status] || 0) + 1));
  return r;
});
const paid = computed(() =>
  base.value.filter((o) => o.status === "diproses" || o.status === "selesai").reduce((s, o) => s + o.total, 0),
);
const chips = computed(() => [
  ["", "Semua", base.value.length],
  ...STATUS_LIST.map((s) => [s, STATUS_LABEL[s], by.value[s]]),
]);
watch([q, periode], () => (limit.value = 20));
function pickStatus(s) {
  status.value = s;
  limit.value = 20;
}

/* ---- aksi ---- */
const cur = computed(() => orders.value.find((o) => o.id === curId.value) || null);
const copy = (t) => navigator.clipboard && navigator.clipboard.writeText(t).then(() => toast("Tersalin: " + t));
function copyData(o) {
  if (!navigator.clipboard) return;
  navigator.clipboard.writeText(dataText(o)).then(() => toast("Data pesanan tersalin"));
}
function onRow(e, o) {
  if (!e.target.closest("select,a,button")) curId.value = o.id;
}
async function remove(id) {
  const yes = await ask("Hapus pesanan?", "Pesanan ini akan dihapus permanen dan tidak bisa dikembalikan.", "Hapus");
  if (yes && (await setOrder(id, "hapus"))) curId.value = null;
}
function exportCSV() {
  downloadOrdersCsv(list.value);
  toast("Laporan diunduh");
}

/* tekan "/" untuk fokus ke kolom cari */
function onKey(e) {
  if (e.key === "/" && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) {
    e.preventDefault();
    searchEl.value && searchEl.value.focus();
  }
}
onMounted(() => window.addEventListener("keydown", onKey));
onBeforeUnmount(() => window.removeEventListener("keydown", onKey));
</script>

<template>
  <section>
    <div class="stats">
      <div class="stat hero"><span>Total pesanan sudah bayar</span><b>{{ rp(paid) }}</b></div>
      <div class="stat" :class="{ hot: by.baru }"><span>Belum bayar</span><b>{{ by.baru }}</b></div>
      <div class="stat"><span>Sudah bayar</span><b>{{ by.diproses }}</b></div>
      <div class="stat"><span>Sudah dikirim</span><b>{{ by.selesai }}</b></div>
    </div>

    <div class="card">
      <div class="row">
        <div class="search">
          <span><AdminIcon name="search" /></span>
          <input ref="searchEl" v-model="q" placeholder="Cari nama, invoice, atau kontak   ( tekan / )" />
        </div>
        <select v-model.number="periode" aria-label="Periode">
          <option :value="0">Semua waktu</option>
          <option :value="1">Hari ini</option>
          <option :value="7">7 hari terakhir</option>
          <option :value="30">30 hari terakhir</option>
        </select>
        <button class="btn sec" @click="exportCSV"><AdminIcon name="dl" />Export CSV</button>
      </div>

      <div class="chips">
        <button v-for="c in chips" :key="c[0]" class="chip" :class="{ on: status === c[0] }" @click="pickStatus(c[0])">
          {{ c[1] }}<em>{{ c[2] }}</em>
        </button>
      </div>

      <div class="wrap">
        <table class="rt">
          <thead>
            <tr><th>Pemesan</th><th>Pesanan</th><th>Total</th><th>Status</th><th></th></tr>
          </thead>
          <tbody class="adm-orders">
            <tr v-if="!ordersLoaded">
              <td colspan="5" class="nl"><div class="sk"></div><div class="sk"></div><div class="sk"></div></td>
            </tr>
            <template v-else>
              <tr v-for="o in visible" :key="o.id" @click="onRow($event, o)">
                <td data-label="Pemesan">
                  <div class="cu">
                    <span class="av">{{ (o.nama || "?").charAt(0).toUpperCase() }}</span>
                    <div><b>{{ o.nama }}</b><br /><small>{{ o.kontak }}</small></div>
                  </div>
                </td>
                <td data-label="Pesanan">
                  <div>
                    {{ o.tema }}<br /><small>{{ o.paket }} · {{ o.acara }}</small><br />
                    <small :title="fdt(o.created_at)">{{ o.invoice }} · {{ ago(o.created_at) }}{{ o.promo_kode ? " · promo " + o.promo_kode : "" }}</small>
                  </div>
                </td>
                <td data-label="Total"><b>{{ rp(o.total) }}</b></td>
                <td data-label="Status">
                  <select :class="'s-' + o.status" :value="o.status" aria-label="Ubah status" @change="setOrder(o.id, $event.target.value)">
                    <option v-for="s in STATUS_LIST" :key="s" :value="s">{{ STATUS_LABEL[s] }}</option>
                  </select>
                </td>
                <td class="act">
                  <button class="ib" aria-label="Lihat detail" title="Detail" @click="curId = o.id"><AdminIcon name="eye" /></button>
                  <button class="ib" aria-label="Salin data untuk admin" title="Salin data untuk admin" @click="copyData(o)"><AdminIcon name="copy" /></button>
                  <a v-if="waNum(o.kontak)" class="ib g" target="_blank" rel="noopener" :href="`https://wa.me/${waNum(o.kontak)}?text=${encodeURIComponent(waMsg(o))}`" aria-label="Chat WhatsApp" title="Chat WhatsApp"><AdminIcon name="wa" /></a>
                  <button class="ib r" aria-label="Hapus" title="Hapus" @click="remove(o.id)"><AdminIcon name="trash" /></button>
                </td>
              </tr>
              <tr v-if="!visible.length">
                <td colspan="5" class="nl">
                  <div v-if="orders.length" class="empty"><AdminIcon name="search" /><b>Tidak ada pesanan yang cocok</b><span>Coba ubah kata kunci, periode, atau status.</span></div>
                  <div v-else class="empty"><AdminIcon name="inbox" /><b>Belum ada pesanan</b><span>Pesanan dari website akan muncul di sini.</span></div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>

      <div v-if="list.length > limit" class="more">
        <button class="btn sec" @click="limit += 20">Tampilkan lebih banyak ({{ list.length - limit }} lagi)</button>
      </div>
    </div>

    <!-- detail pesanan -->
    <AdminDialog v-if="cur" title="Detail pesanan" @close="curId = null">
      <div class="kv">
        <span>Invoice</span>
        <b><span class="code" title="Salin" @click="copy(cur.invoice)">{{ cur.invoice }} <AdminIcon name="copy" :size="13" /></span></b>
      </div>
      <div class="kv"><span>Tanggal</span><b>{{ fdt(cur.created_at) }}</b></div>
      <div class="kv"><span>Pemesan</span><b>{{ cur.nama }}</b></div>
      <div class="kv"><span>Kontak</span><b>{{ cur.kontak }}</b></div>
      <div class="kv"><span>Acara</span><b>{{ cur.acara }}</b></div>
      <div class="kv"><span>Tema</span><b>{{ cur.tema }}</b></div>
      <div class="kv"><span>Paket</span><b>{{ cur.paket }}</b></div>
      <div class="kv"><span>Harga</span><b>{{ rp(cur.harga) }}</b></div>
      <div v-if="cur.promo_kode" class="kv"><span>Promo</span><b>{{ cur.promo_kode }} (−{{ rp(cur.diskon) }})</b></div>
      <div class="kv"><span>Kode unik</span><b>{{ rp(cur.kode_unik) }}</b></div>
      <div class="kv t"><span>Total bayar</span><b>{{ rp(cur.total) }}</b></div>
      <label>Ubah status</label>
      <div class="seg">
        <button v-for="s in STATUS_LIST" :key="s" :class="{ on: s === cur.status }" @click="setOrder(cur.id, s)">{{ STATUS_LABEL[s] }}</button>
      </div>
      <template #footer>
        <button class="btn" @click="copyData(cur)"><AdminIcon name="copy" />Salin data untuk admin</button>
        <a v-if="waNum(cur.kontak)" class="btn wa" target="_blank" rel="noopener" :href="`https://wa.me/${waNum(cur.kontak)}?text=${encodeURIComponent(waMsg(cur))}`"><AdminIcon name="wa" />Chat WhatsApp</a>
        <button class="btn sec" @click="curId = null">Tutup</button>
      </template>
    </AdminDialog>
  </section>
</template>
