"use client";

import { Champion } from "@/types/ddragon";
import { useReducer } from "react";

function reducer(
  prevState: {
    red: Array<Champion["id"] | null>;
    blue: Array<Champion["id"] | null>;
    ban: Array<Champion["id"] | null>;
  },
  action: {
    type: "RED" | "BLUE" | "BAN";
    champion: string | null;
    index: number;
  }
) {
  if (action.type === "RED") {
    const newRed = [...prevState.red];
    newRed.splice(action.index, 1, action.champion);

    return {
      ...prevState,
      red: newRed,
    };
  }

  if (action.type === "BLUE") {
    const newBlue = [...prevState.blue];
    newBlue.splice(action.index, 1, action.champion);

    return {
      ...prevState,
      blue: newBlue,
    };
  }

  if (action.type === "BAN") {
    const newBan = [...prevState.ban];
    newBan.splice(action.index, 1, action.champion);

    return {
      ...prevState,
      ban: newBan,
    };
  }

  return {
    red: [null, null, null, null, null],
    blue: [null, null, null, null, null],
    ban: [null, null, null, null, null, null, null, null, null, null],
  };
}

export function useDraftState() {
  return useReducer(reducer, {
    red: [null, null, null, null, null],
    blue: [null, null, null, null, null],
    ban: [null, null, null, null, null, null, null, null, null, null],
  });
}
