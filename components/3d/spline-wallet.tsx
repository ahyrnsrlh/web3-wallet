"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

// Dynamically import Spline with no SSR to avoid server-side rendering issues
const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center w-full h-full min-h-[400px]">
      <LoadingSpinner size={40} className="text-primary" />
    </div>
  ),
});

interface SplineWalletProps {
  className?: string;
  height?: string;
}

export function SplineWallet({
  className = "",
  height = "400px",
}: SplineWalletProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className={`w-full ${className}`} style={{ height }}>
        <div className="flex items-center justify-center w-full h-full">
          <LoadingSpinner size={40} className="text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`} style={{ height }}>
      <Spline
        scene="https://prod.spline.design/PDyXIzA4SACdUIhV/scene.splinecode"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          outline: "none",
        }}
      />
    </div>
  );
}
