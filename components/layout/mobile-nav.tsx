"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { MapPin, Plus, Wallet, User, Plane, LogIn, UserPlus } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuthStore } from "@/lib/store/auth-store"

const publicNavItems = [
  { href: "/map", label: "Map", icon: MapPin },
  { href: "/tourist", label: "Tourist", icon: Plane },
]

const authNavItems = [
  { href: "/login", label: "Login", icon: LogIn },
  { href: "/signup", label: "Sign Up", icon: UserPlus },
]

const protectedNavItems = [
  { href: "/add", label: "Add", icon: Plus },
  { href: "/wallet", label: "Wallet", icon: Wallet },
  { href: "/profile", label: "Profile", icon: User },
]

export function MobileNav() {
  const pathname = usePathname()
  const { user } = useAuthStore()

  const navItems = user 
    ? [...publicNavItems, ...protectedNavItems] 
    : [...publicNavItems, ...authNavItems]
  const gridCols = user ? "grid-cols-5" : "grid-cols-4"

  return (
    <nav className="md:hidden border-t bg-card shrink-0">
      <div className={cn("grid h-16", gridCols)}>
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

