<script lang="ts" setup>
import { Star, newStar } from '~/src/star'
import { System, SystemId } from '~/src/system'

let selectedSystem = 'Regina'
const supabase = useSupabaseClient()
const systemResponse = await supabase.from('systems').select('name, id')
const systems: SystemId[] = systemResponse.data!
const systemModel: System = reactive({
  id: '',
  name: '',
  stars: [],
  worlds: 0,
})

const updateSystem = async (): Promise<void> => {
  const selectionId = systems.filter((s) => s.name === selectedSystem)[0].id
  const response = await supabase
    .from('systems')
    .select('id, name, worlds')
    .eq('id', selectionId)
    .single()

  const starsResponse = await supabase
    .from('stars')
    .select('type, decimal, spectral')
    .eq('system', selectionId)

  if (response.error) {
    console.error('systemResponse: ', response.error)
  }

  if (starsResponse.error) {
    console.error('starsResponse: ', starsResponse.error)
  }

  if (response.error || starsResponse.error) {
    return
  }

  const stars: Star[] = starsResponse.data!.flatMap(newStar)

  const model: System = {
    ...response.data!,
    stars,
  }

  selectedSystem = model.name
  Object.assign(systemModel, model)
}
updateSystem()
</script>

<template>
  <main>
    <header>
      <h2>System Visualizer</h2>
    </header>
    <form class="flex flex-col align-baseline">
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
      <button type="button" @click="updateSystem">Update</button>
    </form>
    <ClientOnly>
      <System :system-model="systemModel" />
    </ClientOnly>
  </main>
</template>

<style scoped>
svg {
  margin: auto;
  position: absolute;
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
