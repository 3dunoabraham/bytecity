"use client";
import { useContext, useEffect, useMemo, useState } from "react";
import { Cylinder } from "@react-three/drei";
import { useLocalStorage } from "usehooks-ts";
import { useRouter, useSearchParams } from "next/navigation";


import { getComputedLevels } from "@/../script/util/helper";
import { countProfitableTrades, createTradeObject, handleFirstTutorialStages, updateProfitHistory } from "@/model/scripts";
import { useAuth } from "@/../script/state/context/AuthContext";
import { AppContext } from "@/../script/state/context/AppContext";
import TradingBox, { DEFAULT_TIMEFRAME_ARRAY } from "@/model/npc/TradingBox";
import { useUnloadHandler } from "@/../script/util/hook/useHooksHelper";
import { fetchPost } from "@/../script/util/helper/fetchHelper";
import BankingSystem  from "./BankingSystem";
import MovingBoxAndPipe from "./npc/MovingBoxAndPipe";
import RootScene from "@/model/core/RootScene"
import SavedGoalPost from "./goal/SavedGoalPost";
import RoadNorthSouth from "./core/RoadNorthSouth";
import GoodPlaceGoal from "./goal/GoodPlaceGoal";
import PublicInfrastructure from "./PublicInfrastructure";
import TransportSystem from "./TransportSystem";
import GoodPlaceBuilder from "./goal/GoodPlaceBuilder";
import MetaOrbitControls from "@/model/core/MetaOrbitControls";
import StandardSkyEnv from "../../core/StandardSkyEnv";
import SceneSessionNucleus from "@/model/core/SceneSessionNucleus";
import { pov_isDefaultUser } from "@/../script/util/helper/gameHelper";

const DEFAULT_TOKEN_OBJ = {
  mode:0,state:0,buy:0,sell:0, floor:0,ceil:0,
  min:0,max:0,minMaxAvg:0,minMedian:0,maxMedian:0,
}
const selectedTimeframeIndex = 0
const selectedTimeframe = "3m"
const feePercent = 0.0
const chartPosLookup:any = {
  "btc": [-1.25,0,-0.8], "eth": [0.315,0,-0.6], "link": [-1.335,-0.15,0.7], "ftm": [0.98,-0.25,1.4],
}
const chartRotLookup:any = {
  "btc": [0,Math.PI/2,0], "eth": [0,-Math.PI/2,0], "link": [0,Math.PI/2,0], "ftm": [0,0,0],
}

