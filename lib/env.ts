import { z } from "zod";

const envSchema = z.object({
  RIOT_GAMES_API_KEY: z.string().min(1),
});

export default envSchema.parse({
  RIOT_GAMES_API_KEY: process.env.RIOT_GAMES_API_KEY,
});
