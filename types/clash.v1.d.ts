declare namespace RiotGamesAPI {
  declare namespace Clash {
    // Override type from @types/riot-games-api as it is outdated
    type TournamentDto = {
      id: number;
      themeId: number;
      nameKey: string;
      nameKeySecondary: string;
      schedule: ReadonlyArray<TournamentPhaseDto>;
    };

    type TournamentPhaseDto = {
      id: number;
      registrationTime: number;
      startTime: number;
      cancelled: boolean;
    };
  }
}
