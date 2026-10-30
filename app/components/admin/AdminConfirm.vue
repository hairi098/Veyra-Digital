<script setup>
// Dialog "Yakin?" global. Dipanggil lewat ask() dari useAdminUi().
const { confirmState, answer } = useAdminUi();
</script>

<template>
  <AdminDialog v-if="confirmState" :title="confirmState.title" :closable="false" @close="answer(false)">
    {{ confirmState.message }}
    <template #footer>
      <button class="btn sec" @click="answer(false)">Batal</button>
      <button class="btn dng" @click="answer(true)">{{ confirmState.ok }}</button>
    </template>
  </AdminDialog>
</template>
