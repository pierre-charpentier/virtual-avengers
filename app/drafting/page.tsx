import { getChampions } from "@/lib/ddragon";
import Draftings from "./Draftings";

export default async function Drafting() {
  const { data: champions } = await getChampions();

  return (
    <main>
      <h1 className="font-bold text-4xl text-center my-6">Drafting</h1>
      <Draftings champions={champions} />
    </main>
  );
}
