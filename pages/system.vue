<script lang="ts" setup>
import { Star, newStar } from '~/src/star'
interface SystemId {
  id: string
  name: string
}

interface System extends SystemId {
  stars: Star[]
  worlds: number
}

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
let orbitNumber = 0

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

  orbitNumber = 0
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
      <div class="w-96 h-96">
        <svg
          viewBox="-128 -128 256 256"
          xmlns="http://www.w3.org/2000/svg"
          class="z-20"
        >
          <template v-for="star in systemModel.stars" :key="star">
            <Star
              v-if="orbitNumber % 2 == 0"
              cx="0"
              :cy="8 * orbitNumber++"
              :type="star.type"
            />
            <Star v-else cy="0" :cx="8 * orbitNumber++" :fill="star.type" />
          </template>
          <template v-for="world in systemModel.worlds" :key="world">
            <World v-if="orbitNumber % 2 == 0" cx="0" :cy="8 * orbitNumber++" />
            <World v-else cy="0" :cx="8 * orbitNumber++" />
          </template>
        </svg>
        <svg
          viewBox="-128 -128 256 256"
          xmlns="http://www.w3.org/2000/svg"
          class="z-10"
        >
          <template v-for="o in orbitNumber" :key="o">
            <circle
              cx="0"
              cy="0"
              :r="8 * (o - 1)"
              stroke="white"
              fill="none"
              stroke-width="0.25"
            />
          </template>
        </svg>
      </div>
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
