declare namespace RiotGamesAPI {
  declare namespace League {
    // Override type from @types/riot-games-api as it is outdated
    type LeagueEntryDto = {
      leagueId: string;
      queueType: string;
      tier:
        | "BRONZE"
        | "CHALLENGER"
        | "DIAMOND"
        | "EMERALD"
        | "GOLD"
        | "GRANDMASTER"
        | "IRON"
        | "MASTER"
        | "PLATINUM"
        | "SILVER";
      rank: string;
      summonerId: string;
      summonerName: string;
      leaguePoints: number;
      wins: number;
      losses: number;
      veteran: boolean;
      inactive: boolean;
      freshBlood: boolean;
      hotStreak: boolean;
    };
  }
}
