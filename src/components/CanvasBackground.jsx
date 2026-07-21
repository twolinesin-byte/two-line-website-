import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

function ElegantStructure() {
  const groupRef = useRef()

  useFrame((state, delta) => {
    // Extremely slow, majestic rotation suitable for a luxury/professional feel
    groupRef.current.rotation.y += delta * 0.02
    groupRef.current.rotation.x += delta * 0.01
  })

  return (
    <group ref={groupRef}>
      {/* Outer Geodesic Sphere (Architectural feel) */}
      <mesh>
        <icosahedronGeometry args={[14, 2]} />
        <meshBasicMaterial color="#c4a47c" wireframe transparent opacity={0.06} />
      </mesh>
      
      {/* Inner Structural Ring 1 */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[8, 0.02, 16, 100]} />
        <meshBasicMaterial color="#c4a47c" transparent opacity={0.15} />
      </mesh>

      {/* Inner Structural Ring 2 */}
      <mesh rotation={[0, Math.PI / 3, Math.PI / 4]}>
        <torusGeometry args={[10, 0.01, 16, 100]} />
        <meshBasicMaterial color="#f5f3ef" transparent opacity={0.1} />
      </mesh>
    </group>
  )
}

export default function CanvasBackground() {
  return (
    <div className="canvas-container" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 20], fov: 45 }}>
        {/* Fog fades out the geometry smoothly at the edges */}
        <fog attach="fog" args={['#0d0b0a', 15, 30]} />
        <ElegantStructure />
      </Canvas>
    </div>
  )
}
