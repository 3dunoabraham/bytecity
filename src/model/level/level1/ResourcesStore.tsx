import { Box, Cylinder } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";

export function ResourcesStore ({state}:any) {
  const readyForStore = useMemo(()=>{
    return !!state.tutoStage && state.tutoStage?.lvl > 4
  },[state.tutoStage])
  const readyForChange = useMemo(()=>{
    return !!state.tutoStage && state.tutoStage?.lvl > 9
  },[state.tutoStage])
  const triggerTouchGrass = ()=>{
    if (!readyForStore) return

    alert("Resources Store Coming Soon...")
  }
  const [isShopOpen, s__isShopOpen] = useState(false)
  const $shopItems: any = useRef()
  useFrame((ctx, delta) => {
    if (!$shopItems.current) return
    $shopItems.current.position.y = Math.sin(Date.now() / 500) / 50 + 0.2

    if (isShopOpen) {
      if ($shopItems.current.position.z < 0.5) {
        $shopItems.current.position.z += 0.1
        $shopItems.current.scale.z = $shopItems.current.position.z 
      } else if ($shopItems.current.position.z > 0.5 ) {
        $shopItems.current.position.z = 0.5
        $shopItems.current.scale.z = $shopItems.current.position.z 
      }
    } else {
      
      if ($shopItems.current.position.z > 0) {
        $shopItems.current.position.z -= 0.1
        $shopItems.current.scale.z = $shopItems.current.position.z 
      } else if ($shopItems.current.position.z < 0) {
        $shopItems.current.position.z = 0
        $shopItems.current.scale.z = $shopItems.current.position.z 
      }
    }
})
  const defaultShopItems = [
    [0,0,0],
    [0,0,0],
    [0,0,0],
    [0,0,0],
  ]
  const [theBoxesPosArray, s__theBoxesPosArray] = useState(defaultShopItems)

  return (<>
    <Box args={[2.5,0.2,2.8]} position={[0,-1.1,0]} castShadow receiveShadow
    >
      <meshStandardMaterial color={readyForStore ? "#84BC4E" : "#fff"}/>
    </Box>
    {readyForStore && <>
      <group position={[0,-1.2,0]}>
        <Cylinder args={[3.5,3.5,.1,state.tutoStage?.lvl]} castShadow receiveShadow>
          <meshStandardMaterial color={readyForChange ? "#84BC4E" : "#fff"}/>

        </Cylinder>

        <group>
          <Box args={[0.5,0.55,0.5]} position={[-2,0.3,0]} castShadow receiveShadow
      onClick={()=>{ s__isShopOpen(!isShopOpen) }}
      >
            <meshStandardMaterial color={"#00f"}/>
          </Box>
          {/* SHOP ITEMS */}
          <group position={[-1.95,0.1,0]} ref={$shopItems} scale={[1,1,0]}>
            {theBoxesPosArray.map((aShopItemPos:any,index:number)=>{
              return (<>
                <Box args={[0.15,0.25,0.1]} position={[0,0,index*0.3]} castShadow receiveShadow>
                  <meshStandardMaterial color={"#00f"}/>
                </Box>
              </>)
            })}
            
          </group>
        </group>

      </group>
    </>}
  </>)
}