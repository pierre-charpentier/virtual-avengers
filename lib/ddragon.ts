import { z } from "zod";

export async function getChampions() {
  const championsRequest = await fetch(
    "https://ddragon.leagueoflegends.com/cdn/14.4.1/data/en_US/champion.json"
  );

  const jsonData = await championsRequest.json();

  return await championsSchema.parseAsync(jsonData);
}

const championsSchema = z.object({
  data: z.record(
    z.string(),
    z.object({
      blurb: z.string(),
      id: z.string(),
      image: z.object({
        full: z.string(),
        group: z.string(),
        h: z.number(),
        sprite: z.string(),
        w: z.number(),
        x: z.number(),
        y: z.number(),
      }),
      info: z.object({
        attack: z.number(),
        defense: z.number(),
        difficulty: z.number(),
        magic: z.number(),
      }),
      key: z.string(),
      name: z.string(),
      partype: z.string(),
      stats: z.object({
        armor: z.number(),
        armorperlevel: z.number(),
        attackdamage: z.number(),
        attackdamageperlevel: z.number(),
        attackrange: z.number(),
        attackspeed: z.number(),
        attackspeedperlevel: z.number(),
        crit: z.number(),
        critperlevel: z.number(),
        hp: z.number(),
        hpperlevel: z.number(),
        hpregen: z.number(),
        hpregenperlevel: z.number(),
        movespeed: z.number(),
        mp: z.number(),
        mpperlevel: z.number(),
        mpregen: z.number(),
        mpregenperlevel: z.number(),
        spellblock: z.number(),
        spellblockperlevel: z.number(),
      }),
      tags: z.array(z.string()),
      title: z.string(),
      version: z.string(),
    })
  ),
});
