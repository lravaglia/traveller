<script lang="ts" setup></script>

<template>
  <Body class="bg-black">
    <header class="border-red-600 border-b-2">
      <div id="inner-header" class="flex flex-row">
        <h1 class="text-red-600 text-3xl">Traveller Tools</h1>
      </div>
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
