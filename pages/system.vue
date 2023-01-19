<script lang="ts" setup>
import { Star, newStar } from '~/src/star'
import type { System, SystemId } from '~/src/system'

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

  if (response.error || starsResponse.error) return

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
    <form>
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
form {
  display: flex;
  flex-direction: column;
}

button,
select {
  border: solid red;
  border-radius: 0.25rem;
  margin: 0.25rem;
  padding: 0.25rem;
  text-align: center;
}

h2 {
  color: red;
  font-size: 1.5rem;
}

h3 {
  color: red;
  font-size: 2rem;
}
</style>
