"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function SplineComponent() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set loading to false after a delay to ensure Spline has time to load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Add custom CSS for spline-viewer to ensure transparency
    const style = document.createElement("style");
    style.textContent = `
      spline-viewer {
        background: transparent !important;
        --spline-viewer-background-color: transparent !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      clearTimeout(timer);
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return (
    <div className="w-full h-full overflow-visible bg-transparent">
      <div className="p-0 h-full flex items-center justify-center">
        <div className="relative w-full h-full flex items-center justify-center overflow-visible">
          {/* Subtle glow effects */}
          <div className="absolute w-72 h-72 -top-32 -left-32 bg-violet-600/10 rounded-full blur-3xl opacity-50" />
          <div className="absolute w-72 h-72 -bottom-32 -right-32 bg-blue-600/10 rounded-full blur-3xl opacity-50" />

          <div className="w-full h-full relative z-10 flex flex-col items-center justify-center">
            <div className="w-full h-[400px] mx-auto relative">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              )}

              {/* Using dangerouslySetInnerHTML to avoid TypeScript errors with custom elements */}
              <div
                className="w-full h-full"
                dangerouslySetInnerHTML={{
                  __html: `<spline-viewer url="https://prod.spline.design/PDyXIzA4SACdUIhV/scene.splinecode" background="transparent"></spline-viewer>`,
                }}
              />
            </div>

            <div className="text-center p-6">
              {/* <h3 className="text-3xl font-bold mb-3 gradient-text">
                Web3 Wallet
              </h3>
              <p className="text-muted-foreground max-w-md text-base">
                Secure, fast, and user-friendly cryptocurrency management
              </p> */}
              {/* <div className="flex justify-center gap-3 mt-5">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2.5 h-2.5 rounded-full bg-primary/60 animate-bounce"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
