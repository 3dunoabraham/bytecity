import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { MeshStandardMaterial } from 'three';
import { useContext, useState } from "react"
import { AppContext } from "@/../script/state/context/AppContext"


import FontText from '@/model/core/FontText';

function SetDemoOff ({}) {
  const app:any = useContext(AppContext)
  const $textGroup:any = useRef()

  useFrame((ctx, delta)=>{
      if (!$textGroup.current) return

      $textGroup.current.position.z = Math.sin(Date.now()/500)/10 + 1.3
  })



  return (
    <group position={[-0.,-0.4,-0.75]} scale={0.3}
    onClick={() => { app.alert("neutral","Tip: LIVE Mode creates humans close to you") }} 
    >
      <group ref={$textGroup} rotation={[-1,0,0]} position={[0,0,1.4]} >
        {/* <FontText position={[0.85,0,0]} fontSize={0.25} rotation={[0,Math.PI,0]} 
          material={new MeshStandardMaterial({ side: 0, color: "#000000" })}
        >
          Switch to               to continue
        </FontText> */}
        {/* <FontText position={[0.7,0,0]} fontSize={0.4} rotation={[0,Math.PI,0]} 
          material={new MeshStandardMaterial({ side: 0, color: "#aa0000" })}
        >
          LIVE 
        </FontText> */}

        
        <FontText position={[0.85,0,0]} fontSize={0.25} rotation={[0,0,0]} 
          material={new MeshStandardMaterial({ side: 0, color: "#000000" })}
        >
          {"<-"} Enable               mode
        </FontText>
        <FontText position={[1.07,0,0]} fontSize={0.45} rotation={[0,0,0]} 
          material={new MeshStandardMaterial({ side: 0, color: "#aa0000" })}
        >
          LIVE 
        </FontText>
      </group>
    </group>
  )
}
export default SetDemoOff