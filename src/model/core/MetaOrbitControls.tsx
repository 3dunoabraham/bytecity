import React, { useState, useRef } from "react";
import { Box, Cylinder, MapControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import DynaText from "./DynaText";

function MetaOrbitControls({state, calls}:any) {
  const [cameraLocked, setCameraLocked] = useState(false);
  const controlsRef:any = useRef();

  const handleBoxClick = () => {
    setCameraLocked(!cameraLocked);
  };

  useFrame(() => {
    if (controlsRef.current && cameraLocked) {
      controlsRef.current.target.set(0, 0, 11.5); 
      controlsRef.current.object.position.set(4, 3, 14.4); 

      // PONG
      // controlsRef.current.target.set(0, 0, 13.5); 
      // controlsRef.current.object.position.set(0, 3, 16); 
    }
  });

  return (
    <group>
      {!!state.tutoStage && state.tutoStage > 3 && <>
      <group position={[0.551, -1.05, -1.8]} rotation={[0,0,0]} >
        <DynaText color={"#994400"} rotation={[0,Math.PI/2,0]}
            onClick={handleBoxClick}
            text={cameraLocked ? "Unlock Camera" : "Lock Camera"} font={0.12} position={[0,0,-0.35]}
        />

      </group>
      <group position={[0.7, -1.05, 3.2]} rotation={[0,0,0]} >
        <DynaText color={"#994400"} rotation={[0,Math.PI,0]}
            onClick={handleBoxClick}
            text={cameraLocked ? "Unlock Camera" : "Lock Camera"} font={0.12} position={[0,0,-0.35]}
        />

      </group>
       </>}
      {!cameraLocked && (
        <>
          <Box
            position={[0.5, -0.17, 12.9]}
            onClick={handleBoxClick}
            args={[0.5, 0.1, 0.2]}
          >
            <meshStandardMaterial color={"#aa6600"} />
          </Box>
        </>
      )}
      
      <group position={[0.5, -0.159, 12.9]} rotation={[0,0,0]} >
        <DynaText color={"#994400"} text={cameraLocked ? "Unlock Camera" : "Lock Camera"} font={0.12} 
          position={[0,0,-0.25]}
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

export default MetaOrbitControls;
