import { Box, Cylinder } from "@react-three/drei"

function Component ({}) {
    return (
        <group rotation={[0,Math.PI/5*4,0]} >
            
            <Box args={[1,1,1]} scale={0.7}  position={[0,-1,0]} >
                <meshStandardMaterial attach="material"  color={0xff3333} />
            </Box>
            
            <Cylinder args={[1, 3, 2, 5, 3]} receiveShadow castShadow position={[0,-2,0]}>
                <meshStandardMaterial attach="material"  color={0xffffff} metalness={0.8} roughness={0.2} />
            </Cylinder>
            
        </group>
    )    
}

export default Component