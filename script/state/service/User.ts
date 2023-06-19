const LOCAL_API_URL = "/api/"

async function login (credentials:any) {
  try {
    const reqRes = await fetch(LOCAL_API_URL+"/login",{
      method:"POST", headers:{"Content-Type":"application/json"},
      body: JSON.stringify(credentials),
    })
    return await reqRes.json()
  } catch (e:any) {
    return null
  }
}

async function logout () {
  try {
    const reqRes = await fetch(LOCAL_API_URL+"/logout",{
      method:"DELETE", headers:{"Content-Type":"application/json"},
    })
    return await reqRes.json()
  } catch (e:any) {
    return null
  }
}

async function demo () {
  try {
    const reqRes = await fetch(LOCAL_API_URL+"/auth/demo",{
      method:"POST", headers:{"Content-Type":"application/json"},
      body: JSON.stringify({}),
    })
    return await reqRes.json()
  } catch (e:any) {
    return null
  }
}

export default {
  login,
  logout,
  demo,
}