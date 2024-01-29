import { getTournaments } from "@/lib/riot-games-api";
import { summoners } from "@/lib/summoners";
import { format } from "date-fns";
import { SummonerCard } from "../components/SummonerCard/SummonerCard";

export default async function Home() {
  const tournaments = await getTournaments();

  return (
    <main className="mt-6 text-center lg:mt-12">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight mb-6 lg:text-5xl lg:mb-12">
        Virtual Avengers
      </h1>
      <p className="text-neutral-500">Next clashes</p>
      {tournaments.length === 0 ? (
        <p>-</p>
      ) : (
        tournaments.map((tournament) => (
          <h2 key={tournament.id} className="text-xl lg:text-2xl">
            {tournament.nameKey.toUpperCase()}
            &nbsp;-&nbsp;
            {format(tournament.schedule[0].startTime, "dd/MM/yyyy 'at' hh:00")}
          </h2>
        ))
      )}
      <div className="grid w-11/12 ml-auto mr-auto mt-6 lg:mt-12 grid-cols-1 2xl:grid-cols-5 sm:grid-cols-2 gap-8">
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
