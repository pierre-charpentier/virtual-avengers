import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Champion } from "@/types/ddragon";
import { CircleBackslashIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useMemo, useState } from "react";

export default function ChampionSelector({
  children,
  alreadyPickedChampions,
  champions,
  onChampionSelection,
}: {
  children: React.ReactNode;
  alreadyPickedChampions: ReadonlyArray<Champion["id"]>;
  champions: Record<string, Champion>;
  onChampionSelection: (champion: Champion["id"] | null) => void;
}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const listOfChampions = useMemo(() => Object.entries(champions), [champions]);
  const filteredChampions = useMemo(
    () =>
      listOfChampions.filter(
        ([, champion]) =>
          champion.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
      ),
    [searchQuery, listOfChampions]
  );

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-fit max-w-3xl">
        <div className="w-[40rem]">
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            className="w-96 mx-auto mb-6 h-12 text-xl"
            placeholder="Search..."
          />
          <div className="w-full h-80 overflow-y-scroll">
            <div className="grid grid-cols-5 gap-4">
              <CircleBackslashIcon
                className="w-24 h-24 text-neutral-700"
                onClick={() => {
                  onChampionSelection(null);
                  setDialogOpen(false);
                }}
              />
              {filteredChampions.map(([, champion]) => (
                <div key={champion.id} className="w-24 h-24 relative">
                  <Image
                    src={`https://ddragon.leagueoflegends.com/cdn/14.4.1/img/champion/${champion.id}.png`}
                    alt={champion.name}
                    width={96}
                    height={96}
                    onClick={() => {
                      if (!alreadyPickedChampions.includes(champion.id)) {
                        onChampionSelection(champion.id);
                        setDialogOpen(false);
                      }
                    }}
                    className={cn(
                      alreadyPickedChampions.includes(champion.id)
                        ? "grayscale"
                        : ""
                    )}
                  />
                  {alreadyPickedChampions.includes(champion.id) && (
                    <CircleBackslashIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 text-red-900" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
