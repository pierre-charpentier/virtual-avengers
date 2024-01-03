import SplitCountdown from "../components/SplitCountdown";
import { SummonerCard } from "../components/SummonerCard/SummonerCard";
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
    <main className="mt-6 text-center md:mt-12">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Virtual Avengers
      </h1>
      <div className="grid w-4/5 ml-auto mr-auto mt-12 2xl:mt-24 grid-cols-1 2xl:grid-cols-5 sm:grid-cols-2 gap-8">
        {vaGameNamesTagLines.map(([realName, { gameName, tagLine }]) => {
          return (
            <SummonerCard
              key={`${gameName}#${tagLine}`}
              realName={realName}
              gameName={gameName}
              tagLine={tagLine}
            />
          );
        })}
      </div>
    </main>
  );
}
