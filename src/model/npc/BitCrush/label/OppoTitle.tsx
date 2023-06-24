import DynaText from "@/model/core/DynaText"
import { useAuth } from "../../../../../script/state/context/AuthContext"

export function OppoTitle ({state, calls}:any) {
  const { user, superuser, superoppo, do:{login, logout, demo, fetchSupaOppoUser, fetchSupaPlayer},  jwt }:any = useAuth()


  return (
    <>
    
    <group position={[0.5, -0.185, 7.5]} rotation={[0, Math.PI, 0]} >
        {/* <DynaText color={"#0099ff"} text={state.score < 0 ? "Click blue to Play" : state.score} font={state.score < 0 ? 0.1 : 0.4}
          onClick={calls.startGame}
          rotation={[-Math.PI / 2, 0, Math.PI]}
          position={[0.05, -0.774, 0.9]}
        /> */}


{!!superuser &&
            <DynaText color={"#006600"} text={superuser.eloWTL} font={0.45} position={[-1.5, -0.76, 1.15]}
              rotation={[-Math.PI / 2, 0, -Math.PI/2]}
            />
          }
        {!!state.opponent && <>
          <DynaText color={"#ff3300"} text={state.opponent} font={0.65} position={[0.5, -0.76, 3]}
            rotation={[-Math.PI / 2, 0, Math.PI]}
          />
          {!!superoppo &&
            <DynaText color={"#000000"} text={superoppo.eloWTL} font={0.95} position={[0.5, -0.76, 2.3]}
              rotation={[-Math.PI / 2, 0, Math.PI]}
            />
          }
          
          <DynaText color={"#ff3300"} text={"Opponent"} font={0.25} position={[0.5, -0.76, 3.5]}
            rotation={[-Math.PI / 2, 0, Math.PI]}
          />
        </>}
        {/* {state.lastScore > 0 &&
          <DynaText color={"#ff9900"} text={state.lastScore} font={0.65} position={[0.5, -0.76, -0.4]}
            rotation={[-Math.PI / 2, 0, Math.PI]}
          />
        }
         */}
      </group>
    </>
  )
}
export default OppoTitle