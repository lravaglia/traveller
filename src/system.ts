import { Star } from '~/src/star'

export interface SystemId {
  id: string
  name: string
}

export interface System extends SystemId {
  stars: Star[]
  worlds: number
}
