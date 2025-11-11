import { Metadata } from 'next'
import { Wallet, Zap, QrCode, Send, ArrowDownToLine } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { BreadcrumbNav } from '@/components/breadcrumb-nav'

export const metadata: Metadata = {
  title: 'Wallet',
}

export default function WalletPage() {
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
          <h1 className="text-3xl font-bold">Lightning Wallet</h1>
          <p className="text-muted-foreground">
            Manage your Bitcoin Lightning Network wallet
          </p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="flex items-center justify-center w-16 h-16 bg-bitcoin/10 rounded-full">
                <Wallet className="w-8 h-8 text-bitcoin" />
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Total Balance</p>
                <p className="text-4xl font-bold">0.00000000</p>
                <p className="text-sm text-muted-foreground">BTC</p>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="grid grid-cols-3 gap-3">
              <Button variant="outline" className="flex flex-col h-auto py-4 gap-1">
                <Send className="w-5 h-5" />
                <span className="text-xs">Send</span>
              </Button>
              <Button variant="outline" className="flex flex-col h-auto py-4 gap-1">
                <ArrowDownToLine className="w-5 h-5" />
                <span className="text-xs">Receive</span>
              </Button>
              <Button variant="outline" className="flex flex-col h-auto py-4 gap-1">
                <QrCode className="w-5 h-5" />
                <span className="text-xs">Scan</span>
              </Button>
            </div>
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

        <div className="text-center">
          <Button size="lg">Connect Wallet</Button>
        </div>
        </div>
      </div>
    </div>
  )
}

