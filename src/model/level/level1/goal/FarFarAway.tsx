import BitCrush from "@/model/npc/BitCrush/backup"
import The3DPong from "@/model/npc/Pong/3DPong"
import { Box } from "@react-three/drei"
import { useContext } from "react"
import { AppContext } from "../../../../../script/state/context/AppContext"

export const FarFarAway = ({state,calls}:any) => {
  const app:any = useContext(AppContext)


  
  const onGameEnd = (clickCounter:any) => {
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
    calls.removeTransactionCouple(theIndex)
    // let aNewArray = [...state.profitHistory]
    // aNewArray.splice(theIndex, 1)
    // calls.s__profitHistory(aNewArray)
    //   app.audio("neutral","./sound/aaa.wav")
    //   app.alert("success", "You redeemed (1) local loss!")
  }


  return (
    <group>
      <group position={[0.5,-0.665,13]}>
        <group position={[-1.15,1.15,-0.7]} >
          <Box args={[1.2,2,.3]}>
            <meshStandardMaterial color={"#eeeeee"} />

          </Box>
        </group>
        <group position={[-1.15,1.5,-3.5]} scale={0.5}>
          <The3DPong calls={{endGame:onGameEnd}} />
        </group>
      </group>
      <Box position={[0.5,-0.665,13]} args={[5,1,2]} />
      <Box position={[5,-0.665,14]} args={[5,2.5,5]}>
        <meshStandardMaterial color={"#eeeeee"} />
      </Box>
    </group>

  )
}

export default FarFarAway