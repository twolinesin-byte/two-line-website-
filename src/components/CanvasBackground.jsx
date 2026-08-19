import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

function Likova3DScene() {
  const groupRef = useRef()

  useFrame((state, delta) => {
    if (!groupRef.current) return
    const clampedDelta = Math.min(delta, 0.05)
    // Smooth continuous rotation
    groupRef.current.rotation.y += clampedDelta * 0.025
    groupRef.current.rotation.x += clampedDelta * 0.008
    
    // Parallax mouse interaction
    const targetX = state.pointer.x * 0.3
    const targetY = state.pointer.y * 0.3
    groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.025
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.025
  })

  // Ambient floating particles (reduced count for max smooth performance)
  const count = 100
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
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1.2} color="#c4a47c" />

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
        <pointsMaterial size={0.05} color="#c4a47c" transparent opacity={0.3} sizeAttenuation={true} />
      </points>

      {/* Architectural Geodesic Wireframe Overlay */}
      <mesh position={[0, 0, -2]}>
        <icosahedronGeometry args={[13, 1]} />
        <meshBasicMaterial color="#c4a47c" wireframe transparent opacity={0.04} />
      </mesh>
      
      {/* Sleek Concentric Torus Rings */}
      <mesh rotation={[Math.PI / 3, Math.PI / 6, 0]}>
        <torusGeometry args={[9, 0.02, 12, 60]} />
        <meshBasicMaterial color="#c4a47c" transparent opacity={0.18} />
      </mesh>

      <mesh rotation={[-Math.PI / 4, Math.PI / 3, 0]}>
        <torusGeometry args={[11.5, 0.012, 12, 60]} />
        <meshBasicMaterial color="#f5f3ef" transparent opacity={0.12} />
      </mesh>
    </group>
  )
}

export default function CanvasBackground() {
  return (
    <div className="canvas-container" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, pointerEvents: 'none', willChange: 'transform' }}>
      <Canvas
        dpr={[1, 1.5]}
        gl={{ powerPreference: 'high-performance', antialias: true, alpha: true }}
        camera={{ position: [0, 0, 18], fov: 45 }}
      >
        <fog attach="fog" args={['#0d0b0a', 12, 34]} />
        <Likova3DScene />
      </Canvas>
    </div>
  )
}


