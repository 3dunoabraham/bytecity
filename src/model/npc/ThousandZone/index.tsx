import { useEffect, useRef } from "react";
import * as THREE from "three";
import GridFloor from "./GridFloor";

type Props = {
  xCount?: number;
  yCount?: number;
  zCount?: number;
  temp?: THREE.Object3D;
  positions?: number[];
};

export default function ThousandZone({
  xCount = 100,
  yCount = 5,
  zCount = 100,
  temp = new THREE.Object3D(),
  positions = [],
}: Props) {
  const cubesInstances: any = useRef<THREE.InstancedMesh>(null);
  const ssize = 1/2;

  useEffect(() => {
    const distanceBetweenCubes = ssize * 2; 

    let cubeIndex = 0;
    for (let x = 0; x < xCount; x++) {
      for (let y = 0; y < yCount; y++) {
        for (let z = 0; z < zCount; z++) {
          const xPos = x * distanceBetweenCubes;
          const yPos = y * distanceBetweenCubes;
          const zPos = z * distanceBetweenCubes;
          temp.position.set(xPos, yPos, zPos);
          temp.updateMatrix();
          cubesInstances.current.setMatrixAt(cubeIndex, temp.matrix);
          cubeIndex++;
        }
      }
    }
    cubesInstances.current.instanceMatrix.needsUpdate = true;
  }, [positions, xCount, yCount, zCount]);

  return (
    <group position={[0, 0, 0]}>
      <instancedMesh ref={cubesInstances} args={[undefined, undefined, xCount * yCount * zCount]}
      >
        <boxBufferGeometry />
        <meshStandardMaterial  wireframe={true} color={"#777777"} />
      </instancedMesh>


    </group>
  );
}
