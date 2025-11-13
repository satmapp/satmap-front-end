'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { User as UserIcon, Award, MapPin, CheckCircle, Zap, Calendar, LogOut, Sun, Moon, Key, Copy } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/lib/store/auth-store'
import { getUserBalance } from '@/lib/api'
import { BreadcrumbNav } from '@/components/breadcrumb-nav'
import { toast } from 'sonner'
import { useTheme } from 'next-themes'

export default function ProfilePage() {
  const router = useRouter()
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  const { theme, setTheme } = useTheme()
  const [balance, setBalance] = useState<number>(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      toast.error('Please login to view your profile')
      router.push('/login')
      return
    }

    loadBalance()
  }, [user, router])

  const loadBalance = async () => {
    if (!user?.lnbits_invoice_key) return

    try {
      const data = await getUserBalance(user.lnbits_invoice_key)
      setBalance(data.balance_sats)
    } catch (error) {
      console.error('Failed to load balance:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully')
    router.push('/')
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const copyApiKey = () => {
    if (user?.lnbits_invoice_key) {
      navigator.clipboard.writeText(user.lnbits_invoice_key)
      toast.success('API key copied!', {
        description: 'Use it to login on other devices'
      })
    }
  }

  const copyWalletId = () => {
    if (user?.lnbits_wallet_id) {
      navigator.clipboard.writeText(user.lnbits_wallet_id)
      toast.success('Wallet ID copied!', {
        description: 'Your LNbits wallet identifier'
      })
    }
  }

  if (!user) return null

  return (
    <div className="h-full w-full flex flex-col">
      <div className="border-b bg-background sticky top-0 z-10">
        <div className="px-4 md:px-6 lg:px-8 py-3">
          <BreadcrumbNav />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="px-4 md:px-6 lg:px-8 py-6 pb-20 md:pb-6 max-w-4xl mx-auto space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
              <UserIcon className="w-6 h-6 sm:w-8 sm:h-8 text-bitcoin" />
              Profile
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Your contributions and statistics
            </p>
          </div>

          <Card className="border-bitcoin/20 bg-gradient-to-br from-bitcoin/5 to-orange-500/5">
            <CardHeader>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex-1">
                  <CardTitle className="text-xl sm:text-2xl break-words">{user.username}</CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1 text-xs sm:text-sm">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                    Member since {new Date(user.created_at).toLocaleDateString()}
                  </CardDescription>
                </div>
                <Badge className="text-base sm:text-lg px-3 py-1 sm:px-4 sm:py-2">
                  Level {user.level}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-center gap-2 text-xl sm:text-2xl font-bold">
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-bitcoin" />
                <span className="text-bitcoin">{loading ? '...' : balance.toFixed(0)}</span>
                <span className="text-muted-foreground text-base sm:text-lg">sats earned</span>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Level
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-bitcoin" />
                  <span className="text-2xl font-bold">{user.level}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  User ID
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <UserIcon className="w-5 h-5 text-bitcoin" />
                  <span className="text-2xl font-bold">#{user.id}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Wallet ID
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-bitcoin flex-shrink-0" />
                  <span className="text-sm font-mono truncate flex-1">
                    {user.lnbits_wallet_id.substring(0, 8)}...
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 flex-shrink-0"
                    onClick={copyWalletId}
                    title="Copy Wallet ID"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>
                Manage your account settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  onClick={toggleTheme}
                  className="flex-1 gap-2"
                >
                  {theme === 'dark' ? (
                    <>
                      <Sun className="w-4 h-4" />
                      Light Mode
                    </>
                  ) : (
                    <>
                      <Moon className="w-4 h-4" />
                      Dark Mode
                    </>
                  )}
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleLogout}
                  className="flex-1 gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="w-5 h-5 text-bitcoin" />
                Your API Key
              </CardTitle>
              <CardDescription>
                Use this key to login on other devices. Keep it safe!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="flex-1 px-3 py-2 bg-muted rounded-md text-sm font-mono">
                  {'•'.repeat(40)}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={copyApiKey}
                  title="Copy API Key"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Click the copy button to copy your API key to clipboard
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How to Earn More Sats</CardTitle>
              <CardDescription>
                Contribute to the community and get rewarded
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <MapPin className="w-5 h-5 text-bitcoin mt-0.5" />
                <div>
                  <p className="font-medium">Add Businesses</p>
                  <p className="text-sm text-muted-foreground">
                    Earn 150 sats when your business gets verified by 3 users
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <CheckCircle className="w-5 h-5 text-bitcoin mt-0.5" />
                <div>
                  <p className="font-medium">Verify Businesses</p>
                  <p className="text-sm text-muted-foreground">
                    Earn 50 sats for each business you verify
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
