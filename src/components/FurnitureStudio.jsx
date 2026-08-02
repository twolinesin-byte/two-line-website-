import React, { useState, useRef, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { motion, AnimatePresence } from 'framer-motion'
import { RotateCw, Upload, RefreshCw, Box, Sparkles, Info, Check } from 'lucide-react'

// Material Presets
const MATERIAL_FINISHES = [
  { id: 'walnut', name: 'Warm Walnut', color: '#4a3425', roughness: 0.5, metalness: 0.1 },
  { id: 'obsidian', name: 'Obsidian Matte', color: '#1c1c1e', roughness: 0.3, metalness: 0.6 },
  { id: 'cream', name: 'Bouclé Velvet', color: '#e6ded4', roughness: 0.8, metalness: 0.05 },
  { id: 'brass', name: 'Brushed Brass', color: '#c4a47c', roughness: 0.25, metalness: 0.9 },
  { id: 'terracotta', name: 'Raw Terracotta', color: '#a04832', roughness: 0.75, metalness: 0.0 }
]

// Lighting Presets
const LIGHTING_MODES = [
  { id: 'studio', name: 'Studio Neutral', ambient: 0.6, dir: 1.2, bg: '#0c0a09' },
  { id: 'warm', name: 'Golden Hour', ambient: 0.8, dir: 1.5, dirColor: '#ffdfb3', bg: '#140f0c' },
  { id: 'blueprint', name: 'Cyber Minimal', ambient: 0.4, dir: 1.0, dirColor: '#c4a47c', bg: '#07090e' }
]

// Procedural 3D Furniture Presets
function AtelierLoungeChair({ finish, wireframe }) {
  const matProps = {
    color: finish.color,
    roughness: finish.roughness,
    metalness: finish.metalness,
    wireframe
  }

  const woodProps = {
    color: '#3d2b1f',
    roughness: 0.4,
    wireframe
  }

  return (
    <group position={[0, 0, 0]}>
      {/* Seat Cushion */}
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.4, 0.22, 1.4]} />
        <meshStandardMaterial {...matProps} />
      </mesh>
      {/* Backrest */}
      <mesh position={[0, 1.0, -0.6]} rotation={[-0.15, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.4, 0.9, 0.2]} />
        <meshStandardMaterial {...matProps} />
      </mesh>
      {/* Armrests */}
      <mesh position={[-0.72, 0.75, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.1, 0.1, 1.4]} />
        <meshStandardMaterial {...woodProps} />
      </mesh>
      <mesh position={[0.72, 0.75, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.1, 0.1, 1.4]} />
        <meshStandardMaterial {...woodProps} />
      </mesh>
      {/* Wooden Legs */}
      {[-0.6, 0.6].map((x, i) =>
        [-0.55, 0.55].map((z, j) => (
          <mesh key={`${i}-${j}`} position={[x, 0.18, z]} castShadow>
            <cylinderGeometry args={[0.04, 0.025, 0.45, 16]} />
            <meshStandardMaterial {...woodProps} />
          </mesh>
        ))
      )}
    </group>
  )
}

function MonolithDesk({ finish, wireframe }) {
  const matProps = {
    color: finish.color,
    roughness: finish.roughness,
    metalness: finish.metalness,
    wireframe
  }

  const brassProps = {
    color: '#c4a47c',
    metalness: 0.85,
    roughness: 0.2,
    wireframe
  }

  return (
    <group position={[0, 0, 0]}>
      {/* Main Table Top */}
      <mesh position={[0, 0.85, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.4, 0.12, 1.1]} />
        <meshStandardMaterial {...matProps} />
      </mesh>
      {/* Side Slab / Base Legs */}
      <mesh position={[-1.05, 0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.1, 0.8, 0.9]} />
        <meshStandardMaterial {...brassProps} />
      </mesh>
      <mesh position={[1.05, 0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.1, 0.8, 0.9]} />
        <meshStandardMaterial {...brassProps} />
      </mesh>
      {/* Drawer Accent Panel */}
      <mesh position={[0.4, 0.72, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.0, 0.14, 0.95]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} wireframe={wireframe} />
      </mesh>
    </group>
  )
}

