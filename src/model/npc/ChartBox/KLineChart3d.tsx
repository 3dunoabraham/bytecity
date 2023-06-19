import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

// import VertexColors explicitly

type Props = {
  count?: number;
  temp?: THREE.Object3D;
  positions?: number[];
  xRange?: [number, number];
  yRange?: [number, number];
  boundaries?: any;
};
let colors = new Float32Array([
  1.0, 0.0, 0.0, // Vertex 0 (Red)
  1.0, 0.0, 0.0, // Vertex 1 (Red)
  1.0, 1.0, 0.0, // Vertex 2 (Yellow)
  1.0, 1.0, 0.0, // Vertex 3 (Yellow)
  0.0, 1.0, 0.0, // Vertex 4 (Green)
  0.0, 1.0, 0.0, // Vertex 5 (Green)
  0.0, 0.0, 1.0, // Vertex 6 (Blue)
  0.0, 0.0, 1.0, // Vertex 7 (Blue)
]);

export default function Component({
  count = 500,
  temp = new THREE.Object3D(),
  positions = [],
  xRange = [-1, 100],
  yRange = [-100, 1],
  boundaries,
}: Props) {
  const refGreen: any = useRef<THREE.InstancedMesh>(null);
  const ssize = 0.02;

  useEffect(() => {
    // Set positions
    const distanceBetweenCubes = ssize;
    const xRangeSize = xRange[1] - xRange[0];
    const yRangeSize = yRange[1] - yRange[0];
    const minValue = Math.min(...positions);
    for (let i = 0; i < count; i++) {
      temp.scale.set(ssize * 0.4, ssize * 0.9, ssize * 0.9);
      const x = (i * distanceBetweenCubes*2 * xRangeSize) / count + xRange[0];
      const y =
        ((positions[i] - minValue) * yRangeSize) / (Math.max(...positions) - minValue) + yRange[0];
      temp.position.set(x, y, 0);
      temp.updateMatrix();
      refGreen.current.setMatrixAt(i, temp.matrix);
      // set vertex colors for each instance
      const color = new THREE.Color(0xffffff);
      color.setHSL(0.7 - y / yRangeSize, 1.0, 0.5); // Use y position to set hue value
      refGreen.current.setColorAt(i, color);
    }
    // Update the instance
    refGreen.current.instanceMatrix.needsUpdate = true;
    // Set buffer attributes to use vertex colors
    refGreen.current.geometry.setAttribute(
      "color",
      new THREE.InstancedBufferAttribute(colors, 3, true)
    );

  }, [positions, xRange, yRange]);

  return (
    <group position={[0,0,boundaries[2]*0.9]}>
      <instancedMesh ref={refGreen} args={[undefined, undefined, count]}>
        <boxBufferGeometry />
        <meshStandardMaterial />
      </instancedMesh>
    </group>
  );
}
