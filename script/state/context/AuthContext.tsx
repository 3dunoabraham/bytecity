"use client";
import { createContext, FC, useContext, useEffect, useMemo, useState } from "react";
import { useLocalStorage } from "usehooks-ts";


import UserService from "@/../script/state/service/User";
import { GRANTTREE } from "@/../script/constant";
import PlayerService from '@/../script/state/service/Player'

export const Auth = createContext<IAuthContext | null>(null);

const AuthProvider:FC<{
  session: { user: IUser; jwt: string; };  
  children: any;
}> = (props) => {
  const { session: session, children } = props;
  const [user, setUser] = useState<IUser | undefined>(session.user);
  const [userInfo, s__userInfo] = useState<IUser>(session.user)
  const [superuser, s__superuser] = useState()
  const [superoppo, s__superoppo] = useState()

  const [LH_rpi, s__LH_rpi]:any = useLocalStorage("rpi","user:0000")
  const [localuser, __localuser] = useState()


  const fetchOppoUserByHash = async (hash:any) => {
    let thePlayer = await PlayerService.getPlayerByHash(hash)
    s__superoppo(thePlayer)
    return thePlayer
  }

  const fetchUserByRPI = async (referral:any,pin:any) => {
    let thePlayer = await PlayerService.getPlayer(referral,pin)
    s__superuser(thePlayer)
    return thePlayer
  }
  const fetchSupaPlayer = () => {
    
    if (LH_rpi != "user:0000") {
        let creds = LH_rpi.split(":")
        let key = creds[0]
        let secret  = creds[1]
        fetchUserByRPI(key,secret)        
      }
  }
  const fetchSupaOppoUser = async () => {
    
    if (LH_rpi != "user:0000") {
        let creds = LH_rpi.split(":")
        let key = creds[0]
        let secret  = creds[1]
        let ownplayer = await fetchUserByRPI(key, secret)
        let oppoUser = await fetchOppoUserByHash(ownplayer.href)
        return oppoUser
      }
  }
  useEffect( () => {
    if (!LH_rpi || LH_rpi == "user:0000") return
    let [referral, pin] = LH_rpi.split(":")
    
    if (!pin) return
    if (!props.session.jwt) {
      s__LH_rpi("user:0000")
      window.location.reload()
    }
    fetchUserByRPI(referral,pin)
  }, []);
  useEffect( () => {
    if (!userInfo) return
    
    setUser(userInfo);
  }, [userInfo]);

  const demo = async () => {}

  const login = async (body: ILoginForm) => {
    try {
      const login = await UserService.login(body)
      if (!login) {
        return null
      }
      s__userInfo({
        referral:login.user.referral,
        apiname:login.user.apiname,
        rolname:login.user.rolname,
        name:login.user.full_name,
      })
      return login;
    } catch (error: any) {
      return error.response;
    }
  };
  const logout = async () => {
    try {
      const logout = await UserService.logout()
      if (!logout) { return null }
      
      return logout;
    } catch (error: any) { return error.response; }
  };
  const can = useMemo (() => {
    if (!userInfo) return null
    return GRANTTREE[userInfo.apiname || "sp"][userInfo.rolname || "root"]
  },[userInfo])

  return (
    <Auth.Provider value={{
      jwt: session.jwt,  user, 
      superuser, superoppo,
      do:{login, demo, logout, fetchSupaPlayer, fetchSupaOppoUser },
      can,

    }}>
      {children}
    </Auth.Provider>
  );
};

export const useAuth = () => useContext(Auth) as IAuthContext;

export default AuthProvider;

export interface ILoginForm {
  referral?: string;
  pin?: string;
}
export interface IUser {
  referral: string;
  apiname: string;
  rolname: string;
  name: string;
}

interface IAuthContext {
  jwt: string | undefined;
  user: IUser | undefined;
  superuser: any;
  superoppo: any;
  do:any;
  can:any;
}
