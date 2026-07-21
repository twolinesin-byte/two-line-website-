import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

function AbstractParticles() {
  const groupRef = useRef()

  useFrame((state, delta) => {
    groupRef.current.rotation.y += delta * 0.15
    groupRef.current.rotation.x += delta * 0.08
  })

  // Create a particle system
  const count = 300
  const [positions] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 25
      positions[i * 3 + 1] = (Math.random() - 0.5) * 25
      positions[i * 3 + 2] = (Math.random() - 0.5) * 25
    }
    return [positions]
  }, [count])

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.08} color="#c4a47c" transparent opacity={0.8} sizeAttenuation={true} />
      </points>
      
      {/* Abstract architectural wireframes */}
      <mesh position={[3, -1, -3]} rotation={[0, Math.PI / 4, 0]}>
        <boxGeometry args={[2, 6, 2]} />
        <meshBasicMaterial color="#c4a47c" wireframe opacity={0.4} transparent />
      </mesh>
      <mesh position={[-4, 2, 1]} rotation={[Math.PI / 6, Math.PI / 3, 0]}>
        <boxGeometry args={[3, 3, 3]} />
        <meshBasicMaterial color="#f5f3ef" wireframe opacity={0.2} transparent />
      </mesh>
      <mesh position={[1, 4, -5]} rotation={[0, 0, Math.PI / 4]}>
        <octahedronGeometry args={[2]} />
        <meshBasicMaterial color="#c4a47c" wireframe opacity={0.3} transparent />
      </mesh>
    </group>
  )
}

export default function CanvasBackground() {
  return (
    <div className="canvas-container" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
        <fog attach="fog" args={['#0d0b0a', 5, 25]} />
        <ambientLight intensity={0.5} />
        <AbstractParticles />
      </Canvas>
    </div>
  )
}
