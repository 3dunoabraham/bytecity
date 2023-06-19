import FontText from '@/model/npc/TradingBox/FontText';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { MeshStandardMaterial } from 'three';

function SetDemoOff ({}) {
  const $textGroup:any = useRef()

  useFrame((ctx, delta)=>{
      if (!$textGroup.current) return

      $textGroup.current.position.z = Math.sin(Date.now()/500)/10 + 1.3
  })

  return (
    <group position={[-0.42,-0.35,-0.5]} scale={0.3} >
      <group ref={$textGroup} rotation={[-1,0,0]} position={[0,0,1.4]} >
        <FontText position={[0.85,0,0]} fontSize={0.25} rotation={[0,Math.PI,0]} 
          material={new MeshStandardMaterial({ side: 0, color: "#000000" })}
        >
          Click                    to continue
        </FontText>
        <FontText position={[0.85,0,0]} fontSize={0.25} rotation={[0,0,0]} 
          material={new MeshStandardMaterial({ side: 0, color: "#000000" })}
        >
          Click                    to continue
        </FontText>
        <FontText position={[0.4,0,0]} fontSize={0.4} rotation={[0,Math.PI,0]} 
          material={new MeshStandardMaterial({ side: 0, color: "#ff0000" })}
        >
          DEMO 
        </FontText>
        <FontText position={[0.4,0,0]} fontSize={0.4} rotation={[0,0,0]} 
          material={new MeshStandardMaterial({ side: 0, color: "#ff0000" })}
        >
          DEMO 
        </FontText>
      </group>
    </group>
  )
}
export default SetDemoOff