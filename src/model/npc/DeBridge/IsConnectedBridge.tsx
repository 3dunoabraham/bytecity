import DynaText from "@/model/core/DynaText"
import { Box } from "@react-three/drei"

export function IsConnectedBridge({state,calls}:any) {
  

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


      {/* SECOND PART | to the outside */}
      <Box args={[3.2,0.08,0.1]} position={[-2.,0.39,0]} rotation={[0,0,-0.18]}>
        <meshStandardMaterial color={"#ccc"} />
      </Box>
      <Box args={[2,0.6,2.5]} position={[-4.5,0.65,0]}>
        <meshStandardMaterial color={"#ccc"} />
      </Box>

      {!!state.nftBalanceOfUser && !!state.nftBalanceOfUser.data &&
      <DynaText text={state.nftBalanceOfUser.data.toString()+" bit"+(state.nftBalanceOfUser.data.toString() == "1" ? "" : "s")} color={"#ff00ff"} font={0.16}
        position={[-0.825, -0.05, 0.1]} rotation={[0,-Math.PI/2,0]}
      />
    }
    {!!state.nftBalanceOfUser && !state.nftBalanceOfUser.data &&
    <group onClick={calls.buyNFT}>
    
    <DynaText text={"Verify"} color={"#ff00ff"} font={0.06}
        position={[-0.855, -0.05, 0.1]} rotation={[0,-Math.PI/2,0]}
      />
    <Box args={[0.1,0.2,0.2]} position={[-0.8,-0.05,0.1]}>
    <meshStandardMaterial color={"#fbf"} />
  </Box>
  </group>
  }
    </group>
  )
}

export default IsConnectedBridge