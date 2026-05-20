import { useState, useEffect } from 'react'

export function useLivePrice(cryptoSymbol: string) {
  const [price, setPrice] = useState<number>(0)
  const [change24h, setChange24h] = useState<number>(0)

  useEffect(() => {
    // Initial mock prices
    const basePrices: Record<string, number> = {
      'BTC': 65430.20,
      'ETH': 3450.75,
      'USDT': 1.00,
      'SOL': 145.20
    }

    setPrice(basePrices[cryptoSymbol] || 0)
    setChange24h(Math.random() * 5 * (Math.random() > 0.5 ? 1 : -1))

    // Mock WebSocket updates every 3 seconds
    const interval = setInterval(() => {
      setPrice(prev => {
        if (cryptoSymbol === 'USDT') return 1.00;
        const volatility = prev * 0.001; // 0.1% volatility
        const newPrice = prev + (Math.random() * volatility * 2 - volatility);
        return Number(newPrice.toFixed(2));
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [cryptoSymbol])

  return { price, change24h }
}
