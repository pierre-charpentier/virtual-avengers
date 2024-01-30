import { summoners } from "@/lib/summoners";
import { SummonerCard } from "../components/SummonerCard/SummonerCard";

export default async function Home() {
  return (
    <main className="text-center">
      <div className="grid w-11/12 mx-auto 2xl:mt-12 grid-cols-1 2xl:grid-cols-5 sm:grid-cols-2 gap-8">
        {summoners.map(({ gameName, tagLine, puuid }) => {
          return (
            <SummonerCard
              key={`${gameName}#${tagLine}`}
              gameName={gameName}
              tagLine={tagLine}
              puuid={puuid}
            />
          );
        })}
      </div>
    </main>
  );
}
