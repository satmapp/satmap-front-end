'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Zap, UserPlus, Wallet } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { useAuthStore } from '@/lib/store/auth-store'
import { registerUser } from '@/lib/api'

export default function SignupPage() {
  const router = useRouter()
  const login = useAuthStore((state) => state.login)
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!username.trim()) {
      toast.error('Please enter a username')
      return
    }

    if (username.length < 3) {
      toast.error('Username must be at least 3 characters')
      return
    }

    try {
      setLoading(true)
      
      toast.loading('Creating your account and Lightning wallet...', { id: 'signup' })
      
      const user = await registerUser(username)
      
      login(user)
      
      toast.success('Account created successfully!', {
        id: 'signup',
        description: `Welcome ${user.username}! Your Lightning wallet is ready.`
      })

      toast.info('Save your API key safely!', {
        description: 'You can copy it from your profile settings',
        duration: 8000
      })

      setTimeout(() => {
        router.push('/map')
      }, 1000)
      
    } catch (error: any) {
      toast.error('Signup failed', {
        id: 'signup',
        description: error.message
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
          <p className="text-sm sm:text-base text-muted-foreground">Create your account and start earning sats</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-bitcoin" />
              Sign Up
            </CardTitle>
            <CardDescription>
              Choose a username and we'll create your Lightning wallet automatically
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={loading}
                  autoFocus
                  minLength={3}
                  maxLength={30}
                />
                <p className="text-xs text-muted-foreground">
                  Minimum 3 characters
                </p>
              </div>

              <div className="bg-muted/50 p-3 rounded-lg space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Wallet className="w-4 h-4 text-bitcoin" />
                  What you'll get:
                </div>
                <ul className="text-xs text-muted-foreground space-y-1 ml-6">
                  <li>• Lightning Network wallet</li>
                  <li>• API key for authentication</li>
                  <li>• Start earning sats immediately</li>
                </ul>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full gap-2"
                disabled={loading}
              >
                <UserPlus className="w-4 h-4" />
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>

            <div className="mt-4 text-center text-sm">
              <span className="text-muted-foreground">Already have an account? </span>
              <Link href="/login" className="text-bitcoin hover:underline font-medium">
                Login
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
