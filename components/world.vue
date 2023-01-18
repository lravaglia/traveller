<script lang="ts" setup>
const props = defineProps<{
  cx: number
  cy: number
}>()
</script>

<template>
  <circle :cx="cx" :cy="cy" r="1" stroke="none" fill="green" />
</template>

<style scoped></style>
