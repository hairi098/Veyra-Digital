<script>
// jumlah dialog yang terbuka, supaya scroll body baru dilepas setelah dialog terakhir tertutup
let opened = 0;
</script>

<script setup>
// Dialog umum dashboard. Pakai dengan v-if: dialog terbuka selama komponen ini dirender.
defineProps({
  title: { type: String, default: "" },
  wide: { type: Boolean, default: false },
  closable: { type: Boolean, default: true },
});
const emit = defineEmits(["close"]);
const onKey = (e) => e.key === "Escape" && emit("close");
onMounted(() => {
  opened++;
  document.body.classList.add("mo");
  window.addEventListener("keydown", onKey);
});
onBeforeUnmount(() => {
  if (--opened <= 0) {
    opened = 0;
    document.body.classList.remove("mo");
  }
  window.removeEventListener("keydown", onKey);
});
</script>

<template>
  <div class="md">
    <div class="mbg" @click="emit('close')"></div>
    <div class="dg" :class="{ lg: wide }" role="dialog" aria-modal="true">
      <div class="dh">
        <b>{{ title }}</b>
        <button v-if="closable" class="ib" aria-label="Tutup" @click="emit('close')"><AdminIcon name="x" /></button>
      </div>
      <div class="db"><slot /></div>
      <div class="df"><slot name="footer" /></div>
    </div>
  </div>
</template>
