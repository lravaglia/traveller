<script lang="ts" setup>
const props = defineProps<{ link: string; name: string }>()
</script>

<template>
  <article>
    <NuxtLink :to="props.link">
      <h1>{{ props.name }}</h1>
    </NuxtLink>
  </article>
</template>

<style scoped>
article {
  @apply flex content-center justify-center flex-col;
}

h1 {
  @apply text-red-600 text-xl;
}
</style>
