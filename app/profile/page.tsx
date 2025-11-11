import { Metadata } from 'next'
import { User, MapPin, Award, Settings, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { BreadcrumbNav } from '@/components/breadcrumb-nav'

export const metadata: Metadata = {
  title: 'Profile',
}

export default function ProfilePage() {
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
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-muted-foreground">
            Manage your account and contributions
          </p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <Avatar className="w-20 h-20">
                <AvatarFallback className="bg-muted">
                  <User className="w-8 h-8 text-muted-foreground" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-xl font-semibold">Guest User</h2>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs">
                    Not connected
                  </Badge>
                </div>
              </div>
              <Button variant="outline" size="icon" className="shrink-0">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4">
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

        <div className="text-center pb-6">
          <Button size="lg">Connect Wallet to Continue</Button>
        </div>
        </div>
      </div>
    </div>
  )
}

