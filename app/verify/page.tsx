'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getPendingCommerces, verifyCommerce, type Commerce } from '@/lib/api'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MapPin, Check, Zap, Phone, Globe } from 'lucide-react'
import { toast } from 'sonner'
import { BreadcrumbNav } from '@/components/breadcrumb-nav'
import { Loading } from '@/components/loading'
import { useAuthStore } from '@/lib/store/auth-store'

export default function VerifyPage() {
  const router = useRouter()
  const [commerces, setCommerces] = useState<Commerce[]>([])
  const [loading, setLoading] = useState(true)
  const [verifying, setVerifying] = useState<number | null>(null)
  const { user } = useAuthStore()

  useEffect(() => {
    if (!user) {
      toast.error('Please login to verify businesses')
      router.push('/login')
      return
    }
    loadPendingCommerces()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadPendingCommerces = async () => {
    try {
      setLoading(true)
      const data = await getPendingCommerces()
      setCommerces(data)
    } catch (error) {
      toast.error('Error loading commerces')
    } finally {
      setLoading(false)
    }
  }

  const handleVerify = async (commerceId: number) => {
    if (!user) {
      toast.error('Please login to verify businesses')
      router.push('/login')
      return
    }

    setVerifying(commerceId)
    
    try {
      const result = await verifyCommerce(commerceId, user.id)
      toast.success(result.message)
      
      if (result.verified) {
        toast.success('🎉 Commerce verified! Rewards distributed!', { 
          duration: 5000,
          description: '150 sats to submitter + 50 sats to each verifier'
        })
      } else {
        toast.info(`✅ Verification recorded (${result.count}/3)`, {
          description: 'Keep verifying to earn rewards!'
        })
      }
      
      await loadPendingCommerces()
    } catch (error: any) {
      toast.error(error.message || 'Error verifying commerce')
    } finally {
      setVerifying(null)
    }
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
      <div className="flex-1 px-4 md:px-6 lg:px-8 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold">
              Verify{' '}
              <span className="bg-gradient-to-r from-bitcoin via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                Businesses
              </span>
            </h1>
            <p className="text-muted-foreground">
              Help the community by verifying Bitcoin-accepting businesses and earn 50 sats per verification
            </p>
          </div>

          <Card className="bg-bitcoin/5 border-bitcoin/20">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-bitcoin/10 shrink-0">
                  <Zap className="w-5 h-5 text-bitcoin" />
                </div>
                <div className="space-y-1">
                  <p className="font-semibold">How it works</p>
                  <p className="text-sm text-muted-foreground">
                    Each business needs 3 independent verifications to be marked as verified. 
                    When you verify, you confirm that the business accepts Bitcoin payments. 
                    Once verified, rewards are distributed automatically!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {commerces.length === 0 && (
            <Card>
              <CardContent className="pt-6 text-center py-12">
                <div className="flex flex-col items-center gap-3">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-muted">
                    <Check className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-lg font-semibold">All caught up!</p>
                    <p className="text-sm text-muted-foreground">
                      No pending businesses to verify right now
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            {commerces.map((commerce) => (
              <Card key={commerce.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-2 flex-1">
                      <CardTitle className="text-xl">{commerce.name}</CardTitle>
                      <div className="space-y-1">
                        <CardDescription className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 shrink-0" />
                          <span>{commerce.address}, {commerce.city}</span>
                        </CardDescription>
                        {commerce.phone && (
                          <CardDescription className="flex items-center gap-1.5">
                            <Phone className="w-3.5 h-3.5 shrink-0" />
                            <span>{commerce.phone}</span>
                          </CardDescription>
                        )}
                        {commerce.website && (
                          <CardDescription className="flex items-center gap-1.5">
                            <Globe className="w-3.5 h-3.5 shrink-0" />
                            <a 
                              href={commerce.website} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="hover:underline text-blue-600"
                            >
                              {commerce.website}
                            </a>
                          </CardDescription>
                        )}
                      </div>
                    </div>
                    <Badge variant="secondary" className="shrink-0">
                      {commerce.verification_count}/3 verified
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-3 items-center justify-between flex-wrap">
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant="outline">{commerce.category}</Badge>
                      <Badge variant="outline" className="gap-1">
                        <Zap className="w-3 h-3" />
                        {commerce.payment_method}
                      </Badge>
                    </div>
                    <Button 
                      onClick={() => handleVerify(commerce.id)}
                      disabled={verifying === commerce.id}
                      className="gap-2"
                    >
                      <Check className="w-4 h-4" />
                      {verifying === commerce.id ? 'Verifying...' : 'Verify & Earn 50 sats'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {commerces.length > 0 && (
            <Card className="bg-muted/50">
              <CardContent className="pt-6">
                <p className="text-sm text-center text-muted-foreground">
                  💡 Tip: Only verify businesses you know accept Bitcoin. False verifications may affect your reputation.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

