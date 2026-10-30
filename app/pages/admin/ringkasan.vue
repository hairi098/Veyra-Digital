<script setup>
definePageMeta({
  layout: "admin-app",
  title: "Ringkasan",
  sub: "Total penjualan dan pesanan yang belum dibayar",
});
const { orders } = useAdmin();

const ana = computed(() => {
  const all = orders.value;
  const live = all.filter((o) => o.status !== "batal");
  const sel = all.filter((o) => o.status === "diproses" || o.status === "selesai");
  const omzet = sel.reduce((s, o) => s + o.total, 0);
  const pot = all.filter((o) => o.status === "baru").reduce((s, o) => s + o.total, 0);
  const rate = all.length ? Math.round((sel.length / all.length) * 100) : 0;

  // nilai pesanan 14 hari terakhir
  const days = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - i);
    days.push({ d, n: 0, v: 0 });
  }
  live.forEach((o) => {
    const t = new Date(o.created_at);
    t.setHours(0, 0, 0, 0);
    const x = days.find((y) => +y.d === +t);
    if (x) {
      x.n++;
      x.v += o.total;
    }
  });
  const mx = Math.max(1, ...days.map((x) => x.v));

  // peringkat tema / paket
  const rank = (k) => {
    const m = {};
    live.forEach((o) => (m[o[k]] = (m[o[k]] || 0) + 1));
    const r = Object.entries(m).sort((x, y) => y[1] - x[1]).slice(0, 5);
    const top = r.length ? r[0][1] : 1;
    return r.map(([n, c]) => ({ n, c, w: (c / top) * 100 }));
  };

  // belum bayar lebih dari 1 hari
  const fu = all.filter((o) => o.status === "baru" && Date.now() - new Date(o.created_at) > 864e5).slice(0, 8);

  // pelanggan dengan lebih dari satu pesanan
  const cm = {};
  live.forEach((o) => {
    const k = waNum(o.kontak) || String(o.kontak).toLowerCase();
    (cm[k] = cm[k] || { nama: o.nama, n: 0, v: 0 }).n++;
    cm[k].v += o.total;
  });
  const rep = Object.values(cm).filter((c) => c.n > 1).sort((x, y) => y.n - x.n).slice(0, 6);

  return {
    omzet, pot, rate, rata: sel.length ? Math.round(omzet / sel.length) : 0,
    days: days.map((x) => ({
      ...x,
      h: Math.round((x.v / mx) * 100),
      tip: `${x.d.toLocaleDateString("id-ID", { day: "numeric", month: "short" })}: ${x.n} pesanan, ${rp(x.v)}`,
    })),
    tema: rank("tema"),
    paket: rank("paket"),
    fu, rep,
  };
});
</script>

<template>
  <section>
    <div class="stats">
      <div class="stat hero"><span>Total pesanan sudah bayar</span><b>{{ rp(ana.omzet) }}</b></div>
      <div class="stat"><span>Belum dibayar</span><b>{{ rp(ana.pot) }}</b></div>
      <div class="stat"><span>Rata-rata / pesanan</span><b>{{ rp(ana.rata) }}</b></div>
      <div class="stat"><span>Tingkat bayar</span><b>{{ ana.rate }}%</b></div>
    </div>

    <div class="card">
      <div class="ch">
        <div>
          <h2>Nilai pesanan 14 hari terakhir</h2>
          <p class="hint">Tidak termasuk pesanan batal.</p>
        </div>
      </div>
      <div class="bars">
        <div v-for="x in ana.days" :key="+x.d" class="bc" :title="x.tip">
          <div class="bt"><i :style="{ height: x.h + '%' }"></i></div>
          <small>{{ x.d.getDate() }}</small>
        </div>
      </div>
    </div>

    <div class="two">
      <div class="card">
        <h2>Tema terlaris</h2>
        <div style="margin-top: 14px">
          <div v-for="r in ana.tema" :key="r.n" class="rk"><span>{{ r.n }}</span><b>{{ r.c }}</b><div class="bar"><i :style="{ width: r.w + '%' }"></i></div></div>
          <p v-if="!ana.tema.length" class="note">Belum ada data.</p>
        </div>
      </div>
      <div class="card">
        <h2>Paket terlaris</h2>
        <div style="margin-top: 14px">
          <div v-for="r in ana.paket" :key="r.n" class="rk"><span>{{ r.n }}</span><b>{{ r.c }}</b><div class="bar"><i :style="{ width: r.w + '%' }"></i></div></div>
          <p v-if="!ana.paket.length" class="note">Belum ada data.</p>
        </div>
      </div>
    </div>

    <div class="two" style="margin-top: 18px">
      <div class="card">
        <h2>Perlu follow-up</h2>
        <p class="hint">Pesanan yang belum bayar lebih dari 1 hari.</p>
        <div style="margin-top: 8px">
          <div v-for="o in ana.fu" :key="o.id" class="kv">
            <span>{{ o.nama }} · {{ o.paket }}<br /><small>{{ STATUS_LABEL[o.status] || o.status }} · {{ ago(o.created_at) }}</small></span>
            <b>
              <a v-if="waNum(o.kontak)" class="ib g" target="_blank" rel="noopener" :href="`https://wa.me/${waNum(o.kontak)}?text=${encodeURIComponent(waMsg(o))}`" aria-label="Chat WhatsApp"><AdminIcon name="wa" /></a>
            </b>
          </div>
          <p v-if="!ana.fu.length" class="note">Tidak ada pesanan yang menggantung.</p>
        </div>
      </div>
      <div class="card">
        <h2>Pelanggan berulang</h2>
        <p class="hint">Pelanggan dengan lebih dari satu pesanan.</p>
        <div style="margin-top: 8px">
          <div v-for="c in ana.rep" :key="c.nama + c.n" class="kv"><span>{{ c.nama }}</span><b>{{ c.n }} pesanan · {{ rp(c.v) }}</b></div>
          <p v-if="!ana.rep.length" class="note">Belum ada pelanggan berulang.</p>
        </div>
      </div>
    </div>
  </section>
</template>
