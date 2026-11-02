import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import * as THREE from "three";

function FloatingObjects() {
  const sphereRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y += delta * 0.15;
      sphereRef.current.rotation.x = THREE.MathUtils.lerp(
        sphereRef.current.rotation.x,
        state.pointer.y * 0.2,
        0.04,
      );
      sphereRef.current.rotation.z = THREE.MathUtils.lerp(
        sphereRef.current.rotation.z,
        state.pointer.x * 0.2,
        0.04,
      );
    }

    if (ringRef.current) {
      ringRef.current.rotation.x += delta * 0.12;
      ringRef.current.rotation.y += delta * 0.18;
    }
  });

  return (
    <group>
      {/* Main floating sphere */}
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
        <mesh ref={sphereRef}>
          <icosahedronGeometry args={[1.15, 64]} />

          <MeshDistortMaterial
            color="#A78BFA"
            emissive="#6D28D9"
            emissiveIntensity={0.35}
            roughness={0.2}
            metalness={0.65}
            distort={0.35}
            speed={2.5}
          />
        </mesh>
      </Float>

      {/* Rotating metallic rings */}
      <group ref={ringRef}>
        <mesh rotation={[1.1, 0.3, 0.4]}>
          <torusGeometry args={[1.65, 0.012, 16, 120]} />
          <meshStandardMaterial
            color="#D8C7FF"
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>

        <mesh rotation={[0.3, 1.2, 0.8]}>
          <torusGeometry args={[1.85, 0.008, 16, 120]} />
          <meshStandardMaterial
            color="#8B5CF6"
            metalness={0.9}
            roughness={0.25}
          />
        </mesh>
      </group>

      {/* Floating particles */}
      <Sparkles
        count={100}
        scale={5}
        size={2}
        speed={0.4}
        color="#C4B5FD"
        opacity={0.8}
      />
    </group>
  );
}

export default FloatingObjects;
