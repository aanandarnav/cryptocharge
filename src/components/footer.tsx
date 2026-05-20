import Link from "next/link"
import Image from "next/image"
import { Zap, MessageCircle, Code, Globe } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background mt-auto">
      <div className="container mx-auto px-4 py-12 md:py-16 max-w-screen-2xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center space-x-3">
              <Image src="/logo.png" alt="CryptoTopup Logo" width={32} height={32} className="rounded-full shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
              <span className="font-bold tracking-tight text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-chart-3">
              CryptoTopup
              </span>
            </Link>
            <p className="text-sm text-muted-foreground mt-4">
              Premium cryptocurrency-powered mobile recharge and gift card platform. Fast, secure, and borderless.
            </p>
            <div className="flex space-x-4 mt-6">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <MessageCircle className="h-5 w-5" />
                <span className="sr-only">Social</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Code className="h-5 w-5" />
                <span className="sr-only">Developers</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Globe className="h-5 w-5" />
                <span className="sr-only">Community</span>
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Products</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/recharge" className="hover:text-foreground transition-colors">Mobile Top-ups</Link></li>
              <li><Link href="/gift-cards" className="hover:text-foreground transition-colors">Gift Cards</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">eSIM</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Gaming</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-foreground transition-colors">Help Center</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Supported Countries</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Order Status</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-foreground transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Careers</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} CryptoTopup. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
