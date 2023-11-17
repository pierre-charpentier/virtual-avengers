import { getSummonerDataFromSummonerName } from "@/app/lib/riot-games-api";
import { z } from "zod";

export async function handleFindSummonerIdForm(
  previousState: { summonerId: string | null },
  formData: FormData
) {
  const schema = z.object({
    summonerName: z.string().min(1),
  });

  try {
    const summonerName = z.string().min(1).parse(formData.get("summoner-name"));
    const summonerData = await getSummonerDataFromSummonerName(summonerName);

    return {
      summonerId: summonerData.id,
    };
  } catch {
    return {
      summonerId: null,
    };
  }
}
