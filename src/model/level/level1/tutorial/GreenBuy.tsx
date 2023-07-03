import { useFrame } from '@react-three/fiber';
import { useRef, useContext } from 'react';
import { MeshStandardMaterial } from 'three';


import FontText from '@/model/core/FontText';
import { AppContext } from '../../../../../script/state/context/AppContext';

function GreenBuy ({}) {
  const app:any = useContext(AppContext)
  const $textGroup:any = useRef()
  useFrame((ctx, delta)=>{
    if (!$textGroup.current) return
    $textGroup.current.position.y = Math.sin(Date.now()/500)/10-0.48
  })


  
  return (
    <group position={[-1.2,-0.24,-0.75]} scale={0.35}  rotation={[0,0.2,0]}
      onClick={()=>{app.alert("neutral","Get help from nearby humans")}}
    >
      <group ref={$textGroup} position={[-0.5,0,0.9]} rotation={[-0.5,0,0]}
        
      >
        {/* <FontText position={[0.4,0.28,0.6]} fontSize={0.3} rotation={[0,Math.PI,0]} 
          material={new MeshStandardMaterial({ side: 0, color: "#000000" })}
        >
            Click green button
        </FontText> */}
        <FontText position={[-0.4,0.28,0.6]} fontSize={0.3} rotation={[0,0,0]} 
          material={new MeshStandardMaterial({ side: 0, color: "#000000" })}
        >
            Increase inhabitants
        </FontText>
        {/* <FontText position={[-0.,-0.1,0.6]} fontSize={0.5} rotation={[0,Math.PI,0]} 
          material={new MeshStandardMaterial({ side: 0, color: "#aa1100" })}
        >
          {"<-"} to CALL
        </FontText> */}
        <FontText position={[0.,-0.1,0.6]} fontSize={0.5} rotation={[0,0,0]} 
          material={new MeshStandardMaterial({ side: 0, color: "#aa1100" })}
        >
          Here {"->"}
        </FontText>
      </group>
    </group>
  )
}

export default GreenBuy