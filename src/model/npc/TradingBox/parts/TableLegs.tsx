import { Box, Plane } from '@react-three/drei';
import { Vector3 } from 'three';

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

export default TableLegs;
