import { NextRequest } from "next/server"


import { JWTNAME, fetchLogout } from '@/../script/state/repository/auth';
import { getJWTCookie } from "@/../script/state/repository/session";

export async function DELETE(request: NextRequest) {
  const jwtObj:any = getJWTCookie()
  if (!jwtObj) throw new Error() 
  
  const reqRes:any = await fetchLogout(jwtObj)
  // if (!reqRes && !reqRes.data) { throw new Error()}

  return new Response(JSON.stringify(reqRes), {
    headers: { 'Set-Cookie': `${JWTNAME}=; Path=/; Secure; HttpOnly; SameSite=None; Max-Age=0` }
  });
}