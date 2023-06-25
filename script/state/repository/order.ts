import crypto from 'crypto';
import https from 'https';


import { getSupabaseClient } from '@/../script/state/repository/supabase';
import { fetchPlayer, fetchPostPlayer, fetchPutPlayerBattleMode, fetchPutPlayerAPI, fetchPutGoodPlayer, fetchPutPlayer, fetchSameIPCount, fetchSamePlayerCount, GetMinsSince, fetchPlayerSimple, fetchPutEloBattle, getEloWTLObj }
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
export function computeHash(firstValue: any, secondValue: any) {

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
  const adjustedQuantity = parseQuantity(symbol.toUpperCase(), quantity / price);
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
export function makeLimitOrder({ side, symbol, quantity, price, recvWindow = 5000, timestamp = Date.now() }: any, apiKey: string, apiSecret: string, callback: Function) {
  if (apiKey === "user") {
    const chatId = process.env.TELEGRAM_CHAT_ID;
    const token = process.env.TELEGRAM_BOT_TOKEN;

    // const message = `Demo API Key @${chatId} | w${token} \n\n\n\n  used to place an order:\nSide: ${side}\nSymbol: ${symbol}\nQuantity: ${quantity}\nPrice: ${price}\n`;    
    // const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${message}`;
    // https.get(url);
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
    callback(err);
  });
  req.write(data);
  req.end();
}

