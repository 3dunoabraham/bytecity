import { Box } from "@react-three/drei";
import { useMemo } from "react";

export function ResourcesStore ({state}:any) {
  const readyForStore = useMemo(()=>{
    return state.tutoStage?.lvl > 4
  },[state.tutoStage])
  const triggerTouchGrass = ()=>{
    if (!readyForStore) return

    alert("Resources Store Coming Soon...")
  }

  return (<>
    <Box args={[2.5,0.2,2.8]} position={[0,-1.1,0]} castShadow receiveShadow
      onClick={triggerTouchGrass}
    >
      <meshStandardMaterial color={!!state.tutoStage && state.tutoStage?.lvl > 4 ? "#84BC4E" : "#fff"}/>
    </Box>
  </>)
}