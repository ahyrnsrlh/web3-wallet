import WalletConnect from "@/components/wallet/wallet-connect";
import { WalletProvider } from "@/contexts/wallet-context";
// import SplineComponent from "@/components/spline-component";

export const dynamic = 'force-dynamic';

export default function WalletPage() {
  return (
    <div className="min-h-screen py-8 pt-10">
      <div className="container px-4 mx-auto">
        <h1 className="text-4xl font-bold text-center mb-15">
          <span className="gradient-text">Web3 Wallet</span> Dashboard
        </h1>

        <div className="mb-10 hidden md:block h-[0px] relative overflow-visible"></div>

        <WalletConnect />
      </div>
    </div>
  );
}
