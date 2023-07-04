"use client";
import { Box } from "@react-three/drei";
import { useContext, useState } from "react";


import ChartBox from "@/model/npc/ChartBox";
import ByteCityLibertyBank from "./npc/ByteCityLibertyBank";
import ClickToStart from "./tutorial/ClickToStart";
import MetaOrbitControls from "@/model/core/MetaOrbitControls";
import ByteCityEnv from "../../core/StandardSkyEnv";
import ConnectPlayerToggle from "./core/ConnectPlayerToggle";
import ResetLocalStorage from "./core/ResetLocalStorage";
import { AppContext } from "@/../script/state/context/AppContext";
import { useAuth } from "@/../script/state/context/AuthContext";
import { useCopyToClipboard } from "usehooks-ts";
import BlockchainWalletToggle from "./core/BlockchainWalletToggle";

function BankingSystem ({state, calls, }:any) {
  const app:any = useContext(AppContext)
  const { user, superuser, do:{login, logout, demo,},  jwt }:any = useAuth()
  const [AIdata, s__AIdata] = useState({})
  

  
  const [clipbloardValue, clipbloard__do] = useCopyToClipboard()
  const AI_BASE = `
    act as a professional bitcoin market researcher
    analyze this simulated data and make a report:
    include trend direction and most levels to watch

    each object property has an array,
    each array represents candlestick chart data with the latest closing prices separated by a length of time specified by the key name
    your task is to generate the report including all timeframes in the json object
    
    \n\n candles data:
  `
  const askAI = (data:any) => {
    let verbose:any = {
      "3m": "3 minutes between prices",
      "15m": "15 minutes between prices",
      "4h": "4 hours between prices",
      "1d": "1 day between prices",
    }
    let newPrompt:any = AIdata
    newPrompt[verbose[state.selectedTimeframe.toLowerCase()]] = ([...data]).splice(400,499)
    s__AIdata(newPrompt)
    // console.log("newPrompt", newPrompt)
    clipbloard__do(AI_BASE + JSON.stringify(newPrompt))
  }






  return (<>
  
    {/* MAIN FLOOR */}
    <Box args={[2.5,0.2,2.8]} position={[0,-1.1,0]} castShadow receiveShadow>
      <meshStandardMaterial color={!!state.tutoStage && state.tutoStage?.lvl > 4 ? "#84BC4E" : "#fff"}/>
    </Box>

    
    
    {/* START TUTORIAL */}
    {!state.hasAnyToken && <ClickToStart calls={{join:calls.join}} />}

    {/* CHAPTER 1 */}
    {/* BTC | Bitcoin | Bit Coin */}
    {/* CHAPTER 1 */}
    <ByteCityLibertyBank tokensArrayObj={state.tokensArrayObj} selectedToken={state.selectedToken}
      toggleTrade={(tokenname:any,data:any)=>{calls.toggleTrade("btc",data)}}
      hasAnyToken={state.hasAnyToken} 
      form={state.form} timeframe={state.form.id.split("USDT")[1]} token="btc" 
      tokensArrayArray={"btc" in state.tokensArrayObj ? state.tokensArrayObj["btc"] : null}
      refetchInterval={state.selectedToken == "btc" ? 4000 : 60000}
      unselectedColor={"#50545B"}
      onTextClick={()=>{calls.onTextClick("btc")}} 
      setVelocityY={(data:any)=>{calls.toggleTrade("btc",data)}}
      turnOn={(e:any)=>{calls.turnOn("btc");  e.stopPropagation && e.stopPropagation()}} turnOff={(e:any)=>{calls.turnOff("btc");  e.stopPropagation && e.stopPropagation()}}
      join={(e:any)=>{calls.join("btc");  e.stopPropagation && e.stopPropagation()}} leaveAsset={(e:any)=>{calls.leaveAsset("btc");  e.stopPropagation && e.stopPropagation()}}
      trendDown={()=>{calls.trendDown("btc")}} trendUp={()=>{calls.trendUp("btc")}} 
      onTimeframeClick={(token:any, tf:any)=>{calls.onTimeframeClick("btc",tf)}}
    />

    {/* CHAPTER X */}
    {state.hasAnyToken && !state.isDefaultUser && !!state.tokensArrayObj[state.selectedToken] && state.isSelectedTokenDowntrend && <>
      <group scale={[0.4,0.4,0.4]}  position={state.chartPos} rotation={state.chartRot}>
        <ChartBox boundaries={[1,0.1,0.04]} score={{score:0}} timeframe={state.selectedTimeframe.toLowerCase() || "1d"}
          position={[0,0,0]} velocityX={0}  theToken={state.form.id.split("USDT")[0]} askAI={(data:any)=>{askAI(data)}}
          velocityY={0} setVelocityX={()=>{}} setVelocityY={()=>{}} {...{chartBoxPos:state.chartBoxPos, s__chartBoxPos:calls.s__chartBoxPos}}
          tokensArrayObj={state.tokensArrayObj}
        />
      </group>
    </>}
  </>)
}

export default BankingSystem