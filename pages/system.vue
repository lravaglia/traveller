<script lang="ts" setup>
const supabase = useSupabaseClient()
const systems = [{ name: 'Regina' }] as const
const selectedSystem = 'Regina'
const systemModel = {
  name: selectedSystem,
  stars: [],
  worlds: [],
}

interface System {
  name: string
  id: string
}
const updateSystem = async () => {
  const response = await supabase
    .from('systems')
    .select('*')
    .eq('name', selectedSystem)
    .single()

  if (response.error) {
    console.error(response.error)
  }

  const system: System = response.data!
  systemModel.name = system.name
}
updateSystem()
</script>

<template>
  <ClientOnly>
    <main>
      <header>
        <h2 class="text-red-600 text-2xl">System Visualizer</h2>
      </header>
      <form class="flex flex-col align-baseline">
        <label for="system">System</label>
        <select
          id="system"
          v-model="selectedSystem"
          class="border-red-600 border-2 p-2 bg-black rounded"
        >
          <option
            v-for="system in systems"
            :key="system.name"
            :value="system.name"
          >
            {{ system.name }}
          </option>
        </select>
        <button
          type="submit"
          class="border-red-600 border-2 p-2 bg-black rounded"
          @click="updateSystem"
        >
          Update
        </button>
      </form>
      <article class="flex content-center align-center">
        <header>
          <h3 class="text-red-600 text-xl">{{ systemModel.name }}</h3>
        </header>
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

<style scoped></style>
