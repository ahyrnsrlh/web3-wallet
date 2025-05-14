"use client"

import dynamic from "next/dynamic"

// Dynamically import Spline with no SSR
const Spline = dynamic(() => import("@splinetool/react-spline/next"), {
  ssr: false,
})

export default function DirectSpline() {
  return (
    <div style={{ width: "100%", height: "400px" }}>
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
  )
}
