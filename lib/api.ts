import { config } from './config'
import type { 
  Commerce, 
  CommerceCreate, 
  User, 
  UserBalance, 
  UserWithKeys, 
  VerificationResult, 
  WithdrawResult 
} from './types'

const API_BASE_URL = config.apiUrl

export async function registerUser(username: string): Promise<UserWithKeys> {
  const response = await fetch(`${API_BASE_URL}/users/register?username=${encodeURIComponent(username)}`, {
    method: 'POST',
  })
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Failed to register' }))
    throw new Error(error.detail)
  }
  
  return response.json()
}

export async function getCurrentUser(apiKey: string): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/users/me`, {
    headers: { 'X-Api-Key': apiKey }
  })
  
  if (!response.ok) {
    throw new Error('Failed to get current user')
  }
  
  return response.json()
}

export async function getUserBalance(apiKey: string): Promise<UserBalance> {
  const response = await fetch(`${API_BASE_URL}/users/me/balance`, {
    headers: { 'X-Api-Key': apiKey }
  })
  
  if (!response.ok) {
    throw new Error('Failed to get balance')
  }
  
  return response.json()
}

export async function getUser(userId: number): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`)
  
  if (!response.ok) {
    throw new Error('Failed to get user')
  }
  
  return response.json()
}

export async function getCommerces(verified?: boolean): Promise<Commerce[]> {
  try {
    const params = verified !== undefined ? `?verified=${verified}` : ''
    const response = await fetch(`${API_BASE_URL}/commerces${params}`)
    
    if (!response.ok) {
      return []
    }
    
    return response.json()
  } catch (error) {
    return []
  }
}

export async function getPendingCommerces(): Promise<Commerce[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/commerces/pending`)
    
    if (!response.ok) {
      return []
    }
    
    return response.json()
  } catch (error) {
    return []
  }
}

export async function getCommerce(commerceId: number): Promise<Commerce> {
  const response = await fetch(`${API_BASE_URL}/commerces/${commerceId}`)
  
  if (!response.ok) {
    throw new Error('Commerce not found')
  }
  
  return response.json()
}

export async function createCommerce(data: CommerceCreate, apiKey: string): Promise<Commerce> {
  const response = await fetch(`${API_BASE_URL}/commerces`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': apiKey
    },
    body: JSON.stringify(data)
  })
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Failed to create commerce' }))
    throw new Error(error.detail)
  }
  
  return response.json()
}


export async function verifyCommerce(
  commerceId: number,
  apiKey: string
): Promise<VerificationResult> {
  const response = await fetch(
    `${API_BASE_URL}/commerces/${commerceId}/verify`,
    {
      method: 'POST',
      headers: { 'X-Api-Key': apiKey }
    }
  )
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Failed to verify commerce' }))
    throw new Error(error.detail)
  }
  
  return response.json()
}

export async function withdrawRewards(
  paymentRequest: string,
  apiKey: string
): Promise<WithdrawResult> {
  const response = await fetch(`${API_BASE_URL}/rewards/withdraw`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': apiKey
    },
    body: JSON.stringify({ payment_request: paymentRequest })
  })
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Failed to withdraw' }))
    throw new Error(error.detail)
  }
  
  return response.json()
}
