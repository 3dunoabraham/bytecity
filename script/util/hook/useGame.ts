import { useContext, useEffect, useMemo, useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { useAuth } from '../../state/context/AuthContext'
import { AppContext } from '../../state/context/AppContext'
import { DEFAULT_BOX_OBJ, DEFAULT_TIMEFRAME_ARRAY } from '../../constant/game'
import { getComputedLevels } from '../helper'
import { pov_isDefaultUser } from '../helper/gameHelper'

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
  
  const [LS_rpi, s__LS_rpi] = useLocalStorage('rpi', "user:0000")
  const [rpi, s__rpi] = useState<any>(LS_rpi)

  const tutoStage:any = useMemo(()=> {
    try {
      console.log("_tutoStage")
      JSON.parse(_tutoStage)
    } catch (e:unknown) {
      return null
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
      app.alert("success","Game Started!")
      app.audio("neutral","./sound/aaa.wav")
    }
  }
  
  const turnBoxOn = (x:string) => {
    s__selectedBox(x)
    if (!tutoStage || !tutoStage.lvl) { setTutoStage(1) }
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

    console.log("tokensArrayObj", bigTokensObj)
  }

  
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
      isDowntrend,
      token,
      timeframe,
      form,
      isDefaultUser,
      isSelectedId,
      tutoStage
    },
    calls: {
      setTutoStage,
      join: joinBox,    
      leave: leaveBox,
      turnOn: turnBoxOn,
      turnOff: turnBoxOff,
          
    }
  }
}
