import DynaText from "@/model/core/DynaText"

export function TextContainer ({state, calls}:any) {
  return (
    <>
    
    <group position={[0.5, -0.185, 7.5]} rotation={[0, Math.PI, 0]} >
        <DynaText color={"#0099ff"} text={state.score < 0 ? "Click blue to Play" : state.score} font={state.score < 0 ? 0.1 : 0.4}
          onClick={calls.startGame}
          rotation={[-Math.PI / 2, 0, Math.PI]}
          position={[0.05, -0.774, 0.9]}
        />
        <DynaText color={"#009900"} text={"Battle Mode"}
          onClick={calls.startGame} font={0.1} 
          rotation={[-Math.PI / 2, 0, -Math.PI/2]}
          position={[-0.95, -0.774, 1.6]}
        />
        {state.lastScore > 0 &&
          <DynaText color={"#ff9900"} text={state.lastScore} font={0.65} position={[0.5, -0.76, -0.4]}
            rotation={[-Math.PI / 2, 0, Math.PI]}
          />
        }
        {!!state.opponent &&
          <DynaText color={"#ff3300"} text={state.opponent} font={0.65} position={[0.5, -0.76, 2.4]}
            rotation={[-Math.PI / 2, 0, 0]}
          />
        }
      </group>
    </>
  )
}
export default TextContainer