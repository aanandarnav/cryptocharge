"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"
import { Moon, Sun, Wallet, Menu, LogOut } from "lucide-react"
import { useStore } from "@/store/useStore"

import { Button, buttonVariants } from "@/components/ui/button"
import { PriceTicker } from "@/components/price-ticker"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Navbar() {
  const { setTheme } = useTheme()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const { wallet, connectWallet, disconnectWallet } = useStore()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-16 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-3">
            <Image src="/logo.png" alt="cryptocharge Logo" width={32} height={32} className="rounded-full shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
            <span className="font-bold sm:inline-block tracking-tight text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-chart-3">
              cryptocharge
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/recharge"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Mobile Recharge
            </Link>
            <Link
              href="/gift-cards"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Gift Cards
            </Link>
          </nav>
        </div>
        
        <div className="flex flex-1 items-center justify-end space-x-4">
          <PriceTicker />
          <nav className="flex items-center space-x-2">
            
            {/* Theme Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger className={buttonVariants({ variant: "ghost", size: "icon" }) + " w-9 px-0"}>
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Wallet Connect */}
            {wallet.isConnected ? (
              <Button 
                variant="outline" 
                onClick={disconnectWallet}
                className="hidden md:flex gap-2 glass border-primary/50 text-foreground hover:bg-destructive/20 hover:text-destructive hover:border-destructive transition-all"
              >
                <LogOut className="h-4 w-4" />
                {wallet.address}
              </Button>
            ) : (
              <Button 
                onClick={connectWallet}
                className="hidden md:flex gap-2 glass border-primary/50 text-foreground hover:bg-primary/20 transition-all"
              >
                <Wallet className="h-4 w-4" />
                Connect Wallet
              </Button>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </nav>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-dark border-b border-border/40 p-4 space-y-4">
          <Link
            href="/recharge"
            className="block px-2 py-1 text-lg transition-colors hover:text-primary"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Mobile Recharge
          </Link>
          <Link
            href="/gift-cards"
            className="block px-2 py-1 text-lg transition-colors hover:text-primary"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Gift Cards
          </Link>
          {wallet.isConnected ? (
            <Button onClick={disconnectWallet} variant="destructive" className="w-full justify-center gap-2 mt-4">
              <LogOut className="h-4 w-4" />
              Disconnect ({wallet.address})
            </Button>
          ) : (
            <Button onClick={connectWallet} className="w-full justify-center gap-2 mt-4 bg-primary text-primary-foreground hover:bg-primary/90">
              <Wallet className="h-4 w-4" />
              Connect Wallet
            </Button>
          )}
        </div>
      )}
    </header>
  )
}
