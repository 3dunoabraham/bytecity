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

function ArchitecturalCore ({state, calls, store}:any) {
  const app:any = useContext(AppContext)
  const { user, superuser, do:{login, logout, demo,},  jwt }:any = useAuth()
  const position = new Vector3(-0.75,0,-0.75)
  const $evolBox: any = useRef(null);
  const [clicked, setClicked] = useState(false)
  let [beginnerAddCounter, s__beginnerAddCounter] = useState(-1)
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
    // console.log("state", state)
    if ((!!state.tutoStage || state.tutoStage.lvl < 2)) {
      if (!tradeData.value) {
        console.log("completed helping new")
        // s__beginnerAddCounter(beginnerAddCounter)
        // tradeData.price +=  beginnerAddCounter
        s__beginnerAddCounter(-1)
      } else {
        s__beginnerAddCounter(parseFloat(tradeData.price))
        console.log("first buy? -> helping new")
      }
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
      if (beginnerAddCounter >= 0 && (!!state.tutoStage && state.tutoStage.lvl <= 2)) {
        // console.log("helping new", typeof theList[0].price, theList[0].price)
        theList[0].price = beginnerAddCounter
        // console.log("new price", theList[0].price)
        s__beginnerAddCounter(beginnerAddCounter+1)
      } else {
        // console.log("ok", beginnerAddCounter,  state.tutoStage)
      }
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

  const isSelectedId = useMemo(()=>{

    // console.log("state.form")
    // console.log(state.form)
    if (state.form) {
      // console.log(state.form.id)
      // console.log(state.token.toUpperCase())
      // console.log(state.token.toUpperCase()+"USDT"+state.timeframe.toUpperCase())
    } else {
      // console.log("no more found")
    }
  return state.form && state.form.id == state.token.toUpperCase()+"USDT"+state.timeframe.toUpperCase()
  },[state.form])

  return (<>
  
    <group position={position}>
      <EvolutionBox {...{state:{...state, isSelectedId},
        calls:{...calls,...{toggleGame}}, store}} 
       ref={$evolBox} queryUSDT={queryUSDT}>

      </EvolutionBox>
    </group>    
    
    
      <group position={position}>
        <TownSign tokensArrayArray={state.tokensArrayArray}
          state={{queryUSDT,isSelectedId, selectedHasArray: state.selectedHasArray}}
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
            isSelectedId={isSelectedId} token={state.token} clicked={clicked}
          />
        </group>
      }

    {/* START TUTORIAL */}
    {!state.hasAnyToken && <TownTextStart calls={{}} />}

  </>)
}

export default ArchitecturalCore