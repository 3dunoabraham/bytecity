"use client";

import { useContext, useMemo, useState } from "react";
import GrowZone1 from "./GrowZone1";
import { InventoryContext } from "../../../../script/state/context/InventoryContext";
// import GrowZone2 from "./GrowZone2";
// import GrowZone3 from "./GrowZone3";

function GrowZone ({state, calls, store, eraName}:any) {
 
  const inv = useContext(InventoryContext)

  // let selectedZone = useState(0)

  const hasGrowZone1 = useMemo(()=>{
    // console.log("hasAtleastATablehasAtleastATablehasAtleastATable")
    if (!inv.buildZoneObj[1]) return
    return true
  },[inv.buildZoneObj])
  
  

  return (<>

    {!!inv.buildZoneObj[1] && 
      <GrowZone1 position={[0.75,0,-0.75]}
          FORM_ID={"ETHUSDT3M"}
        {...{
            store: store,
            state:{
              ...state,              
              tokensArrayArray: store["ETHUSDT3M"],
              selectedHasArray: !!store["ETHUSDT3M"] && !!store["ETHUSDT3M"][state.selectedTimeframeIndex] && !!store["ETHUSDT3M"][state.selectedTimeframeIndex].state,
              isSelectedId: true,
              form: {id:"ETHUSDT3M"},
              eraName,
              token:"eth"
            },
            calls:{
              spliceProfitHistory: calls.spliceProfitHistory,
              toggleGame: calls.toggleTrade,
              turnOn: () => {
                // console.log(`calls.turnOn("ETHUSDT3M")`)
                calls.turnOn("ETHUSDT3M")
              },
              turnOff: () => {
                // console.log(`calls.turnOff("ETHUSDT3M")`)
                calls.turnOff("ETHUSDT3M")
              },
              join: () => calls.join("ETHUSDT3M"),
              leaveAsset: () => calls.leaveAsset("ETHUSDT3M"),
            }
          }}/>
      }

      {!!inv.buildZoneObj[2] && 
        <GrowZone1 position={[-0.75,0,0.75]}
            FORM_ID={"LINKUSDT3M"}
          {...{
              store: store,
              state:{
                ...state,              
                tokensArrayArray: store["LINKUSDT3M"],
                selectedHasArray: !!store["LINKUSDT3M"] && !!store["LINKUSDT3M"][state.selectedTimeframeIndex] && !!store["LINKUSDT3M"][state.selectedTimeframeIndex].state,
                isSelectedId: true,
                form: {id:"LINKUSDT3M"},
                eraName,
                token:"link"
              },
              calls:{
                spliceProfitHistory: calls.spliceProfitHistory,
                toggleGame: calls.toggleTrade,
                turnOn: () => {
                  // console.log(`calls.turnOn("LINKUSDT3M")`)
                  calls.turnOn("LINKUSDT3M")
                },
                turnOff: () => {
                  // console.log(`calls.turnOff("LINKUSDT3M")`)
                  calls.turnOff("LINKUSDT3M")
                },
                join: () => calls.join("LINKUSDT3M"),
                leaveAsset: () => calls.leaveAsset("LINKUSDT3M"),
              }
            }}/>
        }



        

      {!!inv.buildZoneObj[3] && 
        <GrowZone1 position={[0.75,0,0.75]}
            FORM_ID={"FTMUSDT3M"}
          {...{
              store: store,
              state:{
                ...state,              
                tokensArrayArray: store["FTMUSDT3M"],
                selectedHasArray: !!store["FTMUSDT3M"] && !!store["FTMUSDT3M"][state.selectedTimeframeIndex] && !!store["FTMUSDT3M"][state.selectedTimeframeIndex].state,
                isSelectedId: true,
                form: {id:"FTMUSDT3M"},
                eraName,
                token:"ftm"
              },
              calls:{
                spliceProfitHistory: calls.spliceProfitHistory,
                toggleGame: calls.toggleTrade,
                turnOn: () => {
                  // console.log(`calls.turnOn("FTMUSDT3M")`)
                  calls.turnOn("FTMUSDT3M")
                },
                turnOff: () => {
                  // console.log(`calls.turnOff("FTMUSDT3M")`)
                  calls.turnOff("FTMUSDT3M")
                },
                join: () => calls.join("FTMUSDT3M"),
                leaveAsset: () => calls.leaveAsset("FTMUSDT3M"),
              }
            }}/>
        }




  </>)
}

export default GrowZone