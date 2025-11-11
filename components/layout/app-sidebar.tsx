"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { MapPin, Plus, Wallet, User, Zap } from "lucide-react"
import { ModeToggle } from "@/components/ModeToggle"
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

const navMain = [
  {
    title: "Navigation",
    items: [
      {
        title: "Explore Map",
        url: "/map",
        icon: MapPin,
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
    ],
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

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
              <p className="text-xs text-muted-foreground">Bitcoin Directory</p>
            </div>
          </div>
          <ModeToggle />
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        {navMain.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
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
        ))}
      </SidebarContent>

      <SidebarFooter>
        <div className="px-4 py-3 text-xs text-muted-foreground space-y-1">
          <p>Discover Bitcoin businesses</p>
          <p className="font-mono">v1.0.0</p>
        </div>
      </SidebarFooter>
      
      <SidebarRail />
    </Sidebar>
  )
}

