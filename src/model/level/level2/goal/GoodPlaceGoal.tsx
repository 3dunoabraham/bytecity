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

    
    if (!state.projectionMode) {
      
      if (bridgeZRot > -1) {
        s__bridgeZRot(bridgeZRot-0.05)
      }
    } else {
      
      if (bridgeZRot < 0) {
        s__bridgeZRot(bridgeZRot+0.01)
      }
    }


    // if (realProfitCount < 4) return
    // $claimButton.current.rotation.y += 0.01

    // if ()
    // if (!$bridgeRoad.current) return
  })

  return (<>
{state.hasAnyToken && <>

            
            <Cylinder position={[0,-0.27,6]} args={[3,3,0.15,7]} >
              <meshStandardMaterial color={"#996644"}/>
            </Cylinder>
            
            
            <group rotation={[0,0,0]} position={[0,0.8,1]}>

              <BitCrush
                
               />
            </group>

            {/* LONG BRiDGE */}
            
            {/* right thin wing center */}
        {/* <group position={[0.75,-0.5,0+0.25]} >
            <Box args={[0.8,0.1,0.5]}  castShadow receiveShadow position={[-0.15,0,0.7]}
            >
                <meshStandardMaterial color={"#8f8983"}/>
            </Box>
            <Box args={[0.8,0.1,0.5]}  castShadow receiveShadow position={[-0.15,0,1.3]}
            >
                <meshStandardMaterial color={"#8f8983"}/>
            </Box>
            <Box args={[1.1,0.1,0.5]}  castShadow receiveShadow position={[0,0,1.9]}
            >
                <meshStandardMaterial color={"#8f8983"}/>
            </Box>
        </group>
        <group position={[-0.75,-0.5,0+0.25]} >
            <Box args={[1.1,0.1,1]}  castShadow receiveShadow position={[0,0,0.95]}
            >
                <meshStandardMaterial color={"#8f8983"}/>
            </Box>
        </group> */}
            {/* left wing center */}


        
        {/* farmcity */}
            {/* right wing center */}
        {/* <group position={[0.65,-0.5,-1]} >
            <Box args={[1,0.1,1]}  castShadow receiveShadow position={[0.05,0,0.75]}
            >
                <meshStandardMaterial color={"#8f8983"}/>
            </Box>
            <Box args={[0.5,0.1,0.25]}  castShadow receiveShadow position={[-0.2,-0.05,-0.15]}
            >
                <meshStandardMaterial color={"#8f8983"}/>
            </Box>
        </group> */}
            {/* right wing city city */}
            {/* left city city */}
        {/* <group position={[-0.65,-0.5,3]} >
            <Box args={[1,0.1,1]}  castShadow receiveShadow position={[-0.05,0,-3.25]}
            >
                <meshStandardMaterial color={"#8f8983"}/>
            </Box>
            <Box args={[1,0.1,1]}  castShadow receiveShadow position={[-0.05,0,-0.75]}
            >
                <meshStandardMaterial color={"#8f8983"}/>
            </Box>
        </group> */}
            {/* left farm wing */}






            
            {/* {state.projectionMode && */}
            {/* ROAD */}
            <group position={[0,-0.5,-2.1]} ref={$bridgeRoad} rotation={[bridgeZRot,0,0]}>
            <Box args={[0.5,0.06,1]}  castShadow receiveShadow position={[0,0,0.5]}
            >
                <meshStandardMaterial color={"#8f8983"}/>
            </Box>
        </group>
        <group position={[0,-0.5,1.3]} >
            <Box args={[0.45,0.055,5]}  castShadow receiveShadow
            >
                <meshStandardMaterial color={"#8f8983"}/>
            </Box>
        </group>
        {/* } */}
            {/* ROAD */}



            
          {/* <Box args={[0.1,0.4,0.2]} position={[0.15,-0.85,-1.65]} castShadow receiveShadow>
              <meshStandardMaterial color={"#dddddd"}/>
            </Box> */}
          {/* <Box args={[0.1,0.4,0.2]} position={[-0.15,-0.85,-1.65]} castShadow receiveShadow>
              <meshStandardMaterial color={"#dddddd"}/>
            </Box> */}
          <Box args={[0.45,0.1,0.02]} position={[0,state.projectionMode ? -0.513 : -0.31,-2.1]} castShadow receiveShadow>
              <meshStandardMaterial color={"#d0d0d0"}/>
            </Box>
            <Box args={[0.05,0.3,0.05]} position={[0.25,-0.35,-2.1]} castShadow receiveShadow>
              <meshStandardMaterial color={"#d0d0d0"}/>
            </Box>

            <Cylinder position={[0,-0.7,3.5]} args={[0.05,0.15,0.8,4]} >
              <meshStandardMaterial color={"#bbb"}/>
            </Cylinder>
            <Cylinder position={[0,-1.05,3.5]} args={[0.3,0.15,0.25,5]} >
              <meshStandardMaterial color={"#aaa"}/>
            </Cylinder>

            {/* <Sphere position={[0,-1,-1.65]}  args={[0.5, 8, 8]}>
              <meshStandardMaterial color={"#cff"} opacity={0.5} transparent={true}/>
            </Sphere> */}
          </>} 



    </>
  )
}

export default Component