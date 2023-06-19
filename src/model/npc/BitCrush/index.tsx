import React, { useEffect, useRef, useState } from "react";
import { Box } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import LocalTradingBox from "@/model/core/LocalTradingBox";
import DynaText from "@/model/core/DynaText";

export function BitCrush() {
  const [computerPosition, setComputerPosition] = useState(new THREE.Vector3(0, 0.8, 0));
  const [ballPosition, setBallPosition] = useState(new THREE.Vector3(0, 0, 0));
  const [ballYVelocity, setBallYVelocity] = useState(0.02);
  const [ballXVelocity, setBallZVelocity] = useState(0);
  const [playerPaddlePosition, setPlayerPaddlePosition] = useState(new THREE.Vector3(0, -0.8, 0));
    const [score, s__score] = useState(-1)
    const [lastScore, s__Lastscore] = useState(0)
  const $theBall:any = useRef(null);
  const $computerPaddle:any = useRef(null);
  const $playerPaddle:any = useRef(null);
  const [mouseX, setMouseX] = useState(0);

  // Function to update the position of the ball
  const updateBallPosition = () => {

    if (score < 0) return;
    if (!$theBall.current) return;
    let newBallPosition = $theBall.current.position;
    newBallPosition.x += ballXVelocity;
    newBallPosition.y += ballYVelocity;

    // console.log("newBallPosition.x", newBallPosition.x)
    
    // Check for collision with the walls
    if (newBallPosition.y > 0.8 || newBallPosition.y < -0.8) {
        if (newBallPosition.y < -0.8) {
            newBallPosition.y = 0.8;
            const paddleCenter = $playerPaddle.current.position.x; // Assuming playerPaddle is the paddle the ball collides with
            const distanceFromCenter = newBallPosition.x - paddleCenter;
            if (distanceFromCenter >= -0.25 && distanceFromCenter <= 0.25) {
                
                s__score(score+1)

            }
            // console.log("distanceFromCenter", distanceFromCenter, newBallPosition.x, $playerPaddle.current.position.x)
                // console.log("distanceFromCenter", distanceFromCenter)
                if (distanceFromCenter >= 0 && distanceFromCenter <= 0.25)
            {
                // console.log("distanceFromCenter", distanceFromCenter)
                setBallZVelocity((score/100)+(distanceFromCenter/2*(Math.random()/2+0.5))); 
            } else if (distanceFromCenter <= 0 && distanceFromCenter >= -0.25)
            {
                // console.log("distanceFromCenter", distanceFromCenter)
                setBallZVelocity((score/100)+(distanceFromCenter/2*(Math.random()/2+0.5))); 
            } else {
                s__Lastscore(score < lastScore ? lastScore : score)
                s__score(-1)
                setBallZVelocity(0); 
                return 
                // return alert(score)
            }
            
        } else if (newBallPosition.y > 0.8) {
            newBallPosition.y = 0.8;
            // console.log("newBallPosition.y", newBallPosition.y)
          setComputerPosition({...newBallPosition});
        }
        

        setBallYVelocity(-ballYVelocity);
    }
    if (newBallPosition.x > 1 || newBallPosition.x < -1) {
        setBallZVelocity(-ballXVelocity);
    }

    // newBallPosition.y = Math.sin(newBallPosition.y+0.8)
    setBallPosition(newBallPosition);
  };

  // Function to move the player paddle up
  const movePlayerPaddleSouth = () => {
    if (!$playerPaddle.current) return;
    if ($playerPaddle.current.position.x < -1) {return}
    let newPosition = $playerPaddle.current.position;
    newPosition.x -= 0.1; // Move the paddle closer to the screen
    setPlayerPaddlePosition(newPosition);
  };

  // Function to move the player paddle down
  const movePlayerPaddleNorth = () => {
    if (!$playerPaddle.current) return;
    if ($playerPaddle.current.position.x > 1) {return}
    let newPosition = $playerPaddle.current.position;
    newPosition.x += 0.1; // Move the paddle away from the screen
    setPlayerPaddlePosition(newPosition);
  };
  const updateComputerPaddle = ()=>{
    
  }
  const startGame = ()=>{
    setBallZVelocity((Math.random()-0.5)/10)
    s__score(0)
    $theBall.current.position.set(0,0,0)
  }
  let maxMouseYMovement = window.innerHeight; // Initialize with the height of the window

  useFrame(({ mouse }, delta)=>{
    if (score < 0) return;
    // Call the update functions inside the animation frame loop
    updateComputerPaddle();
    updateBallPosition();

    handleMouseMove(mouse)
  });
  
    const handleMouseMove = (event:any) => {
        // console.log("event.clientY", score,)
        // const mouseYMovement = mouse.y * window.innerHeight; // Calculate the current Y mouse position relative to the window height
        // console.log("event.y / window.innerHeight", event.y , window.innerHeight)
        let clientX = event.x / window.innerHeight
        setMouseX(clientX);
        // console.log("event.clientX",event.y, clientX)
        let newPosition = $playerPaddle.current.position;
        newPosition.x = clientX*1000
        setPlayerPaddlePosition(newPosition);
    };
  
//   useEffect(() => {
//     const handleMouseMove = (event:any) => {
//         // console.log("event.clientY", score,)
//         if (score < 0) return
//         setMouseX(event.clientY);
//         // console.log("event.clientY", event.clientY)
//         let newPosition = $playerPaddle.current.position;
//         newPosition.x = event.clientY
//         setPlayerPaddlePosition(newPosition);
//     };
  
//     window.addEventListener("mousemove", handleMouseMove);
  
//     return () => {
//       window.removeEventListener("mousemove", handleMouseMove);
//     };
//   }, []);
    const [form, s__form] = useState({
      id:"BTCUSDT4H",
    })
  
  return (
    <>
    
    {!!form.id && form.id.split("USDT").length > 1 && <>

    <group position={[0,0,4]}>
      <LocalTradingBox
        {...{form}}
      />

      </group>
    </>}

    {/* SCORE */}
      <group position={[0.5, -0.185, 7.5]} rotation={[0,Math.PI,0]} >
        <DynaText color={"#0099ff"} text={score < 0 ? "Click blue to Play" : score} font={score < 0 ? 0.1 : 0.4 }
            onClick={startGame}
            rotation={[-Math.PI/2,0,Math.PI]}
            position={[0.05,-0.774,0.9]}
        />
        { lastScore > 0 && 
           <DynaText color={"#ff9900"} text={lastScore} font={0.65} position={[0.5,-0.76,-0.4]}
            rotation={[-Math.PI/2,0,Math.PI]}
           />
        }
        {/* <DynaText color={"#994400"} text={"Lock Camera"} font={0.15} position={[0,0,-0.35]}/> */}
    </group>

      {/* FRAME */}
      <group position={[0, -1.01, 6.45]}>
        <Box args={[1.8, 0.1, 1.4]} castShadow receiveShadow>
          <meshStandardMaterial color="#eee" />
        </Box>
      </group>
      <Box position={[0, -1.05, 7.87]}  args={[0.8,0.2,0.7]}>
        <meshStandardMaterial color={"#ffffff"} />
      </Box>
      {/* SCREEN */}
      <group position={[0, -0.1, 5.9]}>
        <Box args={[1.72, 2, 0.15]} castShadow receiveShadow>
          <meshStandardMaterial color="#333" />
        </Box>
      </group>
      {/* SCREEN */}

      <group position={[0, 0, 6]}>
        {/* START BUTTON */}
        <Box args={[0.6, 0.2, 0.3]} castShadow receiveShadow position={[0.5, -1.01, 0.95]}
            onClick={startGame}
        >
          <meshStandardMaterial color={"#0099ff"} />
        </Box>
        {/* SOUTH BUTTON */}
        {/* <Box args={[0.5, 0.2, 0.3]} castShadow receiveShadow position={[0, -0.2, -0.9]}
            onClick={movePlayerPaddleNorth}
        >
          <meshStandardMaterial color="#9933ff" />
        </Box>
        <Box args={[0.5, 0.2, 0.3]} castShadow receiveShadow position={[0, -0.2, -1.3]}
            onClick={movePlayerPaddleSouth}
        >
          <meshStandardMaterial color="#cc99cc" />
        </Box> */}
        {/* NORTH BUTTON */}

        {/* BALL */}
        <Box args={[0.1, 0.1, 0.1]} castShadow receiveShadow ref={$theBall}>
          <meshStandardMaterial color="#009900" />
        </Box>
        {/* END OF BALL */}

        {/* PLAYER PADDLE */}
        <Box args={[0.4, 0.1, 0.1]} position={[playerPaddlePosition.x, playerPaddlePosition.y, 0]} 
        castShadow receiveShadow ref={$playerPaddle}>
          <meshStandardMaterial color="#ff9900" />
        </Box>
        {/* END OF PLAYER PADDLE */}

        {/* COMPUTER PADDLE */}
        <Box args={[0.4, 0.1, 0.1]} castShadow position={[computerPosition.x, computerPosition.y, 0]} 
        receiveShadow>
          <meshStandardMaterial color="#ff0000" />
        </Box>
        {/* END OF COMPUTER PADDLE */}
      </group>
    </>
  );
}

export default BitCrush;
