"use client"

import { useLivePrice } from "@/hooks/useLivePrice"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

export function PriceTicker() {
  const btc = useLivePrice("BTC")
  const eth = useLivePrice("ETH")

  return (
    <div className="hidden lg:flex items-center space-x-4 text-xs font-mono">
      <div className="flex items-center space-x-1">
        <span className="text-muted-foreground">BTC:</span>
        <span>${btc.price.toLocaleString()}</span>
        <span className={`flex items-center ${btc.change24h >= 0 ? "text-chart-2" : "text-destructive"}`}>
          {btc.change24h >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
          {Math.abs(btc.change24h).toFixed(2)}%
        </span>
      </div>
      <div className="flex items-center space-x-1">
        <span className="text-muted-foreground">ETH:</span>
        <span>${eth.price.toLocaleString()}</span>
        <span className={`flex items-center ${eth.change24h >= 0 ? "text-chart-2" : "text-destructive"}`}>
          {eth.change24h >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
          {Math.abs(eth.change24h).toFixed(2)}%
        </span>
      </div>
    </div>
  )
}
