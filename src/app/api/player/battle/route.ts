
import { getSupabasePlayer, sendSupabaseStartBattle } from '@/../script/state/repository/order';
  
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
  

  let rrreeesss = await sendSupabaseStartBattle(request, referral, pin,newMode, oppo)
  if (!rrreeesss) {
    throw new Error("Coudlnt start mmo battle")
  }

  return rrreeesss

  // return true
}
  
  