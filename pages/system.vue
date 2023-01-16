<script lang="ts" setup>
type StarType = 'O' | 'B' | 'A' | 'F' | 'G' | 'K' | 'M' | 'BD'
type SpectralType = 'Ia' | 'Ib' | 'II' | 'III' | 'IV' | 'V' | 'VI' | 'D'

type Detail<A extends {}, B extends {}> = {
  less: A
  more?: B
}

type Star = Detail<
  { type: StarType },
  { decimal: number; spectral: SpectralType }
>

interface System {
  id: string
  name: string
  stars: Star[]
  worlds: number
}

interface SystemId {
  id: string
  name: string
}

let selectedSystem = 'Regina'
const supabase = useSupabaseClient()
const systemResponse = await supabase.from('systems').select('name, id')
const systems: SystemId[] = systemResponse.data!
const starColors: Record<StarType, string> = {
  O: 'white',
  B: 'blue',
  A: 'blue',
  F: 'yellow',
  G: 'yellow',
  K: 'orange',
  M: 'red',
  BD: 'brown',
}
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

  const stars: Star[] = starsResponse.data!.flatMap<
    Star,
    {
      type: StarType
      decimal?: number
      spectral?: SpectralType
    }
  >(
    ({ type, decimal, spectral }): Star =>
      decimal && spectral
        ? {
            less: { type },
            more: {
              decimal,
              spectral,
            },
          }
        : { less: { type } }
  )

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
            <template v-if="orbitNumber % 2 == 0">
              <circle
                cx="0"
                :cy="8 * orbitNumber++"
                r="2"
                stroke="none"
                :fill="starColors[star.less.type]"
              />
            </template>
            <template v-else>
              <circle
                cy="0"
                :cx="8 * orbitNumber++"
                r="2"
                stroke="none"
                :fill="starColors[star.less.type]"
              />
            </template>
          </template>
          <template v-for="world in systemModel.worlds" :key="world">
            <template v-if="orbitNumber % 2 == 0">
              <circle
                cx="0"
                :cy="8 * orbitNumber++"
                r="1"
                stroke="none"
                fill="green"
              />
            </template>
            <template v-else>
              <circle
                cy="0"
                :cx="8 * orbitNumber++"
                r="1"
                stroke="none"
                fill="green"
              />
            </template>
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
