import { getSupabasePlayer } from '@/../script/state/repository/order';
  
export async function POST(request: any) {
  const body:any = await request.json()
  const { referral, pin } = body;
  
  let playerRes:any = await getSupabasePlayer(referral, pin)
  let playerResObj = await playerRes.json()

  return new Response(JSON.stringify(playerResObj))
}
  
  