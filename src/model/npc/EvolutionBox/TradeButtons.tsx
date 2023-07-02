import { useContext } from "react"
import { AppContext } from "@/../script/state/context/AppContext"

export function TradeButtons({ tokensArrayArray, state, calls }: any) {
  const app:any = useContext(AppContext)
  const triggerDemoLive = (e:any)=> {
    app.audio("neutral","./sound/click47.wav")

    if (state.selectedHasArray) {
      calls.turnOff(e)
     } else {
       calls.turnOn(e)
     }
    e.stopPropagation()
  }

  return (<group position={[0, -0.1, 0]}>

    {/* buy/sell */}
    {state.isSelectedId && !!tokensArrayArray && <group>
      <mesh castShadow receiveShadow onClick={() => calls.toggleGame()} scale={state.score.score ? 1 : 3}
        position={[
          !state.clicked ? - 0.05 : + 0.11,
          state.clicked ? - 0.33 : - 0.3,
          +0.35,
        ]}
      >
        <boxGeometry args={[0.1, state.clicked ? 0.015 : 0.04, 0.04]} />
        <meshPhongMaterial color={state.clicked ? "red" : "#55bb11"} />
      </mesh>

    </group>}
    {!!tokensArrayArray && state.selectedHasArray &&
      <mesh castShadow receiveShadow
        scale={3}
        position={[0.03, -0.355, 0.349,]}
      >
        <boxGeometry args={[0.165, 0.01, 0.046]} />
        <meshStandardMaterial color={"#908274"} />
      </mesh>
    }


    {/* DEMO LIVE BUUTTON TOGGLE */}
    {!!tokensArrayArray && <group onClick={triggerDemoLive}>
      <mesh castShadow receiveShadow scale={state.score.score ? 1 : 3}
        rotation={[(!!tokensArrayArray && !!state.selectedHasArray) ? 0.5 : -0.5, 0, 0]}
        position={[0.4, -0.27, + 0.31,]}
      >
        <boxGeometry args={[0.01, 0.025, 0.01]} />
        <meshStandardMaterial color={(!!tokensArrayArray && !!state.selectedHasArray) ? "#009900" : "#9A7465"} />
      </mesh>


      <mesh castShadow receiveShadow scale={state.score.score ? 1 : 3}
        position={[0.4, -0.32, + 0.31,]}
      >
        <boxGeometry args={[0.03, 0.025, 0.03]} />
        <meshStandardMaterial color={"#978887"} />
      </mesh>

    </group>}

  </group>)
}
export default TradeButtons