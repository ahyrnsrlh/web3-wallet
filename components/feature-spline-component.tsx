"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function FeatureSplineComponent() {
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
    <div className="w-full h-full overflow-visible bg-transparent flex items-center justify-center">
      <div className="relative w-full h-full flex items-center justify-center overflow-visible">
        {/* Subtle glow effects */}
        <div className="absolute w-72 h-72 -top-32 -left-32 bg-cyan-600/10 rounded-full blur-3xl opacity-50" />
        <div className="absolute w-72 h-72 -bottom-32 -right-32 bg-emerald-600/10 rounded-full blur-3xl opacity-50" />

        <div className="w-full h-full relative z-10 flex flex-col items-center justify-center">
          <div className="w-full h-[500px] mx-auto relative flex items-center justify-center">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            )}

            {/* Using dangerouslySetInnerHTML to avoid TypeScript errors with custom elements */}
            <div
              className="w-full h-full flex items-center justify-center"
              dangerouslySetInnerHTML={{
                __html: `<spline-viewer url="https://prod.spline.design/ptwm-huwtsTMuIMd/scene.splinecode" background="transparent"></spline-viewer>`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
