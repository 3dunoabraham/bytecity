"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { FaExternalLinkAlt, FaPause,FaStar, FaPauseCircle, FaRecycle, FaCity, FaArrowDown, FaBook, FaTwitter, FaUser } from "react-icons/fa";
import Image from 'next/image';
import Link from "next/link";
import DisconnectPlayerForm from "./DisconnectPlayerForm";

function DevelopmentProfile ({foundUser, foundJWT}:any) {
    const [asd, s__asd] = useState("")

    const setFullscreen = () => {
        document.documentElement.requestFullscreen();
        
      }

      

      const [isFullscreen, setIsFullscreen] = useState(false);
    return (<>

        {asd == "landing" && <>
            <div className="w-100 z-1001 h-min-100vh  75 bg-glass-10 pos-fixed flex-col flex-justify-start top-0"
                style={{background:"radial-gradient(#34AEFB77, #000000)"}}
                // style={{background:"linear-gradient(185deg, #34AEFB77, #8FD5F4 80%, #34AEFB 100%)"}}
            >
                
                <div onClick={()=>{setFullscreen()}} className="opaci-chov--50">

                    <div className="tx-lg tx-bold-5 bg-white tx-white py-1 px-4 bord-r-50 mt-2  tx-lgx tx-shadow-5"
                        style={{color:"#00ff00"}}>
                            Set FullScreen
                    </div>
                </div>
                <div className="pt-100 pb-8 "></div>
               <Link className="flex-col pos-abs   opaci-chov--50  mt-8 pt-7" 
                 href="https://webpov.vercel.app/"
                 style={{transform:"translateX(15%)"}}
                >
                    <div style={{color:"white", 
                    textShadow:"1px 1px 0 orangered, 2px 2px 0 orangered "
                }} className=" tx-bold-8  opaci-75 tx-   translate-y-50 tx-ls-1 pr-8 flex flex-align-start gap-2"
                    
                    >
                        Dashboard
                    </div>
                    <div className="pr-100" style={{ width: "10px", height: "10px", transformStyle: "preserve-3d", transform:"rotateX(15deg) rotateY(20deg)", margin: "25px" }}>
                        <div className="tx-bold-8 tx-white x flex-col" style={{ width: "50px", height: "50px", background: "#ff6d00", border: "2px solid white", position: "absolute", opacity: 0.75, transform: "translateZ(25px)" }}>
                            Byte
                            City
                        </div>
                        <div className="tx-white flex-col" style={{ width: "50px", height: "50px", background: "#ff6d00", border: "2px solid white", position: "absolute", opacity: 0.75, transform: "translateZ(-25px) rotateY(180deg)" }}>
                            Web
                        </div>
                        <div className="tx-bold-8 g pl-2 tx-sm tx-white flex-col" style={{ width: "50px", height: "50px", background: "#ff6d00", border: "2px solid white", position: "absolute", opacity: 0.75, transform: "translateX(-25px) rotateY(-90deg)" }}>
                            Web
                            Gamed
                        </div>
                        <div className="tx-white g flex-col" style={{ width: "50px", height: "50px", background: "#ff6d00", border: "2px solid white", position: "absolute", opacity: 0.75, transform: "translateX(25px) rotateY(90deg)" }}>
                            beW
                            demaG
                        </div>
                        <div className="tx-white flex-col" style={{ width: "50px", height: "50px", background: "#ff6d00", border: "2px solid white", position: "absolute", opacity: 0.75, transform: "translateY(-25px) rotateX(90deg)" }}>
                            as above {/*  Top */}
                        </div>
                        <div className="tx-white flex-col" style={{ width: "50px", height: "50px", background: "#ff6d00", border: "2px solid white", position: "absolute", opacity: 0.75, transform: "translateY(25px) rotateX(-90deg)" }}>
                            so below {/*  Bottom */}
                        </div>
                    </div>
                </Link>
                  
          <div className='pos-abs top-0 right-0'>
              <DisconnectPlayerForm />
            </div>
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
                {/* <div className=" tx-shadow-5 tx-white pb-2 translate-y--50">
                    Links
                </div> */}
                <div className="pb-8 px-8 Q_xs_px-2 tx-white flex-col flex-align-end ">
                    <div className="flex-wrap gap-1 ">

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
                        <a href="https://twitter.com/gta_btc" target="_blank"
                            style={{color:"#cc44cc"}}
                            className=" opaci-chov--50 flex-col px-2 Q_xs_px-1 bg-w-90 bord-r-10 py-3"
                        >
                            <div className="tx-lgx"><FaStar /></div>
                                <div className="tx-xs tx-center Q_xs">webpov</div>
                            <div className="tx-sm tx-center Q_sm_x">webpov <br />  .vercel. <br />
                            <b className="tx-mdl">app</b></div>
                            
                        </a>
                        <a href="https://webpov.vercel.app/?user=" 
                            style={{color:"#ff8800"}}
                            className=" opaci-chov--50 flex-col px-2 Q_xs_px-1 bg-w-90 bord-r-10 py-3"
                            >
                            <div className="tx-lgx"><FaUser /></div>
                                <div className="tx-xs tx-center Q_xs">user</div>
                            <div className="tx-sm tx-center Q_sm_x">webpov <br />  .vercel.app <br />
                            <b className="tx-mdl">?user=...</b></div>

                            </a>
                        </div>
                      
                    <details className="">
                        <summary className="pt-6 pb-2 opaci-chov--50 ">
                            <button className="noclick tx-lg tx-shadow-5  tx-bold-8 tx-white">Controls</button>
                        </summary>
                        <div className="tx-shadow-5 flex-col box-shadow-5-b left-50p translate-x--50 bord-r-50  pos-abs w-80 bg-b-5 noverflow  w-max-600px" >
                            <div className="flex-1 flex-col w-100 gap-2 box-shadow-i-2-t pa-8  flex-align-stretch ">
                                <div className="flex-center gap-3 ">
                                    <div className="gap-1 flex-col">
                                        ←
                                        🖱️
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

          

                    

                </div>
            </div>
        </>}
        {asd !== "landing" && <>
            <div className='Q_sm_x pos-abs top-0  z-999  w-100 tx-center   tx-white '
            >
            </div>

            
            {/* <div className=' right-0 pos-abs bottom-0 mb-100 translate-y-100 z-999  tx-center   tx-white '
            >
                <details className="pos-rel tx-black">
                    <summary className="opaci-chov--75">

                    <button className="pos-rel noclick tx-white py-1 my-1 px-2 tx-lgx opaci-chov--75 bg-black "
                style={{boxShadow:"inset 0 0 0 2px #ff9900",transform:"scale(0.9)"}}
            >
                Quests
            </button>
                    </summary>
                    <div className="pos- -y--100 px-2 bg-white py-1 bord-r-5 mx-1">
                        <div>
                            <p>{`1. Demo -> Live`}</p>
                            <p>{`2. Buy -> Wait`}</p>
                            <p>{`3. Wait -> Profit`}</p>
                            <p>{`4. Sell -> Repeat`}</p>
                        </div>
                    </div>
                </details>
            </div> */}
            <div className="pos-abs bottom-0 mb-4 right-0">

            <button className=" mb-100 right-0  tx-white py-1 ma-1 px-4 opaci-chov--75 bord-r-25 tx-lg tx-altfont-4 flex-col"
                onClick={()=>{s__asd("landing")}}
                style={{boxShadow:"inset 0 -5px 10px 5px rgb(91, 61, 18), 0 5px 5px #00000077", border: "0 solid transparent", 
                    background:"linear-gradient(180deg, rgb(147,85,6), rgb(111, 81, 38))"}}
            >
                MENU
            </button>

            </div>
            {/* <div className=' right-0 pos-abs top-0  z-999  tx-center   tx-white '
            >
            <button className="pos-rel tx-white py-1 my-1 px-2 tx-lgx opaci-chov--75 bg-black "
                onClick={()=>{s__asd("landing")}}
                style={{boxShadow:"inset 0 0 0 2px #ff9900",transform:"scale(0.9) rotate(-2deg)"}}
            >
                MENU
            </button>
            </div> */}
        </>}
    </>)
}

export default DevelopmentProfile