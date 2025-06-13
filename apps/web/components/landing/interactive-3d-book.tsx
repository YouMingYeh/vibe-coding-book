'use client'

import React, { useRef, useState, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, Box, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

function Book() {
  const bookRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  // Function to calculate scale based on window width
  const getScale = () => {
    if (typeof window === 'undefined') return 0.7 // Safe default for SSR
    if (window.innerWidth < 640) return 0.4      // Mobile
    if (window.innerWidth < 1024) return 0.6     // Tablet
    return 0.7                                   // Desktop
  }

  const [scale, setScale] = useState(() => getScale()) // Initialize with correct value

  useEffect(() => {
    const handleResize = () => {
      setScale(getScale())
    }

    // Set initial scale after component mounts
    // Use requestAnimationFrame to ensure it runs after the browser has painted
    let frameId = requestAnimationFrame(() => {
      setScale(getScale())
    })
    
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(frameId)
    }
  }, [])

  useFrame((state, delta) => {
    if (bookRef.current) {
      // Floating effect
      bookRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;

      // Smoothly adjust X rotation based on hover state for a tilt effect
      const targetXRotation = hovered ? 0.0 : 0.1;
      bookRef.current.rotation.x = THREE.MathUtils.lerp(bookRef.current.rotation.x, targetXRotation, delta * 5);

      // Adjust Y rotation: rotate to 0 on hover, otherwise slow continuous rotation
      if (hovered) {
        // Smoothly interpolate Y rotation to 0 (front-facing)
        bookRef.current.rotation.y = THREE.MathUtils.lerp(bookRef.current.rotation.y, 0, delta * 5); // Adjust speed (5) as needed
      } else {
        // Default slow rotation on Y axis
        bookRef.current.rotation.y += 0.002;
      }
    }
  })

  const bookSegmentSmoothness = 4; // Lower for sharper, higher for smoother rounded edges
  const bookRadius = 0.15; // Adjust for more or less rounding

  return (
    <group
      ref={bookRef}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
      onPointerOut={(e) => { e.stopPropagation(); setHovered(false); }}
      onClick={(e) => { e.stopPropagation(); setClicked(!clicked); }}
      scale={scale} // Responsive scaling
      rotation={[0.1, Math.PI / 7, 0]}
      position={[0, -0.1, 0]}
    >
      {/* Book Cover */}
      <RoundedBox
        args={[8.8, 12, 0.8]} // width, height, depth
        radius={bookRadius}
        smoothness={bookSegmentSmoothness}
        position={[0, 0, 0]}
      >
        <meshStandardMaterial color="#A8A29E" /> {/* stone-400 */}
      </RoundedBox>

      {/* Book Spine (thinner) */}
      <RoundedBox
        args={[0.8, 12, 2.8]}
        radius={bookRadius}
        smoothness={bookSegmentSmoothness}
        position={[-4.8, 0, -1.8]}
      >
        <meshStandardMaterial color="#78716C" /> {/* stone-500 */}
      </RoundedBox>

      {/* Back Cover (adjusted position for thinner book) */}
      <RoundedBox
        args={[8.8, 12, 0.6]}
        radius={bookRadius}
        smoothness={bookSegmentSmoothness}
        position={[0, 0, -3.5]}
      >
        <meshStandardMaterial color="#D6D3D1" /> {/* stone-300 */}
      </RoundedBox>

      {/* Pages (thinner) */}
      <RoundedBox
        args={[8.4, 11.6, 2.8]}
        radius={bookRadius}
        smoothness={bookSegmentSmoothness}
        position={[0.2, 0, -1.8]}
      >
        <meshStandardMaterial color="#F5F5F4" /> {/* stone-100 / off-white */}
      </RoundedBox>

      {/* Title on Cover */}
      <Text
        position={[0, 2.6, 0.44]}
        fontSize={0.75}
        color="#44403C" // stone-700 for good contrast
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.04}
        lineHeight={1}
        maxWidth={7}
      >
        VIBE CODING
      </Text>

      <Text
        position={[0, 1.2, 0.44]}
        fontSize={0.40}
        color="#57534E" // stone-600
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.02}
        lineHeight={1.2}
        maxWidth={7}
      >
        The Step-by-Step Guide
      </Text>

      {/* Decorative elements */}
      <Box
        args={[8, 0.12, 0.08, 8, 8, 8]}
        position={[0, 4, 0.48]}
      >
        <meshStandardMaterial color="#78716C" emissive="#78716C" emissiveIntensity={0.2} /> {/* Darker stone accent */}
      </Box>

      <Box
        args={[8, 0.12, 0.08, 8, 8, 8]}
        position={[0, -4, 0.48]}
      >
        <meshStandardMaterial color="#78716C" emissive="#78716C" emissiveIntensity={0.2} /> {/* Darker stone accent */}
      </Box>

      {/* Spine Decorative Lines */}
      <Box
        args={[0.08, 11.6, 0.08, 8, 8, 8]} // Thin lines
        position={[-4.76, 0, -0.4]} // Positioned on the spine
      >
        <meshStandardMaterial color="#A8A29E" emissive="#A8A29E" emissiveIntensity={0.1} />
      </Box>
      <Box
        args={[0.08, 11.6, 0.08, 8, 8, 8]}
        position={[-4.76, 0, -3.2]} // Positioned on the spine
      >
        <meshStandardMaterial color="#A8A29E" emissive="#A8A29E" emissiveIntensity={0.1} />
      </Box>

      {/* Small Emblem on Cover */}
      <Box
        args={[0.5, 0.5, 0.1, 8, 8, 8]}
        position={[3, -5, 0.48]} // Bottom right of the cover
      >
        <meshStandardMaterial color="#78716C" emissive="#78716C" emissiveIntensity={0.2} />
      </Box>

      {/* Example of click interaction: Maybe reveal something or animate further */}
      {/* For now, the click effect is handled by the useFrame rotation changes. */}
      {/* You could add more specific geometry changes here if needed. */}
      {/* {clicked && (
        <Text position={[0, -0.5, 0.2]} fontSize={0.1} color="red">Clicked!</Text>
      )} */}
    </group>
  )
}

// Renamed and ensured this fallback is suitable for being INSIDE Canvas
function SceneLoadingFallback() {
  return (
    <Text position={[0,0,0]} fontSize={0.2} color="#888888" anchorX="center" anchorY="middle">
      Loading Book...
    </Text>
  )
}

export default function Interactive3DBook() {
  return (
    <div className="h-full w-full cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [2, 6, 22], fov: 50 }}
        style={{ background: 'transparent' }}
        shadows
      >
        <ambientLight intensity={0.9} />
        <directionalLight
          position={[8, 12, 8]}
          intensity={1.3}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <pointLight position={[-8, -4, -8]} intensity={0.6} color="#C3AED6" /> {/* Soft purple backlight */}
        <spotLight
          position={[0, 8, 5]}
          angle={0.25}
          penumbra={0.6}
          intensity={1.2}
          castShadow
          color="#FFFFFF"
        />
        
        {/* Suspense is now INSIDE Canvas, wrapping the component that might suspend */}
        <Suspense fallback={<SceneLoadingFallback />}>
          <Book />
        </Suspense>
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3.5} 
          maxPolarAngle={Math.PI / 1.8} 
        />
      </Canvas>
    </div>
  )
}
