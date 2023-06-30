
export const pov_isDefaultUser = (rpi:string) => {  
  if (!rpi) return true
  const splitKey = rpi.split(":")
  if (splitKey.length < 2) return true
  if (splitKey[0] == "user" && splitKey[1] == "0000") { return true }
  return false
}