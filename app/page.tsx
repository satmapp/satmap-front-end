'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Bitcoin, Zap, Users, Trophy, ArrowRight, CheckCircle, MapPin, LogIn, Store } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
}

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 }
  }
}

const floatingAnimation = {
  y: [0, -8, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut" as const
  }
}

export default function HomePage() {
  return (
    <div className="h-full overflow-y-auto flex flex-col">
      {/* Hero Section */}
      <section className="w-full overflow-hidden py-12 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left Column: Text Content */}
            <motion.div
              className="flex flex-col items-center text-center lg:items-start lg:text-left"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div className="flex items-center gap-3 mb-6" variants={itemVariants}>
                <div className="flex items-center justify-center w-14 h-14 bg-bitcoin rounded-xl shadow-lg">
                  <Zap className="w-8 h-8 text-black" />
                </div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold">
                  <span className="text-bitcoin">Sat</span>
                  <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">Map</span>
                </h1>
              </motion.div>

              <motion.h2 
                className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
                variants={itemVariants}
              >
                Discover Bitcoin Businesses in{' '}
                <span className="bg-gradient-to-r from-bitcoin via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                  El Salvador
                </span>
              </motion.h2>

              <motion.p 
                className="mt-4 max-w-md text-lg text-muted-foreground"
                variants={itemVariants}
              >
                Join our community to map businesses accepting Bitcoin, verify locations, and earn satoshis rewards
              </motion.p>

              <motion.div 
                className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start"
                variants={itemVariants}
              >
                <Link href="/signup">
                  <Button size="lg" className="gap-2 text-base">
                    <Users className="w-5 h-5" />
                    Get Started
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline" className="gap-2 text-base">
                    <LogIn className="w-5 h-5" />
                    Login
                  </Button>
                </Link>
              </motion.div>

              <motion.div 
                className="mt-12 flex flex-wrap justify-center gap-8 lg:justify-start"
                variants={itemVariants}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-bitcoin/10">
                    <Store className="w-6 h-6 text-bitcoin" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">50+</p>
                    <p className="text-sm text-muted-foreground">Businesses</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-bitcoin/10">
                    <Zap className="w-6 h-6 text-bitcoin" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">200</p>
                    <p className="text-sm text-muted-foreground">Sats Earned</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column: Image Collage */}
            <motion.div
              className="relative h-[400px] w-full sm:h-[500px] lg:h-[600px]"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Decorative Shapes */}
              <motion.div
                className="absolute -top-4 left-1/4 h-16 w-16 rounded-full bg-bitcoin/20"
                animate={floatingAnimation}
              />
              <motion.div
                className="absolute bottom-0 right-1/4 h-12 w-12 rounded-lg bg-orange-500/20"
                animate={floatingAnimation}
              />
              <motion.div
                className="absolute bottom-1/4 left-4 h-6 w-6 rounded-full bg-yellow-500/20"
                animate={floatingAnimation}
              />

              {/* Images - El Salvador Tourism */}
              <motion.div
                className="absolute left-1/2 top-0 h-48 w-48 -translate-x-1/2 rounded-2xl bg-muted p-2 shadow-xl sm:h-64 sm:w-64"
                variants={imageVariants}
              >
                <img 
                  src="https://images.pexels.com/photos/3278215/pexels-photo-3278215.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Beautiful tropical beach destination" 
                  className="h-full w-full rounded-xl object-cover"
                />
              </motion.div>
              <motion.div
                className="absolute right-0 top-1/3 h-40 w-40 rounded-2xl bg-muted p-2 shadow-xl sm:h-56 sm:w-56"
                variants={imageVariants}
              >
                <img 
                  src="https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Mountain landscape tourism" 
                  className="h-full w-full rounded-xl object-cover"
                />
              </motion.div>
              <motion.div
                className="absolute bottom-0 left-0 h-32 w-32 rounded-2xl bg-muted p-2 shadow-xl sm:h-48 sm:w-48"
                variants={imageVariants}
              >
                <img 
                  src="https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Local market and culture" 
                  className="h-full w-full rounded-xl object-cover"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 md:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto space-y-12">

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
      </section>
    </div>
  )
}
