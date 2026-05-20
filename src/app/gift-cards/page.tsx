"use client"

import { Search, Filter, ShoppingCart, Gamepad2, Tv, Music, Smartphone, Gift, CreditCard, Tag } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuGroup
} from "@/components/ui/dropdown-menu"
import * as React from "react"

const brandIcons: Record<string, React.ElementType> = {
  Amazon: ShoppingCart,
  Steam: Gamepad2,
  Netflix: Tv,
  Spotify: Music,
  Apple: Smartphone,
}

const allCards = Array.from({ length: 12 }).map((_, i) => ({
  id: i,
  name: `Premium Gift Card ${i + 1}`,
  brand: ["Amazon", "Steam", "Netflix", "Spotify", "Apple"][i % 5],
  discount: i % 3 === 0 ? "Up to 5% Cashback" : "",
}))

export default function GiftCardsPage() {
  const [search, setSearch] = React.useState("")
  const [categoryFilter, setCategoryFilter] = React.useState("All")
  const [showDiscountOnly, setShowDiscountOnly] = React.useState(false)

  // Mapping brands to categories
  const getCategory = (brand: string) => {
    if (brand === "Steam") return "Gaming"
    if (brand === "Netflix" || brand === "Spotify") return "Entertainment"
    return "Shopping" // Amazon, Apple
  }

  const filteredCards = React.useMemo(() => {
    return allCards.filter(card => {
      // 1. Search Filter
      const matchesSearch = card.brand.toLowerCase().includes(search.toLowerCase()) || 
                            card.name.toLowerCase().includes(search.toLowerCase())
      
      // 2. Category Filter
      const matchesCategory = categoryFilter === "All" || getCategory(card.brand) === categoryFilter
      
      // 3. Discount Filter
      const matchesDiscount = showDiscountOnly ? card.discount !== "" : true

      return matchesSearch && matchesCategory && matchesDiscount
    })
  }, [search, categoryFilter, showDiscountOnly])

  return (
    <div className="container mx-auto px-4 py-12 max-w-screen-xl flex-grow">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 mb-3 text-primary">
            <Gift className="h-6 w-6" />
            <h1 className="text-4xl font-bold tracking-tight">Gift Cards</h1>
          </div>
          <p className="text-muted-foreground text-lg">Buy gift cards with cryptocurrency instantly.</p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-2">
              <CreditCard className="h-4 w-4 text-primary" />
              Fast checkout
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-2">
              <Tag className="h-4 w-4 text-primary" />
              Instant delivery
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-2">
              <Gift className="h-4 w-4 text-primary" />
              Top brands
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search brands..." 
            className="pl-10 bg-background/50 glass-dark" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger className={buttonVariants({ variant: categoryFilter !== "All" || showDiscountOnly ? "default" : "outline" }) + ` glass ${categoryFilter === "All" && !showDiscountOnly ? 'border-border/50' : ''}`}>
            <Filter className="mr-2 h-4 w-4" />
            Filters {(categoryFilter !== "All" || showDiscountOnly) && " (Active)"}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 glass-dark border-border/50">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Categories</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem 
                checked={categoryFilter === "All"}
                onCheckedChange={() => setCategoryFilter("All")}
              >
                All Categories
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem 
                checked={categoryFilter === "Gaming"}
                onCheckedChange={() => setCategoryFilter("Gaming")}
              >
                Gaming
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem 
                checked={categoryFilter === "Entertainment"}
                onCheckedChange={() => setCategoryFilter("Entertainment")}
              >
                Entertainment
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem 
                checked={categoryFilter === "Shopping"}
                onCheckedChange={() => setCategoryFilter("Shopping")}
              >
                Shopping
              </DropdownMenuCheckboxItem>
            </DropdownMenuGroup>
            
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuLabel>Promotions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem 
                checked={showDiscountOnly}
                onCheckedChange={setShowDiscountOnly}
                className="text-primary"
              >
                Cashback Available
              </DropdownMenuCheckboxItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {filteredCards.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-muted-foreground">No gift cards found matching your filters.</p>
          <Button variant="link" onClick={() => { setSearch(""); setCategoryFilter("All"); setShowDiscountOnly(false); }} className="mt-4">
            Clear all filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {filteredCards.map((card) => {
            const Icon = brandIcons[card.brand]
            return (
              <Card key={card.id} className="group cursor-pointer glass-dark border-border/40 hover:border-primary/50 transition-all duration-300 overflow-hidden flex flex-col h-full animate-in fade-in zoom-in-95 duration-300">
                <div className="h-32 bg-gradient-to-br from-muted/50 to-muted/20 relative overflow-hidden">
                  <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 opacity-90" />
                  <div className="relative z-10 flex h-full flex-col items-center justify-center gap-2">
                    {Icon ? (
                      <Icon className="h-8 w-8 opacity-70 group-hover:scale-110 transition-transform text-primary" />
                    ) : (
                      <Gift className="h-8 w-8 opacity-70 group-hover:scale-110 transition-transform text-primary" />
                    )}
                    <span className="font-bold text-sm opacity-70">{card.brand}</span>
                    {card.discount && (
                      <span className="absolute top-2 right-2 text-[10px] font-bold bg-primary/20 text-primary px-2 py-1 rounded-full">
                        Promo
                      </span>
                    )}
                  </div>
                </div>
                <CardContent className="p-4 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-sm line-clamp-1">{card.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{card.brand} gift card</p>
                  </div>
                  {card.discount && (
                    <p className="text-xs text-primary font-medium mt-2">{card.discount}</p>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
