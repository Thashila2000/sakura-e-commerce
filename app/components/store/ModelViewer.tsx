"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls, useGLTF } from "@react-three/drei";

interface ModelViewerProps {
  modelPath: string; // e.g., "/models/matcha.glb"
  scale?: number;
}

// 1. Helper component to load and render the .glb file
function Model({ modelPath, scale = 1 }: ModelViewerProps) {
  // useGLTF automatically loads files from the public folder
  const { scene } = useGLTF(modelPath);

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.6}>
      {/* scene.clone() ensures the model can be safely reused multiple times */}
      <primitive object={scene.clone()} scale={scale} position={[0, -0.2, 0]} />
    </Float>
  );
}

// 2. The main wrapper with Canvas, Lighting, and Controls
export default function ModelViewer({ modelPath, scale = 1 }: ModelViewerProps) {
  return (
    <div className="w-full h-full cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
        {/* Lights */}
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 8, 5]} intensity={1.5} />

        {/* 3D Model */}
        <Suspense fallback={null}>
          <Model modelPath={modelPath} scale={scale} />
        </Suspense>

        {/* Auto-rotation + Mouse Dragging */}
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
      </Canvas>
    </div>
  );
}

// Optional: Preload models so they render instantly with zero lag
useGLTF.preload("/models/matcha.glb");
useGLTF.preload("/models/serum.glb");
useGLTF.preload("/models/spice.glb");