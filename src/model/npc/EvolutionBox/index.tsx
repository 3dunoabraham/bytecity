import { useDepthBuffer } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { forwardRef, useContext, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { Mesh } from "three";
import { useLocalStorage } from "usehooks-ts";
import { useQuery } from "@tanstack/react-query";


import { AppContext } from "@/../script/state/context/AppContext";
import { fetchMultipleJsonArray, parseDecimals } from "@/../script/util/helper";
import EdenBlock from "./EdenBlock";
import EdenGenesis from "./EdenGenesis";
import RedButton from "../TradingBox/input/RedButton";
import { DEFAULT_TIMEFRAME_ARRAY } from "../../../../script/constant/game";
import EvolTextContainer from "./EvolTextContainer";

export const tokenColors:any = {
  "btc": "#FE8E1B",
  "eth": "#3EDF5D",
  "link": "#2A5ADA",
  "ftm": "#1A6AFF",
}
const EvolutionBox = forwardRef(({
  mainModel = "pc",
  turnOn, turnOff, 
  refetchInterval=3000,
  token= "btc", timeframe= "3m",
  position=[0,0,0], 
  onTextClick=()=>{}, onTimeframeClick=()=>{},score=0,s__score=()=>{},
  velocityX=0, setVelocityX=()=>{}, velocityY=0, setVelocityY=()=>{},
  calls= {
    join:()=>{},
    leaveAsset:()=>{},
  },
  store= {

  },
  state= {
    eraName:"unnamedEra",
    form: null, 
  }
}: any, ref:any) => {
  const API_PRICE_BASEURL = "https://api.binance.com/api/v3/ticker/price?symbol="
  const baseToken = "USDT"
    const app:any = useContext(AppContext)
    const [LS_tokensArrayObj, s__LS_tokensArrayObj] = useLocalStorage(state.eraName+"TokensArrayObj", "{}")
    const [LS_rpi, s__LS_rpi] = useLocalStorage('rpi', "")
    const [rpi, s__rpi] = useState("")
    const [chopAmount,s__chopAmount] = useState<any>(0)
    const [tokensArrayObj,s__tokensArrayObj] = useState<any>({})
    const [klinesArray,s__klinesArray] = useState<any[]>([])
    const [clientIP, s__clientIP] = useState('');
    const p__klinesArray = useMemo(()=>{
        let slicedArray = [...klinesArray]
        for (let index = 0; index < chopAmount; index++) { slicedArray.push(klinesArray[499]) }
        
        return slicedArray.slice(slicedArray.length-500,slicedArray.length)
    },[klinesArray,chopAmount])
    const queryUSDT:any = useQuery({ queryKey: ['usdt'+token], refetchInterval: refetchInterval,
    queryFn: async () => {
      let theList = await fetchMultipleJsonArray(( [token].reduce((acc, aToken) => (
        { ...acc, [aToken]: [`${API_PRICE_BASEURL}${(aToken+baseToken).toUpperCase()}`] }
        ), {})))
      let prr = parseDecimals(theList[0].price)
      return prr
    }
})
const selectedTimeframe = useMemo(()=>{
  return state.form.id.split("USDT")[1].toLowerCase()
},[state.form.id])
const selectedTimeframeIndex = useMemo(()=>{
  return DEFAULT_TIMEFRAME_ARRAY.indexOf(selectedTimeframe)
},[selectedTimeframe])


const selectedHasArray = useMemo(()=>{
  return !!store && !!store[selectedTimeframeIndex] && !!store[selectedTimeframeIndex].state
},[store, selectedTimeframeIndex])

    const [clickedPrice, s__clickedPrice] = useState(selectedHasArray ? parseFloat(`${store[selectedTimeframeIndex].price}`) : 0)
    const [clicked, setClicked] = useState(selectedHasArray ? !!store[selectedTimeframeIndex].buy : false);

  const tokenColor = useMemo(()=>{
    return tokenColors[token]
  },[token])
  const isSelectedId = useMemo(()=>{
    return state.form && state.form.id == token.toUpperCase()+"USDT"+timeframe.toUpperCase()
  },[state.form])
  useEffect(()=>{
    s__tokensArrayObj(JSON.parse(LS_tokensArrayObj))
    s__rpi(LS_rpi)
    s__clientIP(LS_rpi.split(":")[0])
  },[])

  useImperativeHandle(ref, () => {
    return {
      toggleGame,
    };
  }, []);


  const toggleGame = () => {
    if (clicked) 
    {
      setVelocityX(0)
      setVelocityY({value:0,price:queryUSDT.data})
      setClicked(false)
      
      return
    }
    s__score({score:1,maxScore: 0, velocityX:0,velocityY:0})
    setClicked(true)
    setVelocityX((0.05+((Math.random()/2)-0.55)) / 5)
    setVelocityY({value:0.05,price:queryUSDT.data})
    s__clickedPrice(queryUSDT.data)
  }

  const selectedToken = useMemo(()=>{
    return state.form.id.split("USDT")[0].toLowerCase()
  },[state.form.id])

  const isDowntrend = useMemo(()=>{
    return !!store && !!store[selectedTimeframeIndex] && !!store[selectedTimeframeIndex].mode
  },[selectedTimeframeIndex,store])

  const triggerJoin = () => {
    calls.join(state.form.id)
  }

  const triggerLeave = () => {
    calls.leaveAsset(state.form.id)
  }

  const isOn = useMemo(()=>{
    return state.form.id in store
  },[store])

  return (
    <group>
      <group position={[0,0,0]}>
        <EdenBlock  />
        <EdenGenesis />
      </group>

      
      <group position={position} >
        <EvolTextContainer tokensArrayArray={store}
          state={{clicked,clickedPrice,isSelectedId,token,queryUSDT,tokenColor,selectedHasArray,}}
          calls={{onTextClick,turnOff,turnOn}}
        />
      </group>

      
      <group position={position}>
        <RedButton state={{isOn}} calls={{join:triggerJoin, leaveAsset:triggerLeave }} />
        
        {clicked &&
          <group position={[0,-0.33,0]}>
            <mesh castShadow receiveShadow scale={score.score ? 1 : 3}
              position={[  + 0.33,  0,  - 0.41 ]}
            >
              <boxGeometry args={[0.1, 0.095, 0.01]} />
              <meshStandardMaterial color={"#777777"}  />
            </mesh>
            <mesh castShadow receiveShadow scale={score.score ? 1 : 3} 
              position={[  + 0.33,  - 0.02,  - 0.40 ]}
            >
              <boxGeometry args={[0.08, 0.095, 0.01]} />
              <meshStandardMaterial emissive={tokenColor} color={"#777777"}  />
            </mesh>
          </group>
        }

      </group>
      {isDowntrend && <>
          <group position={position}>
        <mesh castShadow receiveShadow scale={score.score ? 1 : 3}
          position={[  - 0.42,  - 0,  - 0.42 ]}
        >
          <boxGeometry args={[0.02, 0.1, 0.02]} />
          <meshStandardMaterial color={"red"} />
        </mesh>
        <mesh castShadow receiveShadow scale={score.score ? 1 : 3}
          position={[  - 0.42,  - 0.28,  - 0.42]}
        >
          <boxGeometry args={[0.02, 0.03, 0.02]} />
          <meshStandardMaterial color={"red"} />
        </mesh>
        </group>
      </>}

    </group>
  );
})

EvolutionBox.displayName = 'EvolutionBox'

export default EvolutionBox