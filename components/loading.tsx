'use client'

import { Bitcoin } from 'lucide-react'

export function Loading() {
  return (
    <div className="h-full w-full flex items-center justify-center bg-background">
      <div className="flex flex-col items-center justify-center space-y-6">
        <div className="relative flex items-center justify-center w-24 h-24">
          <Bitcoin className="h-16 w-16 text-bitcoin animate-bounce absolute" />
          <div className="h-20 w-20 rounded-full border-4 border-bitcoin/20 border-t-bitcoin animate-spin absolute" />
        </div>
        <div className="flex flex-col items-center space-y-2">
          <p className="text-lg font-medium text-foreground">Loading</p>
          <div className="flex items-center justify-center gap-1">
            <span className="w-2 h-2 bg-bitcoin rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-2 h-2 bg-bitcoin rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-2 h-2 bg-bitcoin rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    </div>
  )
}

