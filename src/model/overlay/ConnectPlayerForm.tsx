"use client";
import { useEffect, useRef, useState, useContext } from "react";
import { useLocalStorage } from "usehooks-ts";


import { useAuth } from "@/../script/state/context/AuthContext";
import { useBools } from "@/../script/util/hook/useBools";
import { AppContext } from "@/../script/state/context/AppContext";

const ConnectPlayerForm = ({
}: {}) => {
  const app: any = useContext(AppContext)
  const $referral: any = useRef()
  const $pin: any = useRef()
  const [LS_rpi, s__LS_rpi] = useLocalStorage('rpi', "user:0000")
  const [_tutoStage, s__LS_tutoStage] = useLocalStorage('level2tutorialstage', "{}")
  const [loadings, t__loadings, s__loading]: any = useBools({ login: false })
  const [forms, s__forms]: any = useState({
    referral: "", pin: "", isForm: false,
  })
  const { do: { login } }: any = useAuth()
  const triggerLogin = async () => {
    let parsedForms = {
      referral: forms.referral.toLowerCase().replace(" ", ""),
      pin: forms.pin.replace(" ", ""),
    }
    if (!parsedForms.referral) return
    if (!parsedForms.pin) return 
    s__loading("login", true)

    let playerRes = await login(parsedForms)
    s__loading("login", false)
    if (!playerRes) {
      return app.alert("error", "Failed login. Try again")
    }
    s__LS_rpi(`${forms.referral}:${forms.pin}`);
    let theplayer = playerRes.user
    if (theplayer.goodAttempts > 0) { s__LS_tutoStage(JSON.stringify({ lvl: 4 })) }
    window.location.reload()
  }
  const triggerIsForm = async () => {
    s__forms({ ...forms, ...{ isForm: true } })
  }
  const triggerIsFormOff = async () => {
    s__forms({ ...forms, ...{ isForm: false } })
  }
  useEffect(() => {
    if (!$referral.current) return
    $referral.current.focus()
  }, [forms.isForm])
  const handleReferralKeyPress = (event: any) => {
    if (['Enter',].includes(event.key)) {
      if (!$pin.current) return
      $pin.current.focus()
    }
  }
  const handlePinKeyPress = (event: any) => {
    app.audio("neutral","./sound/click58.wav")
    if (['Enter'].includes(event.key)) {
      triggerLogin()
    }
  }


  
  return (<>
    <div className='flex-col '>
      {forms.isForm &&
        <div className='flex-col bord-r-10 flex-align-stretch gap-3 box-shadow-1-t pa-2 bord-r- mt-8 z-100 bg-white'>
          <input value={forms.referral} onChange={(e: any) => s__forms({ ...forms, ...{ referral: e.target.value } })}
            type="text" placeholder='Referral Email' ref={$referral}
            onKeyUp={handleReferralKeyPress}
            className='bord-r- noborder opaci-50 opaci-hov-75  py-1 px-2 tx-md  bg-trans '
          />
          <input value={forms.pin} onChange={(e: any) => s__forms({ ...forms, ...{ pin: e.target.value } })}
            type="password" placeholder='Secret PIN' ref={$pin}
            onKeyUp={handlePinKeyPress}
            className='bord-r- noborder opaci-50 opaci-hov-75  py-1 px-2 tx-md bg-trans'
          />
        </div>
      }
      {!!loadings.login && <> <div className="tx-ls-3 hover-2 pt-4 opaci-75">LOADING...</div> </>}
      {!loadings.login &&
        <div className="flex-center   z-500 mt-3 gap-1">
          {forms.isForm && 
            <div className="bg-white opaci-chov--50 px-2 bord-r-50 py-1"
            onClick={triggerIsFormOff}
            >
                Hide
            </div>
          }
          <button className='tx-mdl tx-white opaci-chov--75 h-80px w-80px  noborder bord-r-100p box-shadow-5-b z-100'
            style={{ background: "#00aa11" }}
            onClick={forms.isForm ? triggerLogin : triggerIsForm}
          >
            Connect
          </button>
        </div>
      }
    </div>
  </>);
};

export default ConnectPlayerForm;