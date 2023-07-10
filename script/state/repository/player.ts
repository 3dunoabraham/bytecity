export async function fetchSamePlayerCount(supabase:any, hash:any) {
    const { count } = await supabase
        .from('player')
        .select('id', { count: 'exact', head: true })
        .filter("hash", 'eq', hash)
    return count
}

export async function fetchPostPlayer(supabase:any, playerObj:any) {
    const { data: start, error } = await supabase
              .from('player')
              .insert(playerObj)
              .single()
    return !error
}

export async function fetchPlayer(supabase:any, playerHash:any) {
    const { data: player, error: selectError } = await supabase.from('player')
        .select('name, href, src, attempts, totalAttempts, goodAttempts, eloWTL, trades, mode, hash, jwt, binancekeys, subscription, referral')
        .match({ hash: playerHash })
        .single()
    return player
}
export async function fetchPlayerSimple(supabase:any, playerHash:any) {
    const { data: player, error: selectError } = await supabase.from('player')
        .select('name, href, src, attempts, totalAttempts, goodAttempts, eloWTL, trades, mode, subscription, referral,hash')
        .match({ hash: playerHash })
        .single()
    return !!player ? {...player,...{hash:playerHash}} : player
}

export async function fetchSameIPCount(supabase:any, ipAddress:any) {

    const { data:ipexists, count:ipcount } = await supabase.from('player')
        .select('totalAttempts', { count: 'exact', head: true })
        .filter("ipv4", 'eq', ipAddress)
  
    return ipcount
}

export async function fetchPutPlayer(supabase:any, playerObj:any, playerHash:any, orderObj:any) {

    const { data: removeattempt, error:error_removeattempt } = await supabase.from('player')
        .update({
            attempts: playerObj.attempts - 1,
            totalAttempts: playerObj.totalAttempts + 1,
            datenow: `${Date.now()}`,
            trades: playerObj.trades + JSON.stringify(orderObj)+"&&&",
        })
        .match({ hash: playerHash })
        .single()

  
    return !error_removeattempt
}

export async function fetchPutGoodPlayer(supabase:any, playerObj:any, playerHash:any ) {

    const { data: removeattempt, error:error_removeattempt } = await supabase.from('player')
        .update({
            goodAttempts: playerObj.goodAttempts + 1,
            attempts: playerObj.attempts + (16) + (!playerObj.subscription ? 0 : playerObj.subscription * 16),
            trades: ""
        })
        .match({ hash: playerHash })
        .single()

  
    return !error_removeattempt
}

export async function fetchPutPlayerAPI(supabase:any, playerObj:any, playerHash:any, binancePublic:any, binanceSecret:any ) {
    let secret1 = process.env.PROMOCODE1
    let secret2 = process.env.PROMOCODE2
    let thesubLevel = playerObj.subscription
    let newsubLevel = thesubLevel > 0 ? thesubLevel : (
        binancePublic == secret1 && binanceSecret == secret2 ? 1 : 0
    )
    let dataPack = {
        subscription: newsubLevel,
        binancekeys: `${binancePublic}:${binanceSecret}`
    }
    const { data: removeattempt, error:error_removeattempt } = await supabase.from('player')
        .update(dataPack)
        .match({ hash: playerHash })
        .single()

    return !removeattempt
}

export async function fetchPutPlayerBattleMode(supabase:any, playerObj:any, playerHash:any, newMode:any,
    oppo:string,unix:any
) {
    let dataPack:any = {
        href: newMode >= 0 ? oppo : "",
        mode: newMode
    }
    if (newMode == 0) {
        dataPack.src = unix
    } 
    if (newMode < 0) {
        dataPack.src = null
    } 
    const { data: removeattempt, error:error_removeattempt } = await supabase.from('player')
        .update(dataPack)
        .match({ hash: playerHash })
        .single()

  
    return !removeattempt
}
export async function fetchPutEloBattle(supabase:any, playerHash:any, player_elo:any, oppo:any,
    oppo_elo:any,
) {
    let player_dataPack = {
        eloWTL: player_elo,
        mode: -1,
        href:"",
        src:null,
    }
    const { data: removeattempt, error:error_removeattempt } = await supabase.from('player')
        .update(player_dataPack)
        .match({ hash: playerHash })
        .single()

    
    let oppo_dataPack = {
        eloWTL: oppo_elo,
        mode: -1,
        href:"",
        src:null,
    }
    const { data: removeoppo, error:error_removeoppo } = await supabase.from('player')
        .update(oppo_dataPack)
        .match({ hash: oppo })
        .single()

  
    return !removeattempt
}
export function GetMinsSince(unix:any) {
    return parseInt(`${(1672545600000-unix) * -1 / 1000 / 60 }`)
}
let defaultEloObj = {
    win: 0,
    tie: 0,
    l: 0,
}
export function getEloWTLObj (eloString:string) {
    let eloSlit = eloString.split(",")

    let eloWins = eloSlit[0]
    let eloTies = eloSlit[1]
    let eloLoses = eloSlit[2]
    
    return {
        win: eloWins,
        tie: eloTies,
        l: eloLoses,
    }
}