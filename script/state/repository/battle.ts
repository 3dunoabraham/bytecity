import { computeHash } from "./order"
import { fetchSameIPCount, fetchSamePlayerCount } from "./player"
import { getSupabaseClient } from "./supabase"

export async function isBattleValid(
  req: any, referral: string, pin: string, oppo:string, ipAddress:any,
) {
  const playerHash = computeHash(referral, pin)

  const supabase = getSupabaseClient()
  const count = await fetchSamePlayerCount(supabase, playerHash)
  const oppo_count = await fetchSamePlayerCount(supabase, oppo)
  if (!count || !oppo_count) {
    return false
  }

  const ipcount = await fetchSameIPCount(supabase, ipAddress)
  if (Number(ipcount) > 5) {
    console.error("fetchSameIPCountfetchSameIPCountfetchSameIPCount")
    return false
  }
  
  return true
}