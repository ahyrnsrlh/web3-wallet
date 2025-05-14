import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle,
  Shield,
  Zap,
  Globe,
  Wallet,
  ArrowRight,
  Lock,
} from "lucide-react";
import SplineComponent from "@/components/spline-component";
import FeatureSplineComponent from "@/components/feature-spline-component";

export default function Home() {
  const features = [
    {
      icon: <Wallet className="h-8 w-8 text-violet-400" />,
      title: "Multi-Wallet Support",
      description:
        "Connect with MetaMask, Trust Wallet, WalletConnect, and more with a single click.",
      gradientFrom: "from-violet-500/20",
      gradientTo: "to-indigo-500/20",
      iconBg: "bg-violet-500/10",
      borderColor: "border-violet-500/20",
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-400" />,
      title: "Enterprise Security",
      description:
        "End-to-end encryption, MFA, and biometric authentication keep your assets safe.",
      gradientFrom: "from-blue-500/20",
      gradientTo: "to-cyan-500/20",
      iconBg: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
    },
    {
      icon: <Globe className="h-8 w-8 text-cyan-400" />,
      title: "Cross-Chain Compatible",
      description:
        "Support for Ethereum, Polygon, Binance Smart Chain, Solana, and Avalanche.",
      gradientFrom: "from-cyan-500/20",
      gradientTo: "to-teal-500/20",
      iconBg: "bg-cyan-500/10",
      borderColor: "border-cyan-500/20",
    },
    {
      icon: <Zap className="h-8 w-8 text-amber-400" />,
      title: "Fast Transactions",
      description:
        "Execute transfers quickly with optimized gas fees and transaction validation.",
      gradientFrom: "from-amber-500/20",
      gradientTo: "to-orange-500/20",
      iconBg: "bg-amber-500/10",
      borderColor: "border-amber-500/20",
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-emerald-400" />,
      title: "NFT Management",
      description:
        "View, transfer, and manage your entire NFT portfolio in one place.",
      gradientFrom: "from-emerald-500/20",
      gradientTo: "to-green-500/20",
      iconBg: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
    },
    {
      icon: <Lock className="h-8 w-8 text-purple-400" />,
      title: "Transaction Simulation",
      description:
        "Preview transactions before sending to protect against scams and errors.",
      gradientFrom: "from-purple-500/20",
      gradientTo: "to-violet-500/20",
      iconBg: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 md:py-32 grid-background">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="gradient-text">Secure Wallet</span> Connection
                for the Web3 Era
              </h1>
              <p className="text-xl mb-8 text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                Connect and manage multiple blockchain wallets with
                enterprise-grade security and a seamless user experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/wallet">
                  <Button size="lg" className="text-lg px-8">
                    Launch App
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="text-lg px-8">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="flex-1 h-[400px] hero-section relative overflow-visible">
              <SplineComponent />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-10">
        <div className="container px-4 md:px-20 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">Powerful Features</span> for Web3
              Users
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage your digital assets across multiple
              blockchain networks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className={`${feature.borderColor} overflow-hidden bg-gradient-to-br ${feature.gradientFrom} ${feature.gradientTo} hover:shadow-lg transition-all duration-300 group backdrop-blur-sm`}
              >
                <CardContent className="p-6">
                  <div
                    className={`mb-4 p-3 rounded-full w-16 h-16 flex items-center justify-center ${feature.iconBg} group-hover:scale-110 transition-transform duration-300`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground/90">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 3D Wallet Section */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 order-2 lg:order-1 h-[550px] feature-section relative overflow-visible">
              <FeatureSplineComponent />
            </div>
            <div className="flex-1 text-center lg:text-left order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="gradient-text">Seamless Experience</span>{" "}
                Across All Devices
              </h2>
              <p className="text-xl mb-8 text-muted-foreground">
                Our wallet connection platform works flawlessly on desktop,
                mobile, and tablet devices, ensuring you can manage your assets
                anywhere.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Real-time balance tracking across multiple networks",
                  "Comprehensive transaction history with detailed analytics",
                  "One-click wallet connection with secure authentication",
                  "Customizable security settings for your peace of mind",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/wallet">
                <Button size="lg" className="text-lg px-8">
                  Try It Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary/20">
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Experience the Future of{" "}
              <span className="gradient-text">Web3 Wallet Management?</span>
            </h2>
            <p className="text-xl mb-8 text-muted-foreground">
              Join thousands of users who trust our platform for secure and
              seamless blockchain interactions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/wallet">
                <Button size="lg" className="text-lg px-8">
                  Launch App
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-8">
                View Documentation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <Wallet className="h-6 w-6 mr-2 text-primary" />
              <span className="font-bold text-xl">Web3 Wallet</span>
            </div>
            <div className="flex gap-8">
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Terms
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Privacy
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Documentation
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Contact
              </Link>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Web3 Wallet Connect. All rights
            reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
