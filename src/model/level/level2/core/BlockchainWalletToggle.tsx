import DynaText from "@/model/core/DynaText"
import IsConnectedBridge from "@/model/npc/DeBridge/IsConnectedBridge";
import { Cylinder } from "@react-three/drei"
import { useLayoutEffect, useMemo, useRef } from "react"
import * as THREE from "three";
import { useAccount, useConnect, useEnsName } from "wagmi";
import { InjectedConnector } from 'wagmi/connectors/injected'

export function BoxBlendGeometry({ width = 1, height = 1, radius = 0.2, depth = 1 }) {
  const geometry: any = useRef()
  const shape = useMemo(() => {
    const s = new THREE.Shape()
    s.moveTo(-width / 2, -height / 2 + radius)
    s.lineTo(-width / 2, height / 2 - radius)
    s.absarc(-width / 2 + radius, height / 2 - radius, radius, 1 * Math.PI, 0.5 * Math.PI, true)
    s.lineTo(width / 2 - radius, height / 2)
    s.absarc(width / 2 - radius, height / 2 - radius, radius, 0.5 * Math.PI, 0 * Math.PI, true)
    s.lineTo(width / 2, -height / 2 + radius)
    s.absarc(width / 2 - radius, -height / 2 + radius, radius, 2 * Math.PI, 1.5 * Math.PI, true)
    s.lineTo(-width / 2 + radius, -height / 2)
    s.absarc(-width / 2 + radius, -height / 2 + radius, radius, 1.5 * Math.PI, 1 * Math.PI, true)
    return new THREE.Shape(s.getPoints(10))
  }, [width, height, radius, depth])
  const config = useMemo(() => ({ depth, bevelEnabled: false }), [depth])
  useLayoutEffect(() => {
    geometry.current.translate(0, 0, -depth / 2)
    geometry.current.computeVertexNormals()
  }, [shape])
  return <extrudeGeometry ref={geometry} args={[shape, config]} />
}

function BlockchainWalletToggle({ calls, state }: any) {
  const { address, isConnected } = useAccount()
  const { data: ensName } = useEnsName({ address })
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const triggerBlockchain = () => {
    // calls.triggerLogin()
    connect()
  }

  return (<>
    {/* CONNECT BUTTON */}

    <mesh rotation={[Math.PI / 2, 0, 0]} scale={[0.3, 0.3, 0.2]} position={[0, -1, -0.75]}
      castShadow receiveShadow
      onClick={() => { triggerBlockchain() }}
    >
      <BoxBlendGeometry radius={0.2} />
      <meshStandardMaterial color={isConnected ? "#faf" : "#eee"} />

    </mesh>


    <DynaText text={!isConnected ? "Connect" : "Connected"} color={"#ff00ff"} font={0.055}
      position={[0, -0.89, -0.75]}
    />
    {isConnected &&
      <IsConnectedBridge />
    }




  </>)



}
export default BlockchainWalletToggle