import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import IslandMesh from './IslandMesh';

const ThreeScene = ({ onIslandClick }) => {
  return (
    <Canvas
      style={{ width: '100vw', height: '100vh' }} // Make sure the canvas fills the whole screen
      camera={{ position: [0, 0, 10], fov: 50, near: 1, far: 1000 }} // Set a fixed camera position
    >
      {/* Lighting setup */}
      <ambientLight intensity={0.5} /> {/* Basic ambient lighting */}
      <directionalLight position={[10, 10, 5]} intensity={1} /> {/* Directional light */}

      {/* Islands: Render each island in the 4 corners */}
      {[...Array(4).keys()].map((month) => (
        <IslandMesh key={month} month={month} onClick={onIslandClick} />
      ))}

      {/* Optional OrbitControls */}
      <OrbitControls enableZoom={false} enableRotate={false} />
    </Canvas>
  );
};

export default ThreeScene;
