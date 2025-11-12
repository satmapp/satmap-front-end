'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Bitcoin, Zap, Users, Trophy, ArrowRight, CheckCircle, MapPin, LogIn } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="h-full overflow-y-auto flex flex-col">
      <div className="flex-1 px-4 md:px-6 lg:px-8 py-6 md:py-12">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4 py-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-bitcoin rounded-lg">
                <Zap className="w-6 h-6 text-black" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">
                <span className="text-bitcoin">Sat</span>Map
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Discover Bitcoin businesses and earn satoshis
            </p>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join our community to map businesses accepting Bitcoin, verify locations, and earn rewards
            </p>
            
            <div className="flex flex-wrap gap-3 justify-center pt-4">
              <Link href="/signup">
                <Button size="lg" className="gap-2">
                  <Users className="w-4 h-4" />
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="gap-2">
                  <LogIn className="w-4 h-4" />
                  Login
                </Button>
              </Link>
              <Link href="/map">
                <Button size="lg" variant="ghost" className="gap-2">
                  <Bitcoin className="w-4 h-4" />
                  Explore Map
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-bitcoin/10 mb-2">
                  <MapPin className="w-5 h-5 text-bitcoin" />
                </div>
                <CardTitle>Map Businesses</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Add Bitcoin-accepting businesses to our community map and help others discover them
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-bitcoin/10 mb-2">
                  <CheckCircle className="w-5 h-5 text-bitcoin" />
                </div>
                <CardTitle>Verify & Earn</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Verify businesses and earn 50 sats per verification. Earn 150 sats when your business is verified
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-bitcoin/10 mb-2">
                  <Trophy className="w-5 h-5 text-bitcoin" />
                </div>
                <CardTitle>Build Reputation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Earn levels and badges as you contribute more to the community
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-to-br from-bitcoin/5 to-orange-500/5">
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
              <CardDescription>A 3-step process to build Bitcoin adoption</CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="space-y-4">
                <li className="flex gap-4">
                  <Badge className="mt-1">1</Badge>
                  <div>
                    <p className="font-medium">Create Your Account</p>
                    <p className="text-sm text-muted-foreground">Sign up with your wallet ID to start earning</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Badge className="mt-1">2</Badge>
                  <div>
                    <p className="font-medium">Add or Verify Businesses</p>
                    <p className="text-sm text-muted-foreground">Contribute to the map and earn satoshis</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Badge className="mt-1">3</Badge>
                  <div>
                    <p className="font-medium">Build Your Reputation</p>
                    <p className="text-sm text-muted-foreground">Level up and unlock exclusive features</p>
                  </div>
                </li>
              </ol>
            </CardContent>
          </Card>

          <div className="text-center">
            <Link href="/signup">
              <Button size="lg" className="gap-2">
                Start Earning Sats Now
                <Zap className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
