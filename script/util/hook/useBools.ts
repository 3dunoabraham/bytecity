import { useState } from 'react'

export const useBools: any = (initialBools={}) => {
  const [bools, s__bools] = useState<any>(initialBools)

  const t__bools = (key:any) => {
    if (!(key in bools)) return s__bools({...bools,...{[key]:true}})
    s__bools({...bools,...{ [key]: !bools[key] }})
  }
  const s__bool = (key:any, value:any) => {
    if (!(key in bools)) return s__bools({...bools,...{[key]:true}})
    s__bools({...bools,...{ [key]: value }})
  }

  return [ bools, t__bools, s__bool, s__bools ]
}
