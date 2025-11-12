'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BreadcrumbNav } from '@/components/breadcrumb-nav'
import { AddBusinessForm } from '@/components/forms/add-business-form'
import { useAuthStore } from '@/lib/store/auth-store'
import { Loading } from '@/components/loading'
import { toast } from 'sonner'

export default function AddBusinessPage() {
  const router = useRouter()
  const { user } = useAuthStore()

  useEffect(() => {
    if (!user) {
      toast.error('Please login to add businesses')
      router.push('/login')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!user) {
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
            Add{' '}
            <span className="bg-gradient-to-r from-bitcoin via-orange-500 to-yellow-500 bg-clip-text text-transparent">
              Bitcoin Business
            </span>
          </h1>
          <p className="text-muted-foreground">
            Help grow the Bitcoin circular economy by adding businesses that accept BTC
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Business Information</CardTitle>
            <CardDescription>Fill in the details of the Bitcoin-accepting business</CardDescription>
          </CardHeader>
          <CardContent>
            <AddBusinessForm />
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  )
}

