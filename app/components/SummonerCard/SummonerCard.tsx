import {
  getRankedDataForSummoner,
  getSummonerDataFromSummonerId,
} from "@/app//lib/riot-games-api";
import Image from "next/image";
import classes from "./SummonerCard.module.css";

export async function SummonerCard({
  realName,
  summonerId,
}: {
  realName: string;
  summonerId: string;
}) {
  const summonerData = await getSummonerDataFromSummonerId(summonerId);
  const rankedData = await getRankedDataForSummoner(summonerId);

  const soloRankedData = rankedData.find(
    (data) => data.queueType === "RANKED_SOLO_5x5"
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
        <h2>{soloRankedData?.summonerName}</h2>
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
        {soloRankedData?.tier} {soloRankedData?.rank} -{" "}
        {soloRankedData?.leaguePoints} LP
      </p>
      <Winrate wins={soloRankedData?.wins} losses={soloRankedData?.losses} />
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
