import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { MeshStandardMaterial } from 'three';


import FontText from '@/model/core/FontText';

function SellHigh ({}) {
    const $textGroup:any = useRef()
    useFrame((ctx, delta)=>{
        if (!$textGroup.current) return
        $textGroup.current.position.y = Math.cos(Date.now()/500)/10 + 0.0
    })


    
    return (
        <group position={[-0.8,-0.24,-0.75]} scale={0.35} >
            <group ref={$textGroup} position={[3.3,0,1.21]} rotation={[-1,0,0]}>
                {/* <FontText position={[-1,2.3,-0.9]} fontSize={0.22} rotation={[1,Math.PI,0]} 
                    material={new MeshStandardMaterial({ side: 0, color: "#004400" })}>
                    {"Profit = current > entry"}
                </FontText> */}
                <FontText position={[-1,2.3,-0.9]} fontSize={0.22} rotation={[1,0,0]} 
                    material={new MeshStandardMaterial({ side: 0, color: "#004400" })}>
                    {"Growth = +Inhabitants "}
                </FontText>
                {/* <FontText position={[-2.5,-0.7,0]} fontSize={0.25} rotation={[0,Math.PI,0]} 
                    material={new MeshStandardMaterial({ side: 0, color: "#990000" })}> 
                    Wait for growth . . . then click SELL 
                </FontText> */}
                <FontText position={[-2.5,-1,0]} fontSize={0.25} rotation={[0,0,0]} 
                    material={new MeshStandardMaterial({ side: 0, color: "#990000" })}> 
                    Wait for growth . . . then STOP 
                </FontText>
            </group>
        </group>
    )
}
export default SellHigh