import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

function AbstractLines() {
  const groupRef = useRef()

  useFrame((state, delta) => {
    groupRef.current.rotation.y += delta * 0.05
    groupRef.current.rotation.x += delta * 0.02
  })

  // Create an array of abstract architectural lines
  const lines = []
  const count = 50
  for (let i = 0; i < count; i++) {
    const points = []
    points.push(new THREE.Vector3((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10))
    points.push(new THREE.Vector3((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10))
    
    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    lines.push(
      <line key={i} geometry={geometry}>
        <lineBasicMaterial color="#c4a47c" opacity={0.15} transparent linewidth={1} />
      </line>
    )
  }

  return (
    <group ref={groupRef}>
      {lines}
      
      {/* Some abstract architectural planes */}
      <mesh position={[2, 0, -2]} rotation={[0, Math.PI / 4, 0]}>
        <planeGeometry args={[4, 6]} />
        <meshBasicMaterial color="#c4a47c" opacity={0.03} transparent side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[-2, 1, 1]} rotation={[Math.PI / 3, 0, 0]}>
        <planeGeometry args={[5, 5]} />
        <meshBasicMaterial color="#f5f3ef" opacity={0.02} transparent side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

export default function CanvasBackground() {
  return (
    <div className="canvas-container" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }}>
      <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
        <fog attach="fog" args={['#0d0b0a', 10, 25]} />
        <ambientLight intensity={0.5} />
        <AbstractLines />
      </Canvas>
    </div>
  )
}
