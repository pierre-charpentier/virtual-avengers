"use client";

import { useFormState } from "react-dom";
import { handleFindSummonerIdForm } from "./action";

export default function FindSummonerId() {
  const [formState, handleSubmit] = useFormState(handleFindSummonerIdForm, {
    summonerId: null,
  });

  return (
    <form className="mt-20" action={handleSubmit}>
      <input type="text" name="summoner-name" id="summoner-name" />
      <button type="submit">Search</button>
      <p>{formState.summonerId ?? "Not found"}</p>
    </form>
  );
}
