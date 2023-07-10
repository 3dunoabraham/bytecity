"use client";

import { useContext, useMemo, useState } from "react";
import GrowZone1 from "./GrowZone1";
import { InventoryContext } from "../../../../script/state/context/InventoryContext";
import GrowZone2 from "./GrowZone2";
import GrowZone3 from "./GrowZone3";

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
        {...{
            store: store,
            state:{
              ...state,
              form: state.form,
              eraName,
              token:"eth"
            },
            calls:{
              spliceProfitHistory: calls.spliceProfitHistory,
              toggleGame: calls.toggleTrade,
              turnOn: calls.turnOn,
              turnOff: calls.turnOff,
              join: calls.join,
              leaveAsset: calls.leave,
            }
          }}/>
      }

      {!!inv.buildZoneObj[2] && 
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
                turnOn: calls.turnOn,
                turnOff: calls.turnOff,
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
                  turnOn: calls.turnOn,
                  turnOff: calls.turnOff,
                  join: calls.join,
                  leaveAsset: calls.leave,
                }
              }}/>
          }
  </>)
}

export default GrowZone