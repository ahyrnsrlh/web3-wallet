"use client";

import SplineFallback from "./spline-fallback";

export default function DirectSpline() {
  return (
    <div style={{ width: "100%", height: "400px" }}>
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
