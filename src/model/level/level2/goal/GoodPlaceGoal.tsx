import { Box, Cylinder } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef, useState } from "react"


import BitCrush from "@/model/npc/BitCrush"
import StandardColor from "../core/StandardColor"

function Component({ calls, state, projectionMode, s__projectionMode }: any) {
  const [bridgeZRot, s__bridgeZRot] = useState(-1)
  const $bridgeRoad: any = useRef()
  useFrame(() => {
    if (!state.projectionMode) {
      if (bridgeZRot > -1) {
        s__bridgeZRot(bridgeZRot - 0.05)
      }
    } else {
      if (bridgeZRot < 0) {
        s__bridgeZRot(bridgeZRot + 0.01)
      }
    }
  })


  
  if (!state.hasAnyToken) return (<></>)
  return (<>
    <Cylinder position={[0, -0.27, 6]} args={[3, 3, 0.15, 6]} material={StandardColor("#996644")} />
    <group rotation={[0, 0, 0]} position={[0, 0.8, 1]}>
      <BitCrush/>
    </group>
    {/* ROAD */}
    <group position={[0, -0.5, -2.1]} ref={$bridgeRoad} rotation={[bridgeZRot, 0, 0]}>
      <Box args={[0.5, 0.06, 1]} castShadow receiveShadow position={[0, 0, 0.5]} 
        material={StandardColor("#8f8983")}
      />
    </group>
    <group position={[0, -0.5, 1.3]} >
      <Box args={[0.45, 0.055, 5]} castShadow receiveShadow material={StandardColor("#8f8983")} />
    </group>
    {/* ROAD */}
    <Box args={[0.45, 0.1, 0.02]} position={[0, state.projectionMode ? -0.513 : -0.31, -2.1]}
      castShadow receiveShadow material={StandardColor("#d0d0d0")}
    />
    <Box args={[0.05, 0.3, 0.05]} position={[0.25, -0.35, -2.1]} castShadow receiveShadow
      material={StandardColor("#d0d0d0")}
    />
    <Cylinder position={[0, -0.7, 3.5]} args={[0.05, 0.15, 0.8, 4]} material={StandardColor("#bbb")} />
    <Cylinder position={[0, -1.05, 3.5]} args={[0.3, 0.15, 0.25, 5]} material={StandardColor("#aaa")} />
  </>
  )
}

export default Component