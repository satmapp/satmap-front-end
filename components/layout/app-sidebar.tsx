"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { MapPin, Plus, Wallet, User, Zap, Plane, CheckCircle, UserPlus, LogOut } from "lucide-react"
import { ModeToggle } from "@/components/ModeToggle"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/lib/store/auth-store"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar"

const publicNavItems = [
  {
    title: "Explore Map",
    url: "/map",
    icon: MapPin,
  },
  {
    title: "Tourist Guide",
    url: "/tourist",
    icon: Plane,
  },
]

const protectedNavItems = [
  {
    title: "Verify Businesses",
    url: "/verify",
    icon: CheckCircle,
  },
  {
    title: "Add Business",
    url: "/add",
    icon: Plus,
  },
  {
    title: "Lightning Wallet",
    url: "/wallet",
    icon: Wallet,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User,
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const navItems = user ? [...publicNavItems, ...protectedNavItems] : publicNavItems

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex items-center justify-between px-2 py-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 bg-bitcoin rounded-md">
              <Zap className="w-5 h-5 text-black" />
            </div>
            <div>
              <h1 className="text-lg font-bold">
                <span className="text-bitcoin">Sat</span>
                <span>Map</span>
              </h1>
              <p className="text-xs bg-gradient-to-r from-bitcoin via-orange-500 to-yellow-500 bg-clip-text text-transparent font-medium">
                Bitcoin Directory
              </p>
            </div>
          </div>
          <ModeToggle />
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.url
                
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link href={item.url}>
                        <Icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="px-4 py-3 space-y-3">
          {user ? (
            <>
              <div className="text-xs space-y-1">
                <p className="text-muted-foreground">Logged in as:</p>
                <p className="font-mono font-medium">User #{user.id}</p>
                <p className="flex items-center gap-1">
                  <Zap className="w-3 h-3 text-bitcoin" />
                  <span className="font-bold text-bitcoin">{user.sats_earned} sats</span>
                </p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout} 
                className="w-full gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </>
          ) : (
            <div className="space-y-2">
              <Link href="/login">
                <Button variant="outline" size="sm" className="w-full gap-2">
                  <User className="w-4 h-4" />
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm" className="w-full gap-2">
                  <UserPlus className="w-4 h-4" />
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
          <p className="text-xs text-muted-foreground text-center font-mono">v1.0.0</p>
        </div>
      </SidebarFooter>
      
      <SidebarRail />
    </Sidebar>
  )
}

