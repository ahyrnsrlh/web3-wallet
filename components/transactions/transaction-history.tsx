"use client"

import { useState } from "react"
import { useWallet } from "@/contexts/wallet-context"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownLeft, ExternalLink } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"

// Mock transaction data
const mockTransactions = [
  {
    id: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    type: "send",
    amount: "0.05",
    token: "ETH",
    to: "0x1234...5678",
    timestamp: Date.now() - 1000 * 60 * 5,
    status: "confirmed",
  },
  {
    id: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
    type: "receive",
    amount: "100",
    token: "USDC",
    from: "0x8765...4321",
    timestamp: Date.now() - 1000 * 60 * 60 * 2,
    status: "confirmed",
  },
  {
    id: "0x7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef123456",
    type: "send",
    amount: "0.1",
    token: "ETH",
    to: "0x2468...1357",
    timestamp: Date.now() - 1000 * 60 * 60 * 24,
    status: "confirmed",
  },
]

export default function TransactionHistory() {
  const { chainId } = useWallet()
  const [isLoading, setIsLoading] = useState(false)
  const [transactions, setTransactions] = useState(mockTransactions)

  // Format timestamp to readable date
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleString()
  }

  // Get explorer URL based on chain ID
  const getExplorerUrl = (txHash: string) => {
    switch (chainId) {
      case 1:
        return `https://etherscan.io/tx/${txHash}`
      case 137:
        return `https://polygonscan.com/tx/${txHash}`
      case 56:
        return `https://bscscan.com/tx/${txHash}`
      case 43114:
        return `https://snowtrace.io/tx/${txHash}`
      case 5:
        return `https://goerli.etherscan.io/tx/${txHash}`
      default:
        return `https://etherscan.io/tx/${txHash}`
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    )
  }

  if (transactions.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium mb-2">No Transactions</h3>
        <p className="text-muted-foreground">Your transaction history will appear here</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {transactions.map((tx) => (
        <Card key={tx.id}>
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div
                className={`w-10 h-10 mr-4 flex items-center justify-center rounded-full ${
                  tx.type === "send" ? "bg-red-100" : "bg-green-100"
                }`}
              >
                {tx.type === "send" ? (
                  <ArrowUpRight className={`h-5 w-5 text-red-500`} />
                ) : (
                  <ArrowDownLeft className={`h-5 w-5 text-green-500`} />
                )}
              </div>
              <div>
                <div className="font-medium">
                  {tx.type === "send" ? "Sent" : "Received"} {tx.amount} {tx.token}
                </div>
                <div className="text-sm text-muted-foreground">
                  {tx.type === "send" ? `To: ${tx.to}` : `From: ${tx.from}`}
                </div>
                <div className="text-xs text-muted-foreground">{formatDate(tx.timestamp)}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={tx.status === "confirmed" ? "outline" : "secondary"}>{tx.status}</Badge>
              <a
                href={getExplorerUrl(tx.id)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
