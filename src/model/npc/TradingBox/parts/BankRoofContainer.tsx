import { useEffect, useMemo, useRef, useState } from "react";
import { BufferGeometry, DoubleSide, Mesh, MeshBasicMaterial, MeshStandardMaterial } from "three";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";

export default function Component({ position=[0,0,0], points=null,  length, width, wallWidth, roofWidth }:any) {
    const { viewport } = useThree();

    const roofShape = [
        [0, 0-(wallWidth/5)],[(width), 0-(wallWidth/5)],[(width+(roofWidth)), 0-(wallWidth/5)],[(width+(roofWidth)), 0.04],[(width), 0.04],
        [0,1.04],
        [-(width), 0.04],[-(width+(roofWidth)), 0.04],[-(width+(roofWidth)), 0-(wallWidth/5)],[-(width), 0-(wallWidth/5)],
    ];
    const shapePoints = useMemo(() => {
        let mult = 2
        return points ? points : roofShape.map(([x, y, z]) => [x * mult, y * mult, z * mult]);
    }, [points,width, wallWidth, roofShape]);
    const vertices = useMemo(() => shapePoints.map((point:any) => new THREE.Vector3(...point)), [shapePoints])
    const basic_material = new MeshBasicMaterial({ color: 0xffffff, side: DoubleSide,  });
    const material = new MeshStandardMaterial({ color: 0xffffff, side: DoubleSide, roughness: 0.5 });
    const meshRef:any = useRef<Mesh>();
    
    


    const shape = useMemo(() => {
        const shape = new THREE.Shape();
        shape.moveTo(shapePoints[0][0], shapePoints[0][1]);
        for (let i = 1; i < shapePoints.length; i++) {
        shape.lineTo(shapePoints[i][0], shapePoints[i][1]);
        }
        return shape;
    }, [shapePoints]);

    const geometry = useMemo(() => {
        const geometry:any = new BufferGeometry();
        geometry.computeBoundingBox();
        const center = geometry.boundingBox.getCenter(new THREE.Vector3());
        geometry.translate(-center.x, -center.y, 0);
        geometry.scale(viewport.width / 2, viewport.height / 2, 1);
        return geometry;
    }, [shape, viewport]);

    // var length = 14,
    //   width = 2,
    //   deg = 10
    const extrudeSettings = useMemo(()=>{
        return {
            curveSegments: 1,
            steps: 1,
            // length,
            depth: length,
            bevelEnabled: false
        }
    },[length])

    useEffect(()=>{
        if (!!position) {
            meshRef.current.position.set(position[0],position[1],position[2])
        }
        
        // meshRef.current.rotation.y = 1.68;
    },[position])
    // return <Truss1  />
    return (
    <mesh  castShadow receiveShadow
        ref={meshRef} // geometry={new THREE.BufferGeometry().setFromPoints(vertices)} material={basic_material}
    >
        <extrudeBufferGeometry attach="geometry" args={[shape, extrudeSettings]} />
        <meshStandardMaterial color="#afaaaa" side={DoubleSide} />

    </mesh>    
    )
};