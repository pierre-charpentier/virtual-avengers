import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  getAccountByRiotId,
  getRankedDataForSummoner,
  getSummonerDataFromPuuid,
  getSummonerDataFromSummonerId,
} from "@/lib/riot-games-api";
import Image from "next/image";
import emblemImages from "./emblemImages";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";

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
    <Card>
      <CardHeader className="border-b">
        <a
          href={`https://www.op.gg/summoners/euw/${summonerData.name}`}
          target="_blank"
          className="z-10 scroll-m-20 text-2xl font-semibold tracking-tight first:mt-0"
        >
          {gameName}
        </a>
        <h3 className="scroll-m-20 text-lg text-muted-foreground tracking-tight">
          {realName}
        </h3>
      </CardHeader>
      <CardContent>
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
            className="relative mt-4 box-border w-32 h-32 object-cover scale-[250%] mr-auto ml-auto"
          />
        ) : null}
        <div className="grid grid-rows-2 gap-5">
          <div className="text-left">
            <p className="text-neutral-500">Solo</p>
            <div className="text-lg">
              {soloRankedData?.tier} {soloRankedData?.rank} -{" "}
              {soloRankedData?.leaguePoints} LP
              <Winrate
                wins={soloRankedData?.wins}
                losses={soloRankedData?.losses}
              />
            </div>
          </div>
          <div className="text-left">
            <p className="text-neutral-500">Flex</p>
            <div className="text-lg">
              {flexRankedData?.tier} {flexRankedData?.rank} -{" "}
              {flexRankedData?.leaguePoints} LP
              <Winrate
                wins={flexRankedData?.wins}
                losses={flexRankedData?.losses}
              />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant="outline" asChild>
          <a
            href={`https://www.op.gg/summoners/euw/${summonerData.name}`}
            target="_blank"
          >
            OP.GG
            <ArrowTopRightIcon className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
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
        <span className="text-[#00bba3]">{wins}W</span> -{" "}
        <span className="text-[#e84057]">{losses}L</span>
      </p>
      <p>{winratePercentage}%</p>
    </>
  );
}
