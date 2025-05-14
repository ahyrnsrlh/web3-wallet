"use client";

import { useState } from "react";
import { useWallet } from "@/contexts/wallet-context";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Wallet,
  ArrowRightLeft,
  LayoutDashboard,
  History,
  LogOut,
  ImageIcon,
} from "lucide-react";
import WalletSelector from "@/components/wallet/wallet-selector";
import WalletInfo from "@/components/wallet/wallet-info";
import TransactionHistory from "@/components/transactions/transaction-history";
import TokenTransfer from "@/components/transactions/token-transfer";
import NFTGallery from "@/components/nft/nft-gallery";
import NetworkSelector from "@/components/wallet/network-selector";
import { motion } from "framer-motion";

export default function WalletConnect() {
  const { account, isConnected, disconnect } = useWallet();
  const [activeTab, setActiveTab] = useState("dashboard");

  // Handle wallet connection
  const handleConnect = () => {
    document.getElementById("wallet-selector-dialog")?.click();
  };

  // Handle wallet disconnection
  const handleDisconnect = () => {
    disconnect();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full overflow-hidden border-none shadow-xl bg-background/80 backdrop-blur-sm">
        <CardHeader className="bg-secondary/20">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-bold">
                <span className="gradient-text">Wallet Dashboard</span>
              </CardTitle>
              <CardDescription>
                Connect and manage your blockchain wallets
              </CardDescription>
            </div>
            {isConnected && <NetworkSelector />}
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {!isConnected ? (
            <motion.div
              className="flex flex-col items-center justify-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-primary/10 rounded-full p-6 mb-6">
                <Wallet className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Connect Your Wallet</h3>
              <p className="text-muted-foreground text-center mb-6 max-w-md">
                Connect your preferred wallet to access blockchain networks and
                manage your digital assets securely.
              </p>
              <Button
                size="lg"
                onClick={handleConnect}
                className="px-8 py-6 text-lg"
              >
                Connect Wallet
              </Button>
              <WalletSelector />
            </motion.div>
          ) : (
            <Tabs
              defaultValue={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="dashboard" className="py-3">
                  <LayoutDashboard className="h-4 w-4 mr-2" />
                  Dashboard
                </TabsTrigger>
                <TabsTrigger value="transactions" className="py-3">
                  <ArrowRightLeft className="h-4 w-4 mr-2" />
                  Transfer
                </TabsTrigger>
                <TabsTrigger value="nfts" className="py-3">
                  <ImageIcon className="h-4 w-4 mr-2" />
                  NFTs
                </TabsTrigger>
                <TabsTrigger value="history" className="py-3">
                  <History className="h-4 w-4 mr-2" />
                  History
                </TabsTrigger>
              </TabsList>
              <TabsContent value="dashboard" className="py-4">
                <WalletInfo />
              </TabsContent>
              <TabsContent value="transactions" className="py-4">
                <TokenTransfer />
              </TabsContent>
              <TabsContent value="nfts" className="py-4">
                <NFTGallery />
              </TabsContent>
              <TabsContent value="history" className="py-4">
                <TransactionHistory />
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
        {isConnected && (
          <CardFooter className="flex justify-between border-t py-6 bg-secondary/10">
            <div>
              <p className="text-sm text-muted-foreground">
                Connected as:{" "}
                <span className="font-mono">
                  {account?.slice(0, 6)}...{account?.slice(-4)}
                </span>
              </p>
            </div>
            <Button variant="outline" onClick={handleDisconnect}>
              <LogOut className="h-4 w-4 mr-2" />
              Disconnect
            </Button>
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
}
