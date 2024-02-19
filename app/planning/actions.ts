"use server";

import { createClient } from "@/lib/supabase/actions";
import { Tables } from "@/types/supabase";
import { cookies } from "next/headers";

export async function handleTogglerAction({
  availability,
  date,
  playerUuid,
}: {
  availability: null | Tables<"planning">["available"];
  date: string;
  playerUuid: Tables<"planning">["player_uuid"];
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  let error;

  if (availability === null) {
    const { error: deletionError } = await supabase
      .from("planning")
      .delete()
      .eq("player_uuid", playerUuid)
      .eq("date", date);

    error = deletionError;
  } else {
    const { error: upsertError } = await supabase.from("planning").upsert({
      available: availability,
      date: date,
      player_uuid: playerUuid,
    });

    error = upsertError;
  }

  if (error) {
    const { data } = await supabase
      .from("planning")
      .select("available")
      .eq("player_uuid", playerUuid)
      .eq("date", date)
      .limit(1)
      .single();

    return { error, current_availability: data?.available ?? null };
  }

  return { current_availability: availability };
}
