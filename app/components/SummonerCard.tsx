import Image from "next/image";
import {
  getRankedDataForSummoner,
  getSummonerDataFromSummonerId,
} from "@/app//lib/riot-games-api";

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
    <div style={{ textAlign: "center" }}>
      <Image
        src={`https://ddragon.leagueoflegends.com/cdn/13.22.1/img/profileicon/${summonerData.profileIconId}.png`}
        alt="Profile Icon"
        width={64}
        height={64}
      />
      <h2>{soloRankedData?.summonerName}</h2>
      <p>{realName}</p>
      <p>
        {soloRankedData?.tier} {soloRankedData?.rank} -{" "}
        {soloRankedData?.leaguePoints} LP
      </p>
    </div>
  );
}
