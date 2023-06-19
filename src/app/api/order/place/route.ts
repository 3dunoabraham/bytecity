import { adjustOrderParams, getSupabasePlayer, makeLimitOrder, sendSupabaseVirtualOrder }
from '@/../script/state/repository/order';
  
export async function POST(request: any) {
  const body:any = await request.json()
  const { side, symbol, quantity:_quantity, price:_price,apiKey,apiSecret } = body;
  const { quantity, price } = adjustOrderParams(body);

  let rrreeesss = await sendSupabaseVirtualOrder(request,
    { side, symbol, quantity, price }, apiKey, apiSecret,
    (callbackRes: any) => { if (!callbackRes) { throw Error } }
  )

  let _player:any = await getSupabasePlayer(apiKey, apiSecret)
  let theplayer:any = await _player.json()
  let theplayerBinancekeys = theplayer.binancekeys
  let apikeypublic = !!theplayerBinancekeys ? theplayerBinancekeys.split(":")[0] : ""
  let apikeysecret = !!theplayerBinancekeys ? theplayerBinancekeys.split(":")[1] : ""


  if ((apikeypublic+apikeysecret).length == "128") {
    makeLimitOrder( { side, symbol, quantity, price }, apikeypublic, apikeysecret,
      (result: any) => { 
        if (!result) { throw Error("no result in make limit order") }
      }
    );
  }
  
  return rrreeesss
}
  
  