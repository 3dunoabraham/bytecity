import { Vector3 } from "three"
import { useState } from "react"
import { Cylinder, Plane, Torus } from "@react-three/drei"
import DynaText from "@/model/core/DynaText"

function Computer ({tokensArrayArray, state, calls}:any) {
  const [translation,s__translation]:any = useState({
    btc:"Bitcoin",
    eth:"Ethereum",
    link:"Chainlink",
    ftm:"Fantom",
  })
  const [DisplayPosition,s__DisplayPosition]:any = useState([0.4,0.02,-0.05])
    return (<group position={[0,-0.15,0]}>




      {<>

        {  // hovered active button
        <>
          <group position={new Vector3(-0.1,0.1,-0.)} >
            <group position={new Vector3(-0.12,0.02,-0.086)}>
              { // north facing
                <DynaText text={state.token.toUpperCase()+"" || ""} 
                  color={ !!tokensArrayArray ? state.tokenColor : "#222222"}
                  position={new Vector3(0.12,0,0.0)}
                  rotation={[0,0,0]}
                  isSelected={state.isSelectedId}  font={0.12} onClick={()=>{}}
                />
              }
              { // south facing
                <DynaText text={state.token.toUpperCase()+"" || ""} 
                  color={ !!tokensArrayArray ? state.tokenColor : "#222222"}
                  position={new Vector3(0.12,0,-0.03)}
                  rotation={[0,Math.PI,0]}
                  isSelected={state.isSelectedId}  font={0.12} onClick={()=>{}}
                />
              }
            </group>
          </group>
        </>}
      </>}
      { /* (state.isSelectedId || !!tokensArrayArray) && */ <>
        <group position={new Vector3(-0.1,0.06,-0.)} // big monitor SCREEN
        >
          <mesh castShadow receiveShadow position={[0.0,0.,-0.099]} >
            <boxGeometry args={[0.3, 0.25, 0.025]} />
            <meshStandardMaterial color={!!tokensArrayArray ? "#C7E4EC" : "#666666"} 
              transparent={!tokensArrayArray || !state.isSelectedId}
              opacity={0.5}
             />
          </mesh>        
        </group>
      </>}
      
      <mesh castShadow receiveShadow position={[-0.1,-0.28,-0.25]} >
            <boxGeometry args={[0.5, 0.15, 0.33]} />
            <meshStandardMaterial color={"#888888"} />
          </mesh>   

      <group position={new Vector3(-0.1,0,-0.2)} >
        { // big monitor BASE
          <>
         {!!tokensArrayArray && 
           <Cylinder args={[0.1, 0.2, 0.17, 4]} position={[0.0,-0.12,-0.05]} // base base
            receiveShadow castShadow
            rotation={[0,Math.PI/4*3,0]}
          >
            <meshStandardMaterial color={"#808080"}  />
          </Cylinder>
         }
            <Cylinder args={[0.008, 0.03, 0.43, 4]} position={[0,-0.11,0.04]} // base connector
              receiveShadow castShadow
              rotation={[0,Math.PI/4*3,0]}
            >
              <meshStandardMaterial color={"#888"}  />
            </Cylinder>
            {state.isSelectedId &&
            <Cylinder args={[0.03, 0.01, 0.12, 7]} position={[0.0,0.23,0.065]} // webcam camera
              receiveShadow castShadow
              rotation={[0,Math.PI/2,Math.PI/2]}
            >
              <meshStandardMaterial color={"#808080"}  />
            </Cylinder>
            }
          </>
        }
      </group>

      { <>
        <group position={new Vector3(-0.1,0,-0.2)} >
          <Cylinder args={[0.27, 0.15, 0.35, 4]} position={[0.0,0.08,-0.07]} // big monitor CASE
            rotation={[Math.PI/2,Math.PI/4*3,0]} receiveShadow castShadow
          >
            <meshStandardMaterial color={"#888"}  />
          </Cylinder>
        </group>
      </>}


    </group>)
}

export default Computer