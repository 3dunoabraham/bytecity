import React, { useState, useRef } from "react";
import { Box, Cylinder, MapControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import DynaText from "./DynaText";

function LockCameraOnBox() {
  const [cameraLocked, setCameraLocked] = useState(false);
  const controlsRef:any = useRef();

  const handleBoxClick = () => {
    setCameraLocked(!cameraLocked);
  };

  useFrame(() => {
    if (controlsRef.current && cameraLocked) {
      controlsRef.current.target.set(0, 0, 13.5); // Make the controls target the scene origin
      controlsRef.current.object.position.set(0, 3, 16); // Set the camera position to (0, 10, 0) when cameraLocked is true
    }
  });

  return (
    <group>
      
      <group position={[-0.45, -0.159, 14]} rotation={[0,0,0]} >
        <DynaText color={"#994400"} text={cameraLocked ? "Unlock Camera" : "Lock Camera"} font={0.12} position={[0,0,-0.35]}/>

      </group>
      {!cameraLocked && (
        <>
          <Box
            position={[-0.5, -0.17, 13.95]}
            onClick={handleBoxClick}
            args={[0.5, 0.1, 0.2]}
          >
            <meshStandardMaterial color={"#aa6600"} />
          </Box>
        </>
      )}
      {cameraLocked && (
        <>
          <Cylinder
            position={[-0.45, -0.2, 13.95]}
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

export default LockCameraOnBox;
