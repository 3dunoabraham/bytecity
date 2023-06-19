import { Vector3 } from "three"
import DynaText from "../DynaText"
const DEFAULT_TIMEFRAME_ARRAY = ["3m","15m","4h","1d","1w"]  


function Component ({ tokensArrayArray, state, calls }:any) {
    return ( <>
        
        {state.isSelectedId && !!tokensArrayArray && <>

            <mesh  castShadow receiveShadow scale={state.score.score ? 1 : 3}
            onClick={() => { calls.onTimeframeClick(state.token, DEFAULT_TIMEFRAME_ARRAY.indexOf(state.selectedTimeframe)) }}
            position={[
                0.3 -(state.selectedTimeframeIndex*0.06),
                0.05 - (state.selectedTimeframeIndex == state.selectedTimeframeIndex ? 0.39 : 0.4),
                - 0.075 + (state.selectedTimeframeIndex*0.06),
            ]}
            >
            <cylinderGeometry args={[0.005, 0.013, 0.015, 3+(state.selectedTimeframeIndex)]} />
            <meshStandardMaterial 
                color={!!tokensArrayArray[state.selectedTimeframeIndex].state ? `#${state.selectedTimeframeIndex*28+40}${state.selectedTimeframeIndex*25+20}${state.selectedTimeframeIndex*25+20}` : 'gray'} 
            />
            </mesh>

            </>}
            {state.isSelectedId && !!tokensArrayArray && ["3m","15m","4h"].map((aTimeframe, index) => {
            return (<group key={index}>

            <DynaText text={aTimeframe} color={index == state.selectedTimeframeIndex ? "#aa00aa" : 0x333333}
            position={new Vector3(
                0.2 -(index*0.05),
                - 0.445,
                - 0.08 + (index*0.06),
            )}
            isSelected={state.isSelectedId}  font={0.04} onClick={()=>{calls.onTextClick()}}
            />
            <mesh  castShadow receiveShadow scale={state.score.score ? 1 : 3}
                onClick={() => { calls.onTimeframeClick(state.token, DEFAULT_TIMEFRAME_ARRAY.indexOf(aTimeframe)) }}
                position={[
                    0.3 -(index*0.06),
                - (index == state.selectedTimeframeIndex ? 0.39 : 0.4),
                - 0.075 + (index*0.06),
                ]}
            >
                <cylinderGeometry args={[0.005, 0.013, 0.04, 3+(index)]} />
                <meshStandardMaterial 
                color={!!tokensArrayArray[index].state ? `#${index*28+40}${index*25+20}${index*25+20}` : 'gray'} 
                />
            </mesh>
            </group>)
            })}
    </>)
}
export default Component