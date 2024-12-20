export interface EventData {
  name: string
  description: string
  date: Date
  location: string
  isSectorized: boolean
}

export interface Lot {
  name: string
  price: number
  quantity: number
}

export interface Sector {
  name: string
  lots: Lot[]
}
