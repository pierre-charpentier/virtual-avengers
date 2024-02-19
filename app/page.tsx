import { SummonerCard } from "../components/SummonerCard/SummonerCard";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const { data: players } = await supabase
    .from("player")
    .select("*")
    .order("role");

  return (
    <main className="text-center">
      {!players || players.length === 0 ? (
        <h1 className="mt-24 text-4xl text-neutral-600">No players</h1>
      ) : (
        <div className="grid w-11/12 mx-auto mt-6 2xl:mt-16 grid-cols-1 2xl:grid-cols-5 sm:grid-cols-2 gap-8">
          {players.map(({ game_name, tag_line, puuid }) => {
            return (
              <SummonerCard
                key={puuid}
                gameName={game_name}
                tagLine={tag_line}
                puuid={puuid}
              />
            );
          })}
        </div>
      )}
    </main>
  );
}
