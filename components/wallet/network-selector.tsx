"use client"
import { Check, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useWallet } from "@/contexts/wallet-context"

// Network options
const networks = [
  {
    id: 1,
    name: "Ethereum",
    icon: "/images/networks/ethereum.svg",
    rpcUrl: "https://mainnet.infura.io/v3/your-infura-key",
  },
  {
    id: 137,
    name: "Polygon",
    icon: "/images/networks/polygon.svg",
    rpcUrl: "https://polygon-rpc.com",
  },
  {
    id: 56,
    name: "Binance Smart Chain",
    icon: "/images/networks/bsc.svg",
    rpcUrl: "https://bsc-dataseed.binance.org",
  },
  {
    id: 43114,
    name: "Avalanche",
    icon: "/images/networks/avalanche.svg",
    rpcUrl: "https://api.avax.network/ext/bc/C/rpc",
  },
  {
    id: 5,
    name: "Goerli Testnet",
    icon: "/images/networks/ethereum.svg",
    rpcUrl: "https://goerli.infura.io/v3/your-infura-key",
  },
]

export default function NetworkSelector() {
  const { chainId, switchNetwork } = useWallet()

  const currentNetwork = networks.find((network) => network.id === chainId) || networks[0]

  const handleNetworkSwitch = async (networkId: number) => {
    try {
      await switchNetwork(networkId)
    } catch (error) {
      console.error("Failed to switch network:", error)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <div className="w-5 h-5 mr-1 flex items-center justify-center bg-muted rounded-full">
            <img
              src={currentNetwork.icon || "/placeholder.svg"}
              alt={currentNetwork.name}
              className="w-3 h-3"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg?height=12&width=12"
              }}
            />
          </div>
          {currentNetwork.name}
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        {networks.map((network) => (
          <DropdownMenuItem
            key={network.id}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => handleNetworkSwitch(network.id)}
          >
            <div className="w-5 h-5 mr-1 flex items-center justify-center bg-muted rounded-full">
              <img
                src={network.icon || "/placeholder.svg"}
                alt={network.name}
                className="w-3 h-3"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg?height=12&width=12"
                }}
              />
            </div>
            {network.name}
            {network.id === chainId && <Check className="h-4 w-4 ml-auto" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
