import { Box } from "@react-three/drei"
import { useAuth } from "@/../script/state/context/AuthContext"
import DynaText from "@/model/core/DynaText"
import { useQueryPlus } from "@/../script/util/hook/useHooksHelper"
import { AppContext } from "@/../script/state/context/AppContext";
import { useState, useContext, useEffect, useMemo } from "react"

export function BattleLiveToggles ({state, calls}:any) {
  const { user, superuser, superoppo, do:{login, logout, demo, fetchSupaPlayer},  jwt }:any = useAuth()

  const [theToken, s__theToken] = useState("pepe")
  const [initUnix, s__initUnix] = useState(0)
  const [liveUnix, s__liveUnix] = useState(0)
  const [lastUnix, s__lastUnix] = useState(0)
  const [diffUnix, s__diffUnix] = useState(0)
  const [prices, setPrices] = useState<number[]>([]);
  const app:any = useContext(AppContext)

  const [firstUnixOfDay, s__firstUnixOfDay] = useState(0);

  useEffect(() => {
    const now = new Date();
    const unixOfDay = Math.floor(now.getTime() );
    s__firstUnixOfDay(unixOfDay);
  }, []);


  const [q__asd, asd]:any = useQueryPlus({ queryKey: ['asdasd'], 
      refetchOnWindowFocus: false, enabled: true ,
      queryFn: async () =>{
        let t = "3m"
        // let startUnixDate = getRandomUnixDate()
          // let urlBase = `https://api.binance.com/api/v3/klines?interval=${t}&startTime=${startUnixDate}&symbol=`
          let urlBase = `https://api.binance.com/api/v3/klines?interval=${t}&symbol=`
          urlBase += (theToken || "btc").toUpperCase()+"USDT"
          const theListRes = await fetch(urlBase)
          let theList = await theListRes.json()
          s__initUnix(theList[0][0])
          let firstUnix:any = parseInt( theList[499][0] )
          let lastLocalUnix:any =  parseInt(theList[0][0])
          if (lastLocalUnix != lastUnix ) {
            app.alert("success","Last block refreshed")
            fetchSupaPlayer()

          } else {
            app.alert("error","Same block! please wait...")
          }
          s__lastUnix(lastLocalUnix)
          //   if (lastLocalUnix != lastUnix && lastUnix != 0) {
        //     calls.getBattleAttack()
        //   s__lastUnix(lastLocalUnix)
        // } else {
        //     s__liveUnix(firstUnix - 2)
        //     s__diffUnix(lastLocalUnix - firstUnix)
        //   }
          
        const closingPrices = theList.map((item: any) => parseFloat(item[4]));
        setPrices(closingPrices);

        // console.log("qweqwe", lastLocalUnix)

        return theList
      }
  },[theToken])
  const theUnixDayProgress = useMemo(()=>{
    // console.log("lastUnix-firstUnixOfDay", lastUnix, firstUnixOfDay)
    // console.log("lastUnix-firstUnixOfDay", parseInt(`${lastUnix/1000000}`), parseInt(`${firstUnixOfDay/1000000}`))
    return parseInt(`${(1672545600000-lastUnix) * -1 / 1000 / 60 }`)
    return (lastUnix-firstUnixOfDay) * -1
  },[lastUnix,firstUnixOfDay])




  return (
    <group>
    <group>
      {/* {!!superuser && !!superoppo &&
    <group>

<Box args={[0.15, 0.3, 0.15]} castShadow receiveShadow position={[1.7, -1.01, -1]}
          onClick={calls.endBattle}
        >
          <meshStandardMaterial color={"#ff33ff"}  />
        </Box>
        
        <DynaText color={"#ff33ff"} text={"End Battle"}
          onClick={calls.startGame} font={0.1} 
          rotation={[-Math.PI / 2, 0, Math.PI/2]}
          position={[1.5, -0.98, -1]}
        />
    </group>
      } */}



<Box args={[0.15, 0.25, 0.15]} castShadow receiveShadow position={[2.2, -1.0, -0.3]}
          onClick={calls.quitBattle}
        >
          <meshStandardMaterial color={"#ff0000"}  />
        </Box>
        
        <DynaText color={"#ff0000"} text={"Exit"}
          // onClick={calls.startGame}
          font={0.1} 
          rotation={[-Math.PI / 2, 0, Math.PI/2]}
          position={[2.2, -0.98, -0.1]}
        />
        
<Box args={[0.28, 0.1, 1.1]} castShadow receiveShadow position={[2.45, -1.035, -0.1]}
          // onClick={calls.quitBattle}
        >
          <meshStandardMaterial color={"#eeeeee"}  />
        </Box>
        
        <DynaText color={"#ff33ff"} text={`T+${theUnixDayProgress}` }
          onClick={()=>q__asd.refetch()} 
          font={0.2} 
          rotation={[-Math.PI / 2, 0, Math.PI/2]}
          position={[2.45, -0.98, -0.1]}
        />
        </group>
    </group>
  )
}

export default BattleLiveToggles