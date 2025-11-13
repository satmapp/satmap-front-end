"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { MapPin, Plus, Wallet, User, Zap, Plane, CheckCircle, UserPlus } from "lucide-react"
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
  const { user } = useAuthStore()

  const navItems = user ? [...publicNavItems, ...protectedNavItems] : publicNavItems

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex items-center px-2 py-2">
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
                <p className="font-medium">{user.username}</p>
                <p className="text-muted-foreground">Level {user.level}</p>
              </div>
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