function SculpturalChair({ finish, wireframe }) {
  const matProps = {
    color: finish.color,
    roughness: finish.roughness,
    metalness: finish.metalness,
    wireframe
  }

  return (
    <group position={[0, 0, 0]}>
      {/* Round Seat */}
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.65, 0.65, 0.14, 32]} />
        <meshStandardMaterial {...matProps} />
      </mesh>
      {/* Curved Tubular Backrest */}
      <mesh position={[0, 0.95, -0.4]} rotation={[0.2, 0, 0]} castShadow receiveShadow>
        <torusGeometry args={[0.55, 0.08, 16, 32, Math.PI]} />
        <meshStandardMaterial {...matProps} />
      </mesh>
      {/* 3 Tripod Legs */}
      {[0, (Math.PI * 2) / 3, (Math.PI * 4) / 3].map((angle, idx) => {
        const r = 0.45
        const x = Math.cos(angle) * r
        const z = Math.sin(angle) * r
        return (
          <mesh key={idx} position={[x, 0.22, z]} rotation={[0.1 * Math.sin(angle), 0, -0.1 * Math.cos(angle)]} castShadow>
            <cylinderGeometry args={[0.035, 0.02, 0.44, 16]} />
            <meshStandardMaterial {...matProps} />
          </mesh>
        )
      })}
    </group>
  )
}

function ArcFloorLamp({ finish, wireframe }) {
  const matProps = {
    color: finish.color,
    roughness: finish.roughness,
    metalness: finish.metalness,
    wireframe
  }

  return (
    <group position={[0, -0.2, 0]}>
      {/* Marble Base */}
      <mesh position={[0, 0.06, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.45, 0.45, 0.12, 32]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.2} metalness={0.1} wireframe={wireframe} />
      </mesh>
      {/* Vertical Stem */}
      <mesh position={[0, 0.9, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 1.6, 16]} />
        <meshStandardMaterial {...matProps} />
      </mesh>
      {/* Overarching Curved Arm */}
      <mesh position={[0.3, 1.75, 0]} rotation={[0, 0, -Math.PI / 4]} castShadow>
        <torusGeometry args={[0.4, 0.018, 16, 32, Math.PI * 0.8]} />
        <meshStandardMaterial {...matProps} />
      </mesh>
      {/* Dome Shade */}
      <mesh position={[0.55, 1.5, 0]} rotation={[Math.PI, 0, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.25, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial {...matProps} side={THREE.DoubleSide} />
      </mesh>
      {/* Soft Glow Bulb */}
      <pointLight position={[0.55, 1.45, 0]} intensity={1.8} color="#ffe8d6" distance={3} />
    </group>
  )
}

// Loaded Custom Model (GLB/GLTF/OBJ) Loader component
function LoadedModel({ url, fileType, wireframe }) {
  const [scene, setScene] = useState(null)

  useEffect(() => {
    if (!url) return

    if (fileType === 'obj') {
      const loader = new OBJLoader()
      loader.load(
        url,
        (obj) => {
          const box = new THREE.Box3().setFromObject(obj)
          const size = box.getSize(new THREE.Vector3())
          const maxDim = Math.max(size.x, size.y, size.z)
          const scale = maxDim > 0 ? 1.8 / maxDim : 1
          obj.scale.setScalar(scale)

          const center = box.getCenter(new THREE.Vector3())
          obj.position.sub(center.multiplyScalar(scale))
          obj.position.y += (size.y * scale) / 2

          obj.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = true
              child.receiveShadow = true
              if (child.material) {
                child.material.wireframe = wireframe
              }
            }
          })
          setScene(obj)
        },
        undefined,
        (err) => console.error('Error loading OBJ file:', err)
      )
    } else {
      const loader = new GLTFLoader()
      loader.load(
        url,
        (gltf) => {
          const loadedScene = gltf.scene
          const box = new THREE.Box3().setFromObject(loadedScene)
          const size = box.getSize(new THREE.Vector3())
          const maxDim = Math.max(size.x, size.y, size.z)
          const scale = maxDim > 0 ? 1.8 / maxDim : 1
          loadedScene.scale.setScalar(scale)

          const center = box.getCenter(new THREE.Vector3())
          loadedScene.position.sub(center.multiplyScalar(scale))
          loadedScene.position.y += (size.y * scale) / 2

          loadedScene.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = true
              child.receiveShadow = true
              if (child.material) {
                child.material.wireframe = wireframe
              }
            }
          })
          setScene(loadedScene)
        },
        undefined,
        (err) => console.error('Error loading GLTF file:', err)
      )
    }
  }, [url, fileType, wireframe])

  return scene ? <primitive object={scene} /> : null
}

