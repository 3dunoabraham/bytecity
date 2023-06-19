import { Torus } from "@react-three/drei"


function PowerLock ({ tokensArrayArray, state, calls }:any) {
    return ( <>
        
        {/* STATE MODE */}
        <group onClick={!tokensArrayArray ? calls.join : calls.leaveAsset} 
            position={[0,-0.47,0]}
        >
        {/* KEY */}
        <group position={[!tokensArrayArray ? 0 : -0.25,0,0]}>
            <mesh castShadow receiveShadow 
                rotation={[0,0,0]} scale={state.score.score ? 1 : 3}
                position={[  0.64,  0,  0,]}
            >
                <boxGeometry args={[0.07, 0.01, 0.015]} />
                <meshStandardMaterial color={!tokensArrayArray ? "#ff9900" : "#bb9955"} />
            </mesh>
            
            <mesh castShadow receiveShadow 
                rotation={[0,0,0]} scale={state.score.score ? 1 : 3}
                position={[  0.59,  0,  0.05,]}
            >
                <boxGeometry args={[0.03, 0.008, 0.02]} />
                <meshStandardMaterial color={!tokensArrayArray ? "#ff9900" : "#bb9955"} />
            </mesh>
            
            <Torus args={[0.06,0.033,6,4]} rotation={[Math.PI/2,0,Math.PI/4*3]} 
                position={[0.79,0,0]}
            >
                <meshStandardMaterial flatShading={true} color={!tokensArrayArray ? "#ff9900" : "#bb9955" } />

            </Torus>
        </group>
        
        {/* LOCK */}
        <Torus args={[0.1,0.033,6,4]} rotation={[Math.PI/2,0,Math.PI/4*3]} 
            position={[0.28,0.03,0]}
        >
            <meshStandardMaterial flatShading={true} color={!state.isDowntrend ? "#aaaaaa" : "#ff9900" } />

        </Torus>
        <mesh castShadow receiveShadow onClick={!tokensArrayArray ? calls.join : calls.leaveAsset}
            scale={3}
            position={[  0.41,  0,  0,]}
        >
            <boxGeometry args={[0.07, 0.04, 0.08]} />
            <meshStandardMaterial color={"#888"} />
        </mesh>
        {state.selectedHasArray &&
            <mesh castShadow receiveShadow onClick={!tokensArrayArray ? calls.join : calls.leaveAsset}
                scale={3}
                position={[  0.41, 0.01,  0,]}
            >
                <boxGeometry args={[0.065, 0.04, 0.075]} />
                <meshStandardMaterial color={"#46a740"} />
            </mesh>
        }
        </group>

    </>)
}
export default PowerLock