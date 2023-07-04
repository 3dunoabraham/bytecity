import { Vector3 } from "three"
import { useContext, useState } from "react"
import { AppContext } from "@/../script/state/context/AppContext"


import DynaText from "@/model/core/DynaText"

function TradingTextContainer({ tokensArrayArray, state, calls }: any) {
  const app:any = useContext(AppContext)

  const [translation, s__translation]: any = useState({
    btc: "Bitcoin",
    eth: "Ethereum",
    link: "Chainlink",
    ftm: "Fantom",
  })

  

  return (
    <group position={[0, -0.444, 0]}>
      {/* COMPUTER */}
      {/* <DynaText text={translation[state.token] + "" || ""} color={0x666666}
        position={new Vector3(-0.41, 0, 0.15)}
        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
        isSelected={state.isSelectedId} font={0.11} onClick={() => { }}
      /> */}
<group 
          onClick={() => { app.alert("neutral","Tip: You need min. +2 new inhabitants for success") }} 
          >

      {state.clicked && // CLICKED PRICE 
        <DynaText text={"New \n Inhabitants " + "" || ""} color={0x000000}
          position={new Vector3(0.33, 0.21, -0.38)} rotation={[0, 0, 0]}
          isSelected={state.isSelectedId} font={0.03}
        />
      }
      {state.clicked &&
        <DynaText text={"" + (state.queryUSDT.data-state.clickedPrice) + "" || ""} color={0x660066}
          position={new Vector3(0.33, 0.14, -0.38)} rotation={[0, 0, 0]}
          isSelected={state.isSelectedId} font={0.08}
        />
      }

      </group>
      
<group
        onClick={() => { app.alert("neutral","Tip: This 'Inhabitants Change Percent' enhances precision") }} 
        >
      {state.clicked && // PROFIT LOSS
        <DynaText text={"growth"}
        // onClick={() => { app.alert("neutral","Tip: Growth = New Inhabitants > 1") }} 
          color={state.clickedPrice / state.queryUSDT.data < 1 ? 0x009900 : 0x777777}
          position={new Vector3(0.295, 0.09, -0.38)} rotation={[0, 0, 0]}
          isSelected={state.isSelectedId} font={0.044}
        />
      }
      {state.clicked && // PROFIT LOSS
        <DynaText text={"loss"}
        // onClick={() => { app.alert("neutral","Tip: Loss = New Inhabitants <= 1") }} 
        color={state.clickedPrice / state.queryUSDT.data < 1 ? 0x777777 : 0xff0000}
          position={new Vector3(0.41, 0.09, -0.38)} rotation={[0, 0, 0]}
          isSelected={state.isSelectedId} font={0.035}
        />
      }

      {state.clicked && // PRICE DIFFERENCE PERCENT
        <DynaText text={((((state.clickedPrice / state.queryUSDT.data) - 1) * -100)-0.005).toFixed(3)}

          color={state.clickedPrice / state.queryUSDT.data < 1 ? 0x009900 : 0xff0000}
          position={new Vector3(0.33, 0.03, -0.38)} rotation={[0, 0, 0]}
          isSelected={state.isSelectedId} font={0.08}
        />
      }
      </group>

      {!!tokensArrayArray && <>
        <DynaText color={state.selectedHasArray ? "#606360" : "#00f"} // LIVE / DEMO
          // onClick={state.selectedHasArray ? calls.turnOff : calls.turnOn} 
          position={new Vector3(0.4, 0, +0.4)} text={"DEMO"}
          onClick={() => { app.alert("neutral","Tip: DEMO Mode = 'Town Building Mode'") }} 
          isSelected={state.isSelectedId} font={0.055}
        />

        <DynaText color={state.selectedHasArray ? "#007700" : "#9A3405"} // LIVE / DEMO
          // onClick={state.selectedHasArray ? calls.turnOff : calls.turnOn} 
          position={new Vector3(0.4, 0, +0.46)} text={"LIVE"}
          onClick={() => { app.alert("neutral","Tip: You need humans to build a Town") }} 
          isSelected={state.isSelectedId} font={state.selectedHasArray ? 0.06 : 0.06}
        />
      </>}
      {!!tokensArrayArray && state.isSelectedId && state.selectedHasArray &&
        <DynaText text={!state.clicked ? "GET HELP" : "STOP"} // BUY / SELL
          onClick={() => { app.alert("neutral",
            !state.clicked ? "Tip: Get help from nearby humans to build your Town" :
              "Click the RED Button to STOP the help request") }} 
          color={!state.clicked ? "#006600" : "#990000"}
          position={new Vector3(!state.clicked ? - 0.05 : + 0.12, 0, 0.461)}
          isSelected={state.isSelectedId} font={0.065} 
        />
      }
    </group>)
}

export default TradingTextContainer