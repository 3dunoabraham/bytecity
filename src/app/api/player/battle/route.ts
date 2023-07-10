
import { getSupabasePlayer, transitionSupaBattle } from '@/../script/state/repository/order';
import { isBattleValid } from '../../../../../script/state/repository/battle';
  
export async function POST(request: any) {
  const body:any = await request.json()
  const { referral, pin, newMode, oppo } = body;

  let ipAddress: any = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip')
  let validness = isBattleValid(request, referral, pin, oppo, ipAddress)
  if (!validness) { throw new Error("Invalid Battle")}

  let rrreeesss = await transitionSupaBattle(request, referral, pin,newMode, oppo)
  if (!rrreeesss) {
    throw new Error("Coudlnt start mmo battle")
  }

  return rrreeesss
}
  
  