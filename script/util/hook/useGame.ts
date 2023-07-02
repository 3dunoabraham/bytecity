import { useState } from 'react'

export const useGame: any = (initialState={}) => {
  const [state, s__state] = useState<any>(initialState)

  return [ state, s__state ]
}
