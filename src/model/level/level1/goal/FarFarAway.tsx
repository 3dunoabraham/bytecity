import BitCrush from "@/model/npc/BitCrush/backup"
import The3DPong from "@/model/npc/Pong/3DPong"
import { Box } from "@react-three/drei"

export const FarFarAway = () => {
  return (
    <group>
      <group position={[0.5,-0.665,13]}>
        <group position={[-1.15,1.15,-0.7]} >
          <Box args={[1.2,2,.3]}>
            <meshStandardMaterial color={"#eeeeee"} />

          </Box>
        </group>
        <group position={[-1.15,1.5,-3.5]} scale={0.5}>
          <The3DPong />
        </group>
      </group>
      <Box position={[0.5,-0.665,13]} args={[5,1,2]} />
      <Box position={[5,-0.665,14]} args={[5,2.5,5]}>
        <meshStandardMaterial color={"#eeeeee"} />
      </Box>
    </group>

  )
}

export default FarFarAway