'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Zap, Wallet, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { useAuthStore } from '@/lib/store/auth-store'
import { config } from '@/lib/config'

export default function SignUpPage() {
  const router = useRouter()
  const login = useAuthStore((state) => state.login)
  const [walletId, setWalletId] = useState('')
  const [loading, setLoading] = useState(false)

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!walletId.trim()) {
      toast.error('Please enter a wallet ID')
      return
    }

    try {
      setLoading(true)
      
      const response = await fetch(
        `${config.apiUrl}/users?wallet_id=${encodeURIComponent(walletId)}`,
        { method: 'POST' }
      )

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.detail || 'Failed to create user')
      }

      const user = await response.json()
      
      login(user)
      
      toast.success(`Account created! User ID: ${user.id}`, {
        duration: 5000,
        description: 'You can now add and verify businesses'
      })

      setTimeout(() => {
        router.push('/map')
      }, 1500)
    } catch (error: any) {
      toast.error(error.message || 'Failed to create user')
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
          <p className="text-muted-foreground">Create your account</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="w-5 h-5 text-bitcoin" />
              Sign Up
            </CardTitle>
            <CardDescription>
              Connect your Lightning wallet to start earning rewards
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateUser} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="wallet">Wallet ID</Label>
                <Input
                  id="wallet"
                  placeholder="Enter a unique wallet ID"
                  value={walletId}
                  onChange={(e) => setWalletId(e.target.value)}
                  disabled={loading}
                  autoFocus
                />
                <p className="text-xs text-muted-foreground">
                  This can be any unique identifier for your wallet
                </p>
              </div>

              <div className="space-y-3 bg-muted/50 p-4 rounded-lg">
                <p className="font-medium text-sm">What you'll get:</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Add Bitcoin businesses to the map
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Verify businesses and earn 50 sats
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Earn 150 sats when your business is verified
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Build reputation and unlock levels
                  </li>
                </ul>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full gap-2"
                disabled={loading}
              >
                <Zap className="w-4 h-4" />
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>

            <div className="mt-4 text-center text-sm">
              <span className="text-muted-foreground">Already have an account? </span>
              <Link href="/login" className="text-bitcoin hover:underline font-medium">
                Log in
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