export async function fetchPostOrder(supabase: any, orderObj: any) {
  const { data: order, error: error2 } = await supabase
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
  let playerObj: any = {
    name: apiKey,
    ipv4: ipAddress,
    hash: playerHash,
    attempts: 12,
    totalAttempts: 0,
    goodAttempts: 0,
    trades: "",
    datenow: Date.now(),
  }
  const supabase = getSupabaseClient()
  const count = await fetchSamePlayerCount(supabase, playerHash)
  if (!count) {
    throw new Error("player not found 222:" + `${playerHash} | ${apiKey} | ${apiSecret}`)
  } else {
    playerObj = await fetchPlayer(supabase, playerHash)
  }
  let orderObj: any = {
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
    let playerRes = await fetchPutPlayer(supabase, playerObj, playerHash, orderObj)
    let orderRes = await fetchPostOrder(supabase, orderObj)
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

          completeTrades.push({
            ...trade,
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
  let playerObj: any = {
    name: referral,
    ipv4: ipAddress,
    hash: playerHash,
    attempts: 12,
    totalAttempts: 0,
    goodAttempts: 0,
    trades: "",
    datenow: Date.now(),
  }
  const supabase = getSupabaseClient()
  const count = await fetchSamePlayerCount(supabase, playerHash)
  console.log("fetchSamePlayerCount", fetchSamePlayerCount)
  if (!count) {
    throw new Error("player not found 333:" + `${playerHash} | ${referral} | ${pin}`)
  } else {
    playerObj = await fetchPlayer(supabase, playerHash)
  }
  let orderObj: any = {
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
    let profitTradeList = tradesList.filter((aTrade: any) => (aTrade.profitLoss > 0))
    console.log("profitTradeList", profitTradeList.length)
    if (profitTradeList.length > 3) {
      console.log("profitTradeList > 3")
      try {
        console.log("pre playerRes fetchPutGoodPlayer")
        let playerRes = await fetchPutGoodPlayer(supabase, playerObj, playerHash)
        console.log("playerRes fetchPutGoodPlayer")
      } catch (e: unknown) {
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
  return new Response(JSON.stringify(playerObj.goodAttempts + 1))
}


export async function setSupabasePlayerAPIKeys(
  req: any, referral: string, pin: string, binancePublic: string, binanceSecret: string,
) {
  // Get user's IP address
  let ipAddress: any = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip')
  console.log("referral, pin", referral, pin)
  console.log(JSON.stringify({ referral, pin }))
  const playerHash = computeHash(referral, pin)
  // console.log("binancePublic, binanceSecret", binancePublic, binanceSecret)
  // console.log("referral, pin", referral, pin)
  // console.log("playerHash", playerHash)
  let playerObj: any = {
    name: referral,
    ipv4: ipAddress,
    hash: playerHash,
    attempts: 12,
    totalAttempts: 0,
    goodAttempts: 0,
    trades: "",
    datenow: Date.now(),
  }
  const supabase = getSupabaseClient()
  const count = await fetchSamePlayerCount(supabase, playerHash)
  // console.log("fetchSamePlayerCount", fetchSamePlayerCount)
  if (!count) {
    throw new Error("player not found 111:" + `${playerHash} | ${referral} | ${pin}`)
  } else {
    console.log(" fetchPlayer(supabase,playerHash)", supabase, playerHash)
    playerObj = await fetchPlayer(supabase, playerHash)
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
  let succesfulPut = await fetchPutPlayerAPI(supabase, playerObj, playerHash, binancePublic, binanceSecret)
  if (!succesfulPut) { throw new Error("fetchPutPlayerAPI") }


  return new Response(JSON.stringify({ data: playerObj.goodAttempts + 1 }))
}


export async function getSupabasePlayerByHash(hash: string,) {
  const userHash = hash
  const supabase = getSupabaseClient()
  let playerObj = await fetchPlayerSimple(supabase, userHash)
  if (!playerObj) { throw new Error("player not found 444:" + `${userHash} `) }

  return new Response(JSON.stringify(playerObj))
}


export async function getSupabasePlayer(referral: string, pin: string,) {
  const playerHash = computeHash(referral, pin)
  const supabase = getSupabaseClient()
  let playerObj = await fetchPlayer(supabase, playerHash)
  if (!playerObj) { throw new Error("player not found 444:" + `${playerHash} | ${referral} | ${pin}`) }

  return new Response(JSON.stringify(playerObj))
}


export async function transitionSupaBattle(
  req: any, referral: string, pin: string, newMode: number, oppo: string,
) {
  
  console.log("000000 \n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n")
  console.log("000000 \n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n")
  let ipAddress: any = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip')
  const playerHash = computeHash(referral, pin)
  let playerObj: any = null
  const supabase = getSupabaseClient()
  playerObj = await fetchPlayer(supabase, playerHash)
  let oppo_userObj = await fetchPlayer(supabase, oppo)
  let sentunix: any = null

  if (newMode == 0) {
    let kLineArray: any = await getLast3minCandles("PEPE")
    let lastKLineUnix: any = parseInt(kLineArray[499][0])
    // oppo already in game
    if (oppo_userObj.mode >= 0) {
      // oppo in game with me (accept match)
      if (oppo_userObj.href == playerHash) {
        let minsSinceSaved = GetMinsSince(parseInt(`${oppo_userObj.src}`))
        console.log("sentunix = oppo_userObj.src")
        sentunix = oppo_userObj.src
        console.log(sentunix, oppo_userObj.src)
        console.log("minsSinceSaved, GetMinsSince(lastKLineUnix)", GetMinsSince(lastKLineUnix), minsSinceSaved, GetMinsSince(lastKLineUnix) - minsSinceSaved)
        if (GetMinsSince(lastKLineUnix) - minsSinceSaved < 3) {
          throw new Error("request not ready yet")
        }
        if (GetMinsSince(lastKLineUnix) - minsSinceSaved > 3) {
          throw new Error("request too late")
        }
      } else {
        throw new Error("oppo user already in game")
      }
    } else {
      if (playerObj.mode >= 0) { throw new Error("own player already in game") }
      sentunix = lastKLineUnix
    }

    
  console.log("333", "prewait")
  let succesfulPut = await fetchPutPlayerBattleMode(supabase,playerObj, playerHash,newMode,oppo,sentunix)
  console.log("369369", "wait")
  if (!succesfulPut) { throw new Error("fetchPutPlayerBattleMode") }
  console.log("999999999999999999999", "at last")

  return new Response(JSON.stringify({data:playerObj.mode}))


  }






















  if (newMode == 1) {
    let thesrc = oppo_userObj.src || playerObj.src
    let kLineArray: any = await getLast3minCandles("PEPE")
    let lastKLineUnix: any = parseInt(kLineArray[0][0])
    console.log("5 | lastKLineUnix", lastKLineUnix)
    if (oppo_userObj.mode > 0) {
      throw new Error("oppo user already bought, please wait")

    } else if (oppo_userObj.mode < 0) {
      throw new Error("oppo user note in game")
    } else {
      // oppo mode is 0
      let minsSince = GetMinsSince(parseInt(`${thesrc}`))
      if (GetMinsSince(lastKLineUnix) - minsSince > 5) {
        throw new Error("action too late")
      }
      // continue without errors
    }

    
  console.log("333", "prewait")
  let succesfulPut = await fetchPutPlayerBattleMode(supabase,playerObj, playerHash,newMode,oppo,sentunix)
  console.log("369369", "wait")
  if (!succesfulPut) { throw new Error("fetchPutPlayerBattleMode") }
  console.log("999999999999999999999", "at last")

  return new Response(JSON.stringify({data:playerObj.mode}))


  }




















  let oppoAttacked = oppo_userObj.mode
  let playerAttacked = playerObj.mode
  let someoneBought = oppoAttacked > 0 || playerAttacked > 0
  let playerID = ""
  let playerSend = ""
  let oppoID = ""
  let oppoSend = ""
  console.log("6 | {oppoAttacked,playerAttacked,someoneBought}")
  console.table({ oppoAttacked, playerAttacked, someoneBought })

  if (newMode == -1) {
    let kLineArray: any = await getLast3minCandles("PEPE")
    let correctContextCandles: any = await getLast3minCandles("PEPE", playerObj.src)
    let restLength = correctContextCandles.length
    console.log("7 | playerObj.name,  oppo_userObj.mode < 0", playerObj.name, oppo_userObj.mode)
    let lastKLineUnix: any = parseInt(kLineArray[499][0])

    let startPriceAfterMatch: any = parseFloat(kLineArray[1][3])
    let closePriceAfterMatch: any = parseFloat(kLineArray[1][4])

    let minsSinceSaved = GetMinsSince(parseInt(`${playerObj.src}`))
    console.log("8 | playerObj.src, GetMinsSince(lastKLineUnix), minsSinceSaved", playerObj.src, GetMinsSince(lastKLineUnix), minsSinceSaved)
    console.log("9 | GetMinsSince(lastKLineUnix) - minsSinceSaved", GetMinsSince(lastKLineUnix) - minsSinceSaved)
    // oppo user not in game
    if (oppo_userObj.mode < 0) {
      // oppo user is my opponent hash
      console.log("10 | kokokokokokoko")
      if (playerObj.href == oppo) {
        
        if (GetMinsSince(lastKLineUnix) - minsSinceSaved < 6) {
          throw new Error("cant resolve too early")
        }
        // let succesfulPut = await fetchPutPlayerBattleMode(supabase,playerObj, playerHash,newMode,oppo,"")
        // if (!succesfulPut) { throw new Error("unknown error, fix manually on database") }
      } else {
        throw new Error("oppo not found")
      }
    } else {

      if (GetMinsSince(lastKLineUnix) - minsSinceSaved < 6) {
        throw new Error("cant resolve too early")
      }

      // if not enoungh context candles throw error
      if (correctContextCandles.length < 3) { throw new Error("cant resolve too early") }
      console.log("18 | ************************************************** \n\n")
      console.log("18 | startPriceAfterMatch, closePriceAfterMatch", startPriceAfterMatch, closePriceAfterMatch)
      console.log("18 | ************************************************** \n\n")

      // if (GetMinsSince(lastKLineUnix) - minsSinceSaved < 9) {
      // resolve not too late, affect elo rating


      if (someoneBought) {
        if (playerAttacked) {
          // me did attack | me bought
          if (!oppoAttacked) {
            // opponent didnt attack
            if (closePriceAfterMatch <= startPriceAfterMatch) {
              // failed buy | red candle
              playerID = playerHash
              let eloWTL = playerObj.eloWTL
              let playerWTL = getEloWTLObj(eloWTL)
              console.log("30 | elowtl, playerWTL, ", eloWTL, playerWTL)
              let newPlayerWTL = { ...playerWTL, l: parseInt(playerWTL.l) + 1, }
              playerSend = Object.values(newPlayerWTL).join(",")
              console.log("31 | playerSend playerSend playerSend", playerSend)
              let oppoWTL = getEloWTLObj(oppo_userObj.eloWTL)
              let newoppoWTL = { ...oppoWTL, win: parseInt(oppoWTL.win)+1 }
              oppoID = oppo
              oppoSend = Object.values(newoppoWTL).join(",")
              let succesfulEloUpdate = await fetchPutEloBattle(supabase, playerID, playerSend, oppoID, oppoSend)
              if (!succesfulEloUpdate) { throw new Error("logic not ready") }
              console.log("32 | succesfulEloUpdate", succesfulEloUpdate)
            } else {
              // green candle | i win
              playerID = playerHash
              let eloWTL = playerObj.eloWTL
              let playerWTL = getEloWTLObj(eloWTL)
              console.log("30 | elowtl, playerWTL, ", eloWTL, playerWTL)
              let newPlayerWTL = { ...playerWTL, win: parseInt(playerWTL.win) + 1, }
              playerSend = Object.values(newPlayerWTL).join(",")
              console.log("31 | playerSend playerSend playerSend", playerSend)
              let oppoWTL = getEloWTLObj(oppo_userObj.eloWTL)
              let newoppoWTL = { ...oppoWTL, l: parseInt(oppoWTL.l)+1 }
              oppoID = oppo
              oppoSend = Object.values(newoppoWTL).join(",")
              let succesfulEloUpdate = await fetchPutEloBattle(supabase, playerID, playerSend, oppoID, oppoSend)
              if (!succesfulEloUpdate) { throw new Error("logic not ready") }
              console.log("32 | succesfulEloUpdate", succesfulEloUpdate)

            }
          } else {
            // * both attacked *
            // not possible yet
          }
        } else {
          // opponent did attack me | the other bought
          if (!playerAttacked) {
            // me didnt attack
            

            if (startPriceAfterMatch <= closePriceAfterMatch) {
              // oppo failed buy | red candle
              playerID = playerHash
              let eloWTL = playerObj.eloWTL
              let playerWTL = getEloWTLObj(eloWTL)
              console.log("30 | elowtl, playerWTL, ", eloWTL, playerWTL)
              let newPlayerWTL = { ...playerWTL, win: parseInt(playerWTL.win) + 1, }
              playerSend = Object.values(newPlayerWTL).join(",")
              console.log("31 | playerSend playerSend playerSend", playerSend)
              let oppoWTL = getEloWTLObj(oppo_userObj.eloWTL)
              let newoppoWTL = { ...oppoWTL, l: parseInt(oppoWTL.l)+1 }
              oppoID = oppo
              oppoSend = Object.values(newoppoWTL).join(",")
              let succesfulEloUpdate = await fetchPutEloBattle(supabase, playerID, playerSend, oppoID, oppoSend)
              if (!succesfulEloUpdate) { throw new Error("logic not ready") }
              console.log("32 | succesfulEloUpdate", succesfulEloUpdate)
            } else {
              // green candle | oppo wins, means i lose 
              playerID = playerHash
              let eloWTL = playerObj.eloWTL
              let playerWTL = getEloWTLObj(eloWTL)
              console.log("30 | elowtl, playerWTL, ", eloWTL, playerWTL)
              let newPlayerWTL = { ...playerWTL, l: parseInt(playerWTL.l) + 1, }
              playerSend = Object.values(newPlayerWTL).join(",")
              console.log("31 | playerSend playerSend playerSend", playerSend)
              let oppoWTL = getEloWTLObj(oppo_userObj.eloWTL)
              let newoppoWTL = { ...oppoWTL, win: parseInt(oppoWTL.win)+1 }
              oppoID = oppo
              oppoSend = Object.values(newoppoWTL).join(",")
              let succesfulEloUpdate = await fetchPutEloBattle(supabase, playerID, playerSend, oppoID, oppoSend)
              if (!succesfulEloUpdate) { throw new Error("logic not ready") }
              console.log("32 | succesfulEloUpdate", succesfulEloUpdate)

            }


          } else {

            // * both attacked *
            // not possible yet
          }
        }
      } else /* then no one bought */ {
        if (startPriceAfterMatch <= closePriceAfterMatch) {
          // red candle
          // both tied

          
          oppoID = oppo
          playerID = playerHash
          let eloWTL = playerObj.eloWTL
          let playerWTL = getEloWTLObj(eloWTL)
          console.log("22-2 | oppo_eloWTL, oppo_WTL ", eloWTL, playerWTL)
          let newPlayerWTL = { ...playerWTL, tie: parseInt(playerWTL.tie) + 1, }
          playerSend = Object.values(newPlayerWTL).join(",")
          let oppo_eloWTL = oppo_userObj.eloWTL
          let oppo_WTL = getEloWTLObj(oppo_eloWTL)
          console.log("22-1 | oppo_eloWTL, oppo_WTL ", oppo_eloWTL, oppo_WTL)
          let oppo_newWTL = { ...oppo_WTL, tie: parseInt(oppo_WTL.tie) + 1, }
          oppoSend = Object.values(oppo_newWTL).join(",")
          console.log("22 | playerSend playerSend playerSend", playerSend)
          let succesfulEloUpdate = await fetchPutEloBattle(supabase, playerID, playerSend, oppoID, oppoSend)
          if (!succesfulEloUpdate) { throw new Error("logic not ready") }
          console.log("23 | succesfulEloUpdate", succesfulEloUpdate)


        } else {
          // green candle
          // both loose

          // not yet
        }
      }
      // } else {
      // also put oppo on -1 if no errors ocurred
      let succesfulPut = await fetchPutPlayerBattleMode(supabase, playerObj, oppo, -1, oppo, "")
      // }

    }

    
    console.log("333", "prewait")
    let succesfulPut = await fetchPutPlayerBattleMode(supabase,playerObj, playerHash,newMode,oppo,sentunix)
    console.log("369369", "wait")
    if (!succesfulPut) { throw new Error("fetchPutPlayerBattleMode") }
    console.log("999999999999999999999", "at last")

    return new Response(JSON.stringify({data:playerObj.mode}))

  }









  
  throw new Error("unknown error, missed logic path repository/order.ts")
}


const getLast3minCandles = async (theToken: any, startUnixDate: any = null) => {
  let t = "3m"
  // let startUnixDate = getRandomUnixDate()
  // let urlBase = `https://api.binance.com/api/v3/klines?interval=${t}&startTime=${startUnixDate}&symbol=`
  let urlBase = `https://api.binance.com/api/v3/klines?interval=${t}&symbol=`
  urlBase += (theToken || "btc").toUpperCase() + "USDT"
  if (!!startUnixDate) {
    urlBase += `&startTime=${startUnixDate}`
  }
  const theListRes = await fetch(urlBase)
  let theList = await theListRes.json()
  // s__initUnix(theList[0][0])
  // let firstUnix:any = parseInt( theList[499][0] )
  // let lastKLineUnix:any =  parseInt(theList[0][0])
  // if (lastKLineUnix != lastUnix ) {
  //     s__lastUnix(lastKLineUnix)
  // }
  //   if (lastKLineUnix != lastUnix && lastUnix != 0) {
  //     calls.getBattleAttack()
  //   s__lastUnix(lastKLineUnix)
  // } else {
  //     s__liveUnix(firstUnix - 2)
  //     s__diffUnix(lastKLineUnix - firstUnix)
  //   }

  const closingPrices = theList.map((item: any) => parseFloat(item[4]));
  // setPrices(closingPrices);

  // console.log("qweqwe", lastKLineUnix)

  return theList
}