import { Vector3 } from "three"
import DynaText from "../DynaText"
import { useState } from "react"
import { Cylinder, Plane, Torus } from "@react-three/drei"

function Component ({tokensArrayArray, state, calls}:any) {
  const [translation,s__translation]:any = useState({
    btc:"gold",
    eth:"dola",
    link:"silver",
    ftm:"spirit",
  })
  const [DisplayPosition,s__DisplayPosition]:any = useState([0.4,0.02,-0.05])
    return (<>



{
      // small screen surface
        <> 


        <group position={DisplayPosition}>
          
        <mesh castShadow receiveShadow position={[-0.0165,0.03,0]} >
          <boxGeometry args={[0.03, 0.28, 0.4]} />
          <meshStandardMaterial color={!state.isSelectedId ? "#888" : "#888"}  />
        </mesh>        
        
        <mesh castShadow receiveShadow position={[-0.03,-0.2,0]} // stand
        > 
          <boxGeometry args={[0.03, 0.4, 0.1]} />
          <meshStandardMaterial color={!state.isSelectedId ? "#888" : "#888"}  />
        </mesh>        


          <Plane rotation={[0,Math.PI/2,0]} position={[-0.001,-0.0,0]}  args={[0.35,0.18]}>
            <meshStandardMaterial color={!!tokensArrayArray ? "#222222" : "#666666"} />
          </Plane>
          
          {!!tokensArrayArray && // CURRENT PRICE
              <DynaText text={state.queryUSDT.data+"" || ""} color={state.isSelectedId ? 0xaa0099 : 0xaaaaaa}
                onClick={()=>{}} font={0.13} rotation={[0,Math.PI/2,0]} isSelected={state.isSelectedId} 
                position={new Vector3( 0,0,0)} 
              />
          }
          { 
            <DynaText text={"Current Price"+"" || ""}  color={!!tokensArrayArray ? 0xffffff : 0x666666} position={[0,0.125,0.02]}
              isSelected={state.isSelectedId} font={0.06}  rotation={[0,Math.PI/2,0]} 
              />
          }
        </group>
            
        </>
      }
    </>)
}

export default Component