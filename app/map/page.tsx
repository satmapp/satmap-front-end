'use client'

import dynamic from 'next/dynamic'
import { BreadcrumbNav } from '@/components/breadcrumb-nav'
import { Separator } from '@/components/ui/separator'

const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-muted">
      <div className="text-center space-y-2">
        <div className="h-8 w-8 mx-auto border-2 border-bitcoin border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground">Loading map...</p>
      </div>
    </div>
  ),
})

export default function MapPage() {
  return (
    <div className="h-full w-full flex flex-col">
      <div className="border-b bg-background sticky top-0 z-10">
        <div className="px-4 md:px-6 lg:px-8 py-3">
          <BreadcrumbNav />
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <Map />
      </div>
    </div>
  )
}

