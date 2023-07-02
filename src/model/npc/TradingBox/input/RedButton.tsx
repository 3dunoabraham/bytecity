import { useContext } from "react"
import { AppContext } from "../../../../../script/state/context/AppContext"


export function RedButton({ state, calls }: any) {
  const app:any = useContext(AppContext)

  const triggerClick = (e:any)=>{
    app.audio("neutral","./sound/click33.wav")
    
    if (!state.isOn) {
      if (calls.join) { calls.join() }
    } else {
      if (calls.leaveAsset) { calls.leaveAsset() }
    }
    e.stopPropagation()
  }

  return (<>
    <group position={[0, -0.47, 0]} onClick={triggerClick}    >
      <group position={[0, 0.1, 0]} >
        <mesh castShadow receiveShadow position={[0.39, state.isOn ? -0.06 : -0.04, 0,]} rotation={[0, 0, 0]} >
          <boxGeometry args={[0.12, 0.09, 0.12]} />
          <meshStandardMaterial color={state.isOn ? "#009900" : "#ff0000"} />
        </mesh>
      </group>
      <mesh castShadow receiveShadow
        scale={3} position={[0.39, 0, 0,]}
      >
        <boxGeometry args={[0.06, 0.04, 0.06]} />
        <meshStandardMaterial color={"#888"} />
      </mesh>
    </group>
  </>)
}

export default RedButton