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
import { useGame } from "../../../../script/util/hook/useGame";
import RootScene from "@/model/core/RootScene"

const ByteTown = ({eraName="townEra"}:any) => {
  const gameLoop = useGame({state:{eraName},form:{ id:"BTCUSDT3M" }})

  return (
    <RootScene>

    <SceneSessionNucleus state={{eraName}} />
      
    <MetaOrbitControls state={{tutoStage:gameLoop.state.tutoStage, hasAnyToken: gameLoop.state.hasAnyToken}} />
      <StandardSkyEnv />

      <group position={[0,0,0]}>
        <ArchitecturalCore {...{
          store: gameLoop.store,
          state:{
            ...gameLoop.state,
            form: gameLoop.form,
            eraName,
          },
          calls:{
            turnOn: gameLoop.calls.turnOn,
            turnOff: gameLoop.calls.turnOff,
            join: gameLoop.calls.join,
            leaveAsset: gameLoop.calls.leave,
          }
        }}/>
      </group>
      
      {gameLoop.state.hasAllTokens && <>
        <Cylinder receiveShadow args={[3.3,3.3,0.15,gameLoop.state.tutoStage.lvl > 4 ? 3+gameLoop.state.tutoStage.lvl : 4]} position={[0, -1.2, 0]}>
          <meshStandardMaterial color={gameLoop.state.tutoStage.lvl > 4 ? "#84BC4E" : "#fff"} />

        </Cylinder>
      </>}
      
    </RootScene>
  )
}

export default ByteTown
