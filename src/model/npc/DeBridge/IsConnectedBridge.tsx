import { Box } from "@react-three/drei"

export function IsConnectedBridge({}) {
  

  return (
    <group position={[-0.5,-1,-0.75]}>
      <Box args={[1,0.1,0.1]}>
        <meshStandardMaterial color={"#ccc"} />
      </Box>
      <Box args={[0.4,0.4,0.5]} position={[-0.6,-0.05,0.1]}>
        <meshStandardMaterial color={"#ccc"} />
      </Box>
      <Box args={[0.04,0.35,0.45]} position={[-0.8,-0.05,0.1]}>
        <meshStandardMaterial color={"#333"} />
      </Box>



    </group>
  )
}

export default IsConnectedBridge