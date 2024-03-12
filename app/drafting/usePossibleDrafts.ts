import { Champion } from "@/types/ddragon";
import { useMemo } from "react";

const championPools = {
  xeno: ["Jax", "Shen", "Gragas"],
  caillou: ["Sejuani", "Vi", "Gragas", "Brand", "XinZhao", "JarvanIV"],
  teijha: ["Lissandra", "Ahri", "Hwei", "Tristana"],
  xelondeur: ["Vayne", "Jinx"],
  oxomo: ["Braum", "Rakan", "Renata"],
};

const arr = Object.entries(championPools);

export function usePossibleDrafts({
  draft: { red: redPicks, blue: bluePicks, ban: bans },
}: {
  draft: {
    ban: ReadonlyArray<Champion["id"] | null>;
    blue: ReadonlyArray<Champion["id"] | null>;
    red: ReadonlyArray<Champion["id"] | null>;
  };
}) {
  const forbiddenPicks = useMemo(
    () => Array.from(new Set([...redPicks, ...bans])),
    [redPicks, bans]
  );

  let arrOfCompos: string[][] = [];
  for (let n = 0; n < arr.length; n++) {
    arrOfCompos = getAllComposFromComposAndChampionPool(arrOfCompos, arr[n][1]);
  }

  arrOfCompos = arrOfCompos
    .filter(
      (compo) =>
        !forbiddenPicks.filter(isAString).some((pick) => compo.includes(pick))
    )
    .filter((compo) =>
      bluePicks.filter(isAString).every((pick) => compo.includes(pick))
    )
    .sort(() => (Math.random() > 0.5 ? 1 : -1));

  return arrOfCompos;
}

// Given an array of compositions and a champion pools, provides an
// array of all compositions possible adding this champion pool
function getAllComposFromComposAndChampionPool(
  arrayOfCompos: string[][],
  championPool: string[]
) {
  let arr: string[][] = [];

  if (arrayOfCompos.length === 0) {
    for (let i = 0; i < championPool.length; i++) {
      arr.push([championPool[i]]);
    }

    return arr;
  }

  for (let i = 0; i < championPool.length; i++) {
    for (let k = 0; k < arrayOfCompos.length; k++) {
      if (arrayOfCompos[k].includes(championPool[i])) {
        // Skip duplicate champion compos
        continue;
      }

      arr.push([...arrayOfCompos[k], championPool[i]]);
    }
  }

  return arr;
}

function isAString(value: string | null): value is string {
  return value !== null;
}
