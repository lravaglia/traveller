<script lang="ts" setup>
type StarType = 'O' | 'B' | 'A' | 'F' | 'G' | 'K' | 'M'
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
const starColors = new Map<StarType, string>([
  ['O', 'white'],
  ['B', 'blue'],
  ['A', 'blue'],
  ['F', 'yellow'],
  ['G', 'yellow'],
  ['K', 'orange'],
  ['M', 'red'],
])
const systemModel: System = {
  id: '',
  name: '',
  stars: [],
  worlds: 0,
}

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
    <ClientOnly>
      <article class="flex content-center align-center">
        <h3>{{ systemModel.name }}</h3>
        <svg
          style="display: block; margin: auto"
          viewBox="-128 -128 256 256"
          xmlns="http://www.w3.org/2000/svg"
        >
          <template v-for="star in systemModel.stars" :key="star">
            <!-- star -->
            <circle
              cx="0"
              cy="0"
              r="16"
              stroke="none"
              :fill="starColors.get(star.less.type)"
            />
          </template>
          <template v-for="world in systemModel.worlds" :key="world">
            <!-- planet -->
            <circle cx="0" cy="0" r="8" stroke="none" fill="blue" />
            <!-- orbit -->
            <circle cx="0" cy="0" r="4" stroke="black" fill="none" />
          </template>
        </svg>
      </article>
    </ClientOnly>
  </main>
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
