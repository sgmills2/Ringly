import { useRef, useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh, TorusGeometry, RingGeometry, Color, Vector2, TextureLoader, NearestFilter, CylinderGeometry } from 'three'
import { Environment, AccumulativeShadows, RandomizedLight, ContactShadows } from '@react-three/drei'
import { useRingStore } from '@/stores/ringStore'

// Base64 textures
const brushedTexture = new TextureLoader().load(
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAGklEQVQYV2NkYGD4z4AGGBkZGRiJUkBzBQMDABH0A/0GlpuUAAAAAElFTkSuQmCC'
)

const hammeredTexture = new TextureLoader().load(
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAGklEQVQYV2NkYGD4z4AGGBkZGRiJUkBzBQMDABH0A/0GlpuUAAAAAElFTkSuQmCC'
)

// Configure textures
brushedTexture.minFilter = NearestFilter
hammeredTexture.minFilter = NearestFilter

export default function RingViewer() {
  const meshRef = useRef<Mesh>(null)
  const { 
    metalColor, 
    stoneColor, 
    ringSize, 
    bandWidth, 
    bandShape,
    metalFinish,
    environment,
    settingType 
  } = useRingStore()

  // Material properties based on finish
  const materialProps = useMemo(() => {
    const baseProps = {
      color: new Color(metalColor),
      metalness: 1,
      envMapIntensity: 2,
      clearcoat: 0.5,
      clearcoatRoughness: 0.1,
    }

    switch (metalFinish) {
      case 'polished':
        return {
          ...baseProps,
          roughness: 0.1,
          clearcoat: 0.8,
        }
      case 'brushed':
        return {
          ...baseProps,
          roughness: 0.4,
          normalMap: brushedTexture,
          normalScale: new Vector2(0.5, 0.5),
        }
      case 'hammered':
        return {
          ...baseProps,
          roughness: 0.5,
          normalMap: hammeredTexture,
          normalScale: new Vector2(1, 1),
        }
      case 'matte':
        return {
          ...baseProps,
          roughness: 0.7,
          clearcoat: 0.2,
        }
      default:
        return baseProps
    }
  }, [metalColor, metalFinish])

  const getSetting = () => {
    const stoneHeight = 0.3
    const baseHeight = 0.15
    const baseWidth = bandWidth * 2

    switch (settingType) {
      case 'prong-4':
        return (
          <group position={[0, bandWidth * 1.5, 0]}>
            {/* Base */}
            <mesh position={[0, 0, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[baseWidth, baseWidth * 0.8, baseHeight, 32]} />
              <meshPhysicalMaterial {...materialProps} />
            </mesh>
            {/* Prongs */}
            {[0, 90, 180, 270].map((angle) => (
              <mesh
                key={angle}
                position={[
                  Math.cos((angle * Math.PI) / 180) * baseWidth * 0.5,
                  stoneHeight / 2,
                  Math.sin((angle * Math.PI) / 180) * baseWidth * 0.5
                ]}
                rotation={[0, 0, (angle * Math.PI) / 180]}
                castShadow
              >
                <cylinderGeometry args={[0.03, 0.03, stoneHeight, 8]} />
                <meshPhysicalMaterial {...materialProps} />
              </mesh>
            ))}
          </group>
        )
      case 'prong-6':
        return (
          <group position={[0, bandWidth * 1.5, 0]}>
            <mesh position={[0, 0, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[baseWidth, baseWidth * 0.8, baseHeight, 32]} />
              <meshPhysicalMaterial {...materialProps} />
            </mesh>
            {[0, 60, 120, 180, 240, 300].map((angle) => (
              <mesh
                key={angle}
                position={[
                  Math.cos((angle * Math.PI) / 180) * baseWidth * 0.5,
                  stoneHeight / 2,
                  Math.sin((angle * Math.PI) / 180) * baseWidth * 0.5
                ]}
                rotation={[0, 0, (angle * Math.PI) / 180]}
                castShadow
              >
                <cylinderGeometry args={[0.03, 0.03, stoneHeight, 8]} />
                <meshPhysicalMaterial {...materialProps} />
              </mesh>
            ))}
          </group>
        )
      case 'bezel':
        return (
          <group position={[0, bandWidth * 1.5, 0]}>
            <mesh position={[0, 0, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[baseWidth, baseWidth * 0.9, baseHeight, 32]} />
              <meshPhysicalMaterial {...materialProps} />
            </mesh>
            <mesh position={[0, stoneHeight / 2, 0]} castShadow>
              <cylinderGeometry args={[baseWidth * 0.6, baseWidth * 0.6, stoneHeight, 32]} />
              <meshPhysicalMaterial {...materialProps} />
            </mesh>
          </group>
        )
      case 'cathedral':
        return (
          <group position={[0, bandWidth * 1.5, 0]}>
            <mesh position={[0, 0, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[baseWidth, baseWidth * 0.8, baseHeight, 32]} />
              <meshPhysicalMaterial {...materialProps} />
            </mesh>
            {/* Cathedral arches */}
            {[-1, 1].map((side) => (
              <mesh
                key={side}
                position={[side * baseWidth * 0.4, stoneHeight / 4, 0]}
                rotation={[0, 0, side * Math.PI / 6]}
                castShadow
              >
                <cylinderGeometry args={[0.05, 0.05, stoneHeight * 1.2, 8]} />
                <meshPhysicalMaterial {...materialProps} />
              </mesh>
            ))}
          </group>
        )
      case 'trellis':
        return (
          <group position={[0, bandWidth * 1.5, 0]}>
            <mesh position={[0, 0, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[baseWidth, baseWidth * 0.8, baseHeight, 32]} />
              <meshPhysicalMaterial {...materialProps} />
            </mesh>
            {/* Trellis pattern */}
            {[0, 60, 120, 180, 240, 300].map((angle) => (
              <mesh
                key={angle}
                position={[
                  Math.cos((angle * Math.PI) / 180) * baseWidth * 0.4,
                  stoneHeight / 3,
                  Math.sin((angle * Math.PI) / 180) * baseWidth * 0.4
                ]}
                rotation={[
                  Math.PI / 6,
                  (angle * Math.PI) / 180,
                  Math.PI / 6
                ]}
                castShadow
              >
                <cylinderGeometry args={[0.03, 0.03, stoneHeight * 0.8, 8]} />
                <meshPhysicalMaterial {...materialProps} />
              </mesh>
            ))}
          </group>
        )
      default:
        return null
    }
  }

  useEffect(() => {
    if (meshRef.current) {
      const scale = 0.8 + (ringSize - 3) * 0.05
      meshRef.current.scale.setScalar(scale)
    }
  }, [ringSize])

  useFrame((_state, delta: number) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1
    }
  })

  const getBandGeometry = () => {
    const radius = 1
    const segments = 64

    switch (bandShape) {
      case 'flat':
        return <ringGeometry args={[radius - bandWidth/2, radius + bandWidth/2, segments]} />
      case 'knife-edge':
        return <torusGeometry args={[radius, bandWidth, 3, segments]} />
      case 'comfort-fit':
        return <torusGeometry args={[radius, bandWidth, segments/4, segments]} />
      default: // round
        return <torusGeometry args={[radius, bandWidth, segments/2, segments]} />
    }
  }

  return (
    <group>
      <Environment preset={environment} background blur={0.5} />
      
      {/* Main directional light */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-far={10}
        shadow-camera-near={0.1}
        shadow-camera-top={2}
        shadow-camera-bottom={-2}
        shadow-camera-left={-2}
        shadow-camera-right={2}
      />

      {/* Soft ambient light */}
      <ambientLight intensity={0.3} />

      {/* Contact shadows for realism */}
      <ContactShadows
        position={[0, -1, 0]}
        opacity={0.65}
        scale={10}
        blur={2}
        far={1}
      />
      
      {/* Ring band */}
      <mesh ref={meshRef} castShadow receiveShadow>
        {getBandGeometry()}
        <meshPhysicalMaterial {...materialProps} />
      </mesh>

      {/* Setting and Stone */}
      <group scale={meshRef.current?.scale.x || 1}>
        {getSetting()}
        <mesh position={[0, bandWidth * 2.5, 0]} castShadow>
          <octahedronGeometry args={[0.25, 2]} />
          <meshPhysicalMaterial
            color={new Color(stoneColor)}
            metalness={0}
            roughness={0.1}
            envMapIntensity={2}
            clearcoat={1}
            transmission={0.9}
            thickness={0.5}
            ior={2.4}
          />
        </mesh>
      </group>

      {/* Ground plane for shadows */}
      <mesh 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, -1, 0]} 
        receiveShadow
      >
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial 
          color="#f0f0f0"
          opacity={0.3}
          transparent
          depthWrite={false}
        />
      </mesh>
    </group>
  )
} 