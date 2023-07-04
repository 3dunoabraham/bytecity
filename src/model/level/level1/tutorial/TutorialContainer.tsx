import { MeshStandardMaterial } from "three"
import { useContext, useState } from "react"
import { AppContext } from "@/../script/state/context/AppContext"


import GreenBuy from "./GreenBuy"
import SellHigh from "./SellHigh"
import SetDemoOff from "./SetDemoOff"
import TutorialGoal from "./TutorialGoal"
import TutorialFee from "./TutorialFee"
import FontText from "@/model/core/FontText"

function Component({ state }: any) {
  const app:any = useContext(AppContext)

  return (<>
    {state.hasAnyToken && !state.tutoStage.lvl && <SetDemoOff />}
    {state.hasAnyToken && state.tutoStage.lvl == 1 && <GreenBuy />}
    {state.hasAnyToken && state.tutoStage.lvl == 2 && <SellHigh />}
    {state.hasAnyToken && state.tutoStage.lvl == 3 && <TutorialGoal />}
    {state.hasAnyToken && state.tutoStage.lvl > 3 && <TutorialFee />}

    {state.hasAnyToken && state.tutoStage.lvl > 2 &&
      <group position={[-0.35, -0.498, -1.9]} scale={0.35} 
      onClick={() => { app.alert("neutral","Tip: The Life Storage resets on page reload") }} 

       >
        <group position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <FontText position={[0, 0, 0]} fontSize={0.25} rotation={[-Math.PI / 2, 0, 0]}
            material={new MeshStandardMaterial({ side: 0, color: "#070" })}>
            Life Storage Station
          </FontText>
        </group>
      </group>
    }
  </>)
}

export default Component