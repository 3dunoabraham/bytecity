import EdenBlock from "../npc/EvolutionBox/EdenBlock";
import EdenGenesis from "../npc/EvolutionBox/EdenGenesis";
import { Box, Plane, Torus } from '@react-three/drei';
import { Vector3 } from 'three';


export function DefaultSceneTable ({}) {
  return (<>
    
    <group position={[-0.75,0,-0.75]}>
    <TableBody  />
    <TableLegs />
    
    </group>
    {/* MAIN FLOOR */}
    <Box args={[2.5,0.2,2.8]} position={[0,-1.1,0]} castShadow receiveShadow>
      <meshStandardMaterial color={"#fff"}/>
    </Box>

  </>)
}

interface TableLegsProps {
  position?: Vector3;
  size?: Vector3;
}

const TableLegs: React.FC<TableLegsProps> = ({
  position = new Vector3(0, 0, 0),
  size = new Vector3(0.05, 0.5, 0.05),
}) => {
  const legPositions: Vector3[] = [
    new Vector3(0.4, 0, -0.4),
    new Vector3(-0.4, 0, -0.4),
    new Vector3(0.4, 0, 0.4),
    new Vector3(-0.4, 0, 0.4),
  ];

  return (
    <group position={[0,-0.75,0]}>
      {legPositions.map((pos, index) => (
        <mesh castShadow receiveShadow position={pos.add(position)} key={index}>
          <boxGeometry args={size.toArray()} />
          <meshStandardMaterial color={"#ccc"} />
        </mesh>
      ))}
    </group>
  );
};



export function TableBody ({
  state={isSelectedId:null, hasAnyToken: null, clicked: null},
  calls = {onTextClick:()=>{}}
}:any) {
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

export default DefaultSceneTable
