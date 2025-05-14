"use client"

import type React from "react"

import { useState, useEffect } from "react"

interface ResponsiveContainerProps {
  children: React.ReactNode
  className?: string
  aspectRatio?: string
  maxHeight?: string
}

export function ResponsiveContainer({
  children,
  className = "",
  aspectRatio = "16/9",
  maxHeight = "600px",
}: ResponsiveContainerProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div
      className={`w-full ${className}`}
      style={{
        aspectRatio,
        maxHeight,
      }}
    >
      {children}
    </div>
  )
}
