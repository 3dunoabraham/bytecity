import DynaText from "@/model/core/DynaText"
import { Cylinder } from "@react-three/drei"




function ConnectPlayerToggle ({calls, state}: any) {
    return (<>
      {/* CONNECT BUTTON */}
      {state.isDefaultUser && <>
        <Cylinder args={[0.12,0.12,0.1,7]} position={[0,-1,0]} 
          castShadow receiveShadow onClick={()=>{ calls.triggerLogin() }}
        >
          <meshStandardMaterial color={ "#eee"}/>
        </Cylinder>
        
        <DynaText text={"Connect"} color={"#5a5"} font={0.09} 
          position={[0,-0.94,-0.17]}
        />        
      </>}

      {/* DISCONNECT BUTTON */}
      {!state.isDefaultUser && <>
        <Cylinder args={[0.1,0.1,0.15,6]} 
          position={[0,-1,0]} castShadow receiveShadow 
          onClick={()=>{ calls.triggerLogout() }}
        >
          <meshStandardMaterial color={ "#fdd"}/>
        </Cylinder>
        
        <DynaText text={"Disconnect"} color={"#a55"} font={0.06} 
          position={[0,-0.99,0.15]}
        />
      </>}
    </>)
}
export default ConnectPlayerToggle