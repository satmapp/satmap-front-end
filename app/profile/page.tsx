'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { User, MapPin, Award, Settings, TrendingUp, Zap, Trophy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { BreadcrumbNav } from '@/components/breadcrumb-nav'
import { getUser, getUserBalance } from '@/lib/api'
import { Loading } from '@/components/loading'
import { toast } from 'sonner'
import { useAuthStore } from '@/lib/store/auth-store'

export default function ProfilePage() {
  const router = useRouter()
  const { user, updateUser } = useAuthStore()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      router.push('/login')
      return
    }
    loadUserData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadUserData = async () => {
    if (!user) return

    try {
      setLoading(true)
      
      const [userData, balanceData] = await Promise.all([
        getUser(user.id),
        getUserBalance(user.id)
      ])
      
      updateUser({
        ...userData,
        sats_earned: balanceData.balance_sats
      })
    } catch (error) {
      console.error('Error loading user data:', error)
      toast.error('Error loading profile data')
    } finally {
      setLoading(false)
    }
  }

  const getLevelName = (level: number) => {
    if (level >= 10) return 'Bitcoin Embajador'
    if (level >= 5) return 'Lightning Pioneer'
    if (level >= 2) return 'Bitcoin Explorer'
    return 'Bitcoin Novice'
  }

  const getLevelIcon = (level: number) => {
    if (level >= 10) return '👑'
    if (level >= 5) return '⚡'
    if (level >= 2) return '🗺️'
    return '🌱'
  }

  if (!user || loading) {
    return <Loading />
  }

  return (
    <div className="h-full overflow-y-auto flex flex-col">
      <div className="border-b bg-background sticky top-0 z-10">
        <div className="px-6 py-3">
          <BreadcrumbNav />
        </div>
      </div>
      <div className="flex-1 px-4 md:px-6 lg:px-8 py-4 md:py-6">
        <div className="max-w-6xl mx-auto space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold">
            Your{' '}
            <span className="bg-gradient-to-r from-blue-500 via-bitcoin to-orange-500 bg-clip-text text-transparent">
              Profile
            </span>
          </h1>
          <p className="text-muted-foreground">
            Manage your account and contributions
          </p>
        </div>

        <Card className="bg-gradient-to-br from-bitcoin/5 to-orange-500/5">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <Avatar className="w-20 h-20 border-2 border-bitcoin">
                <AvatarFallback className="bg-bitcoin/10 text-2xl">
                  {getLevelIcon(user.level)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-xl font-semibold">
                  User #{user.id}
                </h2>
                <p className="text-sm text-muted-foreground font-mono mt-1">
                  {user.wallet_id}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary" className="text-xs gap-1">
                    <Trophy className="w-3 h-3" />
                    Level {user.level} - {getLevelName(user.level)}
                  </Badge>
                  <Badge className="text-xs bg-green-500 hover:bg-green-600">
                    ✓ Connected
                  </Badge>
                </div>
              </div>
              <Button variant="outline" size="icon" className="shrink-0">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6 flex flex-col items-center text-center space-y-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-bitcoin/10">
                <Zap className="w-6 h-6 text-bitcoin" />
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-bold">{user.sats_earned}</p>
                <p className="text-sm text-muted-foreground">Sats Earned</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 flex flex-col items-center text-center space-y-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-bitcoin/10">
                <MapPin className="w-6 h-6 text-bitcoin" />
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-bold">0</p>
                <p className="text-sm text-muted-foreground">Businesses Added</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 flex flex-col items-center text-center space-y-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-bitcoin/10">
                <Award className="w-6 h-6 text-bitcoin" />
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-bold">0</p>
                <p className="text-sm text-muted-foreground">Verifications</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-bitcoin" />
              Earning Opportunities
            </CardTitle>
            <CardDescription>Ways to earn more satoshis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-bitcoin/10">
                  <MapPin className="w-4 h-4 text-bitcoin" />
                </div>
                <div>
                  <p className="font-medium text-sm">Add a Business</p>
                  <p className="text-xs text-muted-foreground">Earn 150 sats when verified</p>
                </div>
              </div>
              <Badge variant="secondary">150 sats</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-bitcoin/10">
                  <Award className="w-4 h-4 text-bitcoin" />
                </div>
                <div>
                  <p className="font-medium text-sm">Verify a Business</p>
                  <p className="text-xs text-muted-foreground">Earn 50 sats per verification</p>
                </div>
              </div>
              <Badge variant="secondary">50 sats</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-bitcoin" />
              Recent Activity
            </CardTitle>
            <CardDescription>Your latest contributions to the directory</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <p className="text-sm">No activity yet</p>
              <p className="text-xs mt-1">Start by adding your first business</p>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3 justify-center pb-6">
          {user.sats_earned > 0 && (
            <Button size="lg" className="gap-2">
              <Zap className="w-4 h-4" />
              Withdraw {user.sats_earned} sats
            </Button>
          )}
          <Button size="lg" variant="outline" onClick={loadUserData} className="gap-2">
            <TrendingUp className="w-4 h-4" />
            Refresh Balance
          </Button>
        </div>
        </div>
      </div>
    </div>
  )
}

