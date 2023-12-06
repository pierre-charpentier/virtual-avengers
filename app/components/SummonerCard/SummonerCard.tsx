import {
  getAccountByRiotId,
  getRankedDataForSummoner,
  getSummonerDataFromPuuid,
  getSummonerDataFromSummonerId,
} from "@/app//lib/riot-games-api";
import Image from "next/image";
import classes from "./SummonerCard.module.css";
import emblemImages from "./emblemImages";

export async function getSummonerFromRiotId(
  gameName: string,
  tagLine: string
): Promise<RiotGamesAPI.Summoner.SummonerDto> {
  const account = await getAccountByRiotId(gameName, tagLine);

  return await getSummonerDataFromPuuid(account.puuid);
}

export async function SummonerCard({
  gameName,
  realName,
  tagLine,
}: {
  gameName: string;
  realName: string;
  tagLine: string;
}) {
  const summoner = await getSummonerFromRiotId(gameName, tagLine);
  const summonerData = await getSummonerDataFromSummonerId(summoner.id);
  const rankedData = await getRankedDataForSummoner(summoner.id);

  const soloRankedData = rankedData.find(
    (data) => data.queueType === "RANKED_SOLO_5x5"
  );

  const flexRankedData = rankedData.find(
    (data) => data.queueType === "RANKED_FLEX_SR"
  );

  return (
    <div className={classes["container"]}>
      <Image
        src={`https://ddragon.leagueoflegends.com/cdn/13.22.1/img/profileicon/${summonerData.profileIconId}.png`}
        alt="Profile Icon"
        width={64}
        height={64}
      />
      <a
        href={`https://www.op.gg/summoners/euw/${summonerData.name}`}
        target="_blank"
      >
        <h2>{summonerData.name}</h2>
      </a>
      <p>{realName}</p>
      {soloRankedData?.tier ? (
        <Image
          src={
            emblemImages[
              soloRankedData.tier.toLowerCase() as Lowercase<
                typeof soloRankedData.tier
              >
            ]
          }
          alt="Tier Icon"
          width={640}
          height={360}
          className={classes["tier-icon"]}
        />
      ) : null}
      <div className={classes["rank-container"]}>
        <p className={classes["rank-title"]}>Solo</p>
        <div className={classes["rank"]}>
          {soloRankedData?.tier} {soloRankedData?.rank} -{" "}
          {soloRankedData?.leaguePoints} LP
          <Winrate
            wins={soloRankedData?.wins}
            losses={soloRankedData?.losses}
          />
        </div>
      </div>
      <div className={classes["rank-container"]}>
        <p className={classes["rank-title"]}>Flex</p>
        <div className={classes["rank"]}>
          {flexRankedData?.tier} {flexRankedData?.rank} -{" "}
          {flexRankedData?.leaguePoints} LP
          <Winrate
            wins={flexRankedData?.wins}
            losses={flexRankedData?.losses}
          />
        </div>
      </div>
    </div>
  );
}

function Winrate({ wins, losses }: { wins?: number; losses?: number }) {
  if (!(wins && losses)) {
    return null;
  }

  const winratePercentage = Math.floor((100 * wins) / (losses + wins));

  return (
    <>
      <p>
        <span className={classes["wins"]}>{wins}W</span> -{" "}
        <span className={classes["losses"]}>{losses}L</span>
      </p>
      <p>{winratePercentage}%</p>
    </>
  );
}
