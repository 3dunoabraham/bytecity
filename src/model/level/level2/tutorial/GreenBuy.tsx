import FontText from '@/model/npc/TradingBox/FontText';
import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { MeshStandardMaterial } from 'three';


function GreenBuy ({}) {
  const $textGroup:any = useRef()

  useFrame((ctx, delta)=>{
    if (!$textGroup.current) return

    $textGroup.current.position.y = Math.sin(Date.now()/500)/10-0.48
  })

  return (
    <group position={[-1.2,-0.24,-0.75]} scale={0.35}  rotation={[0,0.2,0]}>
      <group ref={$textGroup} position={[-0.5,0,0.9]} rotation={[-0.5,0,0]}>
        <FontText position={[0.4,0.28,0.6]} fontSize={0.3} rotation={[0,Math.PI,0]} 
          material={new MeshStandardMaterial({ side: 0, color: "#000000" })}
        >
            Click green button
        </FontText>
        <FontText position={[-0.4,0.28,0.6]} fontSize={0.3} rotation={[0,0,0]} 
          material={new MeshStandardMaterial({ side: 0, color: "#000000" })}
        >
            Click green button
        </FontText>
        <FontText position={[-0.,-0.1,0.6]} fontSize={0.5} rotation={[0,Math.PI,0]} 
          material={new MeshStandardMaterial({ side: 0, color: "#aa1100" })}
        >
          {"<-"} to BUY
        </FontText>
        <FontText position={[0.,-0.1,0.6]} fontSize={0.5} rotation={[0,0,0]} 
          material={new MeshStandardMaterial({ side: 0, color: "#aa1100" })}
        >
          to BUY {"->"}
        </FontText>
      </group>
    </group>
  )
}

export default GreenBuy