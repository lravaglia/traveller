<script lang="ts" setup>
const props = defineProps<{ r: number; fill: string; cx: number; cy: number }>()
</script>

<template>
  <circle
    :cx="props.cx"
    :cy="props.cy"
    :r="props.r"
    stroke="none"
    :fill="props.fill"
  />
</template>

<style scoped></style>
