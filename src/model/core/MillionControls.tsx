import React, { useState, useRef } from "react";
import { Box, Cylinder, MapControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import DynaText from "./DynaText";
import * as THREE from 'three'

function MillionControls({ state, calls }: any) {
  const [cameraLocked, setCameraLocked] = useState(false);
  const [cameraKindaLocked, setCameraKindaLocked] = useState(false);
  const controlsRef: any = useRef();
  const targetPosition = [0, 0, 11.5];
  const initialCameraPosition = [4, 3, 14.4];
  const [cameraPosition, setCameraPosition] = useState(initialCameraPosition);
  const [currentTarget, setCurrentTarget] = useState(new THREE.Vector3(...targetPosition));

  const handleBoxClick = () => {
    setCameraLocked(!cameraLocked);
    setCameraKindaLocked(!cameraLocked)
  };


  useFrame(() => {
    if (controlsRef.current && (cameraLocked || cameraKindaLocked)) {
      const currentPosition = controlsRef.current.object.position;
      const newPosition = currentPosition.clone().lerp(
        new THREE.Vector3(...cameraPosition),
        0.1
      );
      controlsRef.current.object.position.copy(newPosition);

      const currentTarget = controlsRef.current.target;
      const newTarget = currentTarget.clone().lerp(
        new THREE.Vector3(...targetPosition),
        0.1
      );
      controlsRef.current.target.copy(newTarget);
    }
  });

  return (
    <group>
      <group position={[0.5, -0.159, 12.9]} rotation={[0, 0, 0]}>
        <DynaText
          color={"#994400"}
          text={cameraLocked ? "Unlock Camera" : "Lock Camera"}
          font={0.12}
          position={[0, 0, -0.25]}
        />
      </group>
      {cameraLocked && (
        <>
          <Cylinder
            position={[0.73, -0.2, 12.9]}
            onClick={handleBoxClick}
            args={[0.15, 0.15, 0.2, 12, 3]}
          >
            <meshStandardMaterial color={"#994400"} />
          </Cylinder>
        </>
      )}

      <MapControls
        ref={controlsRef}
        minPolarAngle={0.11}
        maxPolarAngle={2.2}
        minDistance={1}
        maxDistance={12}
        enablePan={!cameraLocked}
        enableZoom={true}
        enableRotate={!cameraLocked}
      />
    </group>
  );
}

export default MillionControls;
