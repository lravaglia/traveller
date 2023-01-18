export type StarType = 'O' | 'B' | 'A' | 'F' | 'G' | 'K' | 'M' | 'BD'
export type SpectralType = 'Ia' | 'Ib' | 'II' | 'III' | 'IV' | 'V' | 'VI' | 'D'

export type Detail<L extends {}, M extends {}> = L | (L & M)
export type DetailPrime<L extends {}, M extends {}> = L & Partial<M>

export interface StarLess {
  type: StarType
}

export interface StarMore {
  decimal: number
  spectral: SpectralType
}

export type Star = Detail<StarLess, StarMore>
export const newStar = ({
  type,
  decimal,
  spectral,
}: DetailPrime<StarLess, StarMore>) =>
  decimal && spectral
    ? {
        type,
        decimal,
        spectral,
      }
    : { type }
