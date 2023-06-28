import DynaText from "@/model/core/DynaText"
import IsConnectedBridge from "@/model/npc/DeBridge/IsConnectedBridge";
import { Cylinder } from "@react-three/drei"
import { useLayoutEffect, useMemo, useRef, useState } from "react"
import * as THREE from "three";
import { useAccount, useConnect, useContractRead } from "wagmi";
import { InjectedConnector } from 'wagmi/connectors/injected'
import { readContract, waitForTransaction, writeContract } from "wagmi/actions";
import {
  CryptoDevsDAOABI,
  WebDAOAddress,
  CryptoDevsNFTABI,
  BitsNFTAddress,
} from "@/../script/constant/blockchain";
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
  const [loading, s__loading] = useState(false)
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const triggerBlockchain = () => {
    // calls.triggerLogin()
    connect()
  }

  
       // Fetch the CryptoDevs NFT balance of the user
       const nftBalanceOfUser = useContractRead({
        abi: CryptoDevsNFTABI,
        address: BitsNFTAddress,
        functionName: "balanceOf",
        args: [address],
      });
  const buyNFT = async ()=>{
    console.log("before await mint()")
    await mint()
    console.log("after the mint")
  }
      
  async function mint() {
    if (loading) return
    s__loading(true);
    console.log("im here 999", loading)
    try {
      const tx = await writeContract({
        abi: CryptoDevsNFTABI,
        address: BitsNFTAddress,
        functionName: "mint",
        // args: [],
      });

      await waitForTransaction(tx);
      nftBalanceOfUser.refetch()
    } catch (error) {
      console.error(error);
      window.alert(error);
    }
    s__loading(false);
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
      <IsConnectedBridge state={{isConnected, address, nftBalanceOfUser}}
        calls={{buyNFT}}
       />
    }




  </>)



}
export default BlockchainWalletToggle
