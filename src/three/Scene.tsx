import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import FloatingObjects from "./FloatingObjects";

function Scene() {
  return (
    <div className="three-scene">
      <Canvas
        camera={{
          position: [0, 0, 6],
          fov: 45,
        }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.8} />

          <pointLight position={[3, 3, 3]} intensity={25} color="#C4B5FD" />

          <pointLight position={[-3, -2, 2]} intensity={15} color="#7C3AED" />

          <FloatingObjects />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default Scene;
