import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { MeshStandardMaterial } from 'three';

import { useContext, useState } from "react"
import { AppContext } from "@/../script/state/context/AppContext"

import FontText from '@/model/core/FontText';

function Component({ }) {
  const app:any = useContext(AppContext)

  const $textGroup: any = useRef()
  useFrame((ctx, delta) => {
    if (!$textGroup.current) return
    $textGroup.current.position.y = Math.sin(Date.now() / 500) / 10 + 0.65
  })


  
  return (
    <group position={[-0.31, -0.535, -2.4]} scale={0.35}  >
      <group position={[0, 1.7, 0]}>
        <FontText position={[0.9, 0, 1.5]} fontSize={0.1} rotation={[-Math.PI / 2, 0, 0]}
          material={new MeshStandardMaterial({ side: 0, color: "#ff66ff" })}>
          Neutrino Cost: 5
        </FontText>
        <group ref={$textGroup} position={[1, 0, 1]} rotation={[0.3, 0, 0]}
      onClick={() => { app.alert("neutral","Tip: This counter resets on page reload") }} 

        >
          {/* <FontText position={[0.25, 0.6, 0]} fontSize={0.25} rotation={[0, Math.PI, 0]}
            material={new MeshStandardMaterial({ side: 0, color: "#000000" })}>
            Send and Profit
          </FontText> */}
          <FontText position={[-0.25, 0.6, 0]} fontSize={0.25} rotation={[0, 0, 0]}
            material={new MeshStandardMaterial({ side: 0, color: "#000000" })}>
            Increase inhabitants
          </FontText>
          {/* <FontText position={[-0., 0.28, 0]} fontSize={0.45} rotation={[0, Math.PI, 0]}
            material={new MeshStandardMaterial({ side: 0, color: "#ff3300" })}>
            4 orders
          </FontText> */}
          <FontText position={[0., 0.28, 0]} fontSize={0.45} rotation={[0, 0, 0]}
            material={new MeshStandardMaterial({ side: 0, color: "#ff3300" })}>
            4 times
          </FontText>

          {/* <FontText position={[-0.4, 0., 0]} fontSize={0.25} rotation={[0, Math.PI, 0]}
            material={new MeshStandardMaterial({ side: 0, color: "#000000" })}>
            to level up
          </FontText> */}
          <FontText position={[0.4, 0., 0]} fontSize={0.25} rotation={[0, 0, 0]}
            material={new MeshStandardMaterial({ side: 0, color: "#000000" })}>
            to level up
          </FontText>
        </group>
      </group>
    </group>
  )
}
export default Component