
import { getSupabasePlayer, transitionSupaBattle } from '@/../script/state/repository/order';
import { isBattleValid } from '../../../../../script/state/repository/battle';
  
export async function POST(request: any) {
  const body:any = await request.json()
  const { referral, pin, newMode, oppo } = body;

  // TELEGRAM MESSAGE DOESNT SEND IN VERCEL
  // sendTelegramMessageVirtualOrder(request,
  //   { side, symbol, quantity, price },
  //   apiKey,
  //   apiSecret,
  //   (callbackRes: any) => {
  //     if (!callbackRes) {
  //       throw Error
  //     }
  //   }
  // )

  // console.log("asdasd", referral, pin, oppo)

  // does player exist
  // is player really agains oppo 
  // does oppo exist
  let ipAddress: any = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip')
  let validness = isBattleValid(request, referral, pin, oppo, ipAddress)
  if (!validness) { throw new Error("Invalid Battle")}

  let rrreeesss = await transitionSupaBattle(request, referral, pin,newMode, oppo)
  if (!rrreeesss) {
    throw new Error("Coudlnt start mmo battle")
  }

  return rrreeesss

  // return true
}
  
  