"use client";
import { useMap } from 'usehooks-ts';
import { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


import { DEFAULT_ALERT_MAPARRAY, INSTITUTION } from "@/../script/constant";
import AuthProvider from '@/../script/state/context/AuthContext'
import { AppContext } from "@/../script/state/context/AppContext";
import AlertContainer from '@/dom/atom/common/AlertContainer';
import { InventoryProvider } from '@/../script/state/context/InventoryContext';
import AudioContainer from '@/dom/atom/common/AudioContainer';

function AppClientProvider({ session, children, }: { session: any, children: React.ReactElement }) {
  
  const searchParams:any = useSearchParams();
  const queryClient = new QueryClient()
  const [filters,s__filters] = useState({})
  const [alertMap,alertMap__do] = useMap<string,any>(DEFAULT_ALERT_MAPARRAY)
  const [sidebarLinks,s__sidebarLinks] = useState([])
  const [sidebarPages,s__sidebarPages] = useState([])
  const [_session,s__session] = useState([])
  const alertNotification = (category="neutral", msg="")=>{
  alertMap__do.setAll(DEFAULT_ALERT_MAPARRAY)
      setTimeout(()=>{alertMap__do.set(category, msg)},100)
  }
  let appValue:any = useMemo(()=>{
    return {
      institution: INSTITUTION,
      THEME: {
        primaryColor: "#3E5F58",
        textColorLight: "#ffffff"
      },
      online: searchParams.offline == undefined,
      query: searchParams,
      filters,s__filters,unfilter:(key:any)=>{
          let newObj:any = {...filters}
          delete newObj[key]
          s__filters(newObj)
      },
      sidebarLinks,s__sidebarLinks,
      sidebarPages,s__sidebarPages,
      session,s__session,
      alertMap,alertMap__do,
      alertReset:()=>{alertMap__do.setAll(DEFAULT_ALERT_MAPARRAY)},
      alert:(category:any, msg:any)=>{ alertNotification(category, msg) },
      audio:(category:any, msg:any)=>{ audioNotification(category, msg) }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[alertMap, filters, searchParams,sidebarLinks, sidebarPages])
  // useNavigationEvent( ()=>{ console.log("loaded page") }, () => ()=>{ console.log("navigated") });

  const audioNotification = (category = "neutral", src = "") => {
    const audio = new Audio(src);
    audio.play();
  };

  return (
    <AppContext.Provider value={appValue}>
      <AuthProvider {...{session}}>
        <QueryClientProvider client={queryClient}>
          <InventoryProvider>
            {children}        
            <div>

              <AlertContainer {...{ s__msg: (val:any)=>(alertMap__do.set("neutral", val)), msg:alertMap.get("neutral")}} />
              <AlertContainer {...{ s__msg: (val:any)=>(alertMap__do.set("success", val)), msg:alertMap.get("success")}}
                  badgeClass="ims-badge-success"
              />
              <AlertContainer {...{
                  s__msg: (val:any)=>(alertMap__do.set("warn", val)), msg:alertMap.get("warn")}}
                  badgeClass="ims-badge-secondary" 
              />
              <AlertContainer {...{
                  s__msg: (val:any)=>(alertMap__do.set("error", val)), msg:alertMap.get("error")}}
                  badgeClass="ims-badge-error" 
              />
              
              <AudioContainer
                {...{
                  s__src: (val: any) => audioNotification("neutral", val),
                  src: "./sound/aaa.wav" // Set the audio source here
                }}
              />
            </div>
          </InventoryProvider>
        </QueryClientProvider>
      </AuthProvider>
    </AppContext.Provider>
  )
}

export default AppClientProvider;


interface AudioContainerProps {
  s__src: (newSrc: string) => void;
  src: string;
}

// export function AudioContainer({ s__src, src }: AudioContainerProps) {
  // const audioRef = useRef<HTMLAudioElement>(null);

  // useEffect(() => {
  //   const audioElement:any = audioRef.current;

  //   const playAudio = () => {
  //     audioElement?.play();
  //   };

  //   const handleAudioSourceChange:any = (newSrc: string) => {
  //     audioElement?.pause();
  //     audioElement.src = newSrc;
  //     playAudio();
  //   };

  //   s__src(handleAudioSourceChange);

  //   return () => {
  //     audioElement?.pause();
  //     audioElement.src = '';
  //   };
  // }, [s__src]);

  // return <></>;
  // return <audio ref={audioRef} src={src} />;
// }
