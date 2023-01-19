<script lang="ts" setup>
const props = defineProps<{ link: string; name: string }>()
</script>

<template>
  <NuxtLink :to="props.link">
    <span>
      {{ props.name }}
    </span>
  </NuxtLink>
</template>

<style scoped>
span {
  color: red;
  font-size: 1.5rem;
}
</style>
