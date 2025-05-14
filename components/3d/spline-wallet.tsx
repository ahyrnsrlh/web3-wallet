"use client";

import { useState, useEffect } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import SplineFallback from "./spline-fallback";

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
      <SplineFallback
        scene="https://prod.spline.design/PDyXIzA4SACdUIhV/scene.splinecode"
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}
