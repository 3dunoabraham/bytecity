import React, { useEffect, useRef, useState } from "react";
import { Box } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useSearchParams } from 'next/navigation';
import {Screen, Frame} from "./FrameScreen"
import TextContainer from "./TextContainer"
import DynaText from "@/model/core/DynaText"
import { useAuth } from "@/../script/state/context/AuthContext";
import BattleLiveToggles from "./BattleLiveToggles";
import BattleButtons from "./BattleButtons";

export function BitCrush({calls}:any) {
  const { user, superuser, superoppo, do:{login, logout, demo, fetchSupaOppoUser, fetchSupaPlayer},  jwt }:any = useAuth()

  const [battleLife, s__battleLife] = useState(-1)
  const searchParams:any = useSearchParams();
  const [computerPosition, setComputerPosition] = useState(new THREE.Vector3(0, 0.8, 0));
  const [ballPosition, setBallPosition] = useState(new THREE.Vector3(0, 0, 0));
  const [ballYVelocity, setBallYVelocity] = useState(0.02);
  const [ballXVelocity, setBallZVelocity] = useState(0);
  const [playerPaddlePosition, setPlayerPaddlePosition] = useState(new THREE.Vector3(0, -0.8, 0));
  const [score, s__score] = useState(superuser.mode)
  const [lastScore, s__Lastscore] = useState(0)
  const $theBall: any = useRef(null);
  const $playerPaddle: any = useRef(null);
  const [mouseX, setMouseX] = useState(0);
  const [opponent, s__opponent] = useState(searchParams.get('oppo'))
  const [opponentLink, s__opponentLink] = useState(searchParams.get('link'))
  // Function to update the position of the ball
  useEffect(()=>{
    console.log("search oppo name", searchParams.get('oppo'))
    console.log("search link", searchParams.get('oppo'))
    console.log("search", opponent, opponentLink)
  },[])
  const updateBallPosition = () => {
    // getSearchParams
    if (score < 0) return;
    if (!$theBall.current) return;
    let newBallPosition = $theBall.current.position;
    newBallPosition.x += ballXVelocity;
    newBallPosition.y += ballYVelocity/2;
    // Check for collision with the walls
    if (newBallPosition.y > 0.8 || newBallPosition.y < -0.8) {
      if (newBallPosition.y < -0.8) {
        newBallPosition.y = -0.7;
        const paddleCenter = $playerPaddle.current.position.x; // Assuming playerPaddle is the paddle the ball collides with
        const distanceFromCenter = newBallPosition.x - paddleCenter;
        if (distanceFromCenter >= -0.25 && distanceFromCenter <= 0.25) {
          s__score(score + 1)
        }
        if (distanceFromCenter >= 0 && distanceFromCenter <= 0.25) {
          setBallZVelocity((score / 100) + (distanceFromCenter / 2 * (Math.random() / 2 + 0.5)));
        } else if (distanceFromCenter <= 0 && distanceFromCenter >= -0.25) {
          setBallZVelocity((score / 100) + (distanceFromCenter / 2 * (Math.random() / 2 + 0.5)));
        } else {
          s__Lastscore(score < lastScore ? lastScore : score)
          s__score(-1)
          setBallZVelocity(0);
          return
        }
      } else if (newBallPosition.y > 0.8) {
        newBallPosition.y = 0.7;
        setComputerPosition({ ...newBallPosition });
      }
      setBallYVelocity(-ballYVelocity);
    }
    if (newBallPosition.x > 1 || newBallPosition.x < -1) {
      setBallZVelocity(-ballXVelocity);
    }
    // newBallPosition.y = Math.sin(newBallPosition.y+0.8)
    setBallPosition(newBallPosition);
  };
  const startGame = () => {
    // setBallZVelocity((Math.random() - 0.5) / 10)
    // s__score(0)
    // $theBall.current.position.set(0, 0, 0)
  }
  useFrame(({ mouse }, delta) => {
    if (score < 0) return;
    // Call the update functions inside the animation frame loop
    updateBallPosition();
    // handleMouseMove(mouse)
  });
  const handleMouseMove = (event: any) => {
    // let clientX = event.x / window.innerHeight
    // setMouseX(clientX);
    // let newPosition = $playerPaddle.current.position;
    // newPosition.x = clientX * 1000
    // setPlayerPaddlePosition(newPosition);
  };

  const [form, s__form] = useState({
    id: "BTCUSDT4H",
  })
  const getBattleReady = () => {
    calls.toggleBattleMode(0)
    s__battleLife(0)
  }


  const getBattleContinue = () => {
    calls.toggleBattleMode(1)
    s__battleLife(1)
  }



  const quitBattle = () => {
    calls.toggleBattleMode(-1)
    s__battleLife(-1)
  }
  const endBattle = () => {
    calls.toggleBattleMode(-1)
    s__battleLife(-1)
  }

const getBattleAttack = () => {
  let newMode = superuser.mode+1
  calls.toggleBattleMode(newMode)
  s__battleLife(newMode)
  
}
const checkOppo = async () => {
  
  setTimeout(async ()=>{
  await fetchSupaPlayer()
  let oppo = await fetchSupaOppoUser()
  console.log("oppo", oppo, superoppo, superuser)
  setTimeout(()=>{
    console.log("oppo", oppo, superoppo, superuser)
  },1000)
},1000)

  // q__asd.refetch()
}
const triggerAttack = ()=>{
  if (prompt("Confirm attack? (Buy)","yes") != "yes") return
  
  calls.getBattleAttack()
}

  return (
    <>

      {/* SCORE */}
      <TextContainer calls={{startGame}} state={{score, lastScore, opponent, battleLife}} />

      <BattleButtons {...{calls:{startGame, checkOppo, getBattleReady}}} state={{}} />

      {/* <Screen />
      <Frame /> */}

      <group position={[0, 0, 6]}>
        {/* START BUTTON */}
        {/* <Box args={[0.6, 0.2, 0.3]} castShadow receiveShadow position={[0.5, -1.01, 0.95]}
          onClick={startGame}
        >
          <meshStandardMaterial color={"#0099ff"} />
        </Box> */}




        {/* BATTLE  */}
        {superuser.mode == 0 && superoppo && superoppo.href == superuser.hash &&
        <Box args={[0.5, 0.2, 0.5]} castShadow receiveShadow position={[2.2, -1.01, -1.1]}
        onClick={()=>{getBattleAttack()}}
          // onClick={()=>(q__asd.refetch())}
        >
          <meshStandardMaterial color={"#ff000"}  />
        </Box>
        }
        {superuser.mode > 0 &&
        <Box args={[0.3, 0.2, 0.3]} castShadow receiveShadow position={[1.2, -1.01, -0.1]}
        onClick={()=>{checkOppo()}}
        // onClick={getBattleAttack}
        >
          <meshStandardMaterial color={"#ff9999"}  />
        </Box>
        }

{superuser.mode >= 0 &&
  <group>

    <BattleLiveToggles {...{calls:{quitBattle, endBattle, startGame, getBattleAttack},
      state:{},
    }} 
      
    />
    </group>
        }

        


        {/* BALL */}
        {/* PLAYER PADDLE */}
        {/* <Box args={[0.12, 0.12, 0.12]} castShadow receiveShadow ref={$theBall}>
          <meshStandardMaterial color="#009900" />
        </Box>
        <Box args={[0.4, 0.1, 0.1]} position={[playerPaddlePosition.x, playerPaddlePosition.y, 0]}
          castShadow receiveShadow ref={$playerPaddle}>
          <meshStandardMaterial color="#ff9900" />
        </Box>
        <Box args={[0.4, 0.1, 0.1]} castShadow position={[computerPosition.x, computerPosition.y, 0]}
          receiveShadow>
          <meshStandardMaterial color="#ff0000" />
        </Box> */}
        {/* END OF COMPUTER PADDLE */}
      </group>
    </>
  );
}

export default BitCrush;