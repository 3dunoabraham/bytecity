
export function ExclamationMark ({}) {
  return (<>
  <mesh castShadow receiveShadow scale={3}
          position={[  - 0.42,  - 0,  - 0.42 ]}
        >
          <boxGeometry args={[0.02, 0.1, 0.02]} />
          <meshStandardMaterial color={"red"} />
        </mesh>
        <mesh castShadow receiveShadow scale={3}
          position={[  - 0.42,  - 0.28,  - 0.42]}
        >
          <boxGeometry args={[0.02, 0.03, 0.02]} />
          <meshStandardMaterial color={"red"} />
        </mesh>
  </>

  )
}

export default ExclamationMark