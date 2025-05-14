"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/contexts/wallet-context";
import { useAuth } from "@/contexts/auth-context";
import {
  Wallet,
  Settings,
  Home,
  Menu,
  X,
  LogOut,
  User,
  LogIn,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navigation() {
  const pathname = usePathname();
  const { isConnected, account } = useWallet();
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const routes = [
    {
      name: "Home",
      path: "/",
      icon: <Home className="h-4 w-4 mr-2" />,
    },
    {
      name: "Wallet",
      path: "/wallet",
      icon: <Wallet className="h-4 w-4 mr-2" />,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <Settings className="h-4 w-4 mr-2" />,
    },
  ];

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center mx-auto pointer-events-none">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`pointer-events-auto transition-all duration-300 rounded-full ${
          scrolled
            ? "bg-card/90 backdrop-blur-md shadow-lg border border-border/40"
            : "bg-card/70 backdrop-blur-sm"
        }`}
      >
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center px-2 py-2 space-x-1 rounded-full">
          <div className="flex items-center px-3">
            <Wallet className="h-5 w-5 mr-2 text-primary" />
            <span className="font-semibold">Web3 Wallet</span>
          </div>

          <div className="h-6 w-px bg-border/50 mx-1"></div>

          <div className="flex items-center space-x-1 px-1">
            {routes.map((route) => (
              <Link key={route.path} href={route.path}>
                <Button
                  variant={pathname === route.path ? "secondary" : "ghost"}
                  size="sm"
                  className={`flex items-center rounded-full ${
                    pathname === route.path
                      ? "bg-primary/10"
                      : "hover:bg-primary/5"
                  }`}
                >
                  {route.icon}
                  {route.name}
                </Button>
              </Link>
            ))}
          </div>

          {user ? (
            <>
              <div className="h-6 w-px bg-border/50 mx-1"></div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="rounded-full">
                    <User className="h-4 w-4 mr-2" />
                    {user.email?.split("@")[0]}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <div className="h-6 w-px bg-border/50 mx-1"></div>
              <Link href="/auth/login">
                <Button variant="ghost" size="sm" className="rounded-full">
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button variant="default" size="sm" className="rounded-full">
                  Sign Up
                </Button>
              </Link>
            </>
          )}

          {isConnected && user && (
            <>
              <div className="h-6 w-px bg-border/50 mx-1"></div>
              <div className="px-3 py-1.5 bg-secondary/50 rounded-full text-xs flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="font-mono">
                  {account?.slice(0, 6)}...{account?.slice(-4)}
                </span>
              </div>
            </>
          )}
        </div>

        {/* Mobile Navigation Button */}
        <div className="md:hidden flex justify-center px-4 py-2">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full bg-card shadow-md border border-border/40"
              >
                <Menu className="h-5 w-5 mr-2" />
                <span className="font-medium">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="pt-16">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center">
                  <Wallet className="h-6 w-6 mr-2 text-primary" />
                  <span className="font-bold text-xl">Web3 Wallet</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="flex flex-col space-y-3">
                {routes.map((route) => (
                  <Link
                    key={route.path}
                    href={route.path}
                    onClick={() => setOpen(false)}
                  >
                    <Button
                      variant={pathname === route.path ? "secondary" : "ghost"}
                      className="w-full justify-start rounded-lg"
                    >
                      {route.icon}
                      {route.name}
                    </Button>
                  </Link>
                ))}

                {!user && (
                  <>
                    <Link href="/auth/login" onClick={() => setOpen(false)}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start rounded-lg"
                      >
                        <LogIn className="h-4 w-4 mr-2" />
                        Login
                      </Button>
                    </Link>
                    <Link href="/auth/register" onClick={() => setOpen(false)}>
                      <Button
                        variant="default"
                        className="w-full justify-start rounded-lg"
                      >
                        Sign Up
                      </Button>
                    </Link>
                  </>
                )}

                {user && (
                  <Button
                    variant="ghost"
                    className="w-full justify-start rounded-lg"
                    onClick={handleSignOut}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                )}

                {isConnected && user && (
                  <div className="mt-4 px-4 py-3 bg-secondary/50 rounded-lg text-sm">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span>Connected:</span>
                    </div>
                    <div className="font-mono mt-1">
                      {account?.slice(0, 6)}...{account?.slice(-4)}
                    </div>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </motion.nav>
    </div>
  );
}
