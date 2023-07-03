"use client";
import { useContext, useEffect, useMemo, useState } from "react";
import { Cylinder } from "@react-three/drei";
import { useLocalStorage } from "usehooks-ts";
import { useRouter, useSearchParams } from "next/navigation";


import { useAuth } from "@/../script/state/context/AuthContext";
import { AppContext } from "@/../script/state/context/AppContext";
import { useUnloadHandler } from "@/../script/util/hook/useHooksHelper";
import MetaOrbitControls from "@/model/core/MetaOrbitControls";
import SceneSessionNucleus from "@/model/core/SceneSessionNucleus";
import StandardSkyEnv from "@/model/core/StandardSkyEnv";
import ArchitecturalCore from "./ArchitecturalCore";
import { useGame } from "@/../script/util/hook/useGame";
import RootScene from "@/model/core/RootScene"
import TutorialContainer from "./tutorial/TutorialContainer";
import GoalPost from "./goal/GoalPost";
import TownCamera from "./TownCamera";

const ByteTown = ({eraName="townEra"}:any) => {
  const app:any = useContext(AppContext)
  const gameLoop = useGame({state:{eraName},form:{ id:"BTCUSDT3M" }})
  
  const goalPostTips = async () => {
    return
    if (gameLoop.state.isDefaultUser) {
      if (gameLoop.state.profitHistory.length  == 0) {
        app.alert("neutral", "Tip: Buy low and sell high to get points!")
        return
      } else {
        if (gameLoop.state.realProfitCount == 0) {
          app.alert("neutral", "Tip: Remove bad orders (losses) by fixing (click) white-roofed cars!")
        } else {
          app.alert("neutral", "Tip: Buy and sell profitably 4 times to level up!")
        }

      }
    } else {
      if (gameLoop.state.realProfitCount < 4) {
        // app.alert("neutral", "Trying to sync account")
        // let loginRes = await login({
        //   referral:gameLoop.state.LS_rpi.split(":")[0],
        //   pin:gameLoop.state.LS_rpi.split(":")[1]
        // })
        // if (!loginRes) return 

      } else {
        // calls.s__profitHistory([])
        app.audio("neutral", "./sound/aaa.wav")
        app.alert("success", "Local Storage Station has been cleared!")
      }
    }

    // if (gameLoop.state.tutoStage == 3) {
    //   calls.setTutoStage(4)
    // }
  }

  return (
    <RootScene>

    <SceneSessionNucleus state={{eraName}} included={["local"]} />
      
    <TownCamera state={{tutoStage:gameLoop.state.tutoStage, hasAnyToken: gameLoop.state.hasAnyToken}} />
      <StandardSkyEnv />
      
    <TutorialContainer
      state={{ hasAnyToken: gameLoop.state.hasAnyToken, tutoStage: gameLoop.state.tutoStage,
        isDefaultUser: gameLoop.state.isDefaultUser  
      }}
    />

      <group position={[0,0,0]}>
        <ArchitecturalCore {...{
          store: gameLoop.store,
          state:{
            ...gameLoop.state,
            form: gameLoop.form,
            eraName,
          },
          calls:{
            toggleGame: gameLoop.calls.toggleTrade,
            turnOn: gameLoop.calls.turnOn,
            turnOff: gameLoop.calls.turnOff,
            join: gameLoop.calls.join,
            leaveAsset: gameLoop.calls.leave,
          }
        }}/>
      </group>
      
      
      {/* local storage goal */}
      {gameLoop.state.hasAnyToken &&  gameLoop.state.tutoStage.lvl >= 3 &&
        <GoalPost calls={{claim:goalPostTips}}
          state={{ hasAnyToken: gameLoop.state.hasAnyToken,
            profitHistory: gameLoop.state.profitHistory, tutoStage: gameLoop.state.tutoStage
          }}
        />
      }

      {gameLoop.state.hasAllTokens && <>
        <Cylinder receiveShadow args={[3.3,3.3,0.15,gameLoop.state.tutoStage.lvl > 4 ? 3+gameLoop.state.tutoStage.lvl : 4]} position={[0, -1.2, 0]}>
          <meshStandardMaterial color={gameLoop.state.tutoStage.lvl > 4 ? "#84BC4E" : "#fff"} />

        </Cylinder>
      </>}
      
    </RootScene>
  )
}

export default ByteTown
