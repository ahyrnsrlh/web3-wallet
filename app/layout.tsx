import type React from "react";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import "./spline-overrides.css"; // Import the Spline overrides
import { ThemeProvider } from "@/components/theme-provider";
import { WalletProvider } from "@/contexts/wallet-context";
import { AuthProvider } from "@/contexts/auth-context";
// SessionProvider akan diimplementasikan di client component terpisah
import Navigation from "@/components/layout/navigation";
import Script from "next/script";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Web3 Wallet Connect",
  description: "A secure and user-friendly Web3 wallet connection platform",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          type="module"
          src="https://unpkg.com/@splinetool/viewer@1.9.93/build/spline-viewer.js"
          strategy="beforeInteractive"
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} font-sans bg-background text-foreground grid-background min-h-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <AuthProvider>
            <WalletProvider>
              <Navigation />
              <div className="relative pt-20">
                {/* Global background glow effects */}
                <div className="fixed w-full h-full top-0 left-0 overflow-hidden pointer-events-none z-0">
                  <div className="absolute w-96 h-96 top-[10%] left-[20%] bg-purple-600/15 rounded-full blur-3xl opacity-80" />
                  <div className="absolute w-96 h-96 bottom-[10%] right-[20%] bg-blue-600/15 rounded-full blur-3xl opacity-80" />
                </div>
                {children}
              </div>
            </WalletProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
