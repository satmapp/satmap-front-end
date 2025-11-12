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

export interface Commerce {
  id: number
  name: string
  address: string
  city: string
  country: string
  phone?: string
  website?: string
  category: string
  payment_method: string
  latitude: number
  longitude: number
  photo_url?: string
  verified: boolean
  verification_count: number
  premium: boolean
  submitted_by_id: number
  created_at: string
}

export interface User {
  id: number
  wallet_id: string
  sats_earned: number
  level: number
  created_at: string
}

export interface VerificationResult {
  message: string
  verified: boolean
  count?: number
  rewards_distributed?: boolean
}

