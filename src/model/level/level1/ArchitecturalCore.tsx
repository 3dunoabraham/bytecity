"use client";
import { Box } from "@react-three/drei";
import { useContext, useState } from "react";


import { AppContext } from "@/../script/state/context/AppContext";
import { useAuth } from "@/../script/state/context/AuthContext";
import { useCopyToClipboard } from "usehooks-ts";
import EvolutionBox from "@/model/npc/EvolutionBox";
import FloatingStart from "../../core/FloatingStart";
import TownTextStart from "./tutorial/TownTextStart";
import { useGame } from "@/../script/util/hook/useGame";

function ArchitecturalCore ({state, calls, store}:any) {
  const app:any = useContext(AppContext)
  const { user, superuser, do:{login, logout, demo,},  jwt }:any = useAuth()
  
  const toggleGame = (boxName:string, tradeData:any)=> {
    if (!state.selectedHasArray) { return }
    console.log("tradeData", boxName, tradeData, state.selectedHasArray)
    calls.toggleGame(boxName, tradeData)
    // alert("toggleGame")
  }

  return (<>
  
    {/* MAIN FLOOR */}
    <Box args={[2.5,0.2,2.8]} position={[0,-1.1,0]} castShadow receiveShadow>
      <meshStandardMaterial color={!!state.tutoStage && state.tutoStage?.lvl > 4 ? "#84BC4E" : "#fff"}/>
    </Box>

    <group position={[-0.75,0,-0.75]}>
      <EvolutionBox {...{state, calls:{...calls,...{toggleGame}}, store}} >

      </EvolutionBox>
    </group>    
    
    {/* START TUTORIAL */}
    {!state.hasAnyToken && <TownTextStart calls={{}} />}

    {/* CHAPTER X */}
    {/* {state.hasAnyToken && !state.isDefaultUser && !!state.tokensArrayObj[state.selectedToken] && state.isSelectedTokenDowntrend && <>
      <group scale={[0.4,0.4,0.4]}  position={state.chartPos} rotation={state.chartRot}>
        <ChartBox boundaries={[1,0.1,0.04]} score={{score:0}} timeframe={state.selectedTimeframe.toLowerCase() || "1d"}
          position={[0,0,0]} velocityX={0}  theToken={state.form.id.split("USDT")[0]} askAI={(data:any)=>{askAI(data)}}
          velocityY={0} setVelocityX={()=>{}} setVelocityY={()=>{}} {...{chartBoxPos:state.chartBoxPos, s__chartBoxPos:calls.s__chartBoxPos}}
          tokensArrayObj={state.tokensArrayObj}
        />
      </group>
    </>} */}
  </>)
}

export default ArchitecturalCore