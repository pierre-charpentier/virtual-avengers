import Env from "@/app/lib/env";

const API_KEY = Env.RIOT_GAMES_API_KEY;
const BASE_RANKED_URL =
  "https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/";
const BASE_URL = "https://euw1.api.riotgames.com/lol/summoner/v4/summoners/";

export async function getRankedDataForSummoner(
  summonerId: string
): Promise<ReadonlyArray<RiotGamesAPI.League.LeagueEntryDto>> {
  const url = new URL(summonerId, BASE_RANKED_URL);

  url.searchParams.append("api_key", API_KEY);

  const request = await fetch(url, { next: { revalidate: 60 * 60 } });

  return await request.json();
}

export async function getSummonerDataFromSummonerName(
  summonerName: string
): Promise<RiotGamesAPI.Summoner.SummonerDto> {
  const url = new URL(`by-name/${summonerName}`, BASE_URL);

  url.searchParams.append("api_key", API_KEY);

  const request = await fetch(url, { next: { revalidate: 60 * 60 } });

  return await request.json();
}

export async function getSummonerDataFromSummonerId(
  summonerId: string
): Promise<RiotGamesAPI.Summoner.SummonerDto> {
  const url = new URL(summonerId, BASE_URL);

  url.searchParams.append("api_key", API_KEY);

  const request = await fetch(url, { next: { revalidate: 60 * 60 * 24 } });

  return await request.json();
}
