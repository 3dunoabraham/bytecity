"use client";
import { Box } from "@react-three/drei";
import { useContext, useMemo, useRef, useState } from "react";
import { Mesh, Vector3 } from 'three';


import { AppContext } from "@/../script/state/context/AppContext";
import { useAuth } from "@/../script/state/context/AuthContext";
import { useCopyToClipboard } from "usehooks-ts";
import EvolutionBox from "@/model/npc/EvolutionBox/EvoBox";
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
import ChartBox from "@/model/npc/ChartBox";
import Goldboard from "@/model/npc/ChartBox/Goldboard";
import { useAI } from "../../../../script/util/hook/useHooksHelper";
import { InventoryContext } from "../../../../script/state/context/InventoryContext";

function GrowZone2 ({state, calls, store, position}:any) {
  const inv = useContext(InventoryContext)
  
  const app:any = useContext(AppContext)
  const { user, superuser, do:{login, logout, demo,},  jwt }:any = useAuth()
  const $evolBox: any = useRef(null);
  const [clicked, setClicked] = useState(false)
  const toggleGame = (boxName:string, tradeData:any)=> {
    if (state.profitHistory.length > 4) {
      return
    }
    // return

    setClicked(!!tradeData.value)
    if (!state.selectedHasArray) {
      if (!!tradeData.value) {

    app.audio("neutral", "./sfx/notnot.wav")
    app.alert("neutral","DEMO Action started")

      } else {

    app.audio("neutral", "./sfx/notnot.wav")
    app.alert("neutral","DEMO Action stopped")

      }
      return
    }
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
  const ask_angelInvestorSimulator = useAI(state.timeframe,true)
  const triggerAI = (e:any,data:any) => {
    ask_angelInvestorSimulator(data)
    e.stopPropagation()
  }


  return (<>
  
    <group position={position}>
      <EvolutionBox {...{state, calls:{...calls,...{toggleGame}}, store}}  ref={$evolBox}
        queryUSDT={queryUSDT}>

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

  </>)
}

export default GrowZone2