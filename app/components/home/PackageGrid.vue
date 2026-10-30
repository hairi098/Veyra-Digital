<script setup>
const props = defineProps({ variant: { type: String, default: "home" } });
const { paket } = useSite();
const { choosePaket } = useOrderFlow();
const list = computed(() => (paket.value.length ? paket.value : DEFAULT_PAKET));
const home = computed(() => props.variant === "home");
const price = (p) => Number(p.harga || 0).toLocaleString("id-ID");
</script>

<template>
  <div v-if="home" class="pricing-grid">
    <div v-for="p in list" :key="p.key" class="pricing-card" :class="{ featured: !!p.badge }">
      <div v-if="p.badge" class="badge">{{ p.badge }}</div>
      <h3>{{ p.nama }}</h3>
      <div class="price-wrap"><span class="price-rp">Rp</span><span class="price-num">{{ price(p) }}</span></div>
      <p class="pkg-tagline">{{ p.tagline }}</p>
      <ul class="feat-list">
        <li v-for="(f, i) in p.fitur || []" :key="i" :class="{ 'feat-off': f.on === false }">
          <span class="feat-mark" :class="f.on === false ? 'mark-no' : 'mark-yes'">{{ f.on === false ? "×" : "✓" }}</span>{{ f.t }}
        </li>
      </ul>
      <a :href="'/checkout?paket=' + encodeURIComponent(p.key)" class="btn-pilih-pkg" @click.prevent="choosePaket(p.key)">Selanjutnya &nbsp;&rarr;</a>
    </div>
  </div>

  <div v-else class="paket-grid">
    <div v-for="p in list" :key="p.key" class="paket-card" :class="{ 'paket-featured': !!p.badge }">
      <div v-if="p.badge" class="featured-badge">{{ p.badge }}</div>
      <h3 class="paket-name">{{ p.nama }}</h3>
      <div class="card-price"><span class="price-currency">Rp</span><span class="price-amount">{{ price(p) }}</span></div>
      <p class="paket-tagline">{{ p.tagline }}</p>
      <ul class="paket-feat-list">
        <li v-for="(f, i) in p.fitur || []" :key="i" :class="{ 'feat-disabled': f.on === false }">
          <span :class="f.on === false ? 'feat-mark-no' : 'feat-mark-yes'">{{ f.on === false ? "×" : "✓" }}</span><span>{{ f.t }}</span>
        </li>
      </ul>
      <a :href="'/checkout?paket=' + encodeURIComponent(p.key)" class="btn-pilih-paket" @click.prevent="choosePaket(p.key)">Selanjutnya &nbsp;&rarr;</a>
    </div>
  </div>
</template>
