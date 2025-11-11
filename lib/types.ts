export interface BitcoinPlace {
  id: string
  name: string
  location: string
  description: string
  images: string[]
  category: string
  rating: number
  latitude: number
  longitude: number
  acceptsBitcoin: boolean
  acceptsLightning?: boolean
  acceptsContactless?: boolean
}

export interface Category {
  id: string
  name: string
  icon: string
}

