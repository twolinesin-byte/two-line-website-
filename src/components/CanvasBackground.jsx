import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

function LiquidGlassBlob({ position = [0, 0, -2], radius = 3.5, color = "#c4a47c" }) {
  const meshRef = useRef()
  const geometryRef = useRef()

  // Store initial vertex positions for wave distortion
  const initialPositions = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(radius, 32)
    return geo.attributes.position.clone()
  }, [radius])

  useFrame((state) => {
    if (!geometryRef.current) return
    const time = state.clock.getElapsedTime()
    const pos = geometryRef.current.attributes.position

    for (let i = 0; i < pos.count; i++) {
      const u = initialPositions.getX(i)
      const v = initialPositions.getY(i)
      const w = initialPositions.getZ(i)

      // Organic liquid glass wave math distortion
      const wave = Math.sin(u * 0.7 + time * 1.4) * 0.4 +
                   Math.cos(v * 0.8 + time * 1.1) * 0.4 +
                   Math.sin(w * 0.6 + time * 1.6) * 0.3

      const factor = 1 + wave * 0.1
      pos.setXYZ(i, u * factor, v * factor, w * factor)
    }

    pos.needsUpdate = true
    geometryRef.current.computeVertexNormals()

    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.06
      meshRef.current.rotation.x = time * 0.04
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <icosahedronGeometry ref={geometryRef} args={[radius, 32]} />
      <meshPhysicalMaterial
        color={color}
        roughness={0.12}
        transmission={0.92}
        thickness={2.2}
        ior={1.45}
        metalness={0.08}
        reflectivity={0.95}
        clearcoat={1.0}
        clearcoatRoughness={0.08}
        transparent
        opacity={0.8}
      />
    </mesh>
  )
}

function LiquidGlassDroplet({ position, radius, speed, color = "#f5f3ef" }) {
  const meshRef = useRef()
  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime() * speed
    meshRef.current.position.y = position[1] + Math.sin(time) * 0.8
    meshRef.current.position.x = position[0] + Math.cos(time * 0.7) * 0.5
    meshRef.current.rotation.z = time * 0.2
  })

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshPhysicalMaterial
        color={color}
        roughness={0.1}
        transmission={0.95}
        thickness={1.5}
        ior={1.5}
        reflectivity={0.9}
        transparent
        opacity={0.65}
      />
    </mesh>
  )
}

function Likova3DScene() {
  const groupRef = useRef()

  useFrame((state, delta) => {
    // Smooth continuous rotation
    groupRef.current.rotation.y += delta * 0.04
    groupRef.current.rotation.x += delta * 0.015
    
    // Parallax mouse interaction like Likova.space
    const targetX = state.pointer.x * 0.8
    const targetY = state.pointer.y * 0.8
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
      {/* Lights for glass refraction */}
      <ambientLight intensity={0.7} />
      <directionalLight position={[10, 10, 10]} intensity={1.8} color="#c4a47c" />
      <pointLight position={[-10, -10, 5]} intensity={1.5} color="#ffffff" />
      <pointLight position={[0, 8, -5]} intensity={1.2} color="#d4af37" />

      {/* Main Liquid Glass Organic Orb */}
      <LiquidGlassBlob position={[0, 0, -2]} radius={4.2} color="#c4a47c" />
      
      {/* Floating Secondary Liquid Droplets */}
      <LiquidGlassDroplet position={[-7, 4, -4]} radius={1.2} speed={0.8} color="#c4a47c" />
      <LiquidGlassDroplet position={[8, -3, -5]} radius={1.6} speed={0.6} color="#f5f3ef" />
      <LiquidGlassDroplet position={[5, 6, -6]} radius={1.0} speed={1.1} color="#c4a47c" />

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

      {/* Architectural Geodesic Wireframe Overlay */}
      <mesh position={[0, 0, -2]}>
        <icosahedronGeometry args={[13, 2]} />
        <meshBasicMaterial color="#c4a47c" wireframe transparent opacity={0.06} />
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
        <meshBasicMaterial color="#c4a47c" wireframe transparent opacity={0.08} />
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

