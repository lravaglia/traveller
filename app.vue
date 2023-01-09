<script lang="ts" setup>
import { AppConfigInput } from '@nuxt/schema'

const app = useAppConfig() as AppConfigInput

useHead({
  title: app.name,
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    {
      hid: 'description',
      name: 'description',
      content: 'Traveller Tools',
    },
  ],
  link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
})
</script>

<template>
  <Body class="bg-black m-5">
    <main>
      <h1 class="text-red-700 text-3xl">Traveller</h1>
    </main>
  </Body>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital@0;1&display=swap');
Body {
  font-family: 'Montserrat', sans-serif;
}
</style>
