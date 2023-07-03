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

      {state.clicked && // PROFIT LOSS
        <DynaText text={"growth"}
          color={state.clickedPrice / state.queryUSDT.data < 1 ? 0x009900 : 0x777777}
          position={new Vector3(0.295, 0.09, -0.38)} rotation={[0, 0, 0]}
          isSelected={state.isSelectedId} font={0.044}
        />
      }
      {state.clicked && // PROFIT LOSS
        <DynaText text={"loss"}
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

      {state.clicked && // CLICKED PRICE 
        <DynaText text={"Interested \n Inhabitants " + "" || ""} color={0x000000}
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
      {!!tokensArrayArray && <>
        <DynaText color={state.selectedHasArray ? "#A09390" : "#9A3405"} // LIVE / DEMO
          // onClick={state.selectedHasArray ? calls.turnOff : calls.turnOn} 
          position={new Vector3(0.4, 0, +0.4)} text={"DEMO"}
          onClick={() => { app.alert("neutral","DEMO mode is for testing and building") }} 
          isSelected={state.isSelectedId} font={0.055}
        />

        <DynaText color={state.selectedHasArray ? "#007700" : "#A09390"} // LIVE / DEMO
          // onClick={state.selectedHasArray ? calls.turnOff : calls.turnOn} 
          position={new Vector3(0.4, 0, +0.46)} text={"LIVE"}
          onClick={() => { app.alert("success","LIVE mode enables the nearby inhabitants count") }} 
          isSelected={state.isSelectedId} font={state.selectedHasArray ? 0.06 : 0.06}
        />
      </>}
      {!!tokensArrayArray && state.isSelectedId && state.selectedHasArray &&
        <DynaText text={!state.clicked ? "CALL" : "END  CALL"} // BUY / SELL
        onClick={() => { app.alert("neutral","Click the RED BUTTON to END CALL") }} 
          color={!state.clicked ? "#006600" : "#990000"}
          position={new Vector3(!state.clicked ? - 0.05 : + 0.12, 0, 0.455)}
          isSelected={state.isSelectedId} font={0.065} 
        />
      }
    </group>)
}

export default TradingTextContainer