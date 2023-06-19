import { Box } from "@react-three/drei"


export function MainRoadEastWest ({}) {
    return (<>
        <group position={[-0.28,-0.51,0]}>
            {/* ROAD */}
            <Box args={[8,0.06,0.5]} position={[0.25,0.01,0]} 
                castShadow receiveShadow
            >
                <meshStandardMaterial color={"#8f8983"}/>
            </Box>

            {/* LINES */}
            <group position={[0,0.042,0]}>
                <Box args={[0.6,0.012,0.05]} position={[0,0,0]} 
                    castShadow receiveShadow
                >
                    <meshStandardMaterial color={"#797672"}/>
                </Box>
                <Box args={[0.5,0.012,0.05]} position={[1,0,0]} 
                    castShadow receiveShadow
                >
                    <meshStandardMaterial color={"#797672"}/>
                </Box>
                <Box args={[0.5,0.012,0.05]} position={[-1,0,0]} 
                    castShadow receiveShadow
                >
                    <meshStandardMaterial color={"#797672"}/>
                </Box>
                <Box args={[0.5,0.012,0.05]} position={[2,0,0]} 
                    castShadow receiveShadow
                >
                    <meshStandardMaterial color={"#797672"}/>
                </Box>
                <Box args={[0.5,0.012,0.05]} position={[-2,0,0]} 
                    castShadow receiveShadow
                >
                    <meshStandardMaterial color={"#797672"}/>
                </Box>
            </group>
        </group>
    </>)
}

export default MainRoadEastWest