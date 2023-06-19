"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { FaDoorClosed } from "react-icons/fa";
import { useLocalStorage } from "usehooks-ts";


import { useAuth } from "@/../script/state/context/AuthContext";
import { AppContext } from "@/../script/state/context/AppContext";

const DisconnectPlayerForm = ({
}: { }) => {
  const app:any = useContext(AppContext)
  const { do:{ logout } }:any = useAuth()
  const [LS_rpi, s__LS_rpi] = useLocalStorage('rpi', "user:0000")
  const triggerLogout = async () => {
    app.alert("neutral","Signin out, clearing cookies...")
    let res = await logout()
    console.log("res",res)
    app.alert("neutral","Logged out, clearing local storage...")
    s__LS_rpi("user:0000")
    window.location.reload()
  }



  return (<>
    <div className="flex   mt-3">
      <button className='py-1 px-2 tx-lg flex-center gap-1 tx-white border-red-50-b opaci-chov--50  noborder bord-r-5 z-100'
        style={{background:"#33333399"}}
        onClick={triggerLogout}
      >
        <div className="tx-sm tx-ls-1">Disconnect </div>
        <div className="Q_xs_lg"><FaDoorClosed /></div>
      </button>
    </div>
  </>);
};

export default DisconnectPlayerForm;