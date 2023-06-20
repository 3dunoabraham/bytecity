import { NextRequest } from "next/server"


import { JWTNAME } from '@/../script/state/repository/auth';
import { getSupabasePlayer } from "@/../script/state/repository/order";

export async function POST(request: NextRequest) {
  const { referral, pin } = await request.json()
  
  let playerRes:any = await getSupabasePlayer(referral, pin)
  let player:any = await playerRes.json()

  let jwt = player.jwt
  let bodyResponse = { jwt,
    user: {
      ...player,
      apiname: process.env.AUTH_API_NAME,
      rolname: "root",
    },
  }
  const fullRes:any = new Response(JSON.stringify(bodyResponse), {
    status: 200,
    headers: {
      'Set-Cookie': [
        `${JWTNAME}=${jwt}; Path=/; Secure; HttpOnly; SameSite=None; Max-Age=604800`, // 604800
      ].join('; ') // Convert array to string
    }
  });
  fullRes.headers.append(
    'Set-Cookie',
    `user=${JSON.stringify(bodyResponse.user)}; Path=/; Secure; HttpOnly; SameSite=None; Max-Age=604800` // 604800
  );
    return fullRes
  
}