import { getTournaments } from "@/lib/riot-games-api";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default async function ClashPopover() {
  const tournaments = await getTournaments();

  const atleastOnTournamentScheduled =
    Array.isArray(tournaments) && tournaments.length > 0;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={atleastOnTournamentScheduled ? "default" : "secondary"}
          className="sm:ml-4"
        >
          Clash
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        {!atleastOnTournamentScheduled ? (
          <p className="text-neutral-500">No clashes scheduled</p>
        ) : (
          tournaments.map((tournament) => (
            <>
              <p className="text-neutral-500">Next clashes</p>
              <h2 key={tournament.id} className="text-xl lg:text-2xl">
                {tournament.nameKey.toUpperCase()}
                &nbsp;-&nbsp;
                {format(
                  tournament.schedule[0].startTime,
                  "dd/MM/yyyy 'at' hh:00"
                )}
              </h2>
            </>
          ))
        )}
      </PopoverContent>
    </Popover>
  );
}
