"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { ethers } from "ethers";

interface WalletContextType {
  account: string | null;
  chainId: number;
  isConnected: boolean;
  provider: ethers.BrowserProvider | null;
  connect: (walletId: string) => Promise<void>;
  disconnect: () => void;
  switchNetwork: (chainId: number) => Promise<void>;
}

const WalletContext = createContext<WalletContextType>({
  account: null,
  chainId: 1,
  isConnected: false,
  provider: null,
  connect: async () => {},
  disconnect: () => {},
  switchNetwork: async () => {},
});

export const useWallet = () => useContext(WalletContext);

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider = ({ children }: WalletProviderProps) => {
  const [account, setAccount] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number>(1);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  // Initialize wallet from localStorage
  useEffect(() => {
    const storedAccount = localStorage.getItem("walletAccount");
    const storedChainId = localStorage.getItem("walletChainId");

    if (storedAccount) {
      setAccount(storedAccount);
      setIsConnected(true);
    }

    if (storedChainId) {
      setChainId(Number.parseInt(storedChainId));
    }

    // Initialize provider if window.ethereum exists
    if (typeof window !== "undefined" && window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      setProvider(provider);
    }
  }, []);

  // Connect wallet
  const connect = async (walletId: string) => {
    try {
      if (typeof window === "undefined") return;

      // Check if MetaMask is installed
      if (walletId === "metamask" && !window.ethereum) {
        window.open("https://metamask.io/download.html", "_blank");
        throw new Error("MetaMask is not installed");
      }

      // For demo purposes, we'll just use window.ethereum (MetaMask)
      // In a real app, you would use different providers based on walletId
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        setProvider(provider);

        // Request account access
        const accounts = await provider.send("eth_requestAccounts", []);
        const account = accounts[0];
        setAccount(account);

        // Get chain ID
        const { chainId } = await provider.getNetwork();
        setChainId(Number(chainId));

        // Save to localStorage
        localStorage.setItem("walletAccount", account);
        localStorage.setItem("walletChainId", chainId.toString());

        setIsConnected(true);
      } else {
        throw new Error("No Ethereum provider found");
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
      throw error;
    }
  };

  // Disconnect wallet
  const disconnect = () => {
    setAccount(null);
    setIsConnected(false);
    localStorage.removeItem("walletAccount");
    localStorage.removeItem("walletChainId");
  };

  // Switch network
  const switchNetwork = async (chainId: number) => {
    try {
      if (!provider || !window.ethereum) return;

      // Network parameters
      const networks: Record<
        number,
        {
          chainId: string;
          chainName: string;
          rpcUrls: string[];
          nativeCurrency: { name: string; symbol: string; decimals: number };
        }
      > = {
        1: {
          chainId: "0x1",
          chainName: "Ethereum Mainnet",
          rpcUrls: [
            process.env.NEXT_PUBLIC_ETHEREUM_RPC_URL ||
              "https://mainnet.infura.io/v3/",
          ],
          nativeCurrency: {
            name: "Ether",
            symbol: "ETH",
            decimals: 18,
          },
        },
        137: {
          chainId: "0x89",
          chainName: "Polygon Mainnet",
          rpcUrls: [
            process.env.NEXT_PUBLIC_POLYGON_RPC_URL ||
              "https://polygon-rpc.com",
          ],
          nativeCurrency: {
            name: "MATIC",
            symbol: "MATIC",
            decimals: 18,
          },
        },
        56: {
          chainId: "0x38",
          chainName: "Binance Smart Chain",
          rpcUrls: [
            process.env.NEXT_PUBLIC_BSC_RPC_URL ||
              "https://bsc-dataseed.binance.org",
          ],
          nativeCurrency: {
            name: "BNB",
            symbol: "BNB",
            decimals: 18,
          },
        },
        43114: {
          chainId: "0xa86a",
          chainName: "Avalanche C-Chain",
          rpcUrls: [
            process.env.NEXT_PUBLIC_AVALANCHE_RPC_URL ||
              "https://api.avax.network/ext/bc/C/rpc",
          ],
          nativeCurrency: {
            name: "Avalanche",
            symbol: "AVAX",
            decimals: 18,
          },
        },
        5: {
          chainId: "0x5",
          chainName: "Goerli Testnet",
          rpcUrls: [
            process.env.NEXT_PUBLIC_GOERLI_RPC_URL ||
              "https://goerli.infura.io/v3/",
          ],
          nativeCurrency: {
            name: "Ether",
            symbol: "ETH",
            decimals: 18,
          },
        },
      };

      try {
        // Try to switch to the network
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: networks[chainId].chainId }],
        });
      } catch (error: any) {
        // If the network is not added to MetaMask, add it
        if (error.code === 4902) {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [networks[chainId]],
          });
        } else {
          throw error;
        }
      }

      // Update chain ID
      setChainId(chainId);
      localStorage.setItem("walletChainId", chainId.toString());
    } catch (error) {
      console.error("Error switching network:", error);
      throw error;
    }
  };

  // Listen for account changes
  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          // User disconnected their wallet
          disconnect();
        } else if (accounts[0] !== account) {
          // User switched accounts
          setAccount(accounts[0]);
          localStorage.setItem("walletAccount", accounts[0]);
        }
      };

      const handleChainChanged = (chainId: string) => {
        setChainId(Number.parseInt(chainId, 16));
        localStorage.setItem(
          "walletChainId",
          Number.parseInt(chainId, 16).toString()
        );
        // Reload the page to avoid any state inconsistency
        window.location.reload();
      };

      const ethereum = window.ethereum;
      if (ethereum && ethereum.on) {
        ethereum.on("accountsChanged", handleAccountsChanged);
        ethereum.on("chainChanged", handleChainChanged);

        return () => {
          if (ethereum.removeListener) {
            ethereum.removeListener("accountsChanged", handleAccountsChanged);
            ethereum.removeListener("chainChanged", handleChainChanged);
          }
        };
      }
    }
  }, [account, disconnect]);

  return (
    <WalletContext.Provider
      value={{
        account,
        chainId,
        isConnected,
        provider,
        connect,
        disconnect,
        switchNetwork,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
