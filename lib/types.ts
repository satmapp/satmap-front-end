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

export interface CommerceCreate {
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
}

export interface User {
  id: number
  username: string
  lnbits_wallet_id: string
  lnbits_invoice_key: string
  level: number
  created_at: string
}

export interface UserWithKeys extends User {
  lnbits_invoice_key: string
}

export interface UserBalance {
  user_id: number
  balance_sats: number
  balance_msats: number
}

export interface VerificationResult {
  message: string
  verified: boolean
  count?: number
  rewards_distributed?: boolean
  rewards_sent?: number
}

export interface WithdrawResult {
  message: string
  amount_msats: number
  payment_hash: string
}
