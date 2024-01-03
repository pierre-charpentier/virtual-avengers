"use server";

import { getSummonerDataFromSummonerName } from "@/lib/riot-games-api";
import { z } from "zod";

export async function handleFindSummonerIdForm(
  previousState: { summonerId: string | null },
  formData: FormData
) {
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
