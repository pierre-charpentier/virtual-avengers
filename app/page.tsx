import { Suspense } from "react";
import SplitCountdown from "./components/SplitCountdown";
import { SummonerCard } from "./components/SummonerCard/SummonerCard";
import classes from "./page.module.css";

const vaGameNamesTagLines: ReadonlyArray<
  [string, { gameName: string; tagLine: string }]
> = [
  ["Xeno", { gameName: "Xnosevill", tagLine: "EUW" }],
  ["Caillou", { gameName: "vA Caillou", tagLine: "1234" }],
  ["Teijha", { gameName: "vA Teijha", tagLine: "EUW" }],
  ["Xelondeur", { gameName: "Oxomo Egirl", tagLine: "EUW" }],
  ["Oxomo", { gameName: "vA Oxomo", tagLine: "EUW" }],
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
        {vaGameNamesTagLines.map(([realName, { gameName, tagLine }]) => {
          return (
            <Suspense key={`${gameName}#${tagLine}`} fallback={"Hello"}>
              <SummonerCard
                realName={realName}
                gameName={gameName}
                tagLine={tagLine}
              />
            </Suspense>
          );
        })}
      </div>
    </main>
  );
}
