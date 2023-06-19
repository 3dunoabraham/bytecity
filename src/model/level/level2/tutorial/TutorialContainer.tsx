import GreenBuy from "./GreenBuy"
import SellHigh from "./SellHigh"
import SetDemoOff from "./SetDemoOff"
import TutorialGoal from "./TutorialGoal"
import ClickToStart from "./ClickToStart"
import TutorialFee from "./TutorialFee"
import FontText from "@/model/npc/TradingBox/FontText"
import { MeshStandardMaterial } from "three"

function Component ({state}:any) {
  return (<>
    {state.hasAnyToken && !state.tutoStage.lvl && <SetDemoOff /> }
    {state.hasAnyToken && state.tutoStage.lvl == 1  && <GreenBuy  /> }
    {state.hasAnyToken && state.tutoStage.lvl == 2 && <SellHigh /> }
    { state.hasAnyToken && state.tutoStage.lvl == 3  && <TutorialGoal /> }
    { state.hasAnyToken && state.tutoStage.lvl > 3  && <TutorialFee /> }

    { state.hasAnyToken && state.tutoStage.lvl > 2 &&
    <group position={[-0.35,-0.498,-1.9]} scale={0.35}  >
            <group position={[0,0,0]} rotation={[0,Math.PI/2,0]}>
                <FontText position={[0,0,0]} fontSize={0.2} rotation={[-Math.PI/2,0,0]} 
                    material={new MeshStandardMaterial({ side: 0, color: "#666" })}>
                    Local Storage Station
                </FontText>
            </group>
        </group>
}

  </>)
}

export default Component