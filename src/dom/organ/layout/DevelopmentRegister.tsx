"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { FaExternalLinkAlt, FaPause, FaPauseCircle, FaRecycle, FaCity, FaArrowDown, FaBook, FaTwitter, FaUser, FaUserAlt, FaUserCircle, FaGoogle } from "react-icons/fa";
import Image from 'next/image';
import Link from "next/link";

function Component ({}) {
    // const [asd, s__asd] = useState("")

    // const [asd, s__asd] = useState("")
    const [asd, s__asd] = useState("")
    
    const setFullscreen = () => {
        document.documentElement.requestFullscreen();
        
      }

      
    return (<>
        
        {asd == "landing" && <>
            <div className="w-100 z-1001 h-min-100vh  75 bg-glass-5 pos-fixed flex-col flex-justify-start top-0 bg-b-90"
                style={{background:"radial-gradient(#34AEFB77, #000000)"}}
                // style={{background:"linear-gradient(185deg, #34AEFB77, #8FD5F4 80%, #34AEFB 100%)"}}
            >
                

                <div onClick={()=>{setFullscreen()}} className="opaci-chov--50">

                    <div className="tx-lg tx-bold-6 box-shadow-i-5-b bg-white tx-white  px-2 bord-r-50 mt-2  tx-lg tx-shadow-5" style={{color:"#00ff00"}}>
                        <span className="Q_sm_x py-1">Full-Screen</span>
                        <span className="Q_xs tx-sm pb-1 tx-ls-1 block tx-center">Full <br /> Screen</span>
                    </div>
                </div>
                <div className="py-4 Q_sm_x"></div>


               <Link  className="flex-col  mt-2 opaci-chov--50"  href="https://webpov.vercel.app/">
                    
                    <div className="pr-100" style={{ width: "20px", height: "20px", transformStyle: "preserve-3d", transform:"rotateX(15deg) rotateY(20deg)", margin: "50px" }}>
                        <div className="tx-bold-8 tx-white tx-lx flex-col" style={{ width: "100px", height: "100px", background: "#ff6d00", border: "2px solid white", position: "absolute", opacity: 0.75, transform: "translateZ(50px)" }}>
                            Byte
                            City
                        </div>
                        <div className="tx-white flex-col" style={{ width: "100px", height: "100px", background: "#ff6d00", border: "2px solid white", position: "absolute", opacity: 0.75, transform: "translateZ(-50px) rotateY(180deg)" }}>
                            demaGbeW {/*  Back */}
                            <Image src="/webpov.png" alt="webpov" width={50} height={50} />
                        </div>
                        <div className="tx-bold-8 tx-lg pl-2 tx-white flex-col" style={{ width: "100px", height: "100px", background: "#ff6d00", border: "2px solid white", position: "absolute", opacity: 0.75, transform: "translateX(-50px) rotateY(-90deg)" }}>
                            Web
                            Gamed
                        </div>
                        <div className="tx-white tx-lg flex-col" style={{ width: "100px", height: "100px", background: "#ff6d00", border: "2px solid white", position: "absolute", opacity: 0.75, transform: "translateX(50px) rotateY(90deg)" }}>
                            beW
                            demaG
                        </div>
                        <div className="tx-white flex-col" style={{ width: "100px", height: "100px", background: "#ff6d00", border: "2px solid white", position: "absolute", opacity: 0.75, transform: "translateY(-50px) rotateX(90deg)" }}>
                            as above {/*  Top */}
                        </div>
                        <div className="tx-white flex-col" style={{ width: "100px", height: "100px", background: "#ff6d00", border: "2px solid white", position: "absolute", opacity: 0.75, transform: "translateY(50px) rotateX(-90deg)" }}>
                            so below {/*  Bottom */}
                        </div>
                    </div>
                    <div style={{color:"white", 
                    // textShadow:"1px 1px 0 orangered, -1px -1px 0 orangered "
                    textShadow:"1px 1px 0 orangered, 2px 2px 0 orangered "
                }} className="mt-8 tx-bold-8 pt-3 opaci-75 tx-lgx   tx-ls-3 hover-4 flex flex-align-start gap-2"
                    
                    >
                        SIGN UP <small>↑</small>
                    </div>
                </Link>

                <div className="py-8 px-8 Q_xs_px-2 tx-white flex-col flex-align-start ">
                    
                <div className="flex-wrap gap-3">

                <a href="https://webpov.gitbook.io/bytecity" target="_blank"
                                style={{color:"#004488"}}
                                className=" opaci-chov--50 flex-col px-2 Q_xs_px-1 bg-w-90 bord-r-10 py-3"
                            >
                                <div className="tx-lgx"><FaBook /></div>
                                <div className="tx-xs tx-center Q_xs">docs</div>
                                <div className="tx-sm tx-center Q_sm_x">webpov <br /> .gitbook.io/ <br />
                                <b className="tx-mdl">bytecity</b></div>
                            </a>
                        <a href="https://twitter.com/gta_btc" target="_blank"
                            style={{color:"#004488"}}
                            className=" opaci-chov--50 flex-col px-2 Q_xs_px-1 bg-w-90 bord-r-10 py-3"
                        >
                            <div className="tx-lgx"><FaTwitter /></div>
                                <div className="tx-xs tx-center Q_xs">twitter</div>
                            <div className="tx-sm tx-center Q_sm_x">twitter <br />  .com/ <br />
                            <b className="tx-mdl">bytecty</b></div>
                            
                        </a>
                </div>
                    <details className="Q_md_x">
                        <summary className="pt-6 pb-2 opaci-chov--50 ">
                            <button className="noclick tx-black">Controls</button>
                        </summary>
                        <div className=" tx-shadow-5 flex-col box-shadow-5-b left-50p translate-x--50 bord-r-50  pos-abs w-80 bg-b-5 noverflow  w-max-600px" >
                            <div className="flex-1 flex-col w-100 gap-2 box-shadow-i-2-t pa-8  flex-align-stretch bg-b-90">
                                <div className="flex-center gap-3 ">
                                    <div className="gap-1 flex-col">
                                        ←
                                        🖱️
                                        {/* <div className="gap-1 flex">
                                            <div className="px-2 py-2 _ddr"></div>
                                            <div className="px-2 py-2 bg-white"></div>
                                        </div>
                                        <div className="px-4 py-4 bg-white"></div> */}
                                    </div>
                                    <div className="flex-col"><span className="tx-red">Left</span> Click Drag</div>
                                    <div className="flex-1 w-min-50px opaci-75 border-red my-1"></div>
                                    <div className="tx-red tx-lg">Move</div>
                                </div>
                                <div className="flex-center gap-3 ">
                                    <div className=""><span className="tx-green">Right</span> Click Drag</div>
                                    <div className="flex-1 w-min-50px opaci-75 border-green my-1"></div>
                                    <div className="tx-right"><span className="tx-green">Rotate</span> Camera</div>
                                </div>
                                <div className="flex-center gap-3 ">
                                    <div className=""><span className="tx-blue">Scroll</span> In/Out</div>
                                    <div className="flex-1 w-min-50px opaci-75 border-blue my-1"></div>
                                    <div className="tx-right"><span className="tx-blue">Zoom</span> In/Out</div>
                                </div>
                            </div>
                        </div>
                    </details>
                    
                    {/* <div onClick={()=>{s__asd("")}} className="opaci-chov--50 bg-w-50 tx-center bord-r-l-100  noverflow pos-abs bottom-0 mb-8 box-shadow-2-b right-0 flex-col-stretch">
                        <div className="pt-4 pb-2 px-8  tx-shadow-5 box-shadow-5-b tx-lx flex-center gap-2 bg-white ">
                            <div style={{color:"black "}} className="tx-roman">Back</div>
                            <div className="box-shadow-5-b  py-0 pa-1 block bord-r-10" style={{background:"#ffffff"}}>
                                <Image src={"/bytecity.png"} alt="bytecity" width={50} height={50} />
                            </div>
                        </div>
                        <div className=" tx-white mt-1   tx-shadow-5 pb-3 px-8 tx-lg bg-white" style={{color:"orange "}}>
                            <span className="block pos-abs hover-4 ">
                                Resume Game
                            </span>
                        </div>
                    </div> */}
                    <div className="pos-abs top-0 left-0 pa-3 opaci-chov--75"
                        onClick={()=>{s__asd("")}} 
                    >
                        <div className="flex-center box-shadow-2-b pa-1 block bord-r-10" style={{background:"#ffffff"}}
                            
                        >
                            <Image src={"/bytecity.png"} alt="bytecity" width={32} height={32} />
                            <small className="tx-black">Back</small>
                        </div>
                    </div>
                    <div className="pos-abs bottom-0 right-0 pa-3 opaci-chov--75"
                        onClick={()=>{s__asd("")}} 
                    >
                        <div className="flex-center box-shadow-2-b pa-1 block bord-r-10" style={{background:"#ffffff"}}
                            
                        >
                            <Image src={"/bytecity.png"} alt="bytecity" width={32} height={32} />
                            <small className="tx-black">Back</small>
                        </div>
                    </div>
                </div>
            </div>
        </>}
        {asd !== "landing" && <>
            <div className='pos-abs top-0 left-0 ml- translate-y--20 z-999  tx-center   tx-white '
                style={{marginLeft:"62px"}}
            >
                
<button className="pos-rel tx-white py-2 ma-1 px-4   flex-center nowrap opaci-chov--75 bord-r-25 tx-lg tx-altfont-4 flex-col"
                onClick={()=>{s__asd("landing")}}
                style={{boxShadow:"inset 0 -5px 10px 5px rgb(91, 61, 18), 0 5px 5px #00000077", border: "0 solid transparent", 
                    background:"linear-gradient(180deg, rgb(255,140,6), rgb(200, 111, 0))",transform:"scale(0.9) rotate(-2deg)"
                }}
            >
                <small className="tx-sm ">Byte City ALPHA</small>
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