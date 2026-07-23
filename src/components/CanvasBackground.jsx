import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

function Likova3DScene() {
  const groupRef = useRef()

  useFrame((state, delta) => {
    // Smooth continuous rotation
    groupRef.current.rotation.y += delta * 0.05
    groupRef.current.rotation.x += delta * 0.02
    
    // Parallax mouse interaction like Likova.space
    const targetX = state.pointer.x * 0.6
    const targetY = state.pointer.y * 0.6
    groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.04
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.04
  })

  // Ambient floating particles
  const count = 180
  const [positions] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30
    }
    return [pos]
  }, [count])

  return (
    <group ref={groupRef}>
      {/* Floating Dust / Ambient Points */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.07} color="#c4a47c" transparent opacity={0.45} sizeAttenuation={true} />
      </points>

      {/* Main Architectural Geodesic Sphere */}
      <mesh position={[0, 0, -2]}>
        <icosahedronGeometry args={[13, 2]} />
        <meshBasicMaterial color="#c4a47c" wireframe transparent opacity={0.08} />
      </mesh>
      
      {/* Sleek Concentric Torus Rings */}
      <mesh rotation={[Math.PI / 3, Math.PI / 6, 0]}>
        <torusGeometry args={[9, 0.025, 16, 120]} />
        <meshBasicMaterial color="#c4a47c" transparent opacity={0.25} />
      </mesh>

      <mesh rotation={[-Math.PI / 4, Math.PI / 3, 0]}>
        <torusGeometry args={[11.5, 0.015, 16, 120]} />
        <meshBasicMaterial color="#f5f3ef" transparent opacity={0.18} />
      </mesh>

      {/* Secondary Abstract Floating Cuboid Structures */}
      <mesh position={[7, -5, -6]} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <boxGeometry args={[3, 9, 3]} />
        <meshBasicMaterial color="#c4a47c" wireframe transparent opacity={0.1} />
      </mesh>

      <mesh position={[-8, 6, -7]} rotation={[0, Math.PI / 3, Math.PI / 6]}>
        <octahedronGeometry args={[4.5]} />
        <meshBasicMaterial color="#f5f3ef" wireframe transparent opacity={0.08} />
      </mesh>
    </group>
  )
}

export default function CanvasBackground() {
  return (
    <div className="canvas-container" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 18], fov: 45 }}>
        <fog attach="fog" args={['#0d0b0a', 12, 34]} />
        <Likova3DScene />
      </Canvas>
    </div>
  )
}
