import { useRef } from "react"

function Component ({}) {
    let $lightSetup:any = useRef()

    return (
        <group ref={$lightSetup}>
            <ambientLight intensity={0.5} />
            <pointLight intensity={1.5} position={[0, 4, 0]} castShadow  />
        </group>
    )    
}

export default Component