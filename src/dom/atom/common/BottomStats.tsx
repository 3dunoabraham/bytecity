"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { FaExternalLinkAlt, FaPause, FaPauseCircle, FaRecycle, FaCity, FaArrowDown, FaBook, FaTwitter, FaUser, FaStar, FaTicketAlt, FaIdBadge } from "react-icons/fa";
import Image from 'next/image';
import { useAuth } from "@/../script/state/context/AuthContext";

function Component ({}) {
    // const [asd, s__asd] = useState("")
      const { user, superuser, do:{login, logout, demo,},  jwt }:any = useAuth()

    // const [asd, s__asd] = useState("")
    const [asd, s__asd] = useState("")
    
    const setFullscreen = () => {
        document.documentElement.requestFullscreen();
        
      }
      const [isHidden, setIsHidden] = useState(true);
      const handleHide = () => {
        setIsHidden(!isHidden);
        };


    if (!superuser) return <></>
    return (<>
        

        <div className='pos-abs bottom-0 translate-y-100 z-999   tx-start   tx-white gap-1 flex-center flex-justify-start'
            >
            <button className="pos-rel tx-white py-1 my-1 px-4 tx-mdl opaci-chov--75 bg-black "
                onClick={handleHide}
                style={{boxShadow:"inset 0 0 0 1px #777777", border: "1px solid #5090f0"}}
            >
                {isHidden ? <>Show</> : <>Hide</>} <br /> Profile
            </button>
            {!isHidden && 
            <div className="flex-center">
            <button className="Q_sm_x  pos-rel tx-white py-1 my-1 px-2 tx-sm opaci-chov--75 bg-black "
                onClick={()=>{  }}
                style={{boxShadow:"inset 0 0 0 1px #777777"}}
            >
                {superuser.name.replace("@gmail.com","")}
            </button>
                {superuser.subscription && 
                    <button className="pos-rel tx-green py-1 my-1 px-4 Q_xs_px-1 tx-mdl opaci-chov--75 bg-black "
                        onClick={()=>{  }}
                        style={{boxShadow:"inset 0 0 0 1px #777777"}}
                    >
                        <FaCity />
                        {superuser.subscription}
                    </button>
                }
                <button className="pos-rel tx-white py-1 my-1 px-4 Q_xs_px-1 tx-mdl opaci-chov--75 bg-black nowrap"
                    onClick={()=>{  }} title="Stars"
                    style={{boxShadow:"inset 0 0 0 1px #777777", color:"gold", textShadow:"0 0 5px orangered"}}
                >
                        <FaStar />
                    {superuser.goodAttempts}
                </button>
                {superuser.attempts && 
                    <button className="pos-rel tx-white py-1 my-1 px-4 Q_xs_px-1 tx-mdl opaci-chov--75 bg-black flex gap-1"
                        onClick={()=>{  }}
                        style={{boxShadow:"inset 0 0 0 1px #777777", color:"lightblue", textShadow:"0 0 5px blue"}}
                    >
                        <FaTicketAlt style={{color:"#019AFF"}} />
                        {superuser.attempts}
                    </button>
                }
                {!superuser.subscription && 
                    <button className="pos-rel tx-white py-1 my-1 px-4 Q_xs_px-1 tx-mdl opaci-chov--75 bg-black bord-r-r-25"
                        onClick={()=>{ prompt("Do you wish to subscribe? (paid subscription) \n\n Gumroad, Patreon or Ethereum ")

                         }}
                        style={{boxShadow:"inset 0 0 0 1px #777777", color:"#00ff00", textShadow:"0 0 5px green"}}
                    >
                        +SUB!
                    </button>
                }
                {/* <button className="pos-rel tx-white py-1 my-1 px-4 tx-mdl opaci-chov--75 bg-black "
                    onClick={()=>{  }}
                    style={{boxShadow:"inset 0 0 0 1px #777777"}}
                >
                    {Object.keys(superuser).join(",")}
                </button> */}
            </div>
}
            </div>
    </>)
}

export default Component