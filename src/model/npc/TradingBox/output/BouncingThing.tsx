import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Mesh } from "three";

function Component ({_bouncingThing, tokensArrayArray, isSelectedId, token, clicked, livestate, calls}:any) {
  
  const shakeAmount = Math.sin(Date.now() / 1000) / 10;
  const jumpHeight = 1.5;
  const [lastJumpTime, setLastJumpTime] = useState(0);
  const [cubeColor, s__cubeColor] = useState("");
  const bouncingThing:any = useRef<Mesh>();

  useFrame((state, delta) => {
    if (!bouncingThing.current) return;

    if (!clicked) 
    {
      bouncingThing.current.position.y = -0.05
      return
    }
    // Timing
    const jumpDelay = 1; // seconds
    const jumpTime = 0.5 + (["btc", "eth", "link", "ftm"].indexOf(token)*0.1); // seconds
    const pauseTime = 0.5; // seconds
    const totalTime = Date.now() / 1000;
    const timeSinceLastJump = totalTime - lastJumpTime;
  
    if (timeSinceLastJump >= jumpDelay) {
      const jumpProgress = ((totalTime - jumpDelay - lastJumpTime) % (jumpTime + pauseTime)) / (jumpTime + pauseTime);
      let jumpDistance = 0;
  
      if (jumpProgress < jumpTime / (jumpTime + pauseTime)) {
        // Jump up
        jumpDistance = Math.sin(jumpProgress * (jumpTime + pauseTime) * Math.PI / jumpTime) * jumpHeight;
      } else {
        // Pause at the bottom of the jump
        jumpDistance = 0;
      }
  
      // Exaggeration
      const stretchAmount = 1 + Math.abs(Math.sin(totalTime * 10)) * 0.2;
  
      let newPosition:any = shakeAmount + jumpDistance;
      if (newPosition < 0) {
        newPosition = 0;
      }
      bouncingThing.current.position.y = newPosition;
      bouncingThing.current.scale.set(stretchAmount, 1 / stretchAmount, 1);
  
      // Squash and stretch
      if (jumpProgress < 0.5) {
        bouncingThing.current.scale.set(
          1 + Math.cos(jumpProgress * (jumpTime + pauseTime) * Math.PI / jumpTime) * 0.5,
          1 - Math.cos(jumpProgress * (jumpTime + pauseTime) * Math.PI / jumpTime) * 0.5,
          1
        );
      } else {
        bouncingThing.current.scale.set(
          1 - Math.cos(0.5*((jumpProgress - 0.5) * (jumpTime + pauseTime) * Math.PI / pauseTime)) * 0.5,
          1 + Math.cos(0.5*((jumpProgress - 0.5) * (jumpTime + pauseTime) * Math.PI / pauseTime)) * 0.5,
          1
        );
      }
  
      if (jumpProgress === 0) {
        // Reset timer at the start of the jump
        setLastJumpTime(totalTime);
      }
    }
  });



  return ( <>
    
    {!!tokensArrayArray && !clicked && <>
      <mesh   // BOUNCING THING CASE
        position={[ +0.325, -0.37, -0.38, ]}          
        onClick={()=>{calls.app_tip("Uranium Block: Continue the tutorial to unlock it!")}}
      >
        <boxGeometry args={[0.18, 0.18, 0.12]} />
        <meshStandardMaterial transparent={true} opacity={0.5}
          color={!isSelectedId ? "#777777" : "#777777"}  
        />
      </mesh>
    </>}
    {!!tokensArrayArray &&
    <group position={[0,-0.3,0]}>
      <mesh castShadow receiveShadow ref={bouncingThing}
        position={[ 0.33, 0, -0.36, ]}          
      >
        <boxGeometry args={[0.1, 0.1, 0.05]} />
        {livestate.clickedPrice/livestate.queryUSDT.data < 1  && 
          <meshStandardMaterial  
          color={"#ff00ff"}
            // color={(
            //   livestate.clickedPrice/livestate.queryUSDT.data < 1 
            //   ? "#999999" : "#333333"
            // )}  
          />
        }
        {livestate.clickedPrice/livestate.queryUSDT.data < 1  && 
          <meshStandardMaterial  
          color={"#009900"}
            // color={(
            //   livestate.clickedPrice/livestate.queryUSDT.data < 1 
            //   ? "#999999" : "#333333"
            // )}  
          />
        }
      </mesh>
    </group>
    }
  </>)
}
export default Component