"use client"

import * as React from "react"
import { Smartphone, Check, ArrowRight, Wallet, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useStore } from "@/store/useStore"

const MOCK_OPERATORS = ["Airtel", "Jio", "Vodafone", "BSNL", "AT&T", "T-Mobile"]
const MOCK_AMOUNTS = [10, 20, 50, 100]

export default function RechargePage() {
  const [step, setStep] = React.useState(1)
  const [phone, setPhone] = React.useState("")
  const [operator, setOperator] = React.useState("")
  const [amount, setAmount] = React.useState<number | null>(null)
  
  const [isProcessing, setIsProcessing] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)
  
  const { wallet, connectWallet } = useStore()

  const handlePayment = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setIsSuccess(true)
      setStep(4) // Success step
    }, 2000)
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-screen-lg flex-grow">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Mobile Recharge</h1>
        <p className="text-muted-foreground text-lg">Top up any prepaid mobile phone in the world with crypto.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          
          {/* Step 1 */}
          <Card className={`glass-dark transition-all duration-300 ${step === 1 ? 'border-primary/50 shadow-[0_0_15px_rgba(var(--primary),0.1)]' : 'border-border/50 opacity-60'}`}>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-sm">1</span>
                  Enter Mobile Number
                </CardTitle>
                {step === 1 && <CardDescription className="mt-1">Select country code and enter the number</CardDescription>}
              </div>
              {step > 1 && (
                <Button variant="ghost" size="sm" onClick={() => setStep(1)} className="text-primary h-8">Edit</Button>
              )}
            </CardHeader>
            {step === 1 && (
              <CardContent className="animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex gap-4">
                  <div className="w-1/3">
                    <Input placeholder="+91" defaultValue="+91" className="bg-background/50" />
                  </div>
                  <div className="w-2/3">
                    <Input 
                      placeholder="Enter phone number" 
                      type="tel" 
                      className="bg-background/50" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
                <Button 
                  className="mt-6 w-full gap-2" 
                  onClick={() => setStep(2)}
                  disabled={phone.length < 5}
                >
                  Continue <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            )}
          </Card>

          {/* Step 2 */}
          <Card className={`glass-dark transition-all duration-300 ${step === 2 ? 'border-primary/50 shadow-[0_0_15px_rgba(var(--primary),0.1)]' : 'border-border/50 opacity-60'} ${(step < 2) && 'pointer-events-none'}`}>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <span className={`flex items-center justify-center w-6 h-6 rounded-full text-sm ${step >= 2 ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>2</span>
                  Select Operator & Amount
                </CardTitle>
                {step === 2 && <CardDescription className="mt-1">Choose from available top-up packages</CardDescription>}
              </div>
              {step > 2 && (
                <Button variant="ghost" size="sm" onClick={() => setStep(2)} className="text-primary h-8">Edit</Button>
              )}
            </CardHeader>
            {step === 2 && (
              <CardContent className="animate-in fade-in slide-in-from-top-2 duration-300 space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-3">Operator</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {MOCK_OPERATORS.map((op) => (
                      <Button 
                        key={op} 
                        variant={operator === op ? "default" : "outline"}
                        className={`h-12 ${operator !== op && 'glass border-border/50 hover:bg-primary/10 hover:text-primary'}`}
                        onClick={() => setOperator(op)}
                      >
                        {op}
                      </Button>
                    ))}
                  </div>
                </div>
                
                {operator && (
                  <div className="animate-in fade-in duration-300">
                    <h3 className="text-sm font-medium mb-3">Amount</h3>
                    <div className="grid grid-cols-4 gap-3">
                      {MOCK_AMOUNTS.map((amt) => (
                        <Button 
                          key={amt} 
                          variant={amount === amt ? "default" : "outline"}
                          className={`h-12 ${amount !== amt && 'glass border-border/50 hover:bg-primary/10 hover:text-primary'}`}
                          onClick={() => setAmount(amt)}
                        >
                          ${amt}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                <Button 
                  className="w-full gap-2 mt-4" 
                  onClick={() => setStep(3)}
                  disabled={!operator || !amount}
                >
                  Continue to Payment <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            )}
          </Card>

          {/* Step 3 */}
          <Card className={`glass-dark transition-all duration-300 ${step === 3 ? 'border-primary/50 shadow-[0_0_15px_rgba(var(--primary),0.1)]' : 'border-border/50 opacity-60'} ${(step < 3) && 'pointer-events-none'}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className={`flex items-center justify-center w-6 h-6 rounded-full text-sm ${step >= 3 ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>3</span>
                Payment
              </CardTitle>
              {step === 3 && <CardDescription className="mt-1">Pay securely with your preferred cryptocurrency</CardDescription>}
            </CardHeader>
            {step === 3 && (
              <CardContent className="animate-in fade-in slide-in-from-top-2 duration-300 flex flex-col items-center py-6">
                {!wallet.isConnected ? (
                  <div className="text-center space-y-4">
                    <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Wallet className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">Connect your wallet</h3>
                    <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                      Please connect your Web3 wallet to complete this transaction securely.
                    </p>
                    <Button onClick={connectWallet} className="mt-4 px-8 h-12 text-lg">
                      Connect Wallet
                    </Button>
                  </div>
                ) : (
                  <div className="w-full space-y-6">
                    <div className="bg-background/40 rounded-lg p-6 border border-border/50 text-center">
                      <p className="text-sm text-muted-foreground mb-1">Paying from</p>
                      <p className="font-mono font-medium text-lg">{wallet.address}</p>
                      <div className="mt-4 p-4 rounded bg-primary/10 border border-primary/20 inline-block">
                         <p className="text-sm text-primary mb-1">Amount Due</p>
                         <p className="text-3xl font-bold font-mono tracking-tight text-primary">${amount?.toFixed(2)}</p>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={handlePayment} 
                      disabled={isProcessing}
                      className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-chart-4 hover:opacity-90"
                    >
                      {isProcessing ? (
                        <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processing Transaction...</>
                      ) : (
                        <><Check className="mr-2 h-5 w-5" /> Confirm & Pay Now</>
                      )}
                    </Button>
                  </div>
                )}
              </CardContent>
            )}

            {/* Success State */}
            {step === 4 && (
              <CardContent className="animate-in zoom-in-95 duration-500 flex flex-col items-center py-10 text-center">
                <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6">
                  <Check className="h-10 w-10" />
                </div>
                <h2 className="text-3xl font-bold mb-2">Payment Successful!</h2>
                <p className="text-muted-foreground mb-6">Your top-up of ${amount} to {phone} is being processed.</p>
                <Button variant="outline" onClick={() => { setStep(1); setPhone(""); setOperator(""); setAmount(null); setIsSuccess(false); }} className="glass">
                  New Top-up
                </Button>
              </CardContent>
            )}
          </Card>
        </div>

        <div className="md:col-span-1">
          <Card className="glass border-primary/20 sticky top-24">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Product</span>
                <span className="font-medium">{operator ? `${operator} Recharge` : "-"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Number</span>
                <span className="font-medium">{phone || "-"}</span>
              </div>
              <div className="border-t border-border/40 pt-4 mt-4 flex justify-between font-semibold">
                <span>Total</span>
                <span className="text-primary text-lg">${amount ? amount.toFixed(2) : "0.00"}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
