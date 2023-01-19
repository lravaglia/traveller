<script lang="ts" setup>
import { useBodyAttrs } from '@vueuse/head'

useBodyAttrs({
  style: () => 'background: black',
})
</script>

<template>
  <header>
    <nav>
      <div>
        <HeadItem link="/" name="Traveller Tools" />
      </div>
      <div>
        <HeadItem link="/about" name="About" />
      </div>
      <div>
        <HeadItem link="/system" name="System" />
      </div>
    </nav>
  </header>
  <div id="layout-center">
    <slot />
  </div>
</template>

<style scoped lang="scss">
header {
  border: 0px solid red;
  border-bottom-width: 2px;
}

div {
  margin-right: 2rem;
}

nav {
  display: flex;
  flex-direction: row;
  align-content: center;
  margin: 1rem 2rem;
}

#layout-center {
  margin: 0 2rem;
}
</style>
