// Extend Window interface to include ethereum
declare global {
  interface Window {
    ethereum?: any
  }
}

export interface WalletInfo {
  id: string
  name: string
  icon: string
  description: string
}

export interface NetworkInfo {
  id: number
  name: string
  icon: string
  rpcUrl: string
}

export interface Transaction {
  id: string
  type: "send" | "receive"
  amount: string
  token: string
  to?: string
  from?: string
  timestamp: number
  status: "pending" | "confirmed" | "failed"
}

export interface NFTItem {
  id: string
  name: string
  collection: string
  image: string
  description: string
  tokenId: string
  contractAddress: string
  blockchain: string
  lastPrice: number
  currency: string
}
