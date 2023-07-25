import { useContext, useMemo, useState } from "react"
import ConnectPlayerToggle from "../level/level2/core/ConnectPlayerToggle"
import { useLocalStorage } from "usehooks-ts"
import { AppContext } from "../../../script/state/context/AppContext"
import { useAuth } from "../../../script/state/context/AuthContext"
import BlockchainWalletToggle from "../level/level2/core/BlockchainWalletToggle"
import ResetLocalStorage from "../level/level2/core/ResetLocalStorage"

export function SceneSessionNucleus({included=["local","database","blockchain"],state={eraName:"unnamedEra"}}:{state:any,included?:string[]}) {
  const [LS_tokensArrayObj, s__LS_tokensArrayObj] = useLocalStorage(state.eraName+'TokensArrayObj', "{}")
  const [_tutoStage, s__LS_tutoStage] = useLocalStorage(state.eraName+'TutorialStage', "{}")

  const tutoStage:any = useMemo(()=> JSON.parse(_tutoStage) , [_tutoStage])
  const { user, superuser, do:{login, logout, fetchSupaPlayer, demo,},  jwt }:any = useAuth()
  const app: any = useContext(AppContext)
  const [LS_rpi, s__LS_rpi] = useLocalStorage('rpi', "user:0000")



  const isDefaultUser = useMemo(()=>{
    const splitKey = LS_rpi.split(":")
    if (splitKey[0] == "user" && splitKey[1] == "0000") { return true }
    return false
  },[LS_rpi])



  const setTutoStage = (lvl: any) => s__LS_tutoStage(JSON.stringify({ ...tutoStage, lvl }))
  const triggerLogin = async () => {    
    let rpiPrompt:any =  prompt("Enter your WebCity Credentials! \n\n < Referral Email : Secret PIN >","") 
    if (!rpiPrompt) return
    if (rpiPrompt.split(":").length < 2) return app.alert("error", "Invalid credentials!")   
    app.alert("success", "Validating credentials...")
    try {
      let playerCredentials = { referral:rpiPrompt.split(":")[0], pin:rpiPrompt.split(":")[1] }
      let playerRes = await login(playerCredentials)
      if (!playerRes) return 
      let playerObj = playerRes.user
      app.alert("success", "Player signed in, refreshing game!")   
      completeLogin(rpiPrompt, playerObj)
    } catch (e:any) {
      app.alert("error", "Invalid credentials!")   
    }
  }
  const completeLogin = async (rpiPrompt:string, playerRes:any) => { 
    s__LS_rpi(rpiPrompt)
    if (playerRes.goodAttempts > 0) { setTutoStage(4) }
    window.location.reload()
  }
  const triggerLogout = () => {
    if (prompt("Sign out from: <"+LS_rpi.split(":")[0]+":****> (yes/no) \n (yes/no)","yes") !== "yes") return    
    app.alert("neutral", "Deleting local storage and user data...")   
    quitAll()
  }
  const quitAll = async () => {
    s__LS_rpi("user:0000");
    s__LS_tutoStage("{}");
    s__LS_tokensArrayObj("{}");
    await logout()
    app.alert("success", "Player signed out, refreshing game!")   
    window.location.reload()
  }
  const triggerResetLocalStorage = () => {
    if (prompt("Reset local storage (yes/no)","yes") !== "yes") return
    
    s__LS_rpi("user:0000");
    s__LS_tutoStage("{}");
    s__LS_tokensArrayObj("{}");
    window.location.reload()
  }


  
  return (<>
    {included.includes("database") &&
      <ConnectPlayerToggle calls={{triggerLogin, triggerLogout,}}
        state={{isDefaultUser, }} 
      />
    }

    {/* {included.includes("blockchain") &&
      <BlockchainWalletToggle calls={{}} state={{isDefaultUser, included }}  />
    } */}

    {included.includes("local") && true &&
      <ResetLocalStorage calls={{triggerResetLocalStorage}} state={{ isDefaultUser }} />
    }
  </>)
}

export default SceneSessionNucleus