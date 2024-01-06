import Env from "@/lib/env";
import PThrottle from "p-throttle";

const API_KEY = Env.RIOT_GAMES_API_KEY;

const RG_API_URLS = {
  ACCOUNT: "https://europe.api.riotgames.com/riot/account/v1/accounts/",
  LEAGUE: "https://euw1.api.riotgames.com/lol/league/v4/entries/",
  SUMMONER: "https://euw1.api.riotgames.com/lol/summoner/v4/summoners/",
};

// Prevent overthrowing the API requests limit
const throttle = PThrottle({ interval: 1000, limit: 20 });

async function getRankedDataForSummonerFunc(
  summonerId: string
): Promise<ReadonlyArray<RiotGamesAPI.League.LeagueEntryDto>> {
  const url = new URL(`by-summoner/${summonerId}`, RG_API_URLS.LEAGUE);

  url.searchParams.append("api_key", API_KEY);

  const request = await fetch(url, {
    next: { revalidate: 3600 /* an hour */ },
  });

  return await request.json();
}

export const getRankedDataForSummoner = throttle(getRankedDataForSummonerFunc);

async function getSummonerDataFromSummonerNameFunc(
  summonerName: string
): Promise<RiotGamesAPI.Summoner.SummonerDto> {
  const url = new URL(`by-name/${summonerName}`, RG_API_URLS.SUMMONER);

  url.searchParams.append("api_key", API_KEY);

  const request = await fetch(url, {
    next: { revalidate: 3600 /* an hour */ },
  });

  return await request.json();
}

export const getSummonerDataFromSummonerName = throttle(
  getSummonerDataFromSummonerNameFunc
);

async function getSummonerDataFromSummonerIdFunc(
  summonerId: string
): Promise<RiotGamesAPI.Summoner.SummonerDto> {
  const url = new URL(summonerId, RG_API_URLS.SUMMONER);

  url.searchParams.append("api_key", API_KEY);

  const request = await fetch(url, {
    next: { revalidate: 86400 /* one day */ },
  });

  return await request.json();
}

export const getSummonerDataFromSummonerId = throttle(
  getSummonerDataFromSummonerIdFunc
);

async function getSummonerDataFromPuuidFunc(
  puuid: string
): Promise<RiotGamesAPI.Summoner.SummonerDto> {
  const url = new URL(`by-puuid/${puuid}`, RG_API_URLS.SUMMONER);

  url.searchParams.append("api_key", API_KEY);

  const request = await fetch(url, {
    next: { revalidate: 86400 /* one day */ },
  });

  return await request.json();
}

export const getSummonerDataFromPuuid = throttle(getSummonerDataFromPuuidFunc);

async function getAccountByRiotIdFunc(
  gameName: string,
  tagLine: string
): Promise<RiotGamesAPI.Account.AccountDto> {
  const url = new URL(`by-riot-id/${gameName}/${tagLine}`, RG_API_URLS.ACCOUNT);

  url.searchParams.append("api_key", API_KEY);

  const request = await fetch(url, {
    next: { revalidate: 86400 /* one day */ },
  });

  return await request.json();
}

export const getAccountByRiotId = throttle(getAccountByRiotIdFunc);