// Main 3D Rotary Stage
function Rotary3DStage({ selectedPreset, customModel, finish, wireframe, lightingMode, autoRotate, controlsRef }) {
  const lighting = LIGHTING_MODES.find((l) => l.id === lightingMode) || LIGHTING_MODES[0]

  return (
    <>
      <ambientLight intensity={lighting.ambient} />
      <directionalLight
        position={[8, 12, 8]}
        intensity={lighting.dir}
        color={lighting.dirColor || '#ffffff'}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <directionalLight position={[-8, 6, -8]} intensity={0.4} color="#a0b0d0" />

      {/* Render Model */}
      {customModel ? (
        <LoadedModel url={customModel.url} fileType={customModel.fileType} finish={finish} wireframe={wireframe} />
      ) : (
        <>
          {selectedPreset === 'chair' && <AtelierLoungeChair finish={finish} wireframe={wireframe} />}
          {selectedPreset === 'desk' && <MonolithDesk finish={finish} wireframe={wireframe} />}
          {selectedPreset === 'sculptural' && <SculpturalChair finish={finish} wireframe={wireframe} />}
          {selectedPreset === 'lamp' && <ArcFloorLamp finish={finish} wireframe={wireframe} />}
        </>
      )}

      {/* Floor Shadow */}
      <ContactShadows position={[0, -0.01, 0]} opacity={0.65} scale={10} blur={1.5} far={4} color="#000000" />

      {/* 360° Rotary Orbit Controls */}
      <OrbitControls
        ref={controlsRef}
        autoRotate={autoRotate}
        autoRotateSpeed={2.5}
        enableDamping
        dampingFactor={0.05}
        minDistance={1.8}
        maxDistance={6.0}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.05}
      />
    </>
  )
}

