import { BitcoinPlace, Category } from '@/lib/types'

export async function getBitcoinPlaces(): Promise<BitcoinPlace[]> {
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  return [
    {
      id: '1',
      name: 'El Tunco Beach',
      location: 'La Libertad',
      description: 'Famous surf beach with perfect waves. Several restaurants and hostels in the area accept Bitcoin.',
      images: [
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
        'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800',
        'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800',
      ],
      category: 'beaches',
      rating: 4.7,
      latitude: 13.4928,
      longitude: -89.3953,
      acceptsBitcoin: true,
      acceptsLightning: true,
      acceptsContactless: false,
    },
    {
      id: '2',
      name: 'Coatepeque Lake',
      location: 'Santa Ana',
      description: 'Stunning volcanic lake with crystal clear waters. Perfect for swimming and water sports.',
      images: [
        'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
        'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800',
      ],
      category: 'nature',
      rating: 4.9,
      latitude: 13.8667,
      longitude: -89.5500,
      acceptsBitcoin: false,
    },
    {
      id: '3',
      name: 'Bitcoin Beach (El Zonte)',
      location: 'La Libertad',
      description: 'The pioneer beach in Bitcoin adoption worldwide. Complete community living in Bitcoin economy.',
      images: [
        'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800',
        'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
      ],
      category: 'beaches',
      rating: 4.9,
      latitude: 13.4900,
      longitude: -89.4400,
      acceptsBitcoin: true,
      acceptsLightning: true,
      acceptsContactless: true,
    },
    {
      id: '4',
      name: 'Santa Ana Volcano (Ilamatepec)',
      location: 'Santa Ana',
      description: 'The highest volcano in El Salvador with a sulfurous green lagoon in its crater. Spectacular panoramic view.',
      images: [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      ],
      category: 'nature',
      rating: 4.8,
      latitude: 13.8531,
      longitude: -89.6306,
      acceptsBitcoin: false,
    },
    {
      id: '5',
      name: 'Flowers Route',
      location: 'Ahuachapán',
      description: 'Picturesque colonial towns with coffee plantations and crafts. Some restaurants and shops accept Bitcoin.',
      images: [
        'https://images.unsplash.com/photo-1555881843-4f530d2d3010?w=800',
        'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?w=800',
        'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
      ],
      category: 'towns',
      rating: 4.8,
      latitude: 13.7333,
      longitude: -89.7500,
      acceptsBitcoin: true,
      acceptsLightning: true,
      acceptsContactless: false,
    },
    {
      id: '6',
      name: 'Las Flores Beach',
      location: 'San Miguel',
      description: 'Paradise beach perfect for surfing and relaxation. Considered one of the best beaches in Central America.',
      images: [
        'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
        'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800',
      ],
      category: 'beaches',
      rating: 4.8,
      latitude: 13.2833,
      longitude: -88.3500,
      acceptsBitcoin: false,
    },
    {
      id: '7',
      name: 'El Imposible National Park',
      location: 'Ahuachapán',
      description: 'Nature reserve with incredible biodiversity, tropical forests and hiking trails.',
      images: [
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
        'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800',
        'https://images.unsplash.com/photo-1511497584788-876760111969?w=800',
      ],
      category: 'nature',
      rating: 4.7,
      latitude: 13.8333,
      longitude: -89.9667,
      acceptsBitcoin: false,
    },
    {
      id: '8',
      name: 'San Salvador - Zona Rosa',
      location: 'San Salvador',
      description: 'Entertainment and gastronomy center. Multiple restaurants and cafes accept Bitcoin.',
      images: [
        'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800',
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
        'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
      ],
      category: 'cities',
      rating: 4.5,
      latitude: 13.6929,
      longitude: -89.2182,
      acceptsBitcoin: true,
      acceptsLightning: false,
      acceptsContactless: false,
    },
    {
      id: '9',
      name: 'Suchitoto',
      location: 'Cuscatlán',
      description: 'Charming colonial town with cobblestone streets, art and culture. Spectacular views of Lake Suchitlán.',
      images: [
        'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?w=800',
        'https://images.unsplash.com/photo-1555881843-4f530d2d3010?w=800',
        'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
      ],
      category: 'towns',
      rating: 4.7,
      latitude: 13.9333,
      longitude: -89.0333,
      acceptsBitcoin: false,
    },
    {
      id: '10',
      name: 'Joya de Cerén Ruins',
      location: 'La Libertad',
      description: 'Mayan archaeological site, known as the "Pompeii of America". UNESCO World Heritage Site.',
      images: [
        'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=800',
        'https://images.unsplash.com/photo-1571847762272-ce4c06b00ce0?w=800',
        'https://images.unsplash.com/photo-1590682680588-2f0dbca58c5e?w=800',
      ],
      category: 'archaeology',
      rating: 4.6,
      latitude: 13.8308,
      longitude: -89.3597,
      acceptsBitcoin: false,
    },
    {
      id: '11',
      name: 'Multiplaza Mall',
      location: 'San Salvador',
      description: 'Modern shopping center with multiple stores. Several restaurants accept Bitcoin and Lightning Contactless.',
      images: [
        'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=800',
        'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800',
        'https://images.unsplash.com/photo-1567958451986-2de427a4a0be?w=800',
      ],
      category: 'cities',
      rating: 4.6,
      latitude: 13.6870,
      longitude: -89.2368,
      acceptsBitcoin: true,
      acceptsLightning: true,
      acceptsContactless: true,
    },
    {
      id: '12',
      name: 'Cerro Verde',
      location: 'Santa Ana',
      description: 'National park with views of three volcanoes: Izalco, Santa Ana and Cerro Verde. Trails and natural viewpoints.',
      images: [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800',
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
      ],
      category: 'nature',
      rating: 4.7,
      latitude: 13.8114,
      longitude: -89.6228,
      acceptsBitcoin: false,
    },
  ]
}

