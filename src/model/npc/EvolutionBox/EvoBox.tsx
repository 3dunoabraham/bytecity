import { forwardRef, useContext, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";


import { AppContext } from "@/../script/state/context/AppContext";
import { fetchMultipleJsonArray, parseDecimals } from "@/../script/util/helper";
import EdenBlock from "./EdenBlock";
import EdenGenesis from "./EdenGenesis";
import RedButton from "./RedButton";
import EvolTextContainer from "./EvolTextContainer";
import ExclamationMark from "./ExclamationMark";
import TradeButtons from "./TradeButtons";
import { useUnloadHandler } from "@/../script/util/hook/useHooksHelper";
import { useRouter, useSearchParams } from "next/navigation";

export const tokenColors: any = { "btc": "#FE8E1B", "eth": "#3EDF5D", "link": "#2A5ADA", "ftm": "#1A6AFF", }
const EvolutionBox = forwardRef(({
  queryUSDT,
  refetchInterval = 9000,
  position = [0, 0, 0],
  onTextClick = () => { }, onTimeframeClick = () => { },
  score = 0, s__score = () => { },

  form = { id: "BTCUSDT3M" },
  calls = { toggleGame: () => { }, join: () => { }, leaveAsset: () => { }, turnOn: () => { }, turnOff: () => { }, onTextClick: () => { }, },
  store = {},
  state = { token: "btc", timeframe: "3m", isDowntrend: false, eraName: "unnamedEra", form: null, selectedHasArray: false, }
}: any, ref: any) => {
  const router = useRouter()
  const baseToken = "USDT"
  const app: any = useContext(AppContext)
  const [chopAmount, s__chopAmount] = useState<any>(0)
  const [klinesArray, s__klinesArray] = useState<any[]>([])

  const [clickedPrice, s__clickedPrice] = (
    useState(!!store[form.id] ? parseFloat(`${store[form.id][state.selectedTimeframeIndex].price}`) : 0)
  )
  const [clicked, setClicked] = (
    useState(!!store[form.id] ? !!store[form.id][state.selectedTimeframeIndex].buy : false)
  )

  const p__klinesArray = useMemo(() => {
    let slicedArray = [...klinesArray]
    for (let index = 0; index < chopAmount; index++) { slicedArray.push(klinesArray[499]) }

    return slicedArray.slice(slicedArray.length - 500, slicedArray.length)
  }, [klinesArray, chopAmount])

  const tokenColor = useMemo(() => {
    return tokenColors[state.token]
  }, [state.token])

  useImperativeHandle(ref, () => {
    return {
      toggleGame,
      queryUSDT,
      clickedPrice,
      clicked,
    };
  }, []);


  const toggleGame = () => {
    
    if (state.profitHistory.length > 4) {
      app.alert("error", "Full Life Storage!")
      return alert("New inhabitants can't enter the station! \n\n Please click the station button to reload the page \n or to add them to your Town Table");
    }



    if (clicked) {
      // setVelocityX(0)
      calls.toggleGame(state.token,{ value: 0, price: queryUSDT.data })
      setClicked(false)

      return
    }
    // s__score({ score: 1, maxScore: 0, velocityX: 0, velocityY: 0 })
    setClicked(true)
    // setVelocityX((0.05 + ((Math.random() / 2) - 0.55)) / 5)
    calls.toggleGame(state.token,{ value: 0.05, price: queryUSDT.data })
    s__clickedPrice(queryUSDT.data)
  }

  const triggerJoin = () => {
    app.audio("neutral","./sound/click33.wav")
    calls.join(form.id)
  }
  const triggerLeave = () => {
    if (prompt("Confirm end of game (y/n)","y") !== "y") return    
    app.audio("neutral","./sound/click33.wav")

    if (clicked) {
      let answ = prompt("You have a pending transaction \n\n do you want to cancel it? (y/n)","y")
      if (answ != "y") { return }
      toggleGame()
    }

    calls.leaveAsset(form.id)
  }
  const triggerTurnOn = () => {
    if (clicked) {
      return app.alert("error", "Pending action found! Click the RED Button first")
    }
    app.audio("neutral","./sfx/turnon.wav")
    calls.turnOn(form.id)
  }
  const triggerTurnOff = () => {
    if (clicked) {
      let answ = prompt("You have a pending transaction \n\n do you want to cancel it? (y/n)","y")
      if (answ != "y") { return }
      toggleGame()
    }
    app.audio("neutral","./sfx/turnoff.wav")
    calls.turnOff(form.id)
  }
  const isOn = useMemo(() => { return form.id in store }, [store])

  useUnloadHandler(router, clicked,)


  return (
    <group>
      <group position={[0, 0, 0]} onClick={(e) => { e.stopPropagation() }}>
        <EdenBlock />
        <EdenGenesis />
      </group>


      <group position={position} >
        <EvolTextContainer tokensArrayArray={store[form.id]}
          state={{ clicked, clickedPrice, isSelectedId: state.isSelectedId,
            token: state.token, queryUSDT, tokenColor, selectedHasArray: state.selectedHasArray,
          }}
          calls={calls}
        />
      </group>


      <group position={position}>
        <RedButton state={{ isOn }} calls={{ join: triggerJoin, leaveAsset: triggerLeave }} />


        <TradeButtons tokensArrayArray={store[form.id]}
          state={{ score: { score: 0 }, selectedHasArray: state.selectedHasArray,
            isSelectedId: state.isSelectedId, clicked
          }}
          calls={{ toggleGame, turnOn: triggerTurnOn, turnOff: triggerTurnOff }}
        />


          {/* CALL SCREEN */}
          {state.selectedHasArray &&
          <group position={[0, -0.33, 0]}>
          <mesh castShadow receiveShadow scale={score.score ? 1 : 3}
              position={[+ 0.33, -0.125, - 0.38]}
            >
              <boxGeometry args={[0.11, 0.01, 0.06]} />
              <meshStandardMaterial color={"#777777"} />
            </mesh>
      </group>
      }
        {clicked &&
          <group position={[0, -0.33, 0]}>
          <mesh castShadow receiveShadow scale={score.score ? 1 : 3}
            position={[+ 0.33, 0, - 0.41]}
          >
            <boxGeometry args={[0.09, 0.095, 0.01]} />
            <meshStandardMaterial color={"#777777"} />
          </mesh>
          
            <mesh castShadow receiveShadow scale={score.score ? 1 : 3}
              position={[+ 0.33, - 0.02, - 0.40]}
            >
              <boxGeometry args={[0.08, 0.095, 0.01]} />
              <meshStandardMaterial emissive={tokenColor} color={"#777777"} />
            </mesh>
          </group>
        }

      </group>


      {state.isDowntrend && <>
        <group position={position}>
          <ExclamationMark />

        </group>
      </>}

    </group>
  );
})

EvolutionBox.displayName = 'EvolutionBox'

export default EvolutionBox