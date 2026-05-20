import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  Smartphone,
  Gift,
  Globe,
  ShieldCheck,
  Zap,
  Bitcoin,
  Gamepad2,
  ShoppingCart,
  Plane,
  Film,
  Coffee,
  AppWindow,
  CreditCard,
  Phone,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const popularCategories = [
  { name: "Gaming", icon: Gamepad2 },
  { name: "Ecommerce", icon: ShoppingCart },
  { name: "Travel", icon: Plane },
  { name: "Entertainment", icon: Film },
  { name: "Food", icon: Coffee },
  { name: "App Stores", icon: AppWindow },
  { name: "Prepaid Cards", icon: CreditCard },
  { name: "VoIP", icon: Phone },
]

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-32">
        <div className="absolute inset-0 bg-linear-to-b from-primary/10 via-background to-background" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-50" />
        <div className="absolute top-1/2 -left-24 w-72 h-72 bg-chart-3/20 rounded-full blur-3xl opacity-50" />
        
        <div className="container relative mx-auto px-4 z-10 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-8 backdrop-blur-sm">
              <Zap className="mr-2 h-4 w-4" />
              <span>Lightning Fast Crypto Payments</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
              Crypto Payments <br className="hidden md:block" />
              <span className="bg-clip-text text-transparent bg-linear-to-r from-primary via-chart-4 to-chart-3">
                Made Simple
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed">
              Recharge your mobile and buy gift cards instantly using Bitcoin, Ethereum, USDT, and more.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/recharge"
                className="inline-flex items-center justify-center w-full sm:w-auto h-14 px-8 text-lg rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <Smartphone className="mr-2 h-5 w-5" />
                Top up Mobile
              </Link>
              <Link
                href="/gift-cards"
                className="inline-flex items-center justify-center w-full sm:w-auto h-14 px-8 text-lg rounded-full border border-border/50 glass hover:bg-white/5 dark:hover:bg-black/20 transition-colors"
              >
                <Gift className="mr-2 h-5 w-5" />
                Browse Gift Cards
              </Link>
            </div>
          </div>
          
          <div className="flex-1 hidden lg:flex justify-center relative">
            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />
            <Image 
              src="/hero-art.png" 
              alt="Crypto Floating Coins" 
              width={500} 
              height={500} 
              className="relative z-10 drop-shadow-2xl object-contain animate-in fade-in duration-1000"
              priority
            />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Why choose CryptoTopup?</h2>
            <p className="text-muted-foreground">The most secure and seamless way to live on crypto.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="glass-dark border-border/50 bg-background/40 hover:bg-background/60 transition-all duration-300">
              <CardContent className="pt-6">
                <div className="rounded-full bg-primary/20 p-3 w-12 h-12 flex items-center justify-center mb-6">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Global Reach</h3>
                <p className="text-muted-foreground">Support for over 180+ countries and thousands of local carriers and brands.</p>
              </CardContent>
            </Card>
            
            <Card className="glass-dark border-border/50 bg-background/40 hover:bg-background/60 transition-all duration-300">
              <CardContent className="pt-6">
                <div className="rounded-full bg-chart-2/20 p-3 w-12 h-12 flex items-center justify-center mb-6">
                  <ShieldCheck className="h-6 w-6 text-chart-2" />
                </div>
                <h3 className="text-xl font-bold mb-2">Private & Secure</h3>
                <p className="text-muted-foreground">No accounts required for basic usage. Your privacy is our top priority.</p>
              </CardContent>
            </Card>

            <Card className="glass-dark border-border/50 bg-background/40 hover:bg-background/60 transition-all duration-300">
              <CardContent className="pt-6">
                <div className="rounded-full bg-chart-4/20 p-3 w-12 h-12 flex items-center justify-center mb-6">
                  <Zap className="h-6 w-6 text-chart-4" />
                </div>
                <h3 className="text-xl font-bold mb-2">Instant Delivery</h3>
                <p className="text-muted-foreground">Get your mobile recharge or gift card code instantly upon payment confirmation.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Popular Categories</h2>
              <p className="text-muted-foreground">Explore our most requested products</p>
            </div>
            <Link href="/gift-cards" className="hidden sm:flex items-center text-primary hover:text-primary/80 font-medium">
              View all <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {popularCategories.map(({ name, icon: Icon }, i) => (
              <Card key={i} className="group cursor-pointer border-border/40 hover:border-primary/50 transition-all duration-300 overflow-hidden">
                <CardContent className="p-6 flex flex-col items-center justify-center text-center h-32 relative z-10 bg-linear-to-br from-background to-muted/20 gap-3">
                  <div className="rounded-full bg-primary/10 text-primary p-3 mb-3">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="font-semibold group-hover:text-primary transition-colors">{name}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Supported Crypto */}
      <section className="py-20 border-t border-border/40">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm font-semibold tracking-wider text-muted-foreground uppercase mb-8">Pay with your favorite cryptocurrencies</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70">
            {/* Using text placeholders and icons */}
            <div className="flex items-center gap-2 text-2xl font-bold font-mono text-[#F7931A] opacity-100">
              <Bitcoin className="h-8 w-8" />
              Bitcoin
            </div>
            <div className="text-2xl font-bold font-mono">Ethereum</div>
            <div className="text-2xl font-bold font-mono text-chart-2">USDT</div>
            <div className="text-2xl font-bold font-mono text-chart-5">USDC</div>
            <div className="text-2xl font-bold font-mono">Solana</div>
            <div className="text-2xl font-bold font-mono">Binance Pay</div>
          </div>
        </div>
      </section>
    </div>
  )
}
