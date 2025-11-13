'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle, MapPin, Zap, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { useAuthStore } from '@/lib/store/auth-store'
import { getPendingCommerces, verifyCommerce } from '@/lib/api'
import type { Commerce } from '@/lib/types'
import { BreadcrumbNav } from '@/components/breadcrumb-nav'

export default function VerifyPage() {
  const router = useRouter()
  const user = useAuthStore((state) => state.user)
  const [commerces, setCommerces] = useState<Commerce[]>([])
  const [loading, setLoading] = useState(true)
  const [verifying, setVerifying] = useState<number | null>(null)

  useEffect(() => {
    if (!user) {
      toast.error('Please login to verify businesses')
      router.push('/login')
      return
    }

    loadPendingCommerces()
  }, [user, router])

  const loadPendingCommerces = async () => {
    try {
      setLoading(true)
      const data = await getPendingCommerces()
      setCommerces(data)
    } finally {
      setLoading(false)
    }
  }

  const handleVerify = async (commerceId: number) => {
    if (!user?.lnbits_invoice_key) {
      toast.error('Please login first')
      router.push('/login')
      return
    }

    try {
      setVerifying(commerceId)
      
      const result = await verifyCommerce(commerceId, user.lnbits_invoice_key)
      
      if (result.verified) {
        toast.success('Business verified!', {
          description: `Rewards distributed! ${result.rewards_sent} users received sats.`
        })
      } else {
        toast.success('Verification recorded!', {
          description: `+50 sats earned. Count: ${result.count}/3`
        })
      }
      
      await loadPendingCommerces()
      
    } catch (error: any) {
      toast.error('Verification failed', {
        description: error.message
      })
    } finally {
      setVerifying(null)
    }
  }

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
              <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-bitcoin" />
              Verify Businesses
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Earn 50 sats for each verification. Help build trust in the community!
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-bitcoin" />
            </div>
          ) : commerces.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <CheckCircle className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No pending verifications</h3>
                  <p className="text-muted-foreground">
                    All businesses are verified! Check back later.
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {commerces.map((commerce) => (
                <Card key={commerce.id}>
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                      <div className="space-y-1 flex-1">
                        <CardTitle className="text-lg sm:text-xl break-words">{commerce.name}</CardTitle>
                        <CardDescription className="flex items-center gap-2 text-xs sm:text-sm">
                          <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="break-words">{commerce.address}, {commerce.city}</span>
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className="self-start sm:self-auto">
                        {commerce.verification_count}/3
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground text-xs sm:text-sm">Category:</span>
                        <p className="font-medium capitalize text-sm sm:text-base">{commerce.category}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground text-xs sm:text-sm">Payment:</span>
                        <p className="font-medium capitalize text-sm sm:text-base">{commerce.payment_method}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground text-xs sm:text-sm">Country:</span>
                        <p className="font-medium text-sm sm:text-base">{commerce.country}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground text-xs sm:text-sm">Coordinates:</span>
                        <p className="font-mono text-xs break-all">
                          {commerce.latitude.toFixed(4)}, {commerce.longitude.toFixed(4)}
                        </p>
                      </div>
                    </div>

                    {commerce.photo_url && (
                      <div className="rounded-lg overflow-hidden">
                        <img 
                          src={commerce.photo_url} 
                          alt={commerce.name}
                          className="w-full h-48 object-cover"
                        />
                      </div>
                    )}

                    <Button
                      onClick={() => handleVerify(commerce.id)}
                      disabled={verifying !== null}
                      className="w-full gap-2"
                    >
                      {verifying === commerce.id ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        <>
                          <Zap className="w-4 h-4" />
                          Verify & Earn 50 Sats
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
