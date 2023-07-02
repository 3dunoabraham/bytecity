import { useContext, useEffect, useMemo, useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { useAuth } from '../../state/context/AuthContext'
import { AppContext } from '../../state/context/AppContext'
import { DEFAULT_BOX_OBJ, DEFAULT_TIMEFRAME_ARRAY } from '../../constant/game'
import { getComputedLevels } from '../helper'

export const useGame: any = (initialConfig={state:{eraName:"unnamedEra"}}) => {
  const { user, superuser, do:{login, logout, fetchSupaPlayer, demo,},  jwt }:any = useAuth()
  const app:any = useContext(AppContext)

  const [state, s__state] = useState<any>(initialConfig.state)

  const selectedTimeframeIndex = 0
  const [selectedBox, s__selectedBox] = useState<any>(null)
  const [LS_tokensArrayObj, s__LS_tokensArrayObj] = useLocalStorage(state.eraName+'TokensArrayObj', "{}")
  const [tokensArrayObj,s__tokensArrayObj] = useState<any>({})
  const [_tutoStage, s__LS_tutoStage] = useLocalStorage(state.eraName+'tutorialStage', "{}")
  const tutoStage:any = useMemo(()=> JSON.parse(_tutoStage) , [_tutoStage])

  const joinBox = (x:string) => {
    alert("Joining "+x)
    
    s__selectedBox(x)
    updateTokenOrder(x, selectedTimeframeIndex, "state", 0)
    if (!tutoStage.lvl) {
      app.alert("success","Game Started!")
      app.audio("neutral","./sound/aaa.wav")
    }
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
    s__tokensArrayObj(JSON.parse(LS_tokensArrayObj))
    // s__savedString(LH_superuser)
  },[user, superuser])


  
  return {
    state,
    calls: {
      join: joinBox,    
    }
  }
}
