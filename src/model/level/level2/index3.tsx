"use client";

import { useContext } from "react";
import { useAuth } from "../../../../script/state/context/AuthContext";
import { AppContext } from "../../../../script/state/context/AppContext";
import MainRoadEastWest from "./core/MainRoadEastWest";
import MovingScoreCar from "./npc/MovingScoreCar";
import MovingStaticCar from "./npc/MovingStaticCar";
function Level1_Index3 ({state, calls, }:any) {
  const { user, superuser, do:{login, logout, demo,},  jwt }:any = useAuth()
  const app:any = useContext(AppContext)
  



  const onFirstCarClicked = (clickCounter:any) => {
    if (clickCounter < 4)  return
    if (state.profitHistory.length == 0) {
      return app.alert("error", "No orders found, bad reputation!")
    }
    if (state.profitHistory.length > 0 && state.realProfitCount == state.profitHistory.length) {
      app.audio("neutral","./sound/horn.wav")
      return app.alert("error", "No losses found, bad karma!")

    }
    
    let theIndex = -1
    for (let index = 0; index < state.profitHistory.length; index++) {
      if (state.profitHistory[index][1] == "loss"){ theIndex = index }
    }
    if (theIndex == -1)  return

    let aNewArray = [...state.profitHistory]
    aNewArray.splice(theIndex, 1)
    calls.s__profitHistory(aNewArray)
      app.audio("neutral","./sound/aaa.wav")
      app.alert("success", "You redeemed (1) local loss!")
  }


  return (<>
  
    {"btc" in state.tokensArrayObj && <> 
      <MainRoadEastWest />
      <MovingScoreCar calls={{onClicked:onFirstCarClicked}} />
      <group rotation={[0,Math.PI,0]} scale={[1,1,0.7]} position={[1,0,-0.3]}>
        <MovingStaticCar />
      </group>
    </>}

  </>)
}

export default Level1_Index3