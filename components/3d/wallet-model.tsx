"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, ContactShadows, OrbitControls, Box, Sphere } from "@react-three/drei"
import type { Group } from "three"

// Simple wallet model made with primitives
function WalletModel(props: any) {
  const group = useRef<Group>(null)

  // Animation
  useFrame((state) => {
    if (!group.current) return
    group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2 + state.clock.getElapsedTime() * 0.2
    group.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1
  })

  return (
    <group ref={group} {...props}>
      {/* Wallet base */}
      <Box args={[1.5, 0.2, 2]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#7c3aed" metalness={0.5} roughness={0.2} />
      </Box>

      {/* Credit card */}
      <Box args={[1.2, 0.05, 0.8]} position={[0, 0.15, 0.2]}>
        <meshStandardMaterial color="#3b82f6" metalness={0.8} roughness={0.1} />
      </Box>

      {/* Coins */}
      <Sphere args={[0.2]} position={[0.5, 0.2, -0.5]}>
        <meshStandardMaterial color="#f59e0b" metalness={0.9} roughness={0.1} />
      </Sphere>
      <Sphere args={[0.15]} position={[-0.4, 0.15, -0.4]}>
        <meshStandardMaterial color="#f59e0b" metalness={0.9} roughness={0.1} />
      </Sphere>
    </group>
  )
}

export function Wallet3D({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full h-[400px] ${className}`}>
      <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />

        {/* Use the wallet model made with primitives */}
        <WalletModel position={[0, 0, 0]} scale={1} />

        <Environment preset="city" />
        <ContactShadows position={[0, -1, 0]} opacity={0.4} scale={5} blur={2.5} far={4} />
        <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 3} maxPolarAngle={Math.PI / 2} />
      </Canvas>
    </div>
  )
}
