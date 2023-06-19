
import { getSupabasePlayer, sendSupabaseGoodAttempt } from '@/../script/state/repository/order';
  
export async function POST(request: any) {
  const body:any = await request.json()
  const { referral, pin } = body;

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
  

  let rrreeesss = await sendSupabaseGoodAttempt(request, referral, pin,)
  if (!rrreeesss) {
    throw new Error("Coudlnt update good attempts")
  }

  return rrreeesss
}
  
  