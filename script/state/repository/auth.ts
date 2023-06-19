const api_name:any = process.env.AUTH_API_NAME
let api_url = process.env.AUTH_API_URL 
const port = process.env.PORT || 3000;
api_url = api_url+":"+port+"/api/supa"

export const USERCOOKIENAME = "user"
export const JWTNAME = "session"
const EXT_ROUTES:any = {
  "ims": { 
    login: "/login/", logout: "/auth/logout/",
  },
  "supa": { 
    login: "/login/", logout: "/logout/",
  },
  "sp": { 
    login: "/auth/login/", logout: "/auth/logout/",
  },
}
const ROUTES = EXT_ROUTES[api_name]


export async function fetchLogin (credentials:{referral:string,pin:string}) {
  try {
    const reqRes = await fetch(api_url+ROUTES.login,{
      method:"POST",
      headers:{"Content-Type":"application/json",},
      body: JSON.stringify({
        email: credentials.referral,
        password: credentials.pin,
      })
    })
    if (reqRes.status >= 400) { return null }
    let reqResObj = await reqRes.json()
    let jwt = null
    switch (api_name) {
      case "ims": jwt = reqResObj.access_token; break;
      case "supa": jwt = reqResObj.jwt; break;
      case "sup": jwt = reqResObj.data.jwt; break;
    }
    return jwt 
  } catch (e:any) {
    return null
  }
}

export async function fetchLogout (jwt:string) {
  try {
    const reqRes = await fetch(api_url+ROUTES.logout,{
      method:"DELETE", headers: {
        "Content-Type":"application/json",
        Authorization: 'Bearer ' + jwt,
      },
    })
    return await reqRes.json()
  } catch (e:any) {
    return null
  }
}

export async function fetchUser (jwt:string) {
  try {
    
    const reqRes = await fetch(api_url+"/auth/verify",{
      headers: {
        "Content-Type":"application/json",
        Authorization: 'Bearer ' + jwt,
      },
    })
    let resData = (await reqRes.clone().json()).data
    return resData

  } catch (e:any) {
    return null
  }
}