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
    console.log("hasAtleastATablehasAtleastATablehasAtleastATable")
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
              
              tokensArrayArray: null,
              selectedHasArray:false,
              isSelectedId: false,

              // rpi,
              // hasAnyToken,
              // hasAllTokens,
              // tokensArrayArray,
              // firstHasArray,
              // selectedHasArray,
              // selectedTimeframeIndex,
              // realProfitCount,
              // isDowntrend,
              // token,
              // timeframe,
              // form,
              // isDefaultUser,
              // // isSelectedId,
              // profitHistory,
              // tutoStage,
              // gameStageAvailability,

              form: state.form,
              eraName,
              token:"eth"
            },
            calls:{
              spliceProfitHistory: calls.spliceProfitHistory,
              toggleGame: calls.toggleTrade,
              turnOn: () => calls.turnOn("ETHUSDT3M"),
              turnOff: () => calls.turnOff("ETHUSDT3M"),
              join: () => calls.join("ETHUSDT3M"),
              leaveAsset: () => calls.leaveAsset("ETHUSDT3M"),
            }
          }}/>
      }

      {/* {!!inv.buildZoneObj[2] && 
        <GrowZone2 position={[-0.75,0,0.75]}
          {...{
              store: store,
              state:{
                ...state,
                form: state.form,
                eraName,
                token:"link"
              },
              calls:{
                spliceProfitHistory: calls.spliceProfitHistory,
                toggleGame: calls.toggleTrade,
                turnOn: () => calls.turnOn("LINKUSDT3M"),
                turnOff: () => calls.turnOff("LINKUSDT3M"),
                join: calls.join,
                leaveAsset: calls.leave,
              }
            }}/>
        }

        {!!inv.buildZoneObj[3] && 
          <GrowZone3 position={[0.75,0,0.75]}
            {...{
                store: store,
                state:{
                  ...state,
                  form: state.form,
                  eraName,
                  token:"ftm"
                },
                calls:{
                  spliceProfitHistory: calls.spliceProfitHistory,
                  toggleGame: calls.toggleTrade,
                  turnOn: () => calls.turnOn("FTMUSDT3M"),
                  turnOff: () => calls.turnOff("FTMUSDT3M"),
                  join: calls.join,
                  leaveAsset: calls.leave,
                }
              }}/>
          } */}
  </>)
}

export default GrowZone