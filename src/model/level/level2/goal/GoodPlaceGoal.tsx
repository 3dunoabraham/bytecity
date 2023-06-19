import { Box, Cylinder } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef, useState } from "react"


import BitCrush from "@/model/npc/BitCrush"

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
  return (<>
    {state.hasAnyToken && <>
      <Cylinder position={[0, -0.27, 6]} args={[3, 3, 0.15, 6]} >
        <meshStandardMaterial color={"#996644"} />
      </Cylinder>
      <group rotation={[0, 0, 0]} position={[0, 0.8, 1]}>
        <BitCrush/>
      </group>
      {/* ROAD */}
      <group position={[0, -0.5, -2.1]} ref={$bridgeRoad} rotation={[bridgeZRot, 0, 0]}>
        <Box args={[0.5, 0.06, 1]} castShadow receiveShadow position={[0, 0, 0.5]}
        >
          <meshStandardMaterial color={"#8f8983"} />
        </Box>
      </group>
      <group position={[0, -0.5, 1.3]} >
        <Box args={[0.45, 0.055, 5]} castShadow receiveShadow
        >
          <meshStandardMaterial color={"#8f8983"} />
        </Box>
      </group>
      {/* } */}
      {/* ROAD */}
      <Box args={[0.45, 0.1, 0.02]} position={[0, state.projectionMode ? -0.513 : -0.31, -2.1]} castShadow receiveShadow>
        <meshStandardMaterial color={"#d0d0d0"} />
      </Box>
      <Box args={[0.05, 0.3, 0.05]} position={[0.25, -0.35, -2.1]} castShadow receiveShadow>
        <meshStandardMaterial color={"#d0d0d0"} />
      </Box>
      <Cylinder position={[0, -0.7, 3.5]} args={[0.05, 0.15, 0.8, 4]} >
        <meshStandardMaterial color={"#bbb"} />
      </Cylinder>
      <Cylinder position={[0, -1.05, 3.5]} args={[0.3, 0.15, 0.25, 5]} >
        <meshStandardMaterial color={"#aaa"} />
      </Cylinder>
    </>}
  </>
  )
}

export default Component