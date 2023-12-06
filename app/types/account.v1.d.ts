declare namespace RiotGamesAPI {
  declare namespace Account {
    // Override type from @types/riot-games-api as it is outdated
    type AccountDto = {
      puuid: string;
      gameName: string;
      tagLine: string;
    };
  }
}
