'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Zap, Key, LogIn } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { useAuthStore } from '@/lib/store/auth-store'
import { getCurrentUser } from '@/lib/api'

export default function LoginPage() {
  const router = useRouter()
  const login = useAuthStore((state) => state.login)
  const [apiKey, setApiKey] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!apiKey.trim()) {
      toast.error('Please enter your API key')
      return
    }

    try {
      setLoading(true)
      
      toast.loading('Logging in...', { id: 'login' })
      
      const user = await getCurrentUser(apiKey)
      
      login({
        ...user,
        lnbits_invoice_key: apiKey
      })
      
      toast.success('Welcome back!', {
        id: 'login',
        description: `Logged in as ${user.username}`
      })

      router.push('/map')
      
    } catch (error: any) {
      toast.error('Login failed', {
        id: 'login',
        description: 'Invalid API key. Please check and try again.'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-bitcoin/5">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-bitcoin rounded-lg">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold">
              <span className="text-bitcoin">Sat</span>Map
            </h1>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground">Sign in to your account</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="w-5 h-5 text-bitcoin" />
              Login
            </CardTitle>
            <CardDescription>
              Enter your API key (LNbits invoice key) to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="apikey">API Key</Label>
                <Input
                  id="apikey"
                  type="password"
                  placeholder="Enter your API key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  disabled={loading}
                  autoFocus
                />
                <p className="text-xs text-muted-foreground">
                  This is your LNbits invoice key received during signup
                </p>
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
