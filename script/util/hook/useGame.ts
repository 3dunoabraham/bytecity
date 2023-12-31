import { useContext, useEffect, useMemo, useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'


import { useAuth } from '../../state/context/AuthContext'
import { AppContext } from '../../state/context/AppContext'
import { DEFAULT_BOX_OBJ, DEFAULT_TIMEFRAME_ARRAY } from '../../constant/game'
import { getComputedLevels } from '../helper'
import { getPointsFromChange, pov_isDefaultUser } from '../helper/gameHelper'
import { countProfitableTrades, createTradeObject, handleFirstTutorialStages, updateProfitHistory } from "@/model/scripts";
import { fetchPost } from '../helper/fetchHelper'

export const useGame: any = (initialConfig={form:{id:"BTCUSDT3M"},state:{eraName:"unnamedEra"}}) => {
  const { user, superuser, do:{login, logout, fetchSupaPlayer, demo,},  jwt }:any = useAuth()
  const app:any = useContext(AppContext)

  const [state, s__state] = useState<any>(initialConfig.state)
  const [form, s__form] = useState<any>(initialConfig.form)

  const selectedTimeframeIndex = 0
  const [selectedBox, s__selectedBox] = useState<any>(null)
  const [LS_tokensArrayObj, s__LS_tokensArrayObj] = useLocalStorage(state.eraName+'TokensArrayObj', "{}")
  const [tokensArrayObj,s__tokensArrayObj] = useState<any>({})
  const [_tutoStage, s__LS_tutoStage] = useLocalStorage(state.eraName+'TutorialStage', "{}")
  const feePercent = 0.0
  const [projectionMode, s__projectionMode] = useState(false)
  
  const [LS_rpi, s__LS_rpi] = useLocalStorage('rpi', "user:0000")
  const [rpi, s__rpi] = useState<any>(LS_rpi)
  const [profitHistory, s__profitHistory] = useState<any>([])
  const [orderHistory, s__orderHistory] = useState<any>([])
  const [currentOrders, s__currentOrders] = useState<any>({})

  const tutoStage:any = useMemo(()=> {
    try {
      return JSON.parse(_tutoStage)
    } catch (e:unknown) {
      return {lvl:null}
    }
} , [_tutoStage])

  const setTutoStage = (lvl: any) => s__LS_tutoStage(JSON.stringify({ ...tutoStage, lvl }))
  const leaveBox = (x:string) => {
    s__selectedBox(x)
    let new_tokensArrayObj = { ...tokensArrayObj };
    delete new_tokensArrayObj[x];
    s__LS_tokensArrayObj((prevValue) => JSON.stringify(new_tokensArrayObj));
    s__tokensArrayObj(new_tokensArrayObj)
    // app.audio("neutral","./sound/click47.wav")
  }
  const joinBox = (x:string) => {
    // alert("Joining "+x)
    
    s__selectedBox(x)
    updateTokenOrder(x, selectedTimeframeIndex, "state", 0)
    if (!tutoStage || !tutoStage.lvl) {
      app.alert("success", "The Game has Started!")
      // app.audio("neutral","./sfx/welcome.ogg")
      app.audio("neutral","./sfx/correct.wav")
    }
  }
  
  const turnBoxOn = (x:string) => {
    // console.log("turnBoxOn x ", x)
    s__selectedBox(x)
    if (!tutoStage || !tutoStage.lvl) {
      app.alert("neutral","Next Step: Turn nearby humans into inhabitants")
      setTutoStage(1)
    }
    updateTokenOrder(x, selectedTimeframeIndex, "state", 1)
  }
  const turnBoxOff = (x:string) => {
    // console.log("turnBoxOff x ", x)
    s__selectedBox(x)
    updateTokenOrder(x, selectedTimeframeIndex, "state", 0)
  }
  
  const updateTokenOrder = async (_token:string, timeframe:any, substate:string,val:any="",subobj:any=null) => {
    if (!_token) return
    let promptVal = val
    let value = !promptVal ? 0 : parseFloat(promptVal)
    let timeframeIndex = timeframe
    let old_tokensArrayObj:any = null
    if (!tokensArrayObj[_token]) {
      let price = 1
      let new_tokensArrayObj = DEFAULT_TIMEFRAME_ARRAY.map((aTimeframe:any, index:any)=> (
        {...DEFAULT_BOX_OBJ,...{
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

  
  useEffect(()=>{
    if (LS_tokensArrayObj == "{}" || Object.keys(LS_tokensArrayObj).length == 0) {
      app.alert("neutral", "Click the Red Button ")
      return
    }
    let LS_tutoStage:any = _tutoStage
    if (!LS_tutoStage.lvl) {
      // app.alert("Season ")
    } else if (LS_tutoStage.lvl == 1) {
      // app.alert("")
    }
  },[])
  
  useEffect(()=>{
    s__tokensArrayObj(JSON.parse(LS_tokensArrayObj))
    // s__savedString(LH_superuser)
  },[user, superuser])

  const hasAnyToken = useMemo(()=>{
    let interestCount = Object.keys(tokensArrayObj).filter((token)=>{
      return token in tokensArrayObj
    })
    return interestCount.length > 0
  },[tokensArrayObj])

const tokensArrayArray = useMemo(()=>{
  return !!tokensArrayObj ? tokensArrayObj[form.id] : null
},[tokensArrayObj[form.id]])
  
const selectedHasArray = useMemo(()=>{
  return !!tokensArrayArray && !!tokensArrayArray[selectedTimeframeIndex] && !!tokensArrayArray[selectedTimeframeIndex].state
},[tokensArrayArray, selectedTimeframeIndex])

const firstHasArray = useMemo(()=>{
  return !!tokensArrayObj["BTCUSDT3M"] && !!tokensArrayObj["BTCUSDT3M"][selectedTimeframeIndex] && !!tokensArrayObj["BTCUSDT3M"][selectedTimeframeIndex].state
},[tokensArrayObj])



const isDefaultUser = useMemo(()=> pov_isDefaultUser(rpi),[rpi])

const isDowntrend = useMemo(()=>{
  return !!tokensArrayArray && !!tokensArrayArray[state.selectedTimeframeIndex] && !!tokensArrayArray[state.selectedTimeframeIndex].mode
},[state.selectedTimeframeIndex,tokensArrayArray])

const hasAllTokens = useMemo(()=>{
  let interestCount = Object.keys(tokensArrayObj).filter((token)=>{
    return token in tokensArrayObj
  })
  return interestCount.length == 4
},[tokensArrayObj])


const token = useMemo(()=>{
  return form.id.split("USDT")[0].toLowerCase()
},[form.id])


const timeframe = useMemo(()=>{
  return form.id.split("USDT")[1].toLowerCase()
},[form.id])

// const tokenColor = useMemo(()=>{
//   return tokenColors[token]
// },[token])






const toggleTrade = async (x:any, y:any) => {
  // console.log("x, y, token")
  // console.log(x, y, token)
  if (x != "btc") {

    return
  }
  if (profitHistory.length > 4) {
    app.alert("error", "Your Life Storage Station is FULL!")
    return alert("New habitants can't migrate, your Life Storage Station is FULL! \n\n Please click the station button to \n add them to your Town Table");
  }

  const newTradeObj:any = createTradeObject(x, y);
  const isBuying = newTradeObj.side === "buy";

  let tutoChange = handleFirstTutorialStages(isBuying, tutoStage, setTutoStage);
  if (tutoChange == 2) {
    app.alert("neutral","Next Step: You need min. +2 new humans for growth") 
    // setTimeout(()=>{app.alert("neutral","Next Step: You need min. +2 new humans for growth") },3333)
  }
  // if (tutoChange == 3) { app.alert("neutral","Next Step: Add New Inhabitants") }
  s__orderHistory([...orderHistory, newTradeObj])
  updateTokenOrder(x,selectedTimeframeIndex,"buy",isBuying ? "1" : "0",{["price"]:y.price})

  if (isBuying) {
    app.audio("neutral","./sfx/enter.wav")
    if (tutoStage.lvl > 2) {
      app.alert("neutral",`Connecting to ${y.price} Humans...`)
    }
}

  if (form.id in currentOrders) {
    handleExistingOrder(newTradeObj);
  } else {
    handleNewOrder(newTradeObj);
  }
};

const realProfitCount = useMemo(()=>{
  return profitHistory.filter((atrade:any, index:any) => {
    return !!atrade[1] && atrade[1] == "profit"
  }).length
},[profitHistory])


const handleExistingOrder = (newTradeObj:any): void => {
  let oldOrders = { ...currentOrders };

  if (newTradeObj.side === "sell") {
    let lastProfitCount = realProfitCount
    let newprofithi = updateProfitHistory(currentOrders, form, newTradeObj, profitHistory, feePercent);
    s__profitHistory(newprofithi);
    let newProfitCount:any = newprofithi.filter((atrade:any, index:any) => {
      return !!atrade[1] && atrade[1] == "profit"
    }).length
    if (newProfitCount  > lastProfitCount ) {
     app.audio("neutral","./sound/cassh.wav")
      let pointsNumber = getPointsFromChange(newprofithi[newprofithi.length-1][2].price,newprofithi[newprofithi.length-1][3].price)
      // let points = parseInt(`${pointsNumber}`)
     app.alert("success",`${pointsNumber}  new inhabitant(s)!`)
    } else {
      let pointsNumber = parseFloat(`${newprofithi[newprofithi.length-1]}`)*100
      // let points = parseInt(`${pointsNumber}`)
       app.audio("neutral","./sfx/bad.wav")
       if (pointsNumber == 0) {
        app.alert("error","Failed: 0 new inhabitants")
       } else {
          app.alert("error",`You loss ${pointsNumber}`+" Human connection(s)!")
        }
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
  // s__notSaved(false);
};
const handleNewOrder = (newTradeObj:any) => {
  if (newTradeObj.side === "buy") {
    s__currentOrders({ ...currentOrders, [form.id]: newTradeObj });
    // s__notSaved(true);

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

const spliceProfitHistory = (theIndex:any) => {
  let aNewArray = [...profitHistory]
    aNewArray.splice(theIndex, 1)
    s__profitHistory(aNewArray)
    
}


const spliceGoodProfitHistory = () => {
  let aNewArray = [...profitHistory]
    if (realProfitCount == 0) return 

    let theDeleteIndex = aNewArray.findIndex((aTradeCouple:any,index:number) => {
      return !!aTradeCouple[1] && aTradeCouple[1] == "profit"
    })
    aNewArray.splice(theDeleteIndex, 1)
    app.audio("neutral","./sfx/cas.wav")
    s__profitHistory(aNewArray)
    
}


  const gameStageAvailability = useMemo(()=>{
    let blockedCoords = [0]

    if ("") {
      
    }


    return {
      blockedCoords,
    }
  },[tokensArrayObj])

  return {
    store: tokensArrayObj,
    state:{
      ...state,

      rpi,
      hasAnyToken,
      hasAllTokens,
      tokensArrayArray,
      firstHasArray,
      selectedHasArray,
      selectedTimeframeIndex,
      realProfitCount,
      isDowntrend,
      token,
      timeframe,
      form,
      isDefaultUser,
      // isSelectedId,
      profitHistory,
      tutoStage,
      gameStageAvailability,
    },
    calls: {
      s__form,
      toggleTrade,
      setTutoStage,
      join: joinBox,    
      leave: leaveBox,
      turnOn: turnBoxOn,
      turnOff: turnBoxOff,
      spliceProfitHistory,
      spliceGoodProfitHistory,
          
    }
  }
}
