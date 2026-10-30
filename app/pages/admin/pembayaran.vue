<script setup>
definePageMeta({
  layout: "admin-app",
  title: "Pembayaran",
  sub: "QRIS, bank, dan e-wallet untuk checkout",
});
const { form, loadSettings, saveSettings } = useAdmin();

onMounted(() => loadSettings());

/* ---- QRIS ---- */
async function onQris(e) {
  const f = e.target.files[0];
  if (!f) return;
  form.value.qris = await shrinkImg(f, 560, "image/jpeg");
  e.target.value = "";
}

/* ---- bank / e-wallet ---- */
const addPay = () => form.value.pay.push({ type: "bank", name: "", no: "", an: "", logo: "" });
const delPay = (i) => form.value.pay.splice(i, 1);
async function onLogo(e, p) {
  const f = e.target.files[0];
  if (f) p.logo = await shrinkImg(f, 96, "image/png");
}

/* ---- skema pembayaran ---- */
const t = computed(() => form.value.terms);
</script>

<template>
  <section>
    <div class="bl" style="grid-template-columns: 1fr; max-width: 720px">
      <div class="card">
        <h2>Pembayaran</h2>
        <p class="hint">Metode yang dipilih pelanggan di halaman checkout.</p>

        <label>Pembayaran QRIS</label>
        <img v-if="form.qris" class="qprev" :src="form.qris" alt="QRIS" />
        <input type="file" accept="image/*" aria-label="Upload QRIS" @change="onQris" />
        <button v-if="form.qris" type="button" class="btn sec sm" style="margin-top: 8px" @click="form.qris = ''">Hapus QRIS</button>
        <p class="note">Upload foto QRIS. Kalau kosong, QRIS tidak tampil di checkout.</p>

        <label>Bank / E-Wallet</label>
        <div>
          <div v-for="(p, i) in form.pay" :key="i" class="payitem">
            <div class="payrow">
              <select v-model="p.type" aria-label="Jenis">
                <option value="bank">Bank</option>
                <option value="ewallet">E-Wallet</option>
              </select>
              <input v-model="p.name" placeholder="Nama (BCA, DANA, ...)" aria-label="Nama" />
              <input v-model="p.no" placeholder="Nomor rekening / HP" inputmode="numeric" aria-label="Nomor" />
              <button type="button" class="ib r" aria-label="Hapus" @click="delPay(i)"><AdminIcon name="trash" /></button>
              <input v-model="p.an" class="pfull" placeholder="Atas nama" aria-label="Atas nama" />
              <div class="plogo">
                <img v-if="p.logo" :src="p.logo" alt="" />
                <input type="file" accept="image/*" aria-label="Logo" @change="onLogo($event, p)" />
              </div>
            </div>
          </div>
          <p v-if="!form.pay.length" class="note">Belum ada bank / e-wallet.</p>
        </div>
        <button type="button" class="btn sec sm" @click="addPay"><AdminIcon name="plus" />Tambah bank / e-wallet</button>
        <p class="note">
          Isi nama, nomor, atas nama, dan upload logo. Pelanggan memilih metode di checkout, dan detailnya ikut masuk pesan
          WhatsApp lewat variabel {metode}.
        </p>

        <label>Skema pembayaran</label>
        <p class="note" style="margin: 0 0 8px">
          Pilih skema yang boleh dipilih pelanggan di checkout. Kalau hanya satu yang aktif, pelanggan tidak perlu memilih.
        </p>
        <div style="display: flex; gap: 12px; align-items: flex-start; padding: 8px 0">
          <label class="sw" style="margin: 0"><input v-model="t.full" type="checkbox" aria-label="Bayar penuh" /><i></i></label>
          <div>
            <b>Bayar penuh</b>
            <p class="note" style="margin: 2px 0 0">Pelanggan melunasi seluruh total saat memesan.</p>
          </div>
        </div>
        <div style="display: flex; gap: 12px; align-items: flex-start; padding: 8px 0">
          <label class="sw" style="margin: 0"><input v-model="t.dp" type="checkbox" aria-label="DP" /><i></i></label>
          <div style="flex: 1">
            <b>DP (bayar sebagian)</b>
            <p class="note" style="margin: 2px 0 0">Sisanya dilunasi sesuai kesepakatan.</p>
            <div v-if="t.dp" style="display: flex; gap: 8px; margin-top: 8px; max-width: 360px">
              <select v-model="t.dp_mode" aria-label="Jenis DP">
                <option value="percent">Persen (%)</option>
                <option value="nominal">Nominal (Rp)</option>
              </select>
              <input v-model="t.dp_value" type="number" min="1" inputmode="numeric" :placeholder="t.dp_mode === 'percent' ? '50' : '100000'" aria-label="Nilai DP" />
            </div>
          </div>
        </div>
        <div style="display: flex; gap: 12px; align-items: flex-start; padding: 8px 0">
          <label class="sw" style="margin: 0"><input v-model="t.later" type="checkbox" aria-label="Bayar setelah jadi" /><i></i></label>
          <div>
            <b>Bayar setelah jadi</b>
            <p class="note" style="margin: 2px 0 0">Tidak ada pembayaran di muka; pelanggan bayar setelah undangan selesai.</p>
          </div>
        </div>

        <label for="bayar-note" style="margin-top: 14px">Catatan di halaman checkout</label>
        <textarea id="bayar-note" v-model="t.note" rows="3" placeholder="Contoh: DP tidak dapat dikembalikan. Undangan mulai dikerjakan setelah DP diterima."></textarea>
        <p class="note">
          Opsional. Tampil sebagai kotak catatan di checkout. Skema yang dipilih ikut masuk pesan WhatsApp lewat variabel {skema}.
        </p>
        <div class="df" style="padding: 18px 0 0; border: 0; background: 0; justify-content: flex-start">
          <button class="btn" @click="saveSettings"><AdminIcon name="check" />Simpan pengaturan</button>
        </div>
      </div>
    </div>
  </section>
</template>
