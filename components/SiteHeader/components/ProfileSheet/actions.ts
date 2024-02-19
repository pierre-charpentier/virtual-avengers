"use server";

import { getAccountByRiotId } from "@/lib/riot-games-api";
import { profileFormType } from "./ProfileSheet";
import { createClient } from "@/lib/supabase/actions";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export async function handleProfileFormSubmission({
  gameName,
  tagLine,
  playerUuid,
}: profileFormType) {
  const riotAccount = await getAccountByRiotId(gameName, tagLine);

  if (!riotAccount.puuid) {
    return {
      error: `Could not find summoner matching ${gameName}#${tagLine}`,
    };
  }

  const supabase = createClient(cookies());

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { error } = await supabase
    .from("player")
    .update({
      game_name: gameName,
      tag_line: tagLine,
      puuid: riotAccount.puuid,
    })
    .eq("uuid", playerUuid)
    .eq("user_uuid", user.id);

  if (error) {
    return {
      error: "Could not save profile. Please retry later or contact the admin.",
    };
  }

  return {
    error: undefined,
    gameName,
    tagLine,
  };
}
