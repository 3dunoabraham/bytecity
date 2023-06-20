import DynaText from "@/model/core/DynaText"
import { Cylinder } from "@react-three/drei"
import { useLayoutEffect, useMemo, useRef } from "react"
import * as THREE from "three";

export function BoxBlendGeometry({ width = 1, height = 1, radius = 0.2, depth = 1 }) {
  const geometry:any = useRef()
  const shape = useMemo(() => {
    const s = new THREE.Shape()
    s.moveTo(-width / 2, -height / 2 + radius)
    s.lineTo(-width / 2, height / 2 - radius)
    s.absarc(-width / 2 + radius, height / 2 - radius, radius, 1 * Math.PI, 0.5 * Math.PI, true)
    s.lineTo(width / 2 - radius, height / 2)
    s.absarc(width / 2 - radius, height / 2 - radius, radius, 0.5 * Math.PI, 0 * Math.PI, true)
    s.lineTo(width / 2, -height / 2 + radius)
    s.absarc(width / 2 - radius, -height / 2 + radius, radius, 2 * Math.PI, 1.5 * Math.PI, true)
    s.lineTo(-width / 2 + radius, -height / 2)
    s.absarc(-width / 2 + radius, -height / 2 + radius, radius, 1.5 * Math.PI, 1 * Math.PI, true)
    return new THREE.Shape(s.getPoints(10))
  }, [width, height, radius, depth])
  const config = useMemo(() => ({ depth, bevelEnabled: false }), [depth])
  useLayoutEffect(() => {
    geometry.current.translate(0, 0, -depth / 2)
    geometry.current.computeVertexNormals()
  }, [shape])
  return <extrudeGeometry ref={geometry} args={[shape, config]} />
}


function ConnectPlayerToggle ({calls, state}: any) {
    return (<>
      {/* CONNECT BUTTON */}
      {state.isDefaultUser && <>
        <Cylinder args={[0.12,0.12,0.21,7]} position={[0,-1,0]} 
          castShadow receiveShadow onClick={()=>{ calls.triggerLogin() }}
        >
          <meshStandardMaterial color={ "#eee"}/>
        </Cylinder>
        
      {/* <mesh rotation={[Math.PI/2,0,0]} scale={[0.3,0.3,0.2]} position={[0,-1,0]} castShadow receiveShadow
        onClick={()=>{ calls.triggerLogin() }}
      >
  <BoxBlendGeometry radius={0.2} />
  <meshStandardMaterial color="#eee" />
</mesh> */}
        
<DynaText text={"Connect"} color={"#5a5"} font={0.05} 
          position={[0,-0.89,0]}
        />        
         {/* <DynaText text={"Connect"} color={"#5a5"} font={0.09} 
          position={[0,-0.94,-0.17]}
        />         */}
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