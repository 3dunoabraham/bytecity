"use client";
import { useContext, useEffect, useMemo, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { useRouter, useSearchParams } from "next/navigation";


import { useAuth } from "@/../script/state/context/AuthContext";
import { AppContext } from "@/../script/state/context/AppContext";
import { useUnloadHandler } from "@/../script/util/hook/useHooksHelper";
import RootScene from "@/model/core/RootScene"
import MetaOrbitControls from "@/model/core/MetaOrbitControls";
import ByteCityEnv from "@/model/level/level2/core/ByteCityEnv";
import SceneSessionNucleus from "@/model/core/SceneSessionNucleus";
import MFEnv from "./core/MFEnv";
import MillionControls from "@/model/core/MillionControls";
import { Plane } from "@react-three/drei";
import ThousandZone from "@/model/npc/ThousandZone";
import GridFloor from "@/model/npc/ThousandZone/GridFloor";

function Component ({}) {
  const app:any = useContext(AppContext)
  const searchParams:any = useSearchParams();
  const { user, superuser, do:{login, logout, fetchSupaPlayer, demo,},  jwt }:any = useAuth()
  const [LS_rpi, s__LS_rpi] = useLocalStorage('rpi', "user:0000")
  const [rpi, s__rpi] = useState<any>(LS_rpi)
  const [_tutoStage, s__LS_tutoStage] = useLocalStorage('level2tutorialstage', "{}")
  const [LS_tokensArrayObj, s__LS_tokensArrayObj] = useLocalStorage('localTokensArrayObj', "{}")
  const [tokensArrayObj,s__tokensArrayObj] = useState<any>({})
  const [selectedToken, __selectedToken] = useState("btc")
  const [profitHistory, s__profitHistory] = useState<any>([])
  const tutoStage:any = useMemo(()=> JSON.parse(_tutoStage) , [_tutoStage])
  const hasAnyToken = useMemo(()=>{
    let interestCount = Object.keys(tokensArrayObj).filter((token)=>{
      return token in tokensArrayObj
    })
    return interestCount.length > 0
  },[tokensArrayObj])
  const [LH_superuser, s__LH_superuser]:any = useLocalStorage("superuser","{}")
  const [notSaved,s__notSaved] = useState(false)
  const router = useRouter()


  useUnloadHandler(router, notSaved,)

  const setTutoStage = (lvl: any) => s__LS_tutoStage(JSON.stringify({ ...tutoStage, lvl }))


  useEffect(()=>{
    s__tokensArrayObj(JSON.parse(LS_tokensArrayObj))
  },[user, superuser])

  const zCount = 10
  const xCount = 10
  const yCount = 1
  return (<>
    <RootScene>
    <group position={[0,1.5,1.5]} scale={2}>
      <SceneSessionNucleus included={["blockchain"]} />
    </group>

    {/* <Plane rotation={[-Math.PI/2,0,0]} args={[5,5]}>

    </Plane> */}
    {/* <group position={[-4.5,0,-4.5]}>
      <ThousandZone xCount={xCount} zCount={zCount}  />
    </group> */}
    <GridFloor xCount={xCount} yCount={yCount} zCount={zCount} />
    

      
    <MillionControls state={{tutoStage, hasAnyToken}} />
    <MFEnv />

    </RootScene>
  </>)
}

export default Component