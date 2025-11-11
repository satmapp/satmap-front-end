'use client'

import dynamic from 'next/dynamic'
import { BreadcrumbNav } from '@/components/breadcrumb-nav'
import { Separator } from '@/components/ui/separator'

import { Loading } from '@/components/loading'

const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => <Loading />,
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

