"use client";
import { useContext, useEffect, useMemo, useState } from "react";
import { Cylinder } from "@react-three/drei";
import { useLocalStorage } from "usehooks-ts";
import { useRouter, useSearchParams } from "next/navigation";


import { useAuth } from "@/../script/state/context/AuthContext";
import { AppContext } from "@/../script/state/context/AppContext";
import { useUnloadHandler } from "@/../script/util/hook/useHooksHelper";
import RootScene from "@/model/core/RootScene"
import MetaOrbitControls from "@/model/core/MetaOrbitControls";
import SceneSessionNucleus from "@/model/core/SceneSessionNucleus";
import { pov_isDefaultUser } from "../../../../script/util/helper/gameHelper";
import StandardSkyEnv from "@/model/core/StandardSkyEnv";
import ArchitecturalCore from "./ArchitecturalCore";
import { DefaultSceneTable } from "@/model/core/DefaultSceneTable";

function ByteTown ({}) {
  const app:any = useContext(AppContext)
  const searchParams:any = useSearchParams();
  const { user, superuser, do:{login, logout, fetchSupaPlayer, demo,},  jwt }:any = useAuth()
  const [LS_rpi, s__LS_rpi] = useLocalStorage('rpi', "user:0000")
  const [rpi, s__rpi] = useState<any>(LS_rpi)
  const [_tutoStage, s__LS_tutoStage] = useLocalStorage('level2tutorialstage', "{}")
  const [LS_tokensArrayObj, s__LS_tokensArrayObj] = useLocalStorage('townTokensArrayObj', "{}")
  const [tokensArrayObj,s__tokensArrayObj] = useState<any>({})
  const [savedString,s__savedString] = useState("")
  const [selectedToken, __selectedToken] = useState("btc")
  const [profitHistory, s__profitHistory] = useState<any>([])
  const [form,s__form] = useState({
    id:"BTCUSDT3M",
  })
  const tutoStage:any = useMemo(()=> JSON.parse(_tutoStage) , [_tutoStage])
  const hasAnyToken = useMemo(()=>{
    let interestCount = Object.keys(tokensArrayObj).filter((token)=>{
      return token in tokensArrayObj
    })
    return interestCount.length > 0
  },[tokensArrayObj])
  const hasAllTokens = useMemo(()=>{
    let interestCount = Object.keys(tokensArrayObj).filter((token)=>{
      return token in tokensArrayObj
    })
    return interestCount.length == 4
  },[tokensArrayObj])
  const [LH_superuser, s__LH_superuser]:any = useLocalStorage("superuser","{}")
  const [notSaved,s__notSaved] = useState(false)
  const router = useRouter()

  useUnloadHandler(router, notSaved,)
  const isDefaultUser = useMemo(()=> pov_isDefaultUser(rpi),[rpi])

  useEffect(()=>{
    s__tokensArrayObj(JSON.parse(LS_tokensArrayObj))
    s__savedString(LH_superuser)
  },[user, superuser])

  return (<>
    <RootScene>

    <SceneSessionNucleus />

      
    <MetaOrbitControls state={{tutoStage, hasAnyToken}} />
      <StandardSkyEnv />

      
    <group >
      <DefaultSceneTable  />
    </group>    


{/* 
      <group position={[0,0,0]}>
        <ArchitecturalCore {...{
            state:{form
            },
            calls:{
            }
        }}/>
      </group> */}
      
      {hasAllTokens && <>
        <Cylinder receiveShadow args={[3.3,3.3,0.15,tutoStage.lvl > 4 ? 3+tutoStage.lvl : 4]} position={[0, -1.2, 0]}>
          <meshStandardMaterial color={tutoStage.lvl > 4 ? "#84BC4E" : "#fff"} />

        </Cylinder>
      </>}
      
    </RootScene>
  </>)
}

export default ByteTown