import { getSupabasePlayer, getSupabasePlayerByHash } from '@/../script/state/repository/order';
  
export async function POST(request: any) {
  const body:any = await request.json()
  const { hash } = body;
  
  let playerRes:any = await getSupabasePlayerByHash(hash)
  let playerResObj = await playerRes.json()

  return new Response(JSON.stringify(playerResObj))
}
  
  