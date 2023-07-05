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
      // console.log("_tutoStage")
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
      app.audio("neutral","./sound/aaa.wav")
    }
  }
  
  const turnBoxOn = (x:string) => {
    s__selectedBox(x)
    if (!tutoStage || !tutoStage.lvl) {
      app.alert("neutral","Next Step: Turn nearby humans into inhabitants")
      setTutoStage(1)
    }
    // console.log("x, selectedTimeframeIndex", x, selectedTimeframeIndex, 1)
    updateTokenOrder(x, selectedTimeframeIndex, "state", 1)
    // alert("asdasd")
  }
  const turnBoxOff = (x:string) => {
    s__selectedBox(x)
    updateTokenOrder(x, selectedTimeframeIndex, "state", 0)
    // alert("asdasd")
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

    // console.log("tokensArrayObj", bigTokensObj)
  }

  
  useEffect(()=>{
    // console.log("LS_tokensArrayObj", LS_tokensArrayObj)
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
    // console.log("asdasda", _tutoStage.lvl)
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
  // if (tokensArrayObj[selectedTimeframeIndex]) {

  //   console.log("!!tokensArrayObj && !!tokensArrayObj[selectedTimeframeIndex] && !!tokensArrayObj[selectedTimeframeIndex].state")
  //   console.log(tokensArrayObj[selectedTimeframeIndex] , tokensArrayObj[selectedTimeframeIndex].state)
  // } else {
  //   console.log("no no no no o", tokensArrayObj, selectedTimeframeIndex)
  // }
  return !!tokensArrayArray && !!tokensArrayArray[selectedTimeframeIndex] && !!tokensArrayArray[selectedTimeframeIndex].state
},[tokensArrayArray, selectedTimeframeIndex])

// const selectedTimeframeIndex = useMemo(()=>{
//   return DEFAULT_TIMEFRAME_ARRAY.indexOf(selectedTimeframe)
// },[selectedTimeframe])



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
const isSelectedId = useMemo(()=>{
  return form && form.id == token.toUpperCase()+"USDT"+timeframe.toUpperCase()
},[form])





const toggleTrade = async (x:any, y:any) => {
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
    app.audio("neutral","./sound/cas.wav")
    // console.log("tutoStage", tutoStage)
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
    // console.log("newProfitCount  > lastProfitCount", newProfitCount  , lastProfitCount)
    if (newProfitCount  > lastProfitCount ) {
     app.audio("neutral","./sound/cassh.wav")
    //  let theLastProfit 
      // console.log("new profit trade obj", newTradeObj, newprofithi[newprofithi.length-1])
      let pointsNumber = getPointsFromChange(newprofithi[newprofithi.length-1][2].price,newprofithi[newprofithi.length-1][3].price)
      // let pointsNumber = parseFloat(`${newprofithi[newprofithi.length-1]}`)*100
      let points = parseInt(`${pointsNumber}`)
      // let points = parseInt(`${pointsNumber}`)
     app.alert("success",`${points}  new inhabitant(s)!`)
    } else {
      let pointsNumber = parseFloat(`${newprofithi[newprofithi.length-1]}`)*100
      let points = parseInt(`${pointsNumber}`)
       app.audio("neutral","./sound/wrong.wav")
       if (points == 0) {
        app.alert("error","Failed: 0 new inhabitants")
       } else {
          app.alert("error",`You loss ${points*-1}`+" Human connection(s)!")
        }
      //  setTimeout(()=>{},2000)
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




  return {
    store: tokensArrayObj,
    state:{
      ...state,

      rpi,
      hasAnyToken,
      hasAllTokens,
      tokensArrayArray,
      selectedHasArray,
      selectedTimeframeIndex,
      realProfitCount,
      isDowntrend,
      token,
      timeframe,
      form,
      isDefaultUser,
      isSelectedId,
      profitHistory,
      tutoStage
    },
    calls: {
      toggleTrade,
      setTutoStage,
      join: joinBox,    
      leave: leaveBox,
      turnOn: turnBoxOn,
      turnOff: turnBoxOff,
      spliceProfitHistory,
          
    }
  }
}
