<script lang="ts" setup>
interface System {
  name: string
  id: string
}

interface Model {
  name: string
  stars: string[]
  worlds: string[]
}

const supabase = useSupabaseClient()
const response = await supabase.from('systems').select('name, id')
const systems: System[] = response.data!

let selectedSystem = 'Regina'
const systemModel: Model = {
  name: selectedSystem,
  stars: [],
  worlds: [],
}

const updateSystem = async () => {
  const response = await supabase
    .from('systems')
    .select('name, id')
    .eq('name', selectedSystem)
    .single()

  if (response.error) return

  const data = response.data!
  const model: Model = {
    name: data.name,
    stars: [],
    worlds: [],
  }

  selectedSystem = model.name
  Object.assign(systemModel, model)
}
updateSystem()
</script>

<template>
  <ClientOnly>
    <main>
      <header>
        <h2>System Visualizer</h2>
      </header>
      <form class="flex flex-col align-baseline" @submit="updateSystem">
        <label for="system">System</label>
        <select id="system" v-model="selectedSystem">
          <option
            v-for="system in systems"
            :key="system.name"
            :value="system.name"
          >
            {{ system.name }}
          </option>
        </select>
        <button>Update</button>
      </form>
      <article class="flex content-center align-center">
        <h3>{{ systemModel.name }}</h3>
        <svg
          style="display: block; margin: auto"
          viewBox="-128 -128 256 256"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="0" cy="0" r="16" stroke="none" fill="yellow" />
        </svg>
      </article>
    </main>
  </ClientOnly>
</template>

<style scoped>
svg {
  display: block;
  margin: auto;
}
button,
select {
  @apply border-red-600 border-2 p-2 bg-black rounded;
}

h2 {
  @apply text-red-600 text-2xl;
}

h3 {
  @apply text-red-600 text-xl;
}
</style>