function Level2 ({eraName="cityEra"}:any) {
  const app:any = useContext(AppContext)
  const searchParams:any = useSearchParams();
  const { user, superuser, do:{login, logout, fetchSupaPlayer, demo,},  jwt }:any = useAuth()
  const [chartPos, s__chartPos]:any = useState(chartPosLookup["btc"])
  const [chartRot, s__chartRot]:any = useState(chartRotLookup["btc"])
  const [LS_rpi, s__LS_rpi] = useLocalStorage('rpi', "user:0000")
  const [rpi, s__rpi] = useState<any>(LS_rpi)
  const [_tutoStage, s__LS_tutoStage] = useLocalStorage(eraName+'TutorialStage', "{}")
  const [LS_tokensArrayObj, s__LS_tokensArrayObj] = useLocalStorage(eraName+'TokensArrayObj', "{}")
  const [chartBoxPos, s__chartBoxPos] = useState([0,0,0])
  const [tokensArrayObj,s__tokensArrayObj] = useState<any>({})
  const [savedString,s__savedString] = useState("")
  const [selectedToken, __selectedToken] = useState("btc")
  const [currentOrders, s__currentOrders] = useState<any>({})
  const [orderHistory, s__orderHistory] = useState<any>([])
  const [profitHistory, s__profitHistory] = useState<any>([])
  const [form,s__form] = useState({
    id:"BTCUSDT3M",
  })
  const [projectionMode, s__projectionMode] = useState(false)
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
  const realProfitCount = useMemo(()=>{
    return profitHistory.filter((atrade:any, index:any) => {
      return !!atrade[1] && atrade[1] == "profit"
    }).length
  },[profitHistory])
  const isDefaultUser = useMemo(()=> pov_isDefaultUser(rpi),[rpi])
  const splitRPI = useMemo(()=> isDefaultUser ? null : rpi.split(":") ,[rpi])
  const isSelectedTokenDowntrend = useMemo(()=>{
    let tokensArrayArray = tokensArrayObj[selectedToken]
    return !!tokensArrayArray && !!tokensArrayArray[selectedTimeframeIndex] && !!tokensArrayArray[selectedTimeframeIndex].mode
  },[tokensArrayObj, selectedToken,selectedTimeframeIndex])














  const claimOrSyncDatabase = async () => { if (isDefaultUser) { return } }
  const onTimeframeClick = (x: any, y: any) => { }
  const _s__projectionMode = (val: boolean) => { s__projectionMode(val) }
  const onTextClick = (x: any) => s__selectedToken(x)
  const setTutoStage = (lvl: any) => s__LS_tutoStage(JSON.stringify({ ...tutoStage, lvl }))
  const join = (x: any) => {
    app.audio("neutral","./sound/magic.wav")
    s__selectedToken(x);
    updateTokenOrder(x, selectedTimeframeIndex, "state", 0)
    if (!tutoStage.lvl) { app.alert("success","Game Started!") }
    // if (!tutoStage.lvl) { app.alert("success",x.toUpperCase()+" started successfuly!") }

  }
  const trendDown = (x: any) => { s__selectedToken(x); updateTokenOrder(x, selectedTimeframeIndex, "mode", 1)}
  const trendUp = (x: any) => { s__selectedToken(x); updateTokenOrder(x, selectedTimeframeIndex, "mode", 0) }
  const turnOff = (x: any) => {
    updateTokenOrder(x, selectedTimeframeIndex, "state", 0)
    app.audio("neutral","./sound/click33.wav")
  }
  const turnOn = (x: any) => {
    s__selectedToken(x)
    if (!tutoStage.lvl) { setTutoStage(1) }
    updateTokenOrder(x, selectedTimeframeIndex, "state", 1)
    app.audio("neutral","./sound/click33.wav")
  }
  const leaveAsset = async (x: any) => {
    s__selectedToken(x)
    let new_tokensArrayObj = { ...tokensArrayObj };
    delete new_tokensArrayObj[x];
    s__LS_tokensArrayObj((prevValue) => JSON.stringify(new_tokensArrayObj));
    s__tokensArrayObj(new_tokensArrayObj)
    app.audio("neutral","./sound/click47.wav")

  }
  const setAPIKeys = async () => {
    let binanceapikeys: any = prompt("Enter your API Keys! \n\n < Public : Secret >", "")
    if (!binanceapikeys) return
    if (binanceapikeys.split(":").length < 2) return

    const splitKey = rpi.split(":")
    if (splitKey[0] == "user" && splitKey[1] == "0000") { return true }

    try {
      let thedata = {
        referral: splitKey[0],
        pin: splitKey[1],
        binancePublic: binanceapikeys.split(":")[0],
        binanceSecret: binanceapikeys.split(":")[1],
      }
      app.alert("neutral", "Setting api keys")
      let fetchRes: any = await fetchPost("/api/player/apikeys", thedata)

      
      if (fetchRes.status >= 400)
      {
        return app.alert("error", "Failed to Set api keys")
      }
      app.alert("success", "Successfully set API keys!")

      fetchSupaPlayer()
    } catch (e: unknown) {
      app.alert("error", "Failed api setting!")
    }
  }
  const toggleBattleMode = async (newMode:number) => {
    let oppoLink = searchParams.get('link')
    if (!oppoLink) return
    const splitKey = rpi.split(":")
    if (splitKey[0] == "user" && splitKey[1] == "0000") { return true }
    try {
      let thedata = {
        referral: splitKey[0],
        pin: splitKey[1],
        newMode,
        oppo:oppoLink,
      }
      let fetchRes: any = await fetchPost("/api/player/battle", thedata)
      
      if (fetchRes.status >= 400) {
        return app.alert("error", "Failed to Set battle mode")
      }
      app.alert("success", "Successfully set battle mode!")

      fetchSupaPlayer()
    } catch (e: unknown) {
      console.error("e", e)
      app.alert("error", "Failed battle mode!")
    }
  }
  const triggerSyncGoodPlace = async () => {
    const splitKey = rpi.split(":")
    if (splitKey[0] == "user" && splitKey[1] == "0000") { return true }

    try {
      let thedata = { referral: splitKey[0], pin: splitKey[1], }
      app.alert("neutral", "Syncing Good Trades...")
      let fetchRes: any = await fetchPost("/api/order/sync", thedata)
      if (fetchRes.status >= 400) {
        app.alert("error", "Failed to Syncing Good Trades")
        app.audio("neutral","./sound/dead.wav")
        return
      }
      app.audio("neutral","./sound/magic.wav")
      app.alert("success", "Successfully Syncing Good Trades!")
      setTimeout(()=>{window.location.reload()},1000)
    } catch (e: unknown) {
      app.alert("error", "Failed good order Syncing !")
    }
  }





  useEffect(()=>{
    s__tokensArrayObj(JSON.parse(LS_tokensArrayObj))
    s__savedString(LH_superuser)
  },[user, superuser])







  const s__selectedToken = (val:any) => {
    let newId = val.toUpperCase() + "USDT" + selectedTimeframe.toUpperCase()
    s__form({id:newId})
    __selectedToken(val)
    s__chartPos(chartPosLookup[val])
    s__chartRot(chartRotLookup[val])
  }
  const toggleTrade = async (x:any, y:any) => {
    if (profitHistory.length > 4) {
      return alert("Full Local Storage!");
    }
  
    const newTradeObj:any = createTradeObject(x, y);
    const isBuying = newTradeObj.side === "buy";
  
    handleFirstTutorialStages(isBuying, tutoStage, setTutoStage);
    s__orderHistory([...orderHistory, newTradeObj])
    updateTokenOrder(x,selectedTimeframeIndex,"buy",isBuying ? "1" : "0",{["price"]:y.price})

    if (isBuying) {
      app.audio("neutral","./sound/cas.wav")
      app.alert("success",`You bought: ${x.toUpperCase()} at: ${y.price}!`)
    }
  
    if (form.id in currentOrders) {
      handleExistingOrder(newTradeObj);
    } else {
      handleNewOrder(newTradeObj);
    }
  };
  const handleExistingOrder = (newTradeObj:any): void => {
    let oldOrders = { ...currentOrders };
  
    if (newTradeObj.side === "sell") {
      let lastProfitCount = realProfitCount
      let newprofithi = updateProfitHistory(currentOrders, form, newTradeObj, profitHistory, feePercent);
      s__profitHistory(newprofithi);
      let newProfitCount = newprofithi.filter((atrade:any, index:any) => {
        return !!atrade[1] && atrade[1] == "profit"
      }).length
      if (newProfitCount  > lastProfitCount ) {
       app.audio("neutral","./sound/cassh.wav")
        let pointsNumber = parseFloat(`${newprofithi[newprofithi.length-1]}`)*100
        let points = parseInt(`${pointsNumber}`)
       app.alert("success",`You won ${points} point(s) on ${newTradeObj.token.toUpperCase()} (${newTradeObj.price})!`)
      } else {
         app.audio("neutral","./sound/wrong.wav")
         app.alert("error","Loss trade, try again!")
        }
  
      let counting = countProfitableTrades(newprofithi);
      if (counting >= 4) {
        setTutoStage(5);
      }
  
      if (!!projectionMode) {
        projectVirtualOrder(form.id,newTradeObj);
      }
    }
  
    delete oldOrders[form.id];
    s__currentOrders(oldOrders);
    s__notSaved(false);
  };
  const handleNewOrder = (newTradeObj:any) => {
    if (newTradeObj.side === "buy") {
      s__currentOrders({ ...currentOrders, [form.id]: newTradeObj });
      s__notSaved(true);
  
      if (!!projectionMode) {
        projectVirtualOrder(form.id, newTradeObj);
        app.alert("success", "Sending BUY order with synced API keys");
      }
    } else {
      if (newTradeObj.side === "sell") {
        app.audio("neutral","./sound/404.wav")
        app.alert("error", "Live BUY order not found!");
      }
    }
  };
  const updateTokenOrder = async (_token:string, timeframe:any, substate:string,val:any="",subobj:any=null) => {
    if (!_token) return
    let promptVal = val
    let value = !promptVal ? 0 : parseFloat(promptVal)
    let timeframeIndex = timeframe
    let old_tokensArrayObj:any = null
    if (!tokensArrayObj[_token]) {
      let price = 1
      let new_tokensArrayObj = DEFAULT_TIMEFRAME_ARRAY.map((aTimeframe:any, index:any)=> (
        {...DEFAULT_TOKEN_OBJ,...{
          ...getComputedLevels({floor:price*0.8,ceil:price*1.2})
        }}
      ) )
      tokensArrayObj[_token] = new_tokensArrayObj
    }
    let old_tokensArrayObjArray = [...tokensArrayObj[_token]]
    let newCrystal = {
      ...old_tokensArrayObjArray[timeframeIndex],
      ...{[substate]:value,...(subobj || {})},
      ...getComputedLevels({
        ...old_tokensArrayObjArray[timeframeIndex],
        ...{[substate]:value},
        ...(subobj || {})
      }),
    }
    old_tokensArrayObjArray[timeframeIndex] = {...old_tokensArrayObj,...newCrystal}
    let bigTokensObj = {...tokensArrayObj, ...{[_token]:old_tokensArrayObjArray}}
    s__tokensArrayObj(bigTokensObj)
    s__LS_tokensArrayObj((prevValue) => JSON.stringify(bigTokensObj))
  }
  const projectVirtualOrder = async (theid:any, thetrade:any) => {    
    const splitKey = rpi.split(":")
    if (splitKey[0] == "user" && splitKey[1] == "0000") { return true }

    try {
      let thedata = {
        apiKey: splitKey[0],
        apiSecret: splitKey[1],
        ...thetrade,
        quantity: 39,
        symbol: thetrade.token.toUpperCase()+"USDT",
      }
      app.alert("neutral", "Saving Order")
      let fetchRes:any = await fetchPost("/api/order/place",thedata)
      if (fetchRes.status >= 400) {
        app.alert("error","Failed to save order")
        return
      }
      app.alert("success", "Successfully projected order to synced API!")

      fetchSupaPlayer()
    } catch (e:unknown) {
      app.alert("error", "Failed order projection!")
    }
  }




















  



  // scene management and then minigame


  return (<>
    <RootScene>

    <SceneSessionNucleus state={{eraName:"cityEra"}} />

      
    <MetaOrbitControls state={{tutoStage, hasAnyToken}} />
    <StandardSkyEnv />

      {/* CONSTANT LANDING SCENE */}
      {/* CHAPTER 1 */}
      {/* BTC | Bitcoin | Bit Coin */}
      <BankingSystem {...{
          state:{tokensArrayObj, selectedToken, hasAnyToken, form, isDefaultUser, chartPos, chartRot, 
            isSelectedTokenDowntrend, selectedTimeframe, chartBoxPos, rpi, tutoStage,
          },
          calls:{toggleTrade, onTextClick, turnOn, trendUp, leaveAsset, turnOff, onTimeframeClick,s__rpi, s__LS_rpi,
            trendDown, join, s__chartBoxPos, setTutoStage, s__LS_tutoStage, s__LS_tokensArrayObj, 
          }
      }}/>
      




      {/* CHAPTER 2 */}
      {/* FIRST LOCAL GOAL CENTRE */}
      {/* TEXT TUTORIALS */}
      <PublicInfrastructure {...{
        state: {
          hasAnyToken, tutoStage, isDefaultUser, profitHistory, realProfitCount, LS_rpi,
          tokensArrayObj, form, selectedToken, 
        },
        calls: {
          setTutoStage, s__profitHistory, onTextClick, toggleTrade, 
          turnOff, turnOn, join, leaveAsset, trendDown, trendUp, onTimeframeClick
        }
      }}/>




      {/* CHAPTER 3 */}
      {/* MINI GAME */}
      {/* main road 1 */}
      <TransportSystem {...{
        state: {
          tokensArrayObj, profitHistory, realProfitCount, 
        },
        calls: {
          s__projectionMode, s__profitHistory
        }
      }}/>






      {/* CHAPTER 4 */}
      {/* account connected goal */}
      {hasAnyToken &&  (tutoStage.lvl > 3 && !!superuser) && !isDefaultUser &&
        <group position={[0,0,1.6]}>
          <SavedGoalPost calls={{triggerSyncGoodPlace,setAPIKeys, claim:claimOrSyncDatabase}}
            {...{projectionMode, s__projectionMode: _s__projectionMode}}
            state={{hasAnyToken, profitHistory, savedString }}
          />
        </group>
      }
      {/* second road */}
      {("link" in tokensArrayObj || (hasAnyToken &&
       (tutoStage.lvl > 3 && !!superuser) && !isDefaultUser)) && <RoadNorthSouth />
      }
      {/* LINK | Chain Link | chainlink */}
      {hasAnyToken && // LINK | Chain Link | chainlink
        <group position={[-0.3,-0.1,0.5]}>
          {("eth" in tokensArrayObj || "link" in tokensArrayObj) && tutoStage.lvl >= 3 &&
            <group position={[-0.52,0,0.46]} >
              <TradingBox form={form} timeframe={form.id.split("USDT")[1]} token="link"
                tokensArrayArray={"link" in tokensArrayObj ? tokensArrayObj["link"] : null}
                refetchInterval={selectedToken == "link" ? 4000 : 60000}
                position={[0,0,0]} unselectedColor={"#50545B"}
                onTextClick={()=>{onTextClick("link")}} 
                setVelocityY={(data:any)=>{toggleTrade("link",data)}}
                turnOn={()=>{turnOn("link")}} turnOff={()=>{turnOff("link")}}
                join={()=>{join("link")}} leaveAsset={()=>{leaveAsset("link")}}
                trendDown={()=>{trendDown("link")}} trendUp={()=>{trendUp("link")}} 
                onTimeframeClick={(token:any, tf:any)=>{onTimeframeClick("link",tf)}}
              /> 
            </group>
          }
        </group>
      }
      
      <GoodPlaceBuilder calls={{triggerSyncGoodPlace,setAPIKeys, claim:claimOrSyncDatabase, s__projectionMode}} {...{projectionMode, s__projectionMode: _s__projectionMode}}
            state={{hasAnyToken, profitHistory, savedString, projectionMode }}
          />



      {/* CHAPTER 4 */}
      {/* FTM | Fantom | Phantom */}
      {/* Loyal Player */}
      {hasAnyToken &&  (tutoStage.lvl > 3 && !!superuser && superuser.goodAttempts > 0) && !isDefaultUser &&
        <group position={[0,0,6]}>
          <GoodPlaceGoal calls={{triggerSyncGoodPlace,setAPIKeys,toggleBattleMode, claim:claimOrSyncDatabase, s__projectionMode}} {...{projectionMode, s__projectionMode: _s__projectionMode}}
            state={{hasAnyToken, profitHistory, savedString, projectionMode }}
          />
        </group>
      }
      {/* PIPE STREAM LINES */}
      {"ftm" in tokensArrayObj && <> <MovingBoxAndPipe /> </>}
      {hasAllTokens && <>
        <Cylinder receiveShadow args={[3.3,3.3,0.15,tutoStage.lvl > 4 ? 3+tutoStage.lvl : 4]} position={[0, -1.2, 0]}>
          <meshStandardMaterial color={tutoStage.lvl > 4 ? "#84BC4E" : "#fff"} />

        </Cylinder>
        {/* <Box args={[4, 0.25, 5]} position={[0, -1.2, -0.5]} castShadow receiveShadow>
          <meshStandardMaterial color={tutoStage.lvl > 4 ? "#5ABFFA" : "#fff"} />
        </Box> */}
      </>}
      {hasAnyToken &&
        <group position={[-0.3, -0.1, 0.5]}>
          {("eth" in tokensArrayObj || "ftm" in tokensArrayObj) && !isDefaultUser && tutoStage.lvl > 3 &&
            <group position={[1.12, -0.05, 0.46]} rotation={[0, Math.PI / 2, 0]}>
              <TradingBox form={form} timeframe={form.id.split("USDT")[1]} token="ftm"
                tokensArrayArray={"ftm" in tokensArrayObj ? tokensArrayObj["ftm"] : null}
                refetchInterval={selectedToken == "ftm" ? 4000 : 60000}
                position={[0, 0, 0]} unselectedColor={"#50545B"}
                onTextClick={() => { onTextClick("ftm") }}
                setVelocityY={(data: any) => { toggleTrade("ftm", data) }}
                turnOn={() => { turnOn("ftm") }} turnOff={() => { turnOff("ftm") }}
                join={() => { join("ftm") }} leaveAsset={() => { leaveAsset("ftm") }}
                trendDown={() => { trendDown("ftm") }} trendUp={() => { trendUp("ftm") }}
                onTimeframeClick={(token: any, tf: any) => { onTimeframeClick("ftm", tf) }}
              />
            </group>
          }
        </group>
      }
      
    </RootScene>
  </>)
}

export default Level2