export async function getCategories(): Promise<Category[]> {
  await new Promise(resolve => setTimeout(resolve, 500))
  
  return [
    { id: 'beaches', name: 'Beaches', icon: 'waves' },
    { id: 'nature', name: 'Nature', icon: 'trees' },
    { id: 'archaeology', name: 'Archaeology', icon: 'landmark' },
    { id: 'towns', name: 'Towns', icon: 'home' },
    { id: 'cities', name: 'Cities', icon: 'building' },
  ]
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

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

export async function getCommerces(verified?: boolean): Promise<Commerce[]> {
  try {
    const params = verified !== undefined ? `?verified=${verified}` : ''
    const response = await fetch(`${API_BASE_URL}/commerces${params}`)
    if (!response.ok) throw new Error('Failed to fetch commerces')
    return response.json()
  } catch (error) {
    console.error('Error fetching commerces:', error)
    return []
  }
}

export async function getPendingCommerces(): Promise<Commerce[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/commerces/pending`)
    if (!response.ok) throw new Error('Failed to fetch pending commerces')
    return response.json()
  } catch (error) {
    console.error('Error fetching pending commerces:', error)
    return []
  }
}

export async function createCommerce(data: {
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
}, userId: number): Promise<Commerce> {
  const response = await fetch(`${API_BASE_URL}/commerces?user_id=${userId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  if (!response.ok) throw new Error('Failed to create commerce')
  return response.json()
}

export async function verifyCommerce(commerceId: number, userId: number) {
  const response = await fetch(
    `${API_BASE_URL}/commerces/${commerceId}/verify?user_id=${userId}`,
    { method: 'POST' }
  )
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.detail || 'Failed to verify commerce')
  }
  return response.json()
}

export async function createUser(walletId: string) {
  const response = await fetch(`${API_BASE_URL}/users?wallet_id=${walletId}`, {
    method: 'POST'
  })
  if (!response.ok) throw new Error('Failed to create user')
  return response.json()
}

export async function getUser(userId: number) {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`)
  if (!response.ok) throw new Error('Failed to get user')
  return response.json()
}

export async function getUserBalance(userId: number) {
  const response = await fetch(`${API_BASE_URL}/users/${userId}/balance`)
  if (!response.ok) throw new Error('Failed to get balance')
  return response.json()
}

export async function withdrawRewards(userId: number, paymentRequest: string) {
  const response = await fetch(`${API_BASE_URL}/rewards/withdraw`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: userId, payment_request: paymentRequest })
  })
  if (!response.ok) throw new Error('Failed to withdraw')
  return response.json()
}

