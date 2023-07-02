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
import { pov_isDefaultUser } from "../../../../script/util/helper/gameHelper";
import StandardSkyEnv from "@/model/core/StandardSkyEnv";
import ArchitecturalCore from "./ArchitecturalCore";
import { DefaultSceneTable } from "@/model/core/DefaultSceneTable";
import { useGame } from "../../../../script/util/hook/useGame";
import RootScene from "@/model/core/RootScene"

const ByteTown = ({eraName="townEra"}:any) => {
  const gameLoop = useGame({state:{eraName}})
  const app:any = useContext(AppContext)
  const searchParams:any = useSearchParams();
  const { user, superuser, do:{login, logout, fetchSupaPlayer, demo,},  jwt }:any = useAuth()
  const [LS_rpi, s__LS_rpi] = useLocalStorage('rpi', "user:0000")
  const [rpi, s__rpi] = useState<any>(LS_rpi)
  const [form,s__form] = useState({
    id:"BTCUSDT3M",
  })
  const hasAnyToken = useMemo(()=>{
    let interestCount = Object.keys(gameLoop.store).filter((token)=>{
      return token in gameLoop.store
    })
    return interestCount.length > 0
  },[gameLoop.store])
  const hasAllTokens = useMemo(()=>{
    let interestCount = Object.keys(gameLoop.store).filter((token)=>{
      return token in gameLoop.store
    })
    return interestCount.length == 4
  },[gameLoop.store])
  const [LH_superuser, s__LH_superuser]:any = useLocalStorage("superuser","{}")
  const [notSaved,s__notSaved] = useState(false)
  const router = useRouter()

  useUnloadHandler(router, notSaved,)
  const isDefaultUser = useMemo(()=> pov_isDefaultUser(rpi),[rpi])

  useEffect(()=>{
    console.log("asdasdasd", gameLoop.store)
  },[])

  return (
    <RootScene>

    <SceneSessionNucleus state={{eraName}} />
      
    <MetaOrbitControls state={{tutoStage:gameLoop.state.tutoStage, hasAnyToken}} />
      <StandardSkyEnv />

      <group position={[0,0,0]}>
        <ArchitecturalCore {...{
          store: gameLoop.store,
          state:{
            ...gameLoop.state,
            form,
            eraName,
          },
          calls:{
            join: gameLoop.calls.join,
            leaveAsset: gameLoop.calls.leave,
          }
        }}/>
      </group>
      
      {hasAllTokens && <>
        <Cylinder receiveShadow args={[3.3,3.3,0.15,gameLoop.state.tutoStage.lvl > 4 ? 3+gameLoop.state.tutoStage.lvl : 4]} position={[0, -1.2, 0]}>
          <meshStandardMaterial color={gameLoop.state.tutoStage.lvl > 4 ? "#84BC4E" : "#fff"} />

        </Cylinder>
      </>}
      
    </RootScene>
  )
}

export default ByteTown
