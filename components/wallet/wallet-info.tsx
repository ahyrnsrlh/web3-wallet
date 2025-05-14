"use client";

import { useEffect, useState } from "react";
import { useWallet } from "@/contexts/wallet-context";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatEther, Contract, Interface } from "ethers";

// ERC-20 ABI for token balance checking
const tokenAbi = [
  // balanceOf function
  "function balanceOf(address owner) view returns (uint256)",
  // decimals function
  "function decimals() view returns (uint8)",
  // symbol function
  "function symbol() view returns (string)",
];

// Token contract addresses (mainnet)
const tokenAddresses = {
  // Ethereum Mainnet
  1: {
    USDC: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    USDT: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  },
  // Polygon Mainnet
  137: {
    USDC: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    USDT: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
  },
  // BSC Mainnet
  56: {
    USDC: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
    USDT: "0x55d398326f99059fF775485246999027B3197955",
  },
};

interface TokenBalance {
  symbol: string;
  balance: string;
  value: number;
  icon: string;
  change24h: number;
}

export default function WalletInfo() {
  const { account, chainId, provider } = useWallet();
  const [balance, setBalance] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tokens, setTokens] = useState<TokenBalance[]>([
    {
      symbol: "ETH",
      balance: "0.0",
      value: 0,
      icon: "/images/tokens/eth.svg",
      change24h: 0,
    },
    {
      symbol: "USDC",
      balance: "0.0",
      value: 0,
      icon: "/images/tokens/usdc.svg",
      change24h: 0,
    },
    {
      symbol: "USDT",
      balance: "0.0",
      value: 0,
      icon: "/images/tokens/usdt.svg",
      change24h: 0,
    },
  ]);
  const [prices, setPrices] = useState({
    ETH: { usd: 0, usd_24h_change: 0 },
    USDC: { usd: 1, usd_24h_change: 0 },
    USDT: { usd: 1, usd_24h_change: 0 },
  });

  // Fetch token prices
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=ethereum,usd-coin,tether&vs_currencies=usd&include_24hr_change=true"
        );
        const data = await response.json();

        setPrices({
          ETH: {
            usd: data.ethereum?.usd || 0,
            usd_24h_change: data.ethereum?.usd_24h_change || 0,
          },
          USDC: {
            usd: data["usd-coin"]?.usd || 1,
            usd_24h_change: data["usd-coin"]?.usd_24h_change || 0,
          },
          USDT: {
            usd: data.tether?.usd || 1,
            usd_24h_change: data.tether?.usd_24h_change || 0,
          },
        });
      } catch (error) {
        console.error("Error fetching prices:", error);
        // Fallback prices if API fails
        setPrices({
          ETH: { usd: 2000, usd_24h_change: 0 },
          USDC: { usd: 1, usd_24h_change: 0 },
          USDT: { usd: 1, usd_24h_change: 0 },
        });
      }
    };

    fetchPrices();
  }, []);

  // Fetch native token and ERC-20 token balances
  useEffect(() => {
    const fetchBalances = async () => {
      if (account && provider) {
        try {
          setIsLoading(true);

          // Get native token balance (ETH, MATIC, BNB, etc.)
          const nativeBalance = await provider.getBalance(account);
          const formattedNativeBalance = formatEther(nativeBalance);
          setBalance(formattedNativeBalance);

          // Update tokens with native token info
          let updatedTokens = [...tokens];
          updatedTokens[0] = {
            ...updatedTokens[0],
            balance: formattedNativeBalance,
            value: Number.parseFloat(formattedNativeBalance) * prices.ETH.usd,
            change24h: prices.ETH.usd_24h_change,
          };

          // Get ERC-20 token balances if contracts exist for this chain
          if (tokenAddresses[chainId as keyof typeof tokenAddresses]) {
            const chainTokens =
              tokenAddresses[chainId as keyof typeof tokenAddresses];

            // Get USDC balance
            if (chainTokens.USDC) {
              try {
                const usdcContract = new Contract(
                  chainTokens.USDC,
                  tokenAbi,
                  provider
                );
                const decimals = await usdcContract.decimals();
                const usdcBalance = await usdcContract.balanceOf(account);
                const formattedBalance = (
                  Number(usdcBalance) / Math.pow(10, decimals)
                ).toFixed(2);

                updatedTokens[1] = {
                  ...updatedTokens[1],
                  balance: formattedBalance,
                  value: Number.parseFloat(formattedBalance) * prices.USDC.usd,
                  change24h: prices.USDC.usd_24h_change,
                };
              } catch (error) {
                console.error("Error fetching USDC balance:", error);
              }
            }

            // Get USDT balance
            if (chainTokens.USDT) {
              try {
                const usdtContract = new Contract(
                  chainTokens.USDT,
                  tokenAbi,
                  provider
                );
                const decimals = await usdtContract.decimals();
                const usdtBalance = await usdtContract.balanceOf(account);
                const formattedBalance = (
                  Number(usdtBalance) / Math.pow(10, decimals)
                ).toFixed(2);

                updatedTokens[2] = {
                  ...updatedTokens[2],
                  balance: formattedBalance,
                  value: Number.parseFloat(formattedBalance) * prices.USDT.usd,
                  change24h: prices.USDT.usd_24h_change,
                };
              } catch (error) {
                console.error("Error fetching USDT balance:", error);
              }
            }
          }

          setTokens(updatedTokens);
        } catch (error) {
          console.error("Error fetching balances:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchBalances();
  }, [account, provider, chainId, prices]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  const totalValue = tokens.reduce((sum, token) => sum + token.value, 0);

  return (
    <div className="space-y-6">
      <div className="text-center p-6 bg-muted rounded-lg">
        <h3 className="text-sm font-medium text-muted-foreground mb-1">
          Total Balance
        </h3>
        <div className="text-3xl font-bold">${totalValue.toFixed(2)}</div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Assets</h3>
        {tokens.map((token) => (
          <Card key={token.symbol}>
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 mr-4 flex items-center justify-center bg-muted rounded-full">
                  <img
                    src={token.icon || "/placeholder.svg"}
                    alt={token.symbol}
                    className="w-6 h-6"
                    onError={(e) => {
                      e.currentTarget.src =
                        "/placeholder.svg?height=24&width=24";
                    }}
                  />
                </div>
                <div>
                  <div className="font-medium">{token.symbol}</div>
                  <div className="text-sm text-muted-foreground">
                    {token.balance} {token.symbol}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">${token.value.toFixed(2)}</div>
                <div
                  className={`text-xs ${
                    token.change24h >= 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {token.change24h >= 0 ? "+" : ""}
                  {token.change24h.toFixed(2)}%
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
