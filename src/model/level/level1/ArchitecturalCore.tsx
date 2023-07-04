"use client";
import { Box } from "@react-three/drei";
import { useContext, useMemo, useRef, useState } from "react";
import { Mesh, Vector3 } from 'three';


import { AppContext } from "@/../script/state/context/AppContext";
import { useAuth } from "@/../script/state/context/AuthContext";
import { useCopyToClipboard } from "usehooks-ts";
import EvolutionBox from "@/model/npc/EvolutionBox";
import FloatingStart from "../../core/FloatingStart";
import TownTextStart from "./tutorial/TownTextStart";
import { useGame } from "@/../script/util/hook/useGame";
import MiniCitySign from "@/model/npc/TradingBox/output/MiniCitySign";
import { fetchMultipleJsonArray, parseDecimals } from "../../../../script/util/helper";
import { BINA_API_PRICE_BASEURL, GLOBAL_baseToken } from "../../../../script/constant/game";
import { useQuery } from "@tanstack/react-query";
import BouncingThing from "@/model/npc/TradingBox/output/BouncingThing";
import TownSign from "@/model/npc/EvolutionBox/TownSign";
import CallForHab from "@/model/npc/EvolutionBox/CallForHab";

function ArchitecturalCore ({state, calls, store}:any) {
  const app:any = useContext(AppContext)
  const { user, superuser, do:{login, logout, demo,},  jwt }:any = useAuth()
  const position = new Vector3(-0.75,0,-0.75)
  const $evolBox: any = useRef(null);
  const [clicked, setClicked] = useState(false)
  const toggleGame = (boxName:string, tradeData:any)=> {
    console.log("state.profitHistory", state.profitHistory)
    if (state.profitHistory.length > 4) {
      return
    }
    // return

    setClicked(!!tradeData.value)
    // console.log("tradeData", boxName, tradeData, state.selectedHasArray)
    if (!state.selectedHasArray) { return }
    calls.toggleGame(boxName, tradeData)
    // alert("toggleGame")
  }
  const bouncingThing:any = useRef<Mesh>();
  const refetchInterval = 9000
  const queryUSDT: any = useQuery({
    queryKey: ['usdt' + state.token], refetchInterval: refetchInterval,
    queryFn: async () => {
      let theList = await fetchMultipleJsonArray(([state.token].reduce((acc, aToken) => (
        { ...acc, [aToken]: [`${BINA_API_PRICE_BASEURL}${(aToken + GLOBAL_baseToken).toUpperCase()}`] }
      ), {})))
      let prr = parseDecimals(theList[0].price)
      return prr
    }
  })
  // const [clickedPrice, s__clickedPrice] = useState(0)

  const clickedPrice = useMemo(()=> {
    if (!$evolBox || !$evolBox.current) return 0
    return $evolBox.current.clickedPrice
  }, [])
  // const clicked = useMemo(()=> {
  //   if (!$evolBox || !$evolBox.current) return false
  //   return $evolBox.current.clicked
  // }, [])



  return (<>
  
    {/* MAIN FLOOR */}
    <Box args={[2.5,0.2,2.8]} position={[0,-1.1,0]} castShadow receiveShadow>
      <meshStandardMaterial color={!!state.tutoStage && state.tutoStage?.lvl > 4 ? "#84BC4E" : "#fff"}/>
    </Box>

    <group position={position}>
      <EvolutionBox {...{state, calls:{...calls,...{toggleGame}}, store}}  ref={$evolBox} queryUSDT={queryUSDT}>

      </EvolutionBox>
    </group>    
    
    
      <group position={position}>
        <TownSign tokensArrayArray={state.tokensArrayArray}
          state={{queryUSDT,state:state.isSelected, selectedHasArray: state.selectedHasArray}}
          calls={{}}
        />
      </group>
      
      {state.selectedHasArray &&
        <group position={position}>
          <CallForHab tokensArrayArray={state.tokensArrayArray} _bouncingThing={bouncingThing}
            livestate={{clickedPrice, queryUSDT}}
            calls={{
              app_tip:(msg:string)=>{app.alert("neutral",msg)},
            }}
            isSelectedId={state.isSelectedId} token={state.token} clicked={clicked}
          />
        </group>
      }

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