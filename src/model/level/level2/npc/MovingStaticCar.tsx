import { Box } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef, useState } from "react"


export function MovingStaticCar ({}) {
    const [carSpeed, s__carSpeed] = useState(0.016)
    const [randomLimit, s__randomLimit] = useState(1)
    const movingPart1:any = useRef()
    const movingPart2:any = useRef()
    const [carColor, s__carColor]:any = useState("#675A5F")

    const carColorCycle = ["#675A5F","#5f6063",]

    useFrame(({state,delta}:any) => {
        if (!movingPart1.current) return
        if (movingPart1.current.position.x > 5 + randomLimit)
        {
            s__randomLimit(Math.random()*5)
            s__carSpeed(0.01 * (1+ (Math.random()/2+0.5)))
            let setofrandom = [0.3+1-Math.random()/1.5,0.5+Math.random()/2+0.5,1-Math.random()/2]
            // console.log("setofrandom", setofrandom)
            s__carColor(carColorCycle[Math.round(Math.random())])

            movingPart1.current.scale.set(...setofrandom)
            // movingPart1.current.scale.set(1 + (Math.random()/2+0.5)/2,1+ (Math.random()+0.5),0.3 + (Math.random()/3+0.3))
            movingPart1.current.position.x = 0 - (Math.random()+1.5)*2
            return
        }
        movingPart1.current.position.x += carSpeed
        // movingPart1.current.rotation.y += 0.02
        // movingPart1.current.rotation.z += 0.02
     })

    return (<>
        <group>
            {/* CAR */}
            <group ref={movingPart1} position={[-5,-0.44,-0.62]} >
                {/* WINDOW */}
                <Box args={[0.3,0.09,0.29]} position={[0.01,0.04,-0.]} castShadow receiveShadow
                    
                >
                    <meshStandardMaterial color={"#ddeeff"}/>
                </Box>
                {/* BODY */}
                <Box args={[0.3,0.1,0.3]} position={[0,0.04,-0.]} castShadow receiveShadow
                    
                    >
                        <meshStandardMaterial color={carColor}/>
                </Box>
                <Box args={[0.4,0.06,0.31]} position={[0,0.021,-0.]} castShadow receiveShadow
                    
                >
                    <meshStandardMaterial color={carColor}/>
                </Box>
                {/* WHEELS */}
                <Box args={[0.06,0.05,0.34]} position={[0.13,0.0,-0.]} castShadow receiveShadow
                    
                >
                    <meshStandardMaterial color={"#333"}/>
                </Box>
                <Box args={[0.06,0.05,0.34]} position={[-0.13,0.0,-0.]} castShadow receiveShadow
                    
                >
                    <meshStandardMaterial color={"#333"}/>
                </Box>
            </group>

            {/* ROAD */}
            {/* <Box args={[5,0.07,0.14]} position={[0.,-0.4,-0.295]} castShadow receiveShadow
            >
                <meshStandardMaterial color={"#777"}/>
            </Box> */}
        </group>
    </>)
}

export default MovingStaticCar