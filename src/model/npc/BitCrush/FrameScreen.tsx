import React from "react";
import { Box } from "@react-three/drei";

export function Frame() {
  return (<>
    <group position={[0, -1.01, 6.45]}>
        <Box args={[1.8, 0.1, 1.4]} castShadow receiveShadow>
          <meshStandardMaterial color="#eee" />
        </Box>
      </group>
      <Box position={[0, -1.05, 7.87]} args={[0.8, 0.2, 0.7]}>
        <meshStandardMaterial color={"#ffffff"} />
      </Box>
      </>
    
  );
}



export function Screen() {
  return (
    <group position={[0, -0.1, 5.9]}>
      <Box args={[1.72, 2, 0.15]} castShadow receiveShadow>
        <meshStandardMaterial color="#333" />
      </Box>
    </group>
  );
}

