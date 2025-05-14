"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Box, Environment } from "@react-three/drei"
import type { Group } from "three"

function BlockchainCube() {
  const cubeRef = useRef<Group>(null)

  useFrame((state) => {
    if (!cubeRef.current) return
    cubeRef.current.rotation.y += 0.005
    cubeRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1
  })

  return (
    <group ref={cubeRef}>
      {/* Main cube */}
      <Box args={[1.5, 1.5, 1.5]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#7c3aed" metalness={0.8} roughness={0.2} />
      </Box>

      {/* Connection nodes */}
      {[...Array(8)].map((_, i) => {
        const x = i % 2 === 0 ? -0.8 : 0.8
        const y = i < 4 ? -0.8 : 0.8
        const z = i % 4 < 2 ? -0.8 : 0.8

        return (
          <Box key={i} args={[0.1, 0.1, 0.1]} position={[x, y, z]}>
            <meshStandardMaterial color="#3b82f6" metalness={1} roughness={0.2} />
          </Box>
        )
      })}
    </group>
  )
}

export function BlockchainCube3D({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full h-[400px] ${className}`}>
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <BlockchainCube />
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}
