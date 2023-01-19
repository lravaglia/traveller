<script lang="ts" setup>
import { System } from '~/src/system'
const props = defineProps<{
  systemModel: System
}>()

let orbitNumber = 0

onBeforeUpdate(() => {
  // prevents orbits from escaping the view port after not being reset.
  orbitNumber = 0
})

const orbit = () => 8 * orbitNumber++
</script>

<template>
  <div>
    <svg
      viewBox="-128 -128 256 256"
      xmlns="http://www.w3.org/2000/svg"
      class="bodies"
    >
      <template v-for="star in props.systemModel.stars" :key="star">
        <Star
          v-if="orbitNumber % 2 == 0"
          :cx="0"
          :cy="orbit()"
          :type="star.type"
        />
        <Star v-else :cy="0" :cx="8 * orbitNumber++" :type="star.type" />
      </template>
      <template v-for="_world in props.systemModel.worlds" :key="_world">
        <World v-if="orbitNumber % 2 == 0" :cx="0" :cy="orbit()" />
        <World v-else :cy="0" :cx="orbit()" />
      </template>
    </svg>
    <svg
      viewBox="-128 -128 256 256"
      xmlns="http://www.w3.org/2000/svg"
      class="orbits"
    >
      <template v-for="o in orbitNumber" :key="o">
        <circle
          cx="0"
          cy="0"
          :r="8 * (o - 1)"
          stroke="white"
          fill="none"
          stroke-width="0.25"
        />
      </template>
    </svg>
  </div>
</template>

<style scoped>
div {
  width: 24rem;
  height: 24rem;
}

svg {
  margin: auto;
  position: absolute;
}

.orbits {
  z-index: 10;
}

.bodies {
  z-index: 20;
}
</style>
