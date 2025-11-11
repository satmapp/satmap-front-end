'use client'

import { usePathname } from 'next/navigation'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

const breadcrumbConfig: Record<string, string> = {
  '/map': 'Explore Map',
  '/add': 'Add Business',
  '/wallet': 'Lightning Wallet',
  '/profile': 'Profile',
}

export function BreadcrumbNav() {
  const pathname = usePathname()
  const pageName = breadcrumbConfig[pathname] || 'Page'

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/map">SatMap</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{pageName}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

