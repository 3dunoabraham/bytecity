import { Box, Cylinder } from "@react-three/drei"
import { useAuth } from "@/../script/state/context/AuthContext"


function Component ({calls, state}:any) {
  const { user, do:{login, demo}, jwt }:any = useAuth()


  return (<>
    {state.hasAnyToken &&
      <group position={[0,0,-1.5]}>
        <Cylinder args={[0.25,0.25,0.75,6]} position={[0,-0.32,0]} castShadow receiveShadow 
        >
          <meshStandardMaterial color={"#ccc"}/>
        </Cylinder>
      </group>
    }
    {state.hasAnyToken && <>
      <group position={[-0.15,-0.55,-1.5]}>
          {state.profitHistory.slice(0,5).map((anOrder:any, index:any)=>{
            return (
              <Box args={[0.07,0.11,0.07]} position={[index*0.075,0.6,0]}  castShadow receiveShadow key={index}>
                <meshStandardMaterial color={anOrder[1] != "profit" ? "#f00" : "#ccc"}/>
              </Box>
            )
          })}
          {state.profitHistory.slice(0,5).map((anOrder:any, index:any)=>{
            return (
              <Box args={[0.065,0.1,0.18]} position={[index*0.075,0.6,0]}  castShadow receiveShadow key={index}>
                <meshStandardMaterial color={anOrder[1] != "profit"  ? "#aaaaaa" : "#33aa33"}
                />
              </Box>
            )
          })}
          {[0,1,2,3,4].map((anOrder:any, index:any)=>{
            return (
              <Box args={[0.065,0.1,0.18]} position={[index*0.075,0.6,0]}  castShadow receiveShadow key={index}>
                <meshStandardMaterial color={"#339933"}
                  transparent={true} opacity={0.33}
                />
              </Box>
            )
          })}
        </group>
      </>}
    </>
  )
}

export default Component