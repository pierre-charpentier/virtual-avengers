"use client";

import { Champion } from "@/types/ddragon";
import { Cross2Icon, QuestionMarkIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useMemo } from "react";
import ChampionSelector from "./ChampionSelector";
import { useDraftState } from "./useDraftState";
import { usePossibleDrafts } from "./usePossibleDrafts";
import { cn } from "@/lib/utils";

export default function Draftings({
  champions,
}: {
  champions: Record<string, Champion>;
}) {
  const [draftState, dispatch] = useDraftState();

  const alreadyPickedChampions = useMemo(
    () =>
      [...draftState.red, ...draftState.blue, ...draftState.ban].filter(
        (v): v is string => v !== null
      ),
    [draftState]
  );

  const possibleCompositions = usePossibleDrafts({ draft: draftState });

  return (
    <div className="flex w-11/12 mx-auto h-[calc(100vh-86px-96px)]">
      <div className="flex-none w-32 space-y-8">
        {draftState.blue.map((championId, index) => (
          <div key={index} className="h-24 w-24 mx-auto">
            <ChampionSelector
              onChampionSelection={(champion) => {
                dispatch({ type: "BLUE", champion, index });
              }}
              champions={champions}
              alreadyPickedChampions={alreadyPickedChampions}
            >
              {championId !== null ? (
                <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/14.4.1/img/champion/${championId}.png`}
                  alt={champions[championId].name}
                  width={96}
                  height={96}
                />
              ) : (
                <div className="relative h-24 w-24">
                  <QuestionMarkIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 text-sky-800" />
                </div>
              )}
            </ChampionSelector>
          </div>
        ))}
      </div>
      <div className="flex-grow border-x flex flex-col">
        <div className="grid grid-cols-5 gap-y-6 gap-x-12 w-fit mx-auto h-full overflow-y-scroll px-8 scroll">
          {possibleCompositions.map((composition) =>
            composition.map((composition) => (
              <Image
                key={composition}
                src={`https://ddragon.leagueoflegends.com/cdn/14.4.1/img/champion/${composition}.png`}
                alt={champions[composition].name}
                width={96}
                height={96}
                className={cn(
                  "mx-auto",
                  draftState.blue.includes(composition)
                    ? "border-2 border-green-800 rounded-sm"
                    : ""
                )}
              />
            ))
          )}
        </div>
        <div className="flex-grow-0 flex mx-auto py-8 gap-x-8">
          {draftState.ban.map((championId, index) => (
            <div key={index} className="h-20 w-20">
              <ChampionSelector
                onChampionSelection={(champion) => {
                  dispatch({ type: "BAN", champion, index });
                }}
                champions={champions}
                alreadyPickedChampions={alreadyPickedChampions}
              >
                {championId !== null ? (
                  <div className="relative h-20 w-20">
                    <Image
                      src={`https://ddragon.leagueoflegends.com/cdn/14.4.1/img/champion/${championId}.png`}
                      alt={champions[championId].name}
                      width={96}
                      height={96}
                    />
                    <Cross2Icon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 text-neutral-800" />
                  </div>
                ) : (
                  <div className="relative h-20 w-20">
                    <QuestionMarkIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 text-neutral-800" />
                  </div>
                )}
              </ChampionSelector>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-none w-32 space-y-8">
        {draftState.red.map((championId, index) => (
          <div key={index} className="h-24 w-24 mx-auto">
            <ChampionSelector
              onChampionSelection={(champion) => {
                dispatch({ type: "RED", champion, index });
              }}
              champions={champions}
              alreadyPickedChampions={alreadyPickedChampions}
            >
              {championId !== null ? (
                <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/14.4.1/img/champion/${championId}.png`}
                  alt={champions[championId].name}
                  width={96}
                  height={96}
                />
              ) : (
                <div className="relative h-24 w-24">
                  <QuestionMarkIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 text-red-800" />
                </div>
              )}
            </ChampionSelector>
          </div>
        ))}
      </div>
    </div>
  );
}