export default function FurnitureStudio() {
  const [selectedPreset, setSelectedPreset] = useState('chair')
  const [customModel, setCustomModel] = useState(null)
  const [selectedFinish, setSelectedFinish] = useState(MATERIAL_FINISHES[0])
  const [lightingMode, setLightingMode] = useState('studio')
  const [wireframe, setWireframe] = useState(false)
  const [autoRotate, setAutoRotate] = useState(true)
  const [showSkpHelp, setShowSkpHelp] = useState(false)

  const fileInputRef = useRef(null)
  const controlsRef = useRef(null)

  const activeLighting = LIGHTING_MODES.find((l) => l.id === lightingMode) || LIGHTING_MODES[0]

  // Handle Upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const ext = file.name.split('.').pop().toLowerCase()
    if (ext === 'skp') {
      setShowSkpHelp(true)
      return
    }

    if (!['glb', 'gltf', 'obj'].includes(ext)) {
      alert('Please upload a .glb, .gltf, or .obj file (or convert your SketchUp .skp file).')
      return
    }

    const objectUrl = URL.createObjectURL(file)
    setCustomModel({
      url: objectUrl,
      fileName: file.name,
      fileType: ext
    })
  }

  const handleResetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset()
    }
  }

  const clearCustomModel = () => {
    if (customModel && customModel.url) {
      URL.revokeObjectURL(customModel.url)
    }
    setCustomModel(null)
  }

  return (
    <section id="furniture" className="furniture-studio-section" style={{ position: 'relative', padding: '6rem 5%', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      {/* Title Header */}
      <div style={{ maxWidth: '800px', marginBottom: '3rem' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="line-accent" style={{ height: '3px', width: '60px', marginBottom: '1.2rem', backgroundColor: '#c4a47c' }}></div>
          <span style={{ textTransform: 'uppercase', letterSpacing: '0.25em', fontSize: '0.85rem', color: '#c4a47c', fontWeight: 600 }}>
            3D Interactive Showcase
          </span>
          <h2 className="text-huge" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.8rem)', margin: '0.5rem 0 1rem 0' }}>
            FURNITURE ROTARY STUDIO
          </h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1.05rem', lineHeight: '1.6' }}>
            Inspect architectural furniture pieces in 360° rotation. Choose from custom designer presets or upload your 3D models (exported from SketchUp, Blender, or Rhino).
          </p>
        </motion.div>
      </div>

      {/* 3D Canvas Box */}
      <div className="studio-canvas-card" style={{ position: 'relative', width: '100%', height: '70vh', minHeight: '520px', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.15)', background: activeLighting.bg, boxShadow: '0 30px 60px rgba(0,0,0,0.6)', transition: 'background 0.5s ease' }}>
        
        <Canvas camera={{ position: [2.5, 2.0, 3.2], fov: 45 }} shadows>
          <Rotary3DStage
            selectedPreset={selectedPreset}
            customModel={customModel}
            finish={selectedFinish}
            wireframe={wireframe}
            lightingMode={lightingMode}
            autoRotate={autoRotate}
            controlsRef={controlsRef}
          />
        </Canvas>

        {/* 360 Badge */}
        <div style={{ position: 'absolute', top: '24px', left: '24px', pointerEvents: 'none', zIndex: 10, display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(15, 15, 20, 0.65)', backdropFilter: 'blur(12px)', padding: '8px 16px', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.12)' }}>
          <RotateCw size={16} color="#c4a47c" />
          <span style={{ fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#e5e5e5', fontWeight: 500 }}>
            360° Rotary View • Drag to Orbit
          </span>
        </div>

        {/* Presets & Upload Controls (Top Right) */}
        <div style={{ position: 'absolute', top: '24px', right: '24px', zIndex: 10, display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          {!customModel && [
            { id: 'chair', label: 'Lounge Chair' },
            { id: 'desk', label: 'Monolith Desk' },
            { id: 'sculptural', label: 'Dining Chair' },
            { id: 'lamp', label: 'Arc Floor Lamp' }
          ].map((preset) => (
            <button
              key={preset.id}
              onClick={() => setSelectedPreset(preset.id)}
              style={{
                background: selectedPreset === preset.id ? 'rgba(196, 164, 124, 0.9)' : 'rgba(20, 20, 25, 0.75)',
                color: selectedPreset === preset.id ? '#000' : '#fff',
                border: '1px solid rgba(255,255,255,0.2)',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.2s ease'
              }}
            >
              {preset.label}
            </button>
          ))}

          {/* Upload Button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            style={{
              background: customModel ? 'linear-gradient(135deg, #c4a47c 0%, #8c6d46 100%)' : 'rgba(255, 255, 255, 0.12)',
              color: customModel ? '#000' : '#fff',
              border: '1px solid rgba(255,255,255,0.3)',
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backdropFilter: 'blur(12px)'
            }}
          >
            <Upload size={14} />
            {customModel ? `Uploaded: ${customModel.fileName}` : 'Upload 3D / SketchUp Model'}
          </button>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".glb,.gltf,.obj,.skp"
            style={{ display: 'none' }}
          />

          {customModel && (
            <button
              onClick={clearCustomModel}
              style={{
                background: 'rgba(220, 50, 50, 0.3)',
                color: '#ffaaaa',
                border: '1px solid rgba(255, 100, 100, 0.3)',
                padding: '8px 14px',
                borderRadius: '20px',
                fontSize: '0.82rem',
                cursor: 'pointer'
              }}
            >
              Clear Upload
            </button>
          )}

          {/* SketchUp (.skp) Export Help Button */}
          <button
            onClick={() => setShowSkpHelp(true)}
            title="SketchUp (.skp) Export Guide"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#c4a47c',
              border: '1px solid rgba(196, 164, 124, 0.4)',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <Info size={16} />
          </button>
        </div>

        {/* Bottom Controls Toolbar */}
        <div style={{ position: 'absolute', bottom: '24px', left: '50%', transform: 'translateX(-50%)', zIndex: 10, width: 'calc(100% - 48px)', maxWidth: '900px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', background: 'rgba(15, 15, 20, 0.75)', backdropFilter: 'blur(16px)', padding: '12px 24px', borderRadius: '24px', border: '1px solid rgba(255, 255, 255, 0.15)', boxShadow: '0 12px 32px rgba(0,0,0,0.5)' }}>
          
          {/* Material Swatches */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>
              Finish:
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              {MATERIAL_FINISHES.map((finish) => (
                <button
                  key={finish.id}
                  onClick={() => setSelectedFinish(finish)}
                  title={finish.name}
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    backgroundColor: finish.color,
                    border: selectedFinish.id === finish.id ? '2px solid #c4a47c' : '1px solid rgba(255,255,255,0.3)',
                    cursor: 'pointer',
                    boxShadow: selectedFinish.id === finish.id ? '0 0 10px rgba(196, 164, 124, 0.8)' : 'none',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {selectedFinish.id === finish.id && <Check size={12} color={finish.id === 'cream' || finish.id === 'brass' ? '#000' : '#fff'} />}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              style={{
                background: autoRotate ? 'rgba(196, 164, 124, 0.25)' : 'rgba(255, 255, 255, 0.08)',
                color: autoRotate ? '#c4a47c' : '#aaa',
                border: '1px solid rgba(255,255,255,0.15)',
                padding: '6px 14px',
                borderRadius: '16px',
                fontSize: '0.78rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <RotateCw size={13} />
              Auto-Rotary: {autoRotate ? 'ON' : 'OFF'}
            </button>

            <button
              onClick={() => setWireframe(!wireframe)}
              style={{
                background: wireframe ? 'rgba(196, 164, 124, 0.25)' : 'rgba(255, 255, 255, 0.08)',
                color: wireframe ? '#c4a47c' : '#aaa',
                border: '1px solid rgba(255,255,255,0.15)',
                padding: '6px 14px',
                borderRadius: '16px',
                fontSize: '0.78rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Box size={13} />
              Wireframe: {wireframe ? 'ON' : 'OFF'}
            </button>

            <div style={{ display: 'flex', background: 'rgba(255,255,255,0.06)', padding: '3px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
              {LIGHTING_MODES.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setLightingMode(mode.id)}
                  style={{
                    background: lightingMode === mode.id ? 'rgba(196, 164, 124, 0.8)' : 'transparent',
                    color: lightingMode === mode.id ? '#000' : '#aaa',
                    border: 'none',
                    padding: '4px 10px',
                    borderRadius: '12px',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  {mode.name.split(' ')[0]}
                </button>
              ))}
            </div>

            <button
              onClick={handleResetCamera}
              title="Reset 3D Camera View"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.15)',
                padding: '6px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <RefreshCw size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* SketchUp Export Guidance Modal */}
      <AnimatePresence>
        {showSkpHelp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 1000,
              background: 'rgba(0, 0, 0, 0.85)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}
            onClick={() => setShowSkpHelp(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: '#141419',
                border: '1px solid rgba(196, 164, 124, 0.4)',
                borderRadius: '24px',
                padding: '2.5rem',
                maxWidth: '560px',
                width: '100%',
                boxShadow: '0 25px 50px rgba(0,0,0,0.8)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.2rem' }}>
                <div style={{ background: 'rgba(196, 164, 124, 0.15)', padding: '10px', borderRadius: '12px', color: '#c4a47c' }}>
                  <Sparkles size={24} />
                </div>
                <h3 style={{ fontSize: '1.4rem', color: '#fff', margin: 0 }}>
                  How to Use SketchUp (.skp) Models
                </h3>
              </div>

              <p style={{ color: '#ccc', lineHeight: '1.6', fontSize: '0.95rem' }}>
                Native SketchUp <code style={{ color: '#c4a47c', background: 'rgba(255,255,255,0.08)', padding: '2px 6px', borderRadius: '4px' }}>.skp</code> files use a proprietary desktop format. To view your SketchUp furniture models in 360° rotary mode:
              </p>

              <ol style={{ color: '#ddd', paddingLeft: '1.2rem', lineHeight: '1.8', margin: '1rem 0', fontSize: '0.92rem' }}>
                <li>Open your model in <strong>Trimble SketchUp</strong>.</li>
                <li>Go to <strong>File → Export → 3D Model...</strong></li>
                <li>Choose <strong>GLTF / GLB (.glb)</strong> or <strong>OBJ (.obj)</strong> format.</li>
                <li>Click <strong>Upload 3D / SketchUp Model</strong> button in our studio to preview it immediately!</li>
              </ol>

              <div style={{ background: 'rgba(196, 164, 124, 0.08)', borderLeft: '4px solid #c4a47c', padding: '12px 16px', borderRadius: '8px', marginBottom: '1.8rem', fontSize: '0.85rem', color: '#e5e5e5' }}>
                💡 <em>Tip: GLB / GLTF exports preserve your SketchUp materials, textures, and dimensions for 3D rotary viewing.</em>
              </div>

              <button
                onClick={() => setShowSkpHelp(false)}
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #c4a47c 0%, #9e7f57 100%)',
                  color: '#000',
                  fontWeight: 700,
                  padding: '12px',
                  borderRadius: '12px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.95rem'
                }}
              >
                Got It, Continue
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
