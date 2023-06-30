"use client";
import { Canvas } from "@react-three/fiber";
import React from "react";


import TheButton from "./TheButton";
import SceneLight from "./SceneLight";
import { OrbitControls } from "@react-three/drei";
import SceneSessionNucleus from "./SceneSessionNucleus";

function RootScene({
  children
}: any) {

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement<any>(child)) {
      return React.cloneElement(child, {
      });
    }
    return child;
  });

  return (
    <Canvas camera={{ fov: 55, position: [1, 0.75, 1], }} shadows>


      {!!children && <> {childrenWithProps} </>}
      {!children && <>
        <OrbitControls minPolarAngle={0.11} maxPolarAngle={1.77}
          minDistance={1} maxDistance={7} enablePan={false}
        />
        <SceneLight />
        <TheButton />
      </>}

    </Canvas>
  )
}

export default RootScene;