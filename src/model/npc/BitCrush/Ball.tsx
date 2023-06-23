import React, { useRef } from "react";
import { Box } from "@react-three/drei";

function Ball() {
  const $theBall = useRef(null);

  return (
    <Box args={[0.1, 0.1, 0.1]} castShadow receiveShadow ref={$theBall}>
      <meshStandardMaterial color="#009900" />
    </Box>
  );
}

export default Ball;
