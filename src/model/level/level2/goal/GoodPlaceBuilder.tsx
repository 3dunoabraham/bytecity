import DynaText from "@/model/core/DynaText"
import { Box, Cylinder, Sphere } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useMemo, useRef, useState } from "react"
import { useAuth } from "@/../script/state/context/AuthContext"
import BitCrush from "@/model/npc/BitCrush"

function Component ({calls, state, projectionMode, s__projectionMode}:any) {
  const { superuser, do:{login, demo}, jwt }:any = useAuth()
  const [bridgeZRot, s__bridgeZRot] = useState(-1)
  const $bridgeRoad:any = useRef()
  const $claimButton:any = useRef()
  const realProfitCount = useMemo(()=>{
    return state.profitHistory.filter((atrade:any, index:any) => {
      return atrade[1] == "profit"
    }).length
  },[state.profitHistory])

  useFrame(()=>{
    // if (!$claimButton.current) return

    
    // if (!state.projectionMode) {
      
    //   if (bridgeZRot > -1) {
    //     s__bridgeZRot(bridgeZRot-0.05)
    //   }
    // } else {
      
    //   if (bridgeZRot < 0) {
    //     s__bridgeZRot(bridgeZRot+0.01)
    //   }
    // }


    // if (realProfitCount < 4) return
    // $claimButton.current.rotation.y += 0.01

    // if ()
    // if (!$bridgeRoad.current) return
  })

  return (<>
  <group position={[0,0,10]}>
    {/* <Box>

    </Box> */}
    <Cylinder position={[0,-0.2,2]} args={[3.02,3.02,0.02,6]} >
              <meshStandardMaterial color={"#66ff65"}/>
            </Cylinder>

    </group>


    </>
  )
}

export default Component