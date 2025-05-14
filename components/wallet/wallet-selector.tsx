"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/contexts/wallet-context";
import { Loader2 } from "lucide-react";

// Wallet options
const wallets = [
  {
    id: "metamask",
    name: "MetaMask",
    icon: "/images/wallets/metamask.svg",
    description: "Connect to your MetaMask Wallet",
  },
  {
    id: "walletconnect",
    name: "WalletConnect",
    icon: "/images/wallets/walletconnect.png",
    description: "Scan with WalletConnect to connect",
  },
  {
    id: "coinbase",
    name: "Coinbase Wallet",
    icon: "/images/wallets/coinbase.svg",
    description: "Connect to your Coinbase Wallet",
  },
  {
    id: "trust",
    name: "Trust Wallet",
    icon: "/images/wallets/trust.png",
    description: "Connect to your Trust Wallet",
  },
  {
    id: "rainbow",
    name: "Rainbow",
    icon: "/images/wallets/rainbow.png",
    description: "Connect to your Rainbow Wallet",
  },
];

export default function WalletSelector() {
  const { connect } = useWallet();
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const handleWalletSelect = async (walletId: string) => {
    setSelectedWallet(walletId);
    setIsConnecting(true);

    try {
      await connect(walletId);
      setOpen(false);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    } finally {
      setIsConnecting(false);
      setSelectedWallet(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger id="wallet-selector-dialog" className="hidden">
        Open Wallet Selector
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect Wallet</DialogTitle>
          <DialogDescription>
            Select a wallet to connect to this application
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {wallets.map((wallet) => (
            <Button
              key={wallet.id}
              variant="outline"
              className="flex justify-start items-center h-auto p-4"
              disabled={isConnecting}
              onClick={() => handleWalletSelect(wallet.id)}
            >
              <div className="w-10 h-10 mr-4 flex items-center justify-center bg-muted rounded-full">
                <img
                  src={wallet.icon || "/placeholder.svg"}
                  alt={wallet.name}
                  className="w-6 h-6"
                  onError={(e) => {
                    // Fallback for missing wallet icons
                    e.currentTarget.src = "/placeholder.svg?height=24&width=24";
                  }}
                />
              </div>
              <div className="flex-1 text-left">
                <div className="font-medium">{wallet.name}</div>
                <div className="text-xs text-muted-foreground">
                  {wallet.description}
                </div>
              </div>
              {isConnecting && selectedWallet === wallet.id && (
                <Loader2 className="h-4 w-4 ml-2 animate-spin" />
              )}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
