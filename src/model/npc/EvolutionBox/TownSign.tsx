import { Vector3 } from "three"
import { useContext, useState } from "react"
import { Plane } from "@react-three/drei"


import DynaText from "@/model/core/DynaText"
import StandardColor from "@/model/level/level2/core/StandardColor"
import { AppContext } from "../../../../script/state/context/AppContext"

function MiniCitySign({ tokensArrayArray, state, calls }: any) {
  const app:any = useContext(AppContext)
  const [translation, s__translation]: any = useState({
    btc: "gold",
    eth: "dola",
    link: "silver",
    ftm: "spirit",
  })
  const [DisplayPosition, s__DisplayPosition]: any = useState([0.4, 0.1, 0.1])
  if (!state.selectedHasArray) return (<></>)

  return (<>
    <group position={DisplayPosition} rotation={[0, -0.5, 0]} 
      
    >

      <mesh castShadow receiveShadow position={[-0.0165, 0.03, 0]} >
        <boxGeometry args={[0.03, 0.28, 0.4]} />
        <meshStandardMaterial color={"#aba099"} />
      </mesh>

      <mesh castShadow receiveShadow position={[-0.03, -0.25, 0.08]} // stand
      >
        <boxGeometry args={[0.03, 0.7, 0.02]} />
        <meshStandardMaterial color={"#9a9999"} />
      </mesh>
      <mesh castShadow receiveShadow position={[-0.03, -0.25, -0.08]} // stand
      >
        <boxGeometry args={[0.03, 0.7, 0.02]} />
        <meshStandardMaterial color={"#9c9999"} />
      </mesh>
      <group
        onClick={(e) => {
          app.alert("neutral",state.queryUSDT.data+" Humans are close to your region")
          e.stopPropagation()
        }} 
      >
      <Plane rotation={[0, Math.PI / 2, 0]} position={[-0.001, -0.0, 0]} args={[0.35, 0.18]}
        material={StandardColor(!!tokensArrayArray ? "#222222" : "#89827a")}
      >
      </Plane>

      {!!tokensArrayArray && // CURRENT PRICE
        <DynaText text={state.queryUSDT.data + "" || ""} color={state.isSelectedId ? 0xaa0099 : 0xaaaaaa}
          
          font={0.11} rotation={[0, Math.PI / 2, 0]} isSelected={state.isSelectedId}
          position={new Vector3(0, 0, 0)}
        />
      }
      <DynaText text={"Nearby Humans" + "" || ""} color={!!tokensArrayArray ? 0xffffff : 0x666666} position={[0, 0.125, 0.0]}
      
        isSelected={state.isSelectedId} font={0.05} rotation={[0, Math.PI / 2, 0]}
      />
      </group>
    </group>
  </>)
}

export default MiniCitySign