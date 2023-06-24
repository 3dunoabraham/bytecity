import { Box } from "@react-three/drei"
import { useAuth } from "../../../../script/state/context/AuthContext"
import DynaText from "@/model/core/DynaText"
import { useQueryPlus } from "../../../../script/util/hook/useHooksHelper"
import { AppContext } from "@/../script/state/context/AppContext";
import { useState, useContext, useEffect, useMemo } from "react"

export function LiveGame ({state, calls}:any) {
  const { user, superuser, superoppo, do:{login, logout, demo, fetchSupaPlayer},  jwt }:any = useAuth()




  return (
    <group>
    </group>
  )
}

export default LiveGame