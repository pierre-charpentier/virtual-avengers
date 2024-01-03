declare namespace RiotGamesAPI {
  declare namespace Summoner {
    // Override type from @types/riot-games-api as it is outdated
    declare type SummonerDto = {
      id: string;
      accountId: string;
      puuid: string;
      name: string;
      profileIconId: number;
      revisionData: number;
      summonerLevel: number;
    };
  }
}
