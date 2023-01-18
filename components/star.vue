<script lang="ts" setup>
import { StarType } from '~/src/star'

const props = defineProps<{ type: StarType; cx: number; cy: number }>()
const starColors: Record<StarType, string> = {
  O: 'white',
  B: 'blue',
  A: 'blue',
  F: 'yellow',
  G: 'yellow',
  K: 'orange',
  M: 'red',
  BD: 'brown',
}
</script>

<template>
  <OrbitalBody
    :r="2"
    :fill="starColors[props.type]"
    :cx="props.cx"
    :cy="props.cy"
  />
</template>

<style scoped></style>
