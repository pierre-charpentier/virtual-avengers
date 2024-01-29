const summonersProduction = [
  {
    puuid:
      "r4DInSgwXlDzlT47664_Y4Pglepd54TFP3Q3kQBtDG6sxlKPQET0F50rMSzjkxqwbTd1TbHrgrJwpQ",
    gameName: "vA Blackbeard",
    tagLine: "EUW",
  },
  {
    puuid:
      "fUHi7W4Wou1viXPsENu9h0fgLAKvPgCUnJDKXjj0HZ1_M4yazyOpW2631WIQzRO4WYoN8GR215S65w",
    gameName: "vA Caillou",
    tagLine: "1234",
  },
  {
    puuid:
      "MJPK5V8HruWMsYtj16qw6dbTVB-8D710NpxA2ZY_T7Wck3RbBG0aBnuZYchz0UIXW31b__igVlOobw",
    gameName: "vA Teijha",
    tagLine: "EUW",
  },
  {
    puuid:
      "pWZYT3Tfvai1S3E_PAhFhOz1h0M41b2rJAUr1uAnm8IHBmmHYBjyf87KkzCjSZhC1wmk1FPoTCIKcw",
    gameName: "vA Xel",
    tagLine: "GOJO",
  },
  {
    puuid:
      "iA8RHhE30HCDvwDQ-YXU0DBI_-OxaBAid6SzkAifsGfpXhWerqsVCMr0gT6JiA5tTdpegcJloYzwZA",
    gameName: "vA Oxomo",
    tagLine: "EUW",
  },
];

const summonersDevelopment = [
  {
    puuid:
      "liKJfo-x731BY15LwmXbqtNU3QskHEGkwwAbOzr64pwIr03q7eq3-Q2TrkO0dUxY1OIUBa3A_WnM-w",
    gameName: "vA Blackbeard",
    tagLine: "EUW",
  },
  {
    puuid:
      "MHqcYr5jEDOWgQn9ivrNcUIkH3-wo4SoR61RK_WDgM8gKzsFj0ZLTxxoL7359Ln8U09S7gikq2Cwgw",
    gameName: "vA Caillou",
    tagLine: "1234",
  },
  {
    puuid:
      "Zldaxb57njTIJkPlZBVh6pb4drswGU_1cNuPwar1HJ2eHirbxcAN7VinDL75PFuyYmBk3AN221TCwQ",
    gameName: "vA Teijha",
    tagLine: "EUW",
  },
  {
    puuid:
      "Dki4MVLI7ccfiB8fpuqwaxJIq6XfAACI63D3lgEPEqz_FkTIKRfZMIFGsLXN06VCVRqmksKU0A7zMA",
    gameName: "vA Xel",
    tagLine: "GOJO",
  },
  {
    puuid:
      "5KmOqxMA9NbjEYtycSWsWqOIPEw2_yfTjxr-VPkv-WA0LIbQPYPByYp1roHUsKK9QC1AHUyqG9H9KQ",
    gameName: "vA Oxomo",
    tagLine: "EUW",
  },
];

export const summoners: ReadonlyArray<RiotGamesAPI.Account.AccountDto> =
  process.env.NODE_ENV === "production"
    ? summonersProduction
    : summonersDevelopment;
