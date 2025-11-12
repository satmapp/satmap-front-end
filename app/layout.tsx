'use client'

import { usePathname } from 'next/navigation'
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { MobileNav } from "@/components/layout/mobile-nav"
import { Toaster } from "@/components/ui/sonner"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const showSidebar = pathname !== '/' && pathname !== '/login' && pathname !== '/signup'

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {showSidebar ? (
            <SidebarProvider>
              <div className="flex h-screen w-full overflow-hidden">
                <AppSidebar />
                <div className="flex flex-col flex-1 overflow-hidden">
                  <main className="flex-1 overflow-hidden">
                    {children}
                  </main>
                  <MobileNav />
                </div>
              </div>
            </SidebarProvider>
          ) : (
            <main className="min-h-screen">
              {children}
            </main>
          )}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
