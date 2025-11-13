'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Wallet as WalletIcon, Zap, TrendingUp, ArrowDownToLine, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { useAuthStore } from '@/lib/store/auth-store'
import { getUserBalance, withdrawRewards } from '@/lib/api'
import { BreadcrumbNav } from '@/components/breadcrumb-nav'

export default function WalletPage() {
  const router = useRouter()
  const user = useAuthStore((state) => state.user)
  const [balance, setBalance] = useState<number>(0)
  const [balanceMsats, setBalanceMsats] = useState<number>(0)
  const [loading, setLoading] = useState(true)
  const [withdrawing, setWithdrawing] = useState(false)
  const [invoice, setInvoice] = useState('')

  useEffect(() => {
    if (!user) {
      toast.error('Please login to access your wallet')
      router.push('/login')
      return
    }

    loadBalance()
  }, [user, router])

  const loadBalance = async () => {
    if (!user?.lnbits_invoice_key) return

    try {
      setLoading(true)
      const data = await getUserBalance(user.lnbits_invoice_key)
      setBalance(data.balance_sats)
      setBalanceMsats(data.balance_msats)
    } catch (error) {
      toast.error('Failed to load balance')
    } finally {
      setLoading(false)
    }
  }

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user?.lnbits_invoice_key) {
      toast.error('Please login first')
      return
    }

    if (!invoice.trim()) {
      toast.error('Please enter a Lightning invoice')
      return
    }

    if (!invoice.toLowerCase().startsWith('lnbc')) {
      toast.error('Invalid Lightning invoice format')
      return
    }

    try {
      setWithdrawing(true)
      toast.loading('Processing withdrawal...', { id: 'withdraw' })

      const result = await withdrawRewards(invoice, user.lnbits_invoice_key)

      toast.success('Withdrawal successful!', {
        id: 'withdraw',
        description: `Sent ${(result.amount_msats / 1000).toFixed(0)} sats`
      })

      setInvoice('')
      await loadBalance()

    } catch (error: any) {
      toast.error('Withdrawal failed', {
        id: 'withdraw',
        description: error.message
      })
    } finally {
      setWithdrawing(false)
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
        <div className="px-4 md:px-6 lg:px-8 py-6 pb-20 md:pb-6 max-w-2xl mx-auto space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
              <WalletIcon className="w-6 h-6 sm:w-8 sm:h-8 text-bitcoin" />
              Lightning Wallet
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Manage your sats and withdraw to external wallet
            </p>
          </div>

          <Card className="border-bitcoin/20 bg-gradient-to-br from-bitcoin/5 to-orange-500/5">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Current Balance</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin text-bitcoin" />
                  <span className="text-sm sm:text-base text-muted-foreground">Loading balance...</span>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-bold text-bitcoin">
                      {balance.toFixed(0)}
                    </span>
                    <span className="text-xl sm:text-2xl text-muted-foreground">sats</span>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {balanceMsats.toLocaleString()} millisats
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={loadBalance}
                    className="gap-2"
                  >
                    <TrendingUp className="w-4 h-4" />
                    Refresh Balance
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowDownToLine className="w-5 h-5 text-bitcoin" />
                Withdraw Sats
              </CardTitle>
              <CardDescription>
                Send your earned sats to any Lightning wallet
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleWithdraw} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="invoice">Lightning Invoice</Label>
                  <Input
                    id="invoice"
                    placeholder="lnbc..."
                    value={invoice}
                    onChange={(e) => setInvoice(e.target.value)}
                    disabled={withdrawing || balance <= 0}
                  />
                  <p className="text-xs text-muted-foreground">
                    Generate an invoice in your Lightning wallet and paste it here
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full gap-2"
                  disabled={withdrawing || balance <= 0 || !invoice.trim()}
                >
                  {withdrawing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      Withdraw {balance > 0 ? `${balance.toFixed(0)} sats` : 'All'}
                    </>
                  )}
                </Button>

                {balance <= 0 && (
                  <p className="text-sm text-muted-foreground text-center">
                    You need to earn sats first by verifying businesses
                  </p>
                )}
              </form>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  )
}
