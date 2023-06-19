import FontText from '@/model/npc/TradingBox/FontText';
import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { MeshStandardMaterial } from 'three';


function Component ({}) {
    const $textGroup:any = useRef()

    useFrame((ctx, delta)=>{
        if (!$textGroup.current) return

        $textGroup.current.position.y = Math.sin(Date.now()/500)/10 + 0.65
    })

    return (
        <group position={[-0.31,-0.535,-2.4]} scale={0.35}  >
            <group position={[0,1.7,0]}>
                <FontText position={[0.9,0,1.6]} fontSize={0.2} rotation={[-Math.PI/2,0,0]} 
                    material={new MeshStandardMaterial({ side: 0, color: "#ff66ff" })}>
                    Fee: 0
                </FontText>
                <group ref={$textGroup} position={[1,0,1]} rotation={[0.3,0,0]}>
                    <FontText position={[0.25,0.6,0]} fontSize={0.25} rotation={[0,Math.PI,0]} 
                        material={new MeshStandardMaterial({ side: 0, color: "#000000" })}>
                        Send and Profit
                    </FontText>
                    <FontText position={[-0.25,0.6,0]} fontSize={0.25} rotation={[0,0,0]} 
                        material={new MeshStandardMaterial({ side: 0, color: "#000000" })}>
                        Send and Profit
                    </FontText>
                    <FontText position={[-0.,0.28,0]} fontSize={0.45} rotation={[0,Math.PI,0]} 
                        material={new MeshStandardMaterial({ side: 0, color: "#ff3300" })}> 
                        4 orders 
                    </FontText>
                        <FontText position={[0.,0.28,0]} fontSize={0.45} rotation={[0,0,0]} 
                            material={new MeshStandardMaterial({ side: 0, color: "#ff3300" })}> 
                        4 orders 
                    </FontText>
                    
                    <FontText position={[-0.4,0.,0]} fontSize={0.25} rotation={[0,Math.PI,0]} 
                        material={new MeshStandardMaterial({ side: 0, color: "#000000" })}> 
                        to level up
                    </FontText>
                        <FontText position={[0.4,0.,0]} fontSize={0.25} rotation={[0,0,0]} 
                            material={new MeshStandardMaterial({ side: 0, color: "#000000" })}> 
                        to level up
                    </FontText>
                </group>
            </group>
        </group>)
}
export default Component