import { Box, useDepthBuffer } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { forwardRef, useContext, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { Mesh } from "three";
import { useLocalStorage } from "usehooks-ts";
import { useQuery } from "@tanstack/react-query";
import { fetchMultipleJsonArray, parseDecimals } from "@/../script/util/helper";
import { AppContext } from "../../../script/state/context/AppContext";
import TableLegs from "../npc/TradingBox/parts/TableLegs";
import TableBody from "../npc/TradingBox/parts/TableBody";
import TextContainer from "../npc/TradingBox/output/TextContainer";
import Computer from "../npc/TradingBox/parts/Computer";
import Bank from "../npc/TradingBox/parts/Bank";
import Tower from "../npc/TradingBox/parts/Tower";
import MiniCitySign from "../npc/TradingBox/output/MiniCitySign";
import BouncingThing from "../npc/TradingBox/output/BouncingThing";
import TimeframeButtons from "../npc/TradingBox/input/TimeframeButtons";
import PowerLock from "../npc/TradingBox/input/PowerLock";
import TrendTree from "../npc/TradingBox/input/TrendTree";
import TradeButtons from "../npc/TradingBox/input/TradeButtons";

export const DEFAULT_TIMEFRAME_ARRAY = ["3m","15m","4h","1d","1w"]  
export const tokenColors:any = {
  "btc": "#FE8E1B",
  "eth": "#3EDF5D",
  "link": "#2A5ADA",
  "ftm": "#1A6AFF",
}
const LolcaTradingBox = forwardRef(({
  mainModel = "pc",
  turnOn, turnOff, leaveAsset, join,
  trendDown, trendUp,
  tokensArrayArray,
  unselectedColor="#48721E",
  refetchInterval=3000,
  form= null, token= "", timeframe= "3m",
  wallWidth=0.1,
  position=[0,0,0], boundaries=[1,1,1],
  onTextClick=()=>{}, onTimeframeClick=()=>{},score=0,s__score=()=>{},
  velocityX=0, setVelocityX=()=>{}, velocityY=0, setVelocityY=()=>{},
}: any, ref:any) => {
  const API_PRICE_BASEURL = "https://api.binance.com/api/v3/ticker/price?symbol="
  const baseToken = "USDT"
    const app:any = useContext(AppContext)
    const [LS_tokensArrayObj, s__LS_tokensArrayObj] = useLocalStorage('localTokensArrayObj', "{}")
    const [LS_rpi, s__LS_rpi] = useLocalStorage('rpi', "")
    const [rpi, s__rpi] = useState("")
    const [showAllTokens,s__showAllTokens] = useState<any>(true)
    const [chopAmount,s__chopAmount] = useState<any>(0)
    const [tokensArrayObj,s__tokensArrayObj] = useState<any>({})
    const [klinesArray,s__klinesArray] = useState<any[]>([])
    const [clientIP, s__clientIP] = useState('');
    const DEFAULT_TOKEN_OBJ = {
        mode:0,state:0,buy:0,sell:0, floor:0,ceil:0,
        min:0,max:0,minMaxAvg:0,minMedian:0,maxMedian:0,
    }
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

  return form.id.split("USDT")[1].toLowerCase()
},[form.id])
const selectedTimeframeIndex = useMemo(()=>{
  return DEFAULT_TIMEFRAME_ARRAY.indexOf(selectedTimeframe)
},[selectedTimeframe])


const selectedHasArray = useMemo(()=>{
  return !!tokensArrayArray && !!tokensArrayArray[selectedTimeframeIndex] && !!tokensArrayArray[selectedTimeframeIndex].state
},[tokensArrayArray, selectedTimeframeIndex])

    const [clickedPrice, s__clickedPrice] = useState(selectedHasArray ? parseFloat(`${tokensArrayArray[selectedTimeframeIndex].price}`) : 0)
    const [clicked, setClicked] = useState(selectedHasArray ? !!tokensArrayArray[selectedTimeframeIndex].buy : false);
  const meshRef = useRef<Mesh>();
  const bouncingThing:any = useRef<Mesh>();
  const playerMesh:any = useRef<Mesh>();
  const depthBuffer = useDepthBuffer({ frames: 1 });
  const [elapsed, setElapsed] = useState<any>(0);
  const viewport = useThree((state) => state.viewport);
  const tokenColor = useMemo(()=>{
    return tokenColors[token]
  },[token])
  const isSelectedId = useMemo(()=>{
    return form && form.id == token.toUpperCase()+"USDT"+timeframe.toUpperCase()
  },[form])
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
    return form.id.split("USDT")[0].toLowerCase()
  },[form.id])
  // const selectedHasArray = useMemo(()=>{
  //   return !!tokensArrayArray && !!tokensArrayArray[selectedTimeframeIndex] && !!tokensArrayArray[selectedTimeframeIndex].state
  // },[tokensArrayArray, selectedTimeframeIndex])

  const isDowntrend = useMemo(()=>{
    return !!tokensArrayArray && !!tokensArrayArray[selectedTimeframeIndex] && !!tokensArrayArray[selectedTimeframeIndex].mode
  },[selectedTimeframeIndex,tokensArrayArray])



  return (
    <group>

      {/* <Box>
        
      </Box> */}
        
    <TableBody state={{boundaries, wallWidth, isSelectedId, clicked, hasAnyToken:!!tokensArrayArray}}
        calls={{ onTextClick: (e:any) => {onTextClick();e.stopPropagation()}}}

     />

    <TableLegs />

      
      <group position={position} >
        <TextContainer tokensArrayArray={tokensArrayArray}
          state={{clicked,clickedPrice,isSelectedId,token,queryUSDT,tokenColor,selectedHasArray,}}
          calls={{onTextClick,turnOff,turnOn}}
        />
      </group>

      {mainModel == "pc" && 
        <group position={position} >
        <Computer tokensArrayArray={tokensArrayArray}
            state={{clicked,clickedPrice,isSelectedId,token,queryUSDT,tokenColor,selectedHasArray,}}
            calls={{onTextClick,turnOff,turnOn}}
          />
        </group>
    }
    {mainModel == "bank" && 
      <group position={position} onClick={onTextClick}>
        <Bank tokensArrayArray={tokensArrayArray}
          state={{clicked,clickedPrice,isSelectedId,token,queryUSDT,tokenColor,selectedHasArray,}}
          calls={{onTextClick,turnOff,turnOn}}
        />
      </group>
    }
    {mainModel == "tower" && 
      <group position={position} >
        <Tower tokensArrayArray={tokensArrayArray}
          state={{clicked,clickedPrice,isSelectedId,token,queryUSDT,tokenColor,selectedHasArray,}}
          calls={{onTextClick,turnOff,turnOn}}
        />
      </group>
    }
      
      <group position={position} >
        <MiniCitySign tokensArrayArray={tokensArrayArray}
          state={{clicked,clickedPrice,isSelectedId,token,queryUSDT,tokenColor,selectedHasArray,}}
          calls={{onTextClick,turnOff,turnOn}}
        />
      </group>

      {/* <group position={position} >
        <MiniScreen tokensArrayArray={tokensArrayArray}
          state={{clicked,clickedPrice,isSelectedId,token,queryUSDT,tokenColor,selectedHasArray,}}
          calls={{onTextClick,turnOff,turnOn}}
        />
      </group> */}


      
      <group position={position}>
        <BouncingThing tokensArrayArray={tokensArrayArray} _bouncingThing={bouncingThing}
          livestate={{clickedPrice, queryUSDT}}
          calls={{
            app_tip:(msg:string)=>{app.alert("neutral",msg)},
          }}
          isSelectedId={isSelectedId} token={token} clicked={clicked}
        />
        {!!tokensArrayArray && selectedHasArray &&
          <group position={[-0.18,0,0.2]}>
            <TimeframeButtons tokensArrayArray={tokensArrayArray}
              state={{isSelectedId, score, token, selectedTimeframe, selectedTimeframeIndex}}
              calls={{onTimeframeClick,onTextClick,}}
            />
          </group>
        }
        
        
        {/* toggles sync join trend */}
        <PowerLock state={{score, isSelectedId, selectedHasArray,isDowntrend,}}
            tokensArrayArray={tokensArrayArray}
            calls={{join, leaveAsset, onTextClick, turnOff, turnOn,trendDown,trendUp}}
          />
          
        <TrendTree state={{score, isSelectedId, selectedHasArray,isDowntrend,}}
            tokensArrayArray={tokensArrayArray}
            calls={{join, leaveAsset, onTextClick, turnOff, turnOn,trendDown,trendUp}}
          />
          
        <TradeButtons state={{score, isSelectedId, selectedHasArray,isDowntrend,clicked}}
            tokensArrayArray={tokensArrayArray}
            calls={{join, leaveAsset, onTextClick, turnOff, turnOn,trendDown,trendUp,toggleGame}}
          />
          
        
        {/* OPEN VIRTUAL ORDER SCREEN */}
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






      {/* mini buttons */}
      
      {/* EXCLAMATION MARK */}
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
      {/* mini  yellow button */}
      {isSelectedId && !!tokensArrayArray &&
          <group position={position}>
          <mesh castShadow receiveShadow scale={score.score ? 1 : 3}
          position={[  - 0.23,  - 0.28,  + 0.2]}
        >
          <boxGeometry args={[0.02, 0.06, 0.015]} />
          <meshStandardMaterial color={ !!tokensArrayArray &&  clicked ? "#ffa066" : "#FEEA4D"} />
        </mesh>
        </group>
      }


    </group>
  );
})

LolcaTradingBox.displayName = 'LocalTradingBox'

export default LolcaTradingBox