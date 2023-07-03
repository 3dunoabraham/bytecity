import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { MeshStandardMaterial } from 'three';


import FontText from '@/model/core/FontText';

function Component({ }) {
  const $textGroup: any = useRef()
  useFrame((ctx, delta) => {
    if (!$textGroup.current) return
    $textGroup.current.position.y = Math.sin(Date.now() / 500) / 10 + 0.65
  })



  return (
    <group position={[-0.31, -0.535, -2.4]} scale={0.35}  >
      <group position={[0, 1.7, 0]}>
        <FontText position={[0.9, 0, 1.55]} fontSize={0.08} rotation={[-Math.PI / 2, 0, 0]}
          material={new MeshStandardMaterial({ side: 0, color: "#990099" })}>
          Call Cost: 0.001
        </FontText>
      </group>
    </group>
  )
}
export default Component