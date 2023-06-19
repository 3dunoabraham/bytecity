import FontText from '@/model/npc/TradingBox/FontText';
import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { MeshStandardMaterial } from 'three';


function SellHigh ({}) {
    const $textGroup:any = useRef()

    useFrame((ctx, delta)=>{
        if (!$textGroup.current) return

        // $textGroup.current.position.z = Math.sin(Date.now()/500)/10 + 1.15
        $textGroup.current.position.y = Math.cos(Date.now()/500)/10 + 0.0
    })

    return (
        <group position={[-0.8,-0.24,-0.75]} scale={0.35} >
            <group ref={$textGroup} position={[3.3,0,1.21]} rotation={[-1,0,0]}>
                <FontText position={[-1,2.3,-0.9]} fontSize={0.22} rotation={[1,Math.PI,0]} 
                    material={new MeshStandardMaterial({ side: 0, color: "#004400" })}>
                    {"Profit = current > entry"}
                </FontText>
                <FontText position={[-1,2.3,-0.9]} fontSize={0.22} rotation={[1,0,0]} 
                    material={new MeshStandardMaterial({ side: 0, color: "#004400" })}>
                    {"Profit = current > entry"}
                </FontText>
                <FontText position={[-2.5,-0.7,0]} fontSize={0.25} rotation={[0,Math.PI,0]} 
                    material={new MeshStandardMaterial({ side: 0, color: "#990000" })}> 
                    Wait for profit . . . then click SELL 
                </FontText>
                <FontText position={[-2.5,-0.7,0]} fontSize={0.25} rotation={[0,0,0]} 
                    material={new MeshStandardMaterial({ side: 0, color: "#990000" })}> 
                    Wait for profit . . . then click SELL 
                </FontText>
            </group>
        </group>
    )
}
export default SellHigh