"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, X } from "lucide-react"
import { useWallet } from "@/contexts/wallet-context"
import type { NFTItem } from "@/lib/types"

interface NFTDetailsProps {
  nft: NFTItem
  onClose: () => void
}

export default function NFTDetails({ nft, onClose }: NFTDetailsProps) {
  const { chainId } = useWallet()

  // Get explorer URL based on chain ID
  const getExplorerUrl = (contractAddress: string) => {
    switch (chainId) {
      case 1:
        return `https://etherscan.io/token/${contractAddress}?a=${nft.tokenId}`
      case 137:
        return `https://polygonscan.com/token/${contractAddress}?a=${nft.tokenId}`
      case 56:
        return `https://bscscan.com/token/${contractAddress}?a=${nft.tokenId}`
      case 43114:
        return `https://snowtrace.io/token/${contractAddress}?a=${nft.tokenId}`
      default:
        return `https://etherscan.io/token/${contractAddress}?a=${nft.tokenId}`
    }
  }

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
        <div className="relative w-full h-64">
          <img
            src={nft.image || "/placeholder.svg?height=300&width=600"}
            alt={nft.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg?height=300&width=600"
            }}
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 rounded-full bg-background/80 hover:bg-background/90"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
          <Badge className="absolute bottom-2 left-2">{nft.blockchain}</Badge>
        </div>

        <div className="p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl">{nft.name}</DialogTitle>
            <DialogDescription className="text-base font-medium">{nft.collection}</DialogDescription>
          </DialogHeader>

          <div className="mt-4 space-y-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Description</h4>
              <p>{nft.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Token ID</h4>
                <p className="font-mono">{nft.tokenId}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Last Price</h4>
                <p>
                  {nft.lastPrice} {nft.currency}
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Contract Address</h4>
              <div className="flex items-center">
                <p className="font-mono text-sm truncate">
                  {nft.contractAddress.slice(0, 8)}...{nft.contractAddress.slice(-6)}
                </p>
                <a
                  href={getExplorerUrl(nft.contractAddress)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 text-muted-foreground hover:text-foreground"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline">Transfer</Button>
              <Button>View on Marketplace</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
