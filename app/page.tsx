import SplitCountdown from "./components/SplitCountdown";
import { SummonerCard } from "./components/SummonerCard/SummonerCard";
import classes from "./page.module.css";

const vaSummonerIds = [
  ["Xeno", "28495gnPj-wb8CnECUTiIKwabQcI9cdRGBnGiDg4k6W4NgY"],
  ["Caillou", "jy8xwIWsUBQxI0QgPYm8Ba2gv5SWhXAdyBWc71jO0CH2_Nk:"],
  ["Teijha", "6Sx1jj9-uBMWZgnnWYycMf3UTVsu5TreN8s9sova_Y66Il0"],
  ["Xelondeur", "t977vJYTUbIyzUAZ-G3LG9s5cY9UAELCIBRZG8FnchYzTsA"],
  ["Oxomo", "46lUe2QUoZUm_dY0dWPRYuEKbhoednJOch9yOLGStcH4C_A"],
];

export default async function Home() {
  return (
    <main className={classes.container}>
      <h1 className={classes.title}>Virtual Avengers</h1>
      <p>Split ends in:</p>
      <h2 className={classes.countdown}>
        <SplitCountdown />
      </h2>
      <div className={classes.team}>
        {vaSummonerIds.map(([realName, summonerId]) => {
          return (
            <SummonerCard
              key={summonerId}
              realName={realName}
              summonerId={summonerId}
            />
          );
        })}
      </div>
    </main>
  );
}
