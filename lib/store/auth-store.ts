import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: number
  wallet_id: string
  sats_earned: number
  level: number
  created_at: string
}

interface AuthStore {
  user: User | null
  isAuthenticated: boolean
  login: (user: User) => void
  logout: () => void
  updateBalance: (sats: number) => void
  updateUser: (user: User) => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      updateBalance: (sats) =>
        set((state) => ({
          user: state.user ? { ...state.user, sats_earned: sats } : null,
        })),
      updateUser: (user) => set({ user, isAuthenticated: true }),
    }),
    {
      name: 'satmap-auth-storage',
    }
  )
)

