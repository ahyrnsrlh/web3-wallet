"use client"

import { useState } from "react"
import { useWallet } from "@/contexts/wallet-context"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ethers } from "ethers"

// Mock token data
const tokens = [
  { symbol: "ETH", name: "Ethereum", decimals: 18, icon: "/images/tokens/eth.svg" },
  { symbol: "USDC", name: "USD Coin", decimals: 6, icon: "/images/tokens/usdc.svg" },
  { symbol: "USDT", name: "Tether", decimals: 6, icon: "/images/tokens/usdt.svg" },
]

export default function TokenTransfer() {
  const { account, provider, chainId } = useWallet()
  const [recipient, setRecipient] = useState("")
  const [amount, setAmount] = useState("")
  const [selectedToken, setSelectedToken] = useState("ETH")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Validate Ethereum address
  const isValidAddress = (address: string) => {
    try {
      return ethers.isAddress(address)
    } catch (error) {
      return false
    }
  }

  // Validate amount
  const isValidAmount = (amount: string) => {
    try {
      const value = Number.parseFloat(amount)
      return !isNaN(value) && value > 0
    } catch (error) {
      return false
    }
  }

  // Handle transfer
  const handleTransfer = async () => {
    try {
      setError(null)
      setSuccess(null)

      // Validate inputs
      if (!recipient) {
        setError("Recipient address is required")
        return
      }

      if (!isValidAddress(recipient)) {
        setError("Invalid recipient address")
        return
      }

      if (!amount) {
        setError("Amount is required")
        return
      }

      if (!isValidAmount(amount)) {
        setError("Invalid amount")
        return
      }

      setIsLoading(true)

      // In a real app, you would use the provider to send the transaction
      // For demo purposes, we'll simulate a transaction
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simulate success
      setSuccess(
        `Successfully transferred ${amount} ${selectedToken} to ${recipient.slice(0, 6)}...${recipient.slice(-4)}`,
      )
      setRecipient("")
      setAmount("")
    } catch (error: any) {
      console.error("Transfer error:", error)
      setError(error.message || "Failed to transfer tokens")
    } finally {
      setIsLoading(false)
    }
  }

  // Get token icon
  const getTokenIcon = (symbol: string) => {
    const token = tokens.find((t) => t.symbol === symbol)
    return token?.icon || "/placeholder.svg?height=24&width=24"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transfer Tokens</CardTitle>
        <CardDescription>Send tokens to another wallet address</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="bg-green-50 text-green-800 border-green-200">
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor="recipient">Recipient Address</Label>
          <Input
            id="recipient"
            placeholder="0x..."
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="font-mono"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2 col-span-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0.0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0"
              step="0.000001"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="token">Token</Label>
            <Select value={selectedToken} onValueChange={setSelectedToken}>
              <SelectTrigger id="token">
                <SelectValue placeholder="Select token" />
              </SelectTrigger>
              <SelectContent>
                {tokens.map((token) => (
                  <SelectItem key={token.symbol} value={token.symbol}>
                    <div className="flex items-center">
                      <div className="w-5 h-5 mr-2 flex items-center justify-center bg-muted rounded-full">
                        <img
                          src={token.icon || "/placeholder.svg"}
                          alt={token.symbol}
                          className="w-3 h-3"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder.svg?height=12&width=12"
                          }}
                        />
                      </div>
                      {token.symbol}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="pt-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Network Fee (estimated)</span>
            <span>~0.0005 ETH</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleTransfer} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Transfer"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
