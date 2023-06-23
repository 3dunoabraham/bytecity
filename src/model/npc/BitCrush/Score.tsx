import React from "react";
import DynaText from "@/model/core/DynaText";

function Score({ score, lastScore, startGame }:any) {
  return (
    <group position={[0.5, -0.185, 7.5]} rotation={[0, Math.PI, 0]}>
      <DynaText
        color={"#0099ff"}
        text={score < 0 ? "Click blue to Play" : score}
        font={score < 0 ? 0.1 : 0.4}
        onClick={startGame}
        rotation={[-Math.PI / 2, 0, Math.PI]}
        position={[0.05, -0.774, 0.9]}
      />
      {lastScore > 0 && (
        <DynaText
          color={"#ff9900"}
          text={lastScore}
          font={0.65}
          position={[0.5, -0.76, -0.4]}
          rotation={[-Math.PI / 2, 0, Math.PI]}
        />
      )}
    </group>
  );
}

export default Score;
