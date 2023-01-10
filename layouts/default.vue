<script lang="ts" setup></script>

<template>
  <Body class="bg-black">
    <header class="border-red-600 border-b-2">
      <section
        id="inner-header"
        class="flex flex-row content-center space-x-16"
      >
        <article class="flex content-center justify-center">
          <NuxtLink to="/">
            <h1 class="text-red-600 text-3xl">Traveller Tools</h1>
          </NuxtLink>
        </article>
        <article class="flex content-center justify-center flex-col">
          <NuxtLink to="/about">
            <h1 class="text-red-600 text-xl">About</h1>
          </NuxtLink>
        </article>
      </section>
    </header>
    <div id="layout-center">
      <slot />
    </div>
  </Body>
</template>

<style scoped>
#layout-center {
  margin: 0 2rem;
}

#inner-header {
  margin: 1rem 2rem;
}
</style>
