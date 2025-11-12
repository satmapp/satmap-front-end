'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Zap, Wallet, LogIn } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { useAuthStore } from '@/lib/store/auth-store'
import { config } from '@/lib/config'

export default function LoginPage() {
  const router = useRouter()
  const login = useAuthStore((state) => state.login)
  const [walletId, setWalletId] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!walletId.trim()) {
      toast.error('Please enter your wallet ID')
      return
    }

    try {
      setLoading(true)
      
      const response = await fetch(
        `${config.apiUrl}/users?wallet_id=${encodeURIComponent(walletId)}`,
        { method: 'POST' }
      )

      if (!response.ok) {
        throw new Error('Failed to login')
      }

      const user = await response.json()
      
      login(user)
      
      toast.success('Welcome back!', {
        description: `Logged in as User #${user.id}`
      })

      router.push('/map')
    } catch (error: any) {
      toast.error('Login failed. Please check your wallet ID.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-bitcoin/5">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-bitcoin rounded-lg">
              <Zap className="w-6 h-6 text-black" />
            </div>
            <h1 className="text-3xl font-bold">
              <span className="text-bitcoin">Sat</span>Map
            </h1>
          </div>
          <p className="text-muted-foreground">Sign in to your account</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="w-5 h-5 text-bitcoin" />
              Login
            </CardTitle>
            <CardDescription>
              Enter your wallet ID to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="wallet">Wallet ID</Label>
                <Input
                  id="wallet"
                  placeholder="Enter your wallet ID"
                  value={walletId}
                  onChange={(e) => setWalletId(e.target.value)}
                  disabled={loading}
                  autoFocus
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full gap-2"
                disabled={loading}
              >
                <LogIn className="w-4 h-4" />
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </form>

            <div className="mt-4 text-center text-sm">
              <span className="text-muted-foreground">Don't have an account? </span>
              <Link href="/signup" className="text-bitcoin hover:underline font-medium">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Link href="/">
            <Button variant="ghost" size="sm">
              ← Back to home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

