import { Torus } from "@react-three/drei"


export function TableBody ({state, calls }:any) {
  return (
    <group position={[0,-0.5,0]}>
      
      {/* MAIN FLOOR */}
      <mesh castShadow receiveShadow onClick={calls.onTextClick} >
        <boxGeometry args={[1, 0.1, 1]} />
        <meshStandardMaterial color={!state.isSelectedId ? "#B0A3A0" : "#B6AfA5"}  />
      </mesh>        


      {/* selected ring */}
      {state.clicked && <group>
        <Torus args={[0.7,0.04,4,4]}  rotation={[Math.PI/2,0,Math.PI/4]} 
          receiveShadow castShadow
        >
          <meshStandardMaterial  attach="material" color="#615958" />
        </Torus>
      </group>}


      {/* TOP OUTER RING */}
      {state.isSelectedId && state.hasAnyToken &&
        <group position={[0,0.05,0]}>
          <Torus args={[0.705,0.005,4,4]}   rotation={[Math.PI/2,0,Math.PI/4]} >
            <meshStandardMaterial  attach="material" color="#A79797" />
          </Torus>
        </group>
      }
      {/* BOTTOM OUTER RING */}
      <group scale={[1,2.5,1]} position={[0,-0.05,0]}>
        <Torus args={[0.7,0.01,4,4]}   rotation={[Math.PI/2,0,Math.PI/4]} >
          <meshStandardMaterial  attach="material" color="#A69284" />
        </Torus>
      </group>        
  </group>)
}

export default TableBody