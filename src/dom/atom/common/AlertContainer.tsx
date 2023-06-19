import { useEffect } from "react"
import { useState } from "react"
import { useTimeout } from "usehooks-ts"


function Component({
    msg,
    delay = 4000,
    s__msg,
    badgeClass="ims-badge-faded",
}: any) {
    useEffect(()=>{
        if (msg == "") return
        
    },[msg])
    const onHide = ()=>{
        s__msg("")
    }

    if (msg != "") {
        return <AlertNotification s__msg={s__msg} delay={delay} onHide={onHide} alertMsg={msg} badgeClass={badgeClass} />
    }
    return <></>
}

export function AlertNotification ({
    onHide=()=>{}, delay=4000, badgeClass="ims-badge-faded", alertMsg="",s__msg,
}: any) {
    const [visible, setVisible] = useState(true)

    const hide = ()=>{
        s__msg("")
        setVisible(false)
        onHide()
    }

    useTimeout(hide, delay)
    
    if (alertMsg == "") return <></>
    return (
        <div className={
                `${visible ? "appear-once-4 " : ""} appear-hiding pos-fixed top-0 left-50p mt-3 z-999 translate-x--50`
            }
        >
            <div className={` ${badgeClass} px-3 py-2`}>
                {alertMsg}
            </div>
        </div>
    )
}

export default Component