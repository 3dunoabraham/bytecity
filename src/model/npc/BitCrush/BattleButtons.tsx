import { Box } from "@react-three/drei"
import { useAuth } from "../../../../script/state/context/AuthContext"
import DynaText from "@/model/core/DynaText"
import { useQueryPlus } from "../../../../script/util/hook/useHooksHelper"
import { AppContext } from "@/../script/state/context/AppContext";
import { useState, useContext, useEffect, useMemo } from "react"

export function BattleButtons({ state, calls }: any) {
  const { user, superuser, superoppo, do: { login, logout, demo, fetchSupaPlayer }, jwt }: any = useAuth()
  const app:any = useContext(AppContext)


  const triggerBattle = () => {
    app.alert("neutral", "Starting Battle...")
    calls.getBattleReady()
  }

  return (
    <group>

      <group position={[0.5, -0.185, 7.5]} rotation={[0, Math.PI, 0]} >
        <DynaText color={superuser.mode < 0 ? "#009900" : "#ff9900"} 
          text={
            superuser.mode == 0 ? "Refresh" :
            (superuser.mode < 0 ? "Start Battle" : "Make Move")
          }
          // onClick={calls.startGame}
          font={0.1}
          rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          position={[-0.95, -0.774, 1.6]}
        />
      </group>

      <group position={[0, 0, 6]}>
        {superuser.mode == 0 &&
          <Box args={[0.3, 0.2, 0.3]} castShadow receiveShadow position={[1.2, -1.01, -0.1]}
            onClick={() => { calls.checkOppo() }}
          >
            <meshStandardMaterial color={"#ff9900"} />
          </Box>
        }


        {superuser.mode < 0 &&
          <Box args={[0.3, 0.2, 0.3]} castShadow receiveShadow position={[1.2, -1.01, -0.1]}
            onClick={triggerBattle}
          >
            <meshStandardMaterial color={"#009900"} />
          </Box>
        }
      </group>



    </group>
  )
}

export default BattleButtons