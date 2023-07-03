import { useEffect, useMemo, useRef } from "react";
import { DoubleSide, Mesh } from "three";
import * as THREE from "three";

export default function Component({ position=[0,0,0], points=null,  length, width, color }:any) {
    const outerTop = 0.6
    const innerTop = outerTop*0.9
    const shoulderHeight = 0.35
    const handHeight = 0.35
    const outerWidth = 0.25
    const innerWidth = 0.15

    const humanShape = [
        [-outerWidth,shoulderHeight], //left shoulder
        [-innerWidth/1.5,shoulderHeight], //left shoulder
        [-innerWidth/1.5,innerTop], // top
        // [0,outerTop], // top
        [innerWidth/1.5,innerTop], // top
        [innerWidth/1.5,shoulderHeight], //right shoulder
        [outerWidth,shoulderHeight], //right shoulder
        [outerWidth,0], //right hand
        [innerWidth,0], //right hand

        [innerWidth,-0.51], //foot
        [0.05,-0.51], //foot
        // [0, 0], // center
        [-0.05,-0.51], //foot
        [-innerWidth,-0.51], //foot

        [-innerWidth,0], // left hand
        [-outerWidth,0], // left hand
    ];

    const shapePoints = useMemo(() => {
        let mult = 2
        return points ? points : humanShape.map(([x, y, z]) => [x * mult, y * mult, z * mult]);
    }, [points,width, humanShape]);
    const meshRef:any = useRef<Mesh>();
    const shape = useMemo(() => {
        const shape = new THREE.Shape();
        shape.moveTo(shapePoints[0][0], shapePoints[0][1]);
        for (let i = 1; i < shapePoints.length; i++) {
            shape.lineTo(shapePoints[i][0], shapePoints[i][1]);
        }
        return shape;
    }, [shapePoints]);
    const extrudeSettings = useMemo(()=>{
        return { curveSegments: 1, steps: 1, depth: length, bevelEnabled: false }
    },[length])
    useEffect(()=>{
        if (!!position) { meshRef.current.position.set(position[0],position[1],position[2]) }
    },[position])
    return (
    <mesh  castShadow receiveShadow ref={meshRef} >
        <extrudeBufferGeometry attach="geometry" args={[shape, extrudeSettings]} />
        <meshStandardMaterial color={color} side={DoubleSide} />
    </mesh>    
    )
};