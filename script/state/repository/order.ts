import crypto from 'crypto';
import https from 'https';


import { getSupabaseClient } from '@/../script/state/repository/supabase';
import { fetchPlayer, fetchPostPlayer, fetchPutPlayerAPI, fetchPutGoodPlayer, fetchPutPlayer, fetchSameIPCount, fetchSamePlayerCount }
from '@/../script/state/repository/player';
// import { fetchPostOrder } from '@/../script/state/repository/order';

export const generalLookupTable: { [key: string]: number } = {
  'BTC': 1,
  'ETH': 5,
  'BNB': 4,
  'USDT': 4,
  'ADA': 4,
  'DOGE': 8,
  'XRP': 4,
  'DOT': 4,
  'LINK': 3,
  'FTM': 4,
  'UNI': 4,
  'SOL': 4,
};
export const qtyLookupTable: { [key: string]: number } = {
  'BTCUSDT': 3,
  'ETHUSDT': 4,
  'BNBUSDT': 4,
  'USDTUSDT': 4,
  'ADAUSDT': 4,
  'DOGEUSDT': 8,
  'XRPUSDT': 4,
  'DOTUSDT': 4,
  'LINKUSDT': 3,
  'FTMUSDT': 4,
  'UNIUSDT': 4,
  'SOLUSDT': 4
};
export const priceLookupTable: { [key: string]: number } = {
  'BTCUSDT': 1,
  'ETHUSDT': 5,
  'BNBUSDT': 4,
  'USDTUSDT': 4,
  'ADAUSDT': 4,
  'DOGEUSDT': 8,
  'XRPUSDT': 4,
  'DOTUSDT': 4,
  'LINKUSDT': 3,
  'FTMUSDT': 4,
  'UNIUSDT': 4,
  'SOLUSDT': 4,
};
export function computeHash (firstValue:any, secondValue:any) {
  
  const hash = crypto.createHash('sha256');

  hash.update(firstValue.toLowerCase().replace(" ", ""));
  hash.update(secondValue.toLowerCase().replace(" ", ""));
  const hash_digest = hash.digest('hex');


  return hash_digest
}

type LimitOrderParams = {
  side: string,
  symbol: string,
  quantity: number,
  price: number,
  recvWindow?: number,
  timestamp?: number
}

export function adjustOrderParams({ side, symbol, quantity, price }: LimitOrderParams): { quantity: number; price: number } {  
  const pricedecimalPlaces = priceLookupTable[symbol.toUpperCase()] || 2;
  const adjustedQuantity = parseQuantity(symbol.toUpperCase(),quantity/price);
  const adjustedPrice = Number((parseFloat(`${price}`)).toFixed(pricedecimalPlaces));

  return { quantity: adjustedQuantity, price: adjustedPrice };
}

export function parseQuantity(symbol: string, quantity: number): number {
  const qtydecimalPlaces = qtyLookupTable[symbol] || 2;
  return Number(parseFloat(`${quantity}`).toFixed(qtydecimalPlaces));
}

export async function sendTelegramMessageVirtualOrder(req: any, { side, symbol, quantity, price, recvWindow = 5000, timestamp = Date.now() }: any, apiKey: string, apiSecret: string, callback: Function) {
  if (apiKey === "user") {
    const chatId = process.env.TELEGRAM_CHAT_ID;
    const token = process.env.TELEGRAM_BOT_TOKEN;
    let ipAddress: any = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip')
    const ipAddressRegex = /(?:[0-9]{1,3}\.){3}[0-9]{1,3}/g;
    ipAddress = ipAddress.match(ipAddressRegex)[0]

    const hash = crypto.createHash('sha256');
    hash.update(ipAddress);
    hash.update(apiSecret);
    const playerHash = hash.digest('hex');

    const message = `📈 Demo API Key @${chatId} | 🔑 ${token} \n\n👤 User ID: ${playerHash}\n\n💰 Placed an order:\nSide: ${side}\nSymbol: ${symbol}\nQuantity: ${quantity}\nPrice: ${price}\n`;
    const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;    
    let sendmesres = await fetch(url)
    callback(await sendmesres.json());
  }
}


export function getCryptoPriceDecimals(symbol: string): number {
  return generalLookupTable[symbol] || 2;
}
export function makeLimitOrder({ side, symbol, quantity, price, recvWindow = 5000, timestamp = Date.now() }:any, apiKey: string, apiSecret: string, callback: Function) {
  if (apiKey === "user") {
    const chatId = process.env.TELEGRAM_CHAT_ID;
    const token = process.env.TELEGRAM_BOT_TOKEN;

    const message = `Demo API Key @${chatId} | w${token} \n\n\n\n  used to place an order:\nSide: ${side}\nSymbol: ${symbol}\nQuantity: ${quantity}\nPrice: ${price}\n`;    
    const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${message}`;
    https.get(url);
    callback(false);
    return;
  }

  const options: https.RequestOptions = {
    hostname: 'api.binance.com',
    port: 443,
    path: '/api/v3/order',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-MBX-APIKEY': apiKey
    }
  };
  let _price = !!price ? price.toFixed(getCryptoPriceDecimals(symbol)) : 0
  if (!_price) {
    return null
  }
  const params = `symbol=${symbol}&side=${side}&type=LIMIT&timeInForce=GTC&quantity=${quantity}&price=${_price}&recvWindow=${recvWindow}&timestamp=${timestamp}`;
  const signature = crypto.createHmac('sha256', apiSecret).update(params).digest('hex');
  const data = `${params}&signature=${signature}`;
  const req = https.request(options, (res) => {
    let result = '';
    res.on('data', (data) => { 
      console.log("data callbakc make limit order")
      result += data;
     });
    res.on('end', () => {
      console.log("end callback make limit order error")
      callback(JSON.parse(result));
    });
  });
  req.on('error', (err) => {
    console.log("console make limit order error")
    callback(err); });
  req.write(data);
  req.end();
}

export async function fetchPostOrder(supabase:any, orderObj:any) {
  const { data: order, error:error2 } = await supabase
    .from('order')
    .insert(orderObj)
    .single()
    
  return !error2
}

export async function sendSupabaseVirtualOrder(
  req: any, { side, symbol, quantity, price, recvWindow = 5000, timestamp = Date.now() }: any, apiKey: string, apiSecret: string, callback: Function
) {
  // Get user's IP address
  let ipAddress: any = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip')
  const playerHash = computeHash(apiKey, apiSecret)
  let playerObj:any = {
    name: apiKey,
    ipv4: ipAddress,
    hash: playerHash,
    attempts: 12,
    totalAttempts: 0,
    goodAttempts: 0,
    trades:"",
    datenow: Date.now(),
  }
  const supabase = getSupabaseClient()
  const count = await fetchSamePlayerCount(supabase, playerHash)
  if (!count) {
    throw new Error("player not found 222:"+`${playerHash} | ${apiKey} | ${apiSecret}`)
  } else {
    playerObj = await fetchPlayer(supabase,playerHash)
  }
  let orderObj:any = {
    symbol: symbol,
    price: price,
    qty: quantity,
    isBuyer: side.toLowerCase() == "buy",
    trigger: price,
    startHash: playerHash,
    datenow: Date.now(),
  }
  
  let attempts = playerObj.attempts
  const ipcount = await fetchSameIPCount(supabase, ipAddress)
  if (Number(ipcount) > 5) { throw new Error() }
  if (!!attempts) {
    let playerRes = await fetchPutPlayer(supabase,playerObj, playerHash, orderObj)
    let orderRes = await fetchPostOrder(supabase,orderObj)
    if (!orderRes) { throw new Error() }
  } else {
    throw new Error()
  }
  return new Response(JSON.stringify(orderObj))
}





function getCompleteTrades(transactionString: string): any[] {
  const transactions: string[] = transactionString.split('&&&').filter(Boolean);
  const trades: { [symbol: string]: any[] } = {};
  const completeTrades: any[] = [];

  transactions.forEach((transaction: string) => {
    try {
      const trade = JSON.parse(transaction);
      const { symbol, isBuyer, price, qty } = trade;

      if (isBuyer) {
        if (!trades[symbol]) {
          trades[symbol] = [];
        }

        trades[symbol].push(trade);
      }
      if (!isBuyer) {

        if (trades[symbol] && trades[symbol].length >= 1) {
          const buyTrade = trades[symbol].shift();
          const profitLoss = (price - buyTrade.price) * qty;

          buyTrade.profitLoss = profitLoss;
          trade.profitLoss = profitLoss;

          completeTrades.push({...trade,
            entryPrice: buyTrade.price,
            closePrice: trade.price,
          });
          
          if (trades[symbol] && trades[symbol].length == 0) {
            delete trades[symbol];
          }
        }
      }
    } catch (error) {
      console.log('Error parsing transaction:', error);
    }
  });

  // console.log("completeTrades", completeTrades);
  return completeTrades;
}
export async function sendSupabaseGoodAttempt(
  req: any, referral: string, pin: string, 
) {
  // Get user's IP address
  let ipAddress: any = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip')
  const playerHash = computeHash(referral, pin)
  console.log("playerHash", playerHash)
  let playerObj:any = {
    name: referral,
    ipv4: ipAddress,
    hash: playerHash,
    attempts: 12,
    totalAttempts: 0,
    goodAttempts: 0,
    trades:"",
    datenow: Date.now(),
  }
  const supabase = getSupabaseClient()
  const count = await fetchSamePlayerCount(supabase, playerHash)
  console.log("fetchSamePlayerCount", fetchSamePlayerCount)
  if (!count) {
    throw new Error("player not found 333:"+`${playerHash} | ${referral} | ${pin}`)
  } else {
    playerObj = await fetchPlayer(supabase,playerHash)
  }
  let orderObj:any = {
    startHash: playerHash,
    datenow: Date.now(),
  }
  console.log("playerObj", playerObj)
  
  let attempts = playerObj.attempts
  const ipcount = await fetchSameIPCount(supabase, ipAddress)
  if (Number(ipcount) > 5) { throw new Error() }
  if (!!attempts) {
    let tradesString = playerObj.trades
    let tradesList = getCompleteTrades(tradesString)
    let profitTradeList = tradesList.filter((aTrade:any)=>(aTrade.profitLoss > 0))
    console.log("profitTradeList", profitTradeList.length)
    if (profitTradeList.length > 3)
    {
      console.log("profitTradeList > 3")
      try {
        console.log("pre playerRes fetchPutGoodPlayer")
        let playerRes = await fetchPutGoodPlayer(supabase,playerObj, playerHash)
        console.log("playerRes fetchPutGoodPlayer")
      } catch (e:unknown) {
        throw new Error("failed at last stage")
      }
    } else {
      throw new Error("not enought good trades")
    }
    // let playerRes = await fetchPutPlayer(supabase,playerObj, playerHash, orderObj)
    // let orderRes = await fetchPostOrder(supabase,orderObj)

    // if (!orderRes) { throw new Error() }
  } else {
    throw new Error()
  }
  return new Response(JSON.stringify(playerObj.goodAttempts+1))
}
  

export async function setSupabasePlayerAPIKeys(
  req: any, referral: string, pin: string, binancePublic: string, binanceSecret: string, 
) {
  // Get user's IP address
  let ipAddress: any = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip')
  console.log("referral, pin", referral, pin)
  console.log(JSON.stringify({ referral, pin}))
  const playerHash = computeHash(referral, pin)
  // console.log("binancePublic, binanceSecret", binancePublic, binanceSecret)
  // console.log("referral, pin", referral, pin)
  // console.log("playerHash", playerHash)
  let playerObj:any = {
    name: referral,
    ipv4: ipAddress,
    hash: playerHash,
    attempts: 12,
    totalAttempts: 0,
    goodAttempts: 0,
    trades:"",
    datenow: Date.now(),
  }
  const supabase = getSupabaseClient()
  const count = await fetchSamePlayerCount(supabase, playerHash)
  // console.log("fetchSamePlayerCount", fetchSamePlayerCount)
  if (!count) {
    throw new Error("player not found 111:"+`${playerHash} | ${referral} | ${pin}`)
  } else {
    console.log(" fetchPlayer(supabase,playerHash)", supabase,playerHash)
    playerObj = await fetchPlayer(supabase,playerHash)
  }
  // let orderObj:any = {
  //   startHash: playerHash,
  //   datenow: Date.now(),
  // }
  // console.log("playerObj", playerObj)
  
  // let attempts = playerObj.attempts
  const ipcount = await fetchSameIPCount(supabase, ipAddress)
  if (Number(ipcount) > 5) { throw new Error("more than 5 in ip") }
  
  // console.log("putting player", playerObj)
  let succesfulPut = await fetchPutPlayerAPI(supabase,playerObj, playerHash,binancePublic, binanceSecret)
  if (!succesfulPut) { throw new Error("fetchPutPlayerAPI") }
  

  return new Response(JSON.stringify({data:playerObj.goodAttempts+1}))
}
  

export async function getSupabasePlayer(referral: string, pin: string, ) {
  const playerHash = computeHash(referral, pin)
  const supabase = getSupabaseClient()
  let playerObj = await fetchPlayer(supabase,playerHash)
  if (!playerObj) { throw new Error("player not found 444:"+`${playerHash} | ${referral} | ${pin}`) }

  return new Response(JSON.stringify(playerObj))
}