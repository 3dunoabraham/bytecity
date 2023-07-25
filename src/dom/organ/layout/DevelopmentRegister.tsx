"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { FaExternalLinkAlt, FaPause, FaPauseCircle, FaRecycle, FaCity, FaArrowDown, FaBook, FaTwitter, FaUser, FaUserAlt, FaUserCircle, FaGoogle } from "react-icons/fa";
import Image from 'next/image';
import Link from "next/link";
// import { InjectedConnector } from 'wagmi/connectors/injected'
// import { ConnectButton } from "@rainbow-me/rainbowkit";
// import { useAccount, useConnect, useContractRead } from "wagmi";
// import {
//   CryptoDevsDAOABI,
//   WebDAOAddress,
//   CryptoDevsNFTABI,
//   BitsNFTAddress,
// } from "@/../script/constant/blockchain";
function Component({ }) {
  //   const { address, isConnected } = useAccount();
  // const [asd, s__asd] = useState("")
  //   const { connect } = useConnect({
  //     connector: new InjectedConnector(),
  //   })
  // const [asd, s__asd] = useState("")
  const [asd, s__asd] = useState("")

  const setFullscreen = () => {
    document.documentElement.requestFullscreen();

  }
  const nftBalanceOfUser: any = null

  //        // Fetch the CryptoDevs NFT balance of the user
  //   const nftBalanceOfUser = useContractRead({
  //     abi: CryptoDevsNFTABI,
  //     address: BitsNFTAddress,
  //     functionName: "balanceOf",
  //     args: [address],
  //   });

  return (<>

    {asd == "landing" && <>
      <div className="w-100 z-1001 h-min-100vh  75 bg-glass-10 pos-fixed flex-col flex-justify-start top-0 bg-b-90"
        style={{ background: "radial-gradient(#34AEFB77, #000000)" }}
      // style={{background:"linear-gradient(185deg, #34AEFB77, #8FD5F4 80%, #34AEFB 100%)"}}
      >


        <div onClick={() => { setFullscreen() }} className="opaci-chov--50">

          <div className="tx-lg tx-bold-6 box-shadow-i-5-b bg-white tx-white  px-2 bord-r-50 mt-2  tx-lg tx-shadow-5" style={{ color: "#00ff00" }}>
            <span className="Q_sm_x py-1">Full-Screen</span>
            <span className="Q_xs tx-sm pb-1 tx-ls-1 block tx-center">Full <br /> Screen</span>
          </div>
        </div>
        <div className="py-4 Q_sm_x"></div>


        <Link className="flex-col  mt-2 opaci-chov--50" href="https://webpov.vercel.app/">

          <div className="pr-100" style={{ width: "20px", height: "20px", transformStyle: "preserve-3d", transform: "rotateX(15deg) rotateY(20deg)", margin: "50px" }}>
            <div className="tx-bold-8 tx-white tx-lx flex-col" style={{ width: "100px", height: "100px", background: "#ff6d00", border: "2px solid white", position: "absolute", opacity: 0.75, transform: "translateZ(50px)" }}>
              Web
              City
            </div>
            <div className="tx-white flex-col" style={{ width: "100px", height: "100px", background: "#ff6d00", border: "2px solid white", position: "absolute", opacity: 0.75, transform: "translateZ(-50px) rotateY(180deg)" }}>
              VoPbeW {/*  Back */}
              <Image src="/webpov.png" alt="webpov" width={50} height={50} />
            </div>
            <div className="tx-bold-8 tx-lg pl-2 tx-white flex-col" style={{ width: "100px", height: "100px", background: "#ff6d00", border: "2px solid white", position: "absolute", opacity: 0.75, transform: "translateX(-50px) rotateY(-90deg)" }}>
              Web
              Gamed
            </div>
            <div className="tx-white tx-lg flex-col" style={{ width: "100px", height: "100px", background: "#ff6d00", border: "2px solid white", position: "absolute", opacity: 0.75, transform: "translateX(50px) rotateY(90deg)" }}>
              beW
              VoP
            </div>
            <div className="tx-white flex-col" style={{ width: "100px", height: "100px", background: "#ff6d00", border: "2px solid white", position: "absolute", opacity: 0.75, transform: "translateY(-50px) rotateX(90deg)" }}>
              as above {/*  Top */}
            </div>
            <div className="tx-white flex-col" style={{ width: "100px", height: "100px", background: "#ff6d00", border: "2px solid white", position: "absolute", opacity: 0.75, transform: "translateY(50px) rotateX(-90deg)" }}>
              so below {/*  Bottom */}
            </div>
          </div>
          <div style={{
            color: "white",
            // textShadow:"1px 1px 0 orangered, -1px -1px 0 orangered "
            textShadow: "1px 1px 0 orangered, 2px 2px 0 orangered "
          }} className="mt-8 tx-bold-8 pt-3 opaci-75 tx-lgx   tx-ls-3 hover-4 flex flex-align-start gap-2"

          >
            SIGN UP <small>↑</small>
          </div>
        </Link>

        <div className="py-8 px-8 Q_xs_px-2 tx-white flex-col flex-align-start ">

          <div className="flex-wrap gap-3">

            <a href="https://webpov.gitbook.io/webcity" target="_blank"
              style={{ color: "#004488" }}
              className=" opaci-chov--50 flex-col px-2 Q_xs_px-1 bg-w-90 bord-r-10 py-3"
            >
              <div className="tx-lgx"><FaBook /></div>
              <div className="tx-xs tx-center Q_xs">docs</div>
              <div className="tx-sm tx-center Q_sm_x">webpov <br /> .gitbook.io/ <br />
                <b className="tx-mdl">webcity</b></div>
            </a>
            <a href="https://x.com/gta_btc" target="_blank"
              style={{ color: "#004488" }}
              className=" opaci-chov--50 flex-col px-2 Q_xs_px-1 bg-w-90 bord-r-10 py-3"
            >
              <div className="tx-lgx"><FaTwitter /></div>
              <div className="tx-xs tx-center Q_xs">x</div>
              <div className="tx-sm tx-center Q_sm_x">x <br />  .com/ <br />
                <b className="tx-mdl">w3bcity</b></div>

            </a>
          </div>
          {/* {isConnected ? <>
                    Your Bits NFT Balance: {!nftBalanceOfUser.data ? "-" : nftBalanceOfUser.data.toString()}
                    
                </> : <>
                ConnectButton:
                    <ConnectButton />
                </>} */}

<div className="pos-abs top-0 left-0  "
                        
                        >
                            <div onClick={()=>{s__asd("")}}  className="pa-3 opaci-chov--75"> 
                                <div className="flex-center box-shadow-2-b pa-1 block bord-r-10" style={{background:"#ffffff"}}
                                    
                                >
                                    <Image src={"/webcity.png"} alt="webcity" width={32} height={32} />
                                    <small className="tx-black">Back</small>
                                </div>
                            </div>
                            
          <a href="/w" rel="noopener noreferrer" className='nodeco opaci-chov--50  z-800 pos-rel  flex-center ' title='Web Town'>
            <div className='pt- flex-col'>
              <div className="box-shadow-2-b pa-1 pb-0 block bord-r-10" style={{background:"#ffffff"}}>
                <Image src={"/webtown.png"} alt="webtown" width={32} height={32} />
              </div>
            </div>
          </a>
                        </div>
          <div className="pos-abs bottom-0 right-0 pa-3 opaci-chov--75"
            onClick={() => { s__asd("") }}
          >
            <div className="flex-center box-shadow-2-b pa-1 block bord-r-10" style={{ background: "#ffffff" }}

            >
              <Image src={"/webcity.png"} alt="webcity" width={32} height={32} />
              <small className="tx-black">Back</small>
            </div>
          </div>
        </div>
      </div>
    </>}
    {asd !== "landing" && <>
      <div className='pos-abs top-0 left-0 ml- translate-y--20 z-999  tx-center   tx-white '
        style={{ marginLeft: "62px" }}
      >

        <button className="pos-rel tx-white py-2 ma-1 px-4   flex-center nowrap opaci-chov--75 bord-r-25 tx-lg tx-altfont-4 flex-col"
          onClick={() => { s__asd("landing") }}
          style={{
            boxShadow: "inset 0 -5px 10px 5px rgb(91, 61, 18), 0 5px 5px #00000077", border: "0 solid transparent",
            background: "linear-gradient(180deg, rgb(255,140,6), rgb(200, 111, 0))", transform: "scale(0.9) rotate(-2deg)"
          }}
        >
          <small className="tx-sm ">Web City ALPHA</small>
          <span className="shake-2 tx-shadow-5">
            {"> Register"}
          </span>
        </button>
        {/*             
            <button className="pos-rel tx-white pb-1  px-4 tx-mdl opaci-chov--75 bg-black scale-hov-150"
                onClick={()=>{s__asd("landing")}}
                style={{boxShadow:"inset 0 0 0 2px #ff9900",transform:"scale(0.9) rotate(-2deg)"}}
            >
                <small>OPEN ALPHA</small> | Register
            </button> */}
      </div>
    </>}
  </>)
}

export default Component