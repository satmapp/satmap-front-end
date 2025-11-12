'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Wallet, Zap, QrCode, Send, ArrowDownToLine, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { BreadcrumbNav } from '@/components/breadcrumb-nav'
import { useAuthStore } from '@/lib/store/auth-store'
import { Loading } from '@/components/loading'
import { toast } from 'sonner'
import { getUserBalance, withdrawRewards } from '@/lib/api'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function WalletPage() {
  const router = useRouter()
  const { user, updateBalance } = useAuthStore()
  const [balance, setBalance] = useState(0)
  const [loading, setLoading] = useState(true)
  const [withdrawing, setWithdrawing] = useState(false)
  const [showWithdraw, setShowWithdraw] = useState(false)
  const [invoice, setInvoice] = useState('')

  useEffect(() => {
    if (!user) {
      toast.error('Please login to access your wallet')
      router.push('/login')
      return
    }
    loadBalance()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadBalance = async () => {
    if (!user) return
    try {
      setLoading(true)
      const data = await getUserBalance(user.id)
      setBalance(data.balance_sats)
      updateBalance(data.balance_sats)
    } catch (error) {
      toast.error('Error loading balance')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleWithdraw = async () => {
    if (!user || !invoice.trim()) {
      toast.error('Please enter a valid Lightning invoice')
      return
    }
    
    try {
      setWithdrawing(true)
      toast.loading('Processing withdrawal...', { id: 'withdraw' })
      
      const result = await withdrawRewards(user.id, invoice)
      
      toast.success('Withdrawal successful!', { 
        id: 'withdraw',
        description: `${balance} sats sent to your wallet`
      })
      
      setInvoice('')
      setShowWithdraw(false)
      await loadBalance()
    } catch (error: any) {
      toast.error('Withdrawal failed', { 
        id: 'withdraw',
        description: error.message || 'Please check your invoice and try again'
      })
    } finally {
      setWithdrawing(false)
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
      <div className="flex-1 px-4 md:px-6 lg:px-8 py-4 md:py-6">
        <div className="max-w-6xl mx-auto space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold">
            <span className="bg-gradient-to-r from-purple-500 via-bitcoin to-yellow-500 bg-clip-text text-transparent">
              Lightning
            </span>{' '}
            Wallet
          </h1>
          <p className="text-muted-foreground">
            Manage your Bitcoin Lightning Network wallet
          </p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="flex items-center justify-center w-16 h-16 bg-bitcoin/10 rounded-full">
                <Zap className="w-8 h-8 text-bitcoin" />
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Available Balance</p>
                <p className="text-5xl font-bold text-bitcoin">{balance}</p>
                <p className="text-sm text-muted-foreground">satoshis</p>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={loadBalance}
                className="gap-2 text-muted-foreground hover:text-foreground"
              >
                <RefreshCw className="w-3 h-3" />
                Refresh
              </Button>
            </div>

            <Separator className="my-6" />

            {!showWithdraw ? (
              <div className="space-y-3">
                <Button 
                  onClick={() => setShowWithdraw(true)}
                  disabled={balance === 0}
                  className="w-full gap-2"
                  size="lg"
                >
                  <ArrowDownToLine className="w-5 h-5" />
                  Withdraw to Lightning Wallet
                </Button>
                {balance === 0 && (
                  <p className="text-xs text-center text-muted-foreground">
                    Add or verify businesses to earn sats!
                  </p>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="invoice">Lightning Invoice</Label>
                  <Input
                    id="invoice"
                    placeholder="lnbc..."
                    value={invoice}
                    onChange={(e) => setInvoice(e.target.value)}
                    className="font-mono text-sm"
                  />
                  <p className="text-xs text-muted-foreground">
                    Generate an invoice for {balance} sats from your Lightning wallet
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={handleWithdraw}
                    disabled={withdrawing || !invoice.trim()}
                    className="flex-1 gap-2"
                  >
                    <Zap className="w-4 h-4" />
                    {withdrawing ? 'Processing...' : 'Confirm Withdrawal'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowWithdraw(false)
                      setInvoice('')
                    }}
                    disabled={withdrawing}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-bitcoin" />
              Lightning Features
            </CardTitle>
            <CardDescription>Fast, cheap, and scalable Bitcoin payments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <Badge variant="secondary" className="mt-0.5 shrink-0">
                <Zap className="w-3 h-3" />
              </Badge>
              <div className="space-y-1">
                <p className="text-sm font-medium">Instant Payments</p>
                <p className="text-xs text-muted-foreground">Send and receive in seconds</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-start gap-3">
              <Badge variant="secondary" className="mt-0.5 shrink-0">
                <Zap className="w-3 h-3" />
              </Badge>
              <div className="space-y-1">
                <p className="text-sm font-medium">Low Fees</p>
                <p className="text-xs text-muted-foreground">Minimal transaction costs</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-start gap-3">
              <Badge variant="secondary" className="mt-0.5 shrink-0">
                <Zap className="w-3 h-3" />
              </Badge>
              <div className="space-y-1">
                <p className="text-sm font-medium">Scalable</p>
                <p className="text-xs text-muted-foreground">Millions of transactions per second</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-bitcoin/5 border-bitcoin/20">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-bitcoin/10 shrink-0">
                <Zap className="w-5 h-5 text-bitcoin" />
              </div>
              <div className="space-y-1">
                <p className="font-semibold">How to withdraw</p>
                <p className="text-sm text-muted-foreground">
                  Open your Lightning wallet (Phoenix, Wallet of Satoshi, etc.), create an invoice 
                  for the amount you want to withdraw, paste it here, and confirm. Your sats will 
                  arrive instantly! ⚡
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

