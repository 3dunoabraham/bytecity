import { Vector3 } from "three"
import { useState } from "react"
import { Cylinder, Plane, Torus } from "@react-three/drei"
import DynaText from "@/model/core/DynaText"
import BankRoofContainer from "@/3d/BankRoofContainer"

function Component ({tokensArrayArray, state, calls}:any) {
  const [translation,s__translation]:any = useState({
    btc:"Bitcoin",
    eth:"Ethereum",
    link:"Chainlink",
    ftm:"Fantom",
  })
  const [DisplayPosition,s__DisplayPosition]:any = useState([0.4,0.02,-0.05])
    return (<group position={[0,-0.1,0]}>


    
      {// state.isSelectedId && 
          <group >
            <group scale={[0.24 ,0.12,0.24  ]} position={[0.03,0.0,0.29]}>
              <BankRoofContainer roofWidth={0.05} width={0.5} position={[-0.5, 2, -3]} wallWidth={0.05} 
                length={2}
              />
            </group>
          </group>
      }




      {<>

        {  // hovered active button
        <>
          <group position={new Vector3(-0.1,0.04,0.045)} >
            <group position={new Vector3(-0.1,0.02,-0.)}>
              { // north facing
                <DynaText text={state.token.toUpperCase()+"" || ""} 
                  color={ !!tokensArrayArray ? state.tokenColor : "#292222"}
                  position={new Vector3(0.1,0.235,0.01)}
                  rotation={[0,0,0]}
                  isSelected={state.isSelectedId}  font={0.13} onClick={()=>{}}
                />
              }
              { // south facing
                <DynaText text={state.token.toUpperCase()+"" || ""} 
                  color={ !!tokensArrayArray ? state.tokenColor : "#2f2222"}
                  position={new Vector3(0.1,0.235,-0.485)}
                  rotation={[0,Math.PI,0]}
                  isSelected={state.isSelectedId}  font={0.13} onClick={()=>{}}
                />
              }
            </group>
          </group>
        </>}
      </>}
      {/* LOWER ROOF SEPARATOR */}
      {state.isSelectedId  &&
        <group position={new Vector3(-0.1,-0.1,-0.)} >
        <mesh castShadow receiveShadow position={[0.0,0.24,-0.2]} >
          <boxGeometry args={[0.48, 0.025, 0.46]} />
          <meshStandardMaterial color={"#9f9999"} 
           />
        </mesh>
        </group>
}
      { /* (state.isSelectedId || !!tokensArrayArray) && */ <>
        <group position={new Vector3(-0.1,-0.13,-0.)} // big monitor SCREEN
        >
          {/* INNER ROOF SEPARATOR */}
        <mesh castShadow={state.isSelectedId} receiveShadow position={[0.0,0.315,-0.2]} >
          <boxGeometry args={[0.45, 0.11, 0.44]} />
          <meshStandardMaterial color={"#7a7777"} 
           />
        </mesh>  
        {/* ROOF SEPARATOR */}
        <mesh castShadow receiveShadow position={[0.0,0.36,-0.2]} >
          <boxGeometry args={[0.58, 0.025, 0.52]} />
          <meshStandardMaterial color={"#9f9999"} 
           />
        </mesh>
        {/* BUILDING BODY */}
          <mesh castShadow receiveShadow position={[0.0,0.13,-0.23]} >
            <boxGeometry args={[0.44, 0.5, 0.32]} />
            <meshStandardMaterial color={"#a99f9f"} 
             />
          </mesh>        
        </group>
      </>}

      <group position={new Vector3(-0.1,0,-0.2)} >
        {/* BUILDING BASE */}
          <Cylinder args={[0.33, 0.38, 0.2, 4]} position={[0.0,-0.3,-0.02]}
            receiveShadow castShadow
            rotation={[0,Math.PI/4*3,0]}
          >
            <meshStandardMaterial color={"#8c8480"}  />
          </Cylinder>
          {/* STAIRS */}
          <group position={new Vector3(-0.17,-0.07,-0.)} >
          <mesh castShadow receiveShadow position={[0.1,-0.28,0.2]} >
            <boxGeometry args={[0.3, 0.1, 0.32]} />
            <meshStandardMaterial color={"#8c8480"} 
             />
          </mesh>
          <mesh castShadow receiveShadow position={[0.1,-0.24,0.15]} >
            <boxGeometry args={[0.25, 0.1, 0.32]} />
            <meshStandardMaterial color={"#8c8480"} 
             />
          </mesh>
          <mesh castShadow receiveShadow position={[0.1,-0.2,0.1]} >
            <boxGeometry args={[0.2, 0.1, 0.32]} />
            <meshStandardMaterial color={"#8c8480"} 
             />
          </mesh>        
        </group>



        <Cylinder args={[0.02, 0.03, 0.46, 4]}
              position={[-0.2,0.03,0.17]} // PILLAR
              receiveShadow castShadow
              rotation={[0,Math.PI/4*3,0]}
            >
              <meshStandardMaterial color={"#8b8888"}  />
            </Cylinder>
          <Cylinder args={[0.02, 0.03, 0.46, 4]}
              position={[0.2,0.03,0.17]} // PILLAR
              receiveShadow castShadow
              rotation={[0,Math.PI/4*3,0]}
            >
              <meshStandardMaterial color={"#8c8888"}  />
            </Cylinder>
        {state.isSelectedId && 
          <>
          
          <Cylinder args={[0.02, 0.03, 0.46, 4]}
              position={[-0.1,0.03,0.17]} // PILLAR
              receiveShadow castShadow
              rotation={[0,Math.PI/4*3,0]}
            >
              <meshStandardMaterial color={"#8b8888"}  />
            </Cylinder>
          <Cylinder args={[0.02, 0.03, 0.46, 4]}
              position={[0.1,0.03,0.17]} // PILLAR
              receiveShadow castShadow
              rotation={[0,Math.PI/4*3,0]}
            >
              <meshStandardMaterial color={"#8a8888"}  />
            </Cylinder>

            <Cylinder args={[0.02, 0.03, 0.46, 4]}
              position={[0.0,0.03,0.17]} // PILLAR
              receiveShadow castShadow
              rotation={[0,Math.PI/4*3,0]}
            >
              <meshStandardMaterial color={"#8a8888"}  />
            </Cylinder>
          </>
        }
        <group position={[0,-0.22,0]}>
        
          
        <Cylinder args={[0.035, 0.04, 0.05, 4]}
              position={[-0.2,0.04,0.17]} // PILLAR
              receiveShadow castShadow
              rotation={[0,Math.PI/4*3,0]}
            >
              <meshStandardMaterial color={"#767072"}  />
            </Cylinder>
          <Cylinder args={[0.035, 0.04, 0.05, 4]}
              position={[-0.1,0.04,0.17]} // PILLAR
              receiveShadow castShadow
              rotation={[0,Math.PI/4*3,0]}
            >
              <meshStandardMaterial color={"#796f69"}  />
            </Cylinder>
      

            <Cylinder args={[0.035, 0.04, 0.05, 4]}
              position={[0.0,0.04,0.17]} // PILLAR
              receiveShadow castShadow
              rotation={[0,Math.PI/4*3,0]}
            >
              <meshStandardMaterial color={"#787070"}  />
            </Cylinder>
            <Cylinder args={[0.035, 0.04, 0.05, 4]}
              position={[0.1,0.04,0.17]} // PILLAR
              receiveShadow castShadow
              rotation={[0,Math.PI/4*3,0]}
            >
              <meshStandardMaterial color={"#7a777b"}  />
            </Cylinder>
          
            <Cylinder args={[0.035, 0.04, 0.05, 4]}
              position={[0.2,0.04,0.17]} // PILLAR
              receiveShadow castShadow
              rotation={[0,Math.PI/4*3,0]}
            >
              <meshStandardMaterial color={"#796f6f"}  />
            </Cylinder>
        </group>
      </group>


    </group>)
}

export default Component