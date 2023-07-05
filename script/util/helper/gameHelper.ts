
export const pov_isDefaultUser = (rpi:string) => {  
  if (!rpi) return true
  const splitKey = rpi.split(":")
  if (splitKey.length < 2) return true
  if (splitKey[0] == "user" && splitKey[1] == "0000") { return true }
  return false
}

export const getPointsFromChange = (clickedPrice:any, queryUSDTData:any)=>{
  return (
    Math.round(
      parseFloat(
        (
          (((clickedPrice / queryUSDTData) - 1) * -100)-0.005
        ).toFixed(3)
      )*1000
    )
  )
}