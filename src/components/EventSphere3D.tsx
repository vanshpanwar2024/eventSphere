"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshTransmissionMaterial, Float, Environment, Stars, Sparkles } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from 'three';

function PremiumOrb() {
  const mesh = useRef<THREE.Mesh>(null);
  const innerMesh = useRef<THREE.Mesh>(null);
  const wireframeMesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (mesh.current) {
      mesh.current.rotation.x = time * 0.1;
      mesh.current.rotation.y = time * 0.15;
    }
    if (innerMesh.current) {
      innerMesh.current.rotation.x = time * -0.2;
      innerMesh.current.rotation.y = time * -0.1;
    }
    if (wireframeMesh.current) {
      wireframeMesh.current.rotation.x = time * 0.15;
      wireframeMesh.current.rotation.y = time * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      {/* Outer Hyper-Realistic Glass Sphere */}
      <Sphere ref={mesh} args={[2.4, 64, 64]}>
        <MeshTransmissionMaterial
          backside
          thickness={0.5}
          roughness={0.05}
          transmission={1}
          ior={1.4}
          chromaticAberration={0.06}
          anisotropy={0.2}
          distortion={0.2}
          distortionScale={0.3}
          temporalDistortion={0.1}
          color="#ffffff"
        />
      </Sphere>
      
      {/* Inner Glowing Golden Core */}
      <Sphere ref={innerMesh} args={[1.1, 64, 64]}>
        <meshStandardMaterial
          color="#000000"
          roughness={0.1}
          metalness={1}
          emissive="#b49b5c"
          emissiveIntensity={1.2}
        />
      </Sphere>

      {/* Orbiting Golden Wireframe */}
      <Sphere ref={wireframeMesh} args={[1.5, 16, 16]}>
        <meshBasicMaterial color="#b49b5c" wireframe transparent opacity={0.3} />
      </Sphere>

      {/* Subtle Dust/Sparkles rotating around */}
      <Sparkles count={200} scale={7} size={1.5} color="#b49b5c" speed={0.4} opacity={0.6} />
    </Float>
  );
}

export default function EventSphere3D() {
  return (
    <div className="absolute inset-0 w-full h-[130vh] -z-10 pointer-events-none bg-[#020202]">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.1} />
        <directionalLight position={[10, 20, 10]} intensity={2.5} color="#b49b5c" />
        <directionalLight position={[-10, -20, -10]} intensity={0.5} color="#ffffff" />
        
        {/* Environment preset provides reflections for the glass material */}
        <Environment preset="city" />
        
        <Stars radius={100} depth={50} count={4000} factor={3} saturation={0} fade speed={1} />
        
        <PremiumOrb />
      </Canvas>

      {/* Seamless blending gradients */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#020202] to-transparent"></div>
      <div className="absolute bottom-0 inset-x-0 h-80 bg-gradient-to-t from-[#050505] via-[#050505]/90 to-transparent"></div>
    </div>
  );
}
