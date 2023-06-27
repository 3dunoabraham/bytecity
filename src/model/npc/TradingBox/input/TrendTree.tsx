import { Vector3 } from "three"
import { Cylinder, Torus } from "@react-three/drei"
import DynaText from "@/model/core/DynaText"

function TrendTree ({ tokensArrayArray, state, calls }:any) {
    return ( <group position={[0,-0.445,0]}>
        
        
        {/* TURN VIP FEATURE SUBSCRIPTION */}
        {/* TREND LEVELER */}
        {!!tokensArrayArray && state.selectedHasArray &&
            <mesh castShadow receiveShadow scale={!state.isDowntrend ? 1.75 : 2}
            onClick={!state.isDowntrend ? calls.trendDown : calls.trendUp}
            // rotation={state.isDowntrend ? [0,Math.PI/4,0] : [0,0,0]}
            position={[  -0.34,  0,   0.37]}
            >
            <boxGeometry args={[0.033, 0.1, 0.033]} />
            <meshStandardMaterial color={"#4B689E" }  />
            </mesh>
        }

        {/* TREE */}
        {!!state.isDowntrend && <group position={[-0.12,0,0.07]}>
            
            <mesh castShadow receiveShadow 
            position={[  -0.34,  0,   0.37]}
            >
            <boxGeometry args={[0.02, 0.3, 0.01]} />
            <meshStandardMaterial color={"#664422"} />
            </mesh>
            <mesh castShadow receiveShadow 
            position={[  -0.34,  0.2,   0.37]}
            >
            <sphereGeometry args={[0.1, 1, 3]} />
            <meshStandardMaterial color={"#559933" }  />
            </mesh>
        </group>}
        {!!tokensArrayArray && state.selectedHasArray && <>
            <group scale={[1,0.5,1]}>
                <Torus args={[0.02,0.01,3,4]} rotation={[0,0,Math.PI/4*3]} position={[-0.34,0.16,0.4]}
                >
                    <meshStandardMaterial color={!state.isDowntrend ? "#2B386E" : "#999999" } />

                </Torus>
            </group>
            <Cylinder rotation={[0,0,Math.PI/2]} args={[0.025,0.025,0.05,6]}
                position={[-0.34,0.09,0.37]}
            >
                <meshStandardMaterial color={"#4B689E" } />
            </Cylinder>
          <DynaText color={state.isDowntrend ? "#009900" : "#666666" }  // TREND
              onClick={state.selectedHasArray ? calls.trendDown : calls.trendUp}
              text={state.isDowntrend ? "Mail!" : "Waiting" } 
            // position={new Vector3(-0.31,-0.345,+0.46)}
            position={new Vector3(-0.34,0,+0.45)}
            isSelected={state.isSelectedId}  font={0.035} 
          />
        </>}

    </group>)
}
export default TrendTree