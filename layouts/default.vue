<script lang="ts" setup></script>

<template>
  <Body class="bg-black">
    <header class="border-red-600 border-b-2">
      <section
        id="inner-header"
        class="flex flex-row content-center space-x-16"
      >
        <Hero />
        <HeadItem link="/about" name="About" />
        <HeadItem link="/system" name="System" />
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
