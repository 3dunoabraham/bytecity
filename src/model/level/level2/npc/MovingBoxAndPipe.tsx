import { Box, Torus } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"


function MovingBoxAndPipe ({}) {
  const movingPart1:any = useRef()
  useFrame(() => {
    if (!movingPart1.current) return
    if (movingPart1.current.position.x < 0.2) {
      movingPart1.current.scale.set(0.5 + (Math.random()/2+0.4),0.5 + (Math.random()/2+0.4),0.5 + (Math.random()/2+0.4))
      movingPart1.current.position.x = 0.7 - (Math.random()/3)
      return
    }
    movingPart1.current.position.x -= 0.009
    movingPart1.current.rotation.y += 0.03
  })

  return (<group position={[0,-0.1,0]}>
    <Box args={[0.04,0.15,0.04]} position={[0.6,-0.5,0]} castShadow receiveShadow>
      <meshStandardMaterial color={"#ccc"}/>
    </Box>
    <Box args={[0.04,0.15,0.04]} position={[0.7,-0.5,0]} castShadow receiveShadow>
      <meshStandardMaterial color={"#ccc"}/>
    </Box>
    <Box args={[0.04,0.15,0.04]} position={[0.8,-0.5,0]} castShadow receiveShadow>
      <meshStandardMaterial color={"#ccc"}/>
    </Box>
    <Box args={[0.4,0.1,0.1]} position={[0.15,-0.58,0]} castShadow receiveShadow>
      <meshStandardMaterial color={"#aaa"}/>
    </Box>
    <Torus args={[0.06, 0.01, 4, 4]} position={[0.35,-0.58,0]} castShadow receiveShadow rotation={[0,Math.PI/2,Math.PI/4*3]}>
      <meshStandardMaterial color={"#ddd"}/>
    </Torus>
    <Torus args={[0.06, 0.01, 4, 4]} position={[0.4,-0.58,0]} castShadow receiveShadow rotation={[0,Math.PI/2,Math.PI/4*3]}>
      <meshStandardMaterial color={"#bbb"}/>
    </Torus>
    <Torus args={[0.06, 0.01, 4, 4]} position={[0.45,-0.58,0]} castShadow receiveShadow rotation={[0,Math.PI/2,Math.PI/4*3]}>
      <meshStandardMaterial color={"#ddd"}/>
    </Torus>
    <Box args={[0.4,0.1,0.1]} position={[0.65,-0.58,0]} castShadow receiveShadow>
      <meshStandardMaterial color={"#aaa"}/>
    </Box>
    <Box args={[0.06,0.05,1.35]} position={[-0,-0.59,-0.38]} castShadow receiveShadow>
      <meshStandardMaterial color={"#999"}/>
    </Box>
    <Box args={[0.04,0.15,0.02]} position={[-0,-0.51,-1]} castShadow receiveShadow>
      <meshStandardMaterial color={"#bbb"}/>
    </Box>
    <Box args={[0.04,0.15,0.02]} position={[-0,-0.51,0.3]} castShadow receiveShadow>
      <meshStandardMaterial color={"#bbb"}/>
    </Box>
    <Box args={[0.03,0.02,0.03]} position={[0.35,-0.58,0]} castShadow receiveShadow ref={movingPart1}>
      <meshStandardMaterial color={"#fff"}/>
    </Box>
  </group>)
}

export default MovingBoxAndPipe