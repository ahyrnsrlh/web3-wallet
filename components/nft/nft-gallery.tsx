"use client"

import { useState, useEffect } from "react"
import { useWallet } from "@/contexts/wallet-context"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"
import NFTDetails from "@/components/nft/nft-details"
import type { NFTItem } from "@/lib/types"

// Mock NFT data
const mockNFTs: NFTItem[] = [
  {
    id: "1",
    name: "Crypto Punk #3429",
    collection: "CryptoPunks",
    image: "/images/nfts/cryptopunk.png",
    description:
      "One of 10,000 unique collectible characters with proof of ownership stored on the Ethereum blockchain.",
    tokenId: "3429",
    contractAddress: "0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB",
    blockchain: "Ethereum",
    lastPrice: 75.5,
    currency: "ETH",
  },
  {
    id: "2",
    name: "Bored Ape #8765",
    collection: "Bored Ape Yacht Club",
    image: "/images/nfts/boredape.png",
    description: "The Bored Ape Yacht Club is a collection of 10,000 unique Bored Ape NFTs.",
    tokenId: "8765",
    contractAddress: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
    blockchain: "Ethereum",
    lastPrice: 95.2,
    currency: "ETH",
  },
  {
    id: "3",
    name: "Azuki #4532",
    collection: "Azuki",
    image: "/images/nfts/azuki.png",
    description: "Azuki starts with a collection of 10,000 avatars that give you membership access to The Garden.",
    tokenId: "4532",
    contractAddress: "0xED5AF388653567Af2F388E6224dC7C4b3241C544",
    blockchain: "Ethereum",
    lastPrice: 12.3,
    currency: "ETH",
  },
]

export default function NFTGallery() {
  const { account, chainId } = useWallet()
  const [isLoading, setIsLoading] = useState(true)
  const [nfts, setNfts] = useState<NFTItem[]>([])
  const [selectedNFT, setSelectedNFT] = useState<NFTItem | null>(null)

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        setIsLoading(true)
        // In a real app, you would fetch NFTs from the blockchain or an API
        // For demo purposes, we'll use mock data
        setTimeout(() => {
          setNfts(mockNFTs)
          setIsLoading(false)
        }, 1500)
      } catch (error) {
        console.error("Error fetching NFTs:", error)
        setIsLoading(false)
      }
    }

    if (account) {
      fetchNFTs()
    }
  }, [account, chainId])

  // Get explorer URL based on chain ID
  const getExplorerUrl = (contractAddress: string) => {
    switch (chainId) {
      case 1:
        return `https://etherscan.io/token/${contractAddress}`
      case 137:
        return `https://polygonscan.com/token/${contractAddress}`
      case 56:
        return `https://bscscan.com/token/${contractAddress}`
      case 43114:
        return `https://snowtrace.io/token/${contractAddress}`
      default:
        return `https://etherscan.io/token/${contractAddress}`
    }
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="p-0">
              <Skeleton className="h-48 w-full rounded-t-lg" />
              <div className="p-4">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (nfts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium mb-2">No NFTs Found</h3>
        <p className="text-muted-foreground">Your NFT collection will appear here</p>
      </div>
    )
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {nfts.map((nft) => (
          <Card
            key={nft.id}
            className="overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]"
            onClick={() => setSelectedNFT(nft)}
          >
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={nft.image || "/placeholder.svg?height=200&width=300"}
                  alt={nft.name}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg?height=200&width=300"
                  }}
                />
                <Badge className="absolute top-2 right-2">{nft.blockchain}</Badge>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium truncate">{nft.name}</h3>
                    <p className="text-sm text-muted-foreground">{nft.collection}</p>
                  </div>
                  <a
                    href={getExplorerUrl(nft.contractAddress)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
                <div className="mt-2 text-sm">
                  <span className="text-muted-foreground">Last Price: </span>
                  <span className="font-medium">
                    {nft.lastPrice} {nft.currency}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedNFT && <NFTDetails nft={selectedNFT} onClose={() => setSelectedNFT(null)} />}
    </div>
  )
}
