"use client"

import type React from "react"

import { useRef, useEffect } from "react"

interface GridBackgroundProps {
  children: React.ReactNode
  className?: string
}

export function GridBackground({ children, className = "" }: GridBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const { left, top, width, height } = containerRef.current.getBoundingClientRect()
      const x = (e.clientX - left) / width
      const y = (e.clientY - top) / height

      containerRef.current.style.setProperty("--mouse-x", `${x}`)
      containerRef.current.style.setProperty("--mouse-y", `${y}`)
    }

    document.addEventListener("mousemove", handleMouseMove)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`grid-background relative overflow-hidden ${className}`}
      style={
        {
          "--mouse-x": "0.5",
          "--mouse-y": "0.5",
        } as React.CSSProperties
      }
    >
      <div
        className="hero-glow"
        style={{
          left: "calc(var(--mouse-x) * 100%)",
          top: "calc(var(--mouse-y) * 100%)",
          transform: "translate(-50%, -50%)",
        }}
      ></div>
      {children}
    </div>
  )
}
