const LOCAL_API_URL = "/api"

async function getPlayer (referral:any,pin:any) {
  try {
    const reqRes = await fetch(LOCAL_API_URL+"/player/verify",{
      headers:{"Content-Type":"application/json"},
      method:"POST",
      body: JSON.stringify({referral,pin}),
    })
    return await reqRes.json()
  } catch (e:any) {
    return e
  }
}


export default {
    getPlayer,
  }