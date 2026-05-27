import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Center, Environment, ContactShadows, Float } from '@react-three/drei';
import * as THREE from 'three';

interface GlassesModelProps {
  color: string;
  glassColor: string;
}

export function GlassesModel({ color, glassColor }: GlassesModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { size } = useThree();
  const isMobile = size.width < 640;
  const isTablet = size.width >= 640 && size.width < 1024;
  const computedScale = isMobile ? 1.45 : isTablet ? 1.85 : 2.3;

  const materialProps = { color, metalness: 0.8, roughness: 0.3 };
  const lensProps = { 
    color: glassColor, 
    metalness: 0.1, 
    roughness: 0.05, 
    transparent: true, 
    opacity: 0.6,
    transmission: 0.9, 
    ior: 1.45,
    thickness: 0.1 
  };

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating animation to make it feel premium
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1) * 0.05;
    }
  });

  return (
    <group ref={groupRef} scale={computedScale}>
      <Center>
        {/* Left Frame */}
        <mesh position={[-0.72, 0, 0]}>
          <torusGeometry args={[0.5, 0.06, 32, 64]} />
          <meshStandardMaterial {...materialProps} />
        </mesh>
        
        {/* Left Glass */}
        <mesh position={[-0.72, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.48, 0.48, 0.02, 64]} />
          <meshPhysicalMaterial {...lensProps} />
        </mesh>

        {/* Right Frame */}
        <mesh position={[0.72, 0, 0]}>
          <torusGeometry args={[0.5, 0.06, 32, 64]} />
          <meshStandardMaterial {...materialProps} />
        </mesh>

        {/* Right Glass */}
        <mesh position={[0.72, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.48, 0.48, 0.02, 64]} />
          <meshPhysicalMaterial {...lensProps} />
        </mesh>

        {/* Bridge */}
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[0.4, 0.06, 0.05]} />
          <meshStandardMaterial {...materialProps} />
        </mesh>

        {/* Left Hinge/Arm */}
        <mesh position={[-1.25, 0, -0.6]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.06, 0.06, 1.2]} />
          <meshStandardMaterial {...materialProps} />
        </mesh>

        {/* Right Arm */}
        <mesh position={[1.25, 0, -0.6]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.06, 0.06, 1.2]} />
          <meshStandardMaterial {...materialProps} />
        </mesh>
      </Center>
    </group>
  );
}

export function GlassesScene({ color, glassColor }: GlassesModelProps) {
  return (
    <>
      {/* Soft elegant studio lighting */}
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} intensity={1.5} angle={0.15} penumbra={1} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />

      {/* Realistic Environment reflection */}
      <Environment preset="city" />

      <GlassesModel color={color} glassColor={glassColor} />

      <ContactShadows 
         position={[0, -1, 0]} 
         opacity={0.5} 
         scale={5} 
         blur={2} 
         far={2} 
         color="#000000" 
      />
    </>
  );
}
