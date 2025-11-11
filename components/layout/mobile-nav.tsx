"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { MapPin, Plus, Wallet, User } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/map", label: "Map", icon: MapPin },
  { href: "/add", label: "Add", icon: Plus },
  { href: "/wallet", label: "Wallet", icon: Wallet },
  { href: "/profile", label: "Profile", icon: User },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="md:hidden border-t bg-card shrink-0">
      <div className="grid grid-cols-4 h-16">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 transition-colors",
                isActive
                  ? "text-bitcoin"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

