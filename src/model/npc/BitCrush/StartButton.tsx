import React from "react";
import { Box } from "@react-three/drei";

function StartButton({ startGame }:any) {
  return (
    <Box
      args={[0.6, 0.2, 0.3]}
      castShadow
      receiveShadow
      position={[0.5, -1.01, 0.95]}
      onClick={startGame}
    >
      <meshStandardMaterial color={"#0099ff"} />
    </Box>
  );
}

export default StartButton;
