import { createClient } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";
import { addDays, format, isSameDay, isToday } from "date-fns";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckIcon, Cross2Icon, QuestionMarkIcon } from "@radix-ui/react-icons";
import Toggler from "./components/Toggler";

export default async function Planning() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: players } = await supabase
    .from("player")
    .select("*")
    .order("role");

  const today = new Date();

  const dates = Array(7)
    .fill("*")
    .map((_, index) => addDays(today, index));

  // Retrieve planning data for the next 7 days (today included)
  const { data: planningData } = await supabase
    .from("planning")
    .select("player_uuid, date, available")
    .in("player_uuid", players?.map((p) => p.uuid) || [])
    .gte("date", new Date().toISOString());

  return (
    <main className="w-11/12 2xl:w-3/4 mx-auto marker:mt-6 mt-6 md:mt-12 2xl:mt-24">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Planning
      </h1>
      <Table className="mt-6 md:mt-12 2xl:mt-24">
        <TableHeader>
          <TableRow>
            <TableHead className="sticky left-0 bg-background">
              Player
            </TableHead>
            {dates.map((date) => (
              <TableHead
                key={date.toTimeString()}
                className={cn(
                  "text-center",
                  isToday(date) ? "font-bold text-neutral-300" : ""
                )}
              >
                {format(date, "eeee, dd'/'MM")}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {(players ?? []).map(({ user_uuid, game_name, uuid }) => {
            return (
              <TableRow
                key={uuid}
                className={cn(user_uuid === user.id ? "bg-neutral-900" : "")}
              >
                <TableCell
                  className={cn(
                    "text-left text-lg sticky left-0",
                    user_uuid === user.id ? "bg-neutral-900" : "bg-background"
                  )}
                >
                  {game_name}
                </TableCell>
                {dates.map((date) => {
                  const availability =
                    planningData?.find(
                      (value) =>
                        isSameDay(new Date(value.date), date) &&
                        value.player_uuid === uuid
                    )?.available ?? null;

                  return (
                    <TableCell
                      key={`${uuid}${date.getDate()}`}
                      className={cn(
                        "text-center pt-5 pb-5",
                        isToday(date) ? "inverted" : ""
                      )}
                    >
                      {user_uuid === user.id ? (
                        <Toggler
                          date={date}
                          playerUuid={uuid}
                          isAvailable={availability}
                        ></Toggler>
                      ) : availability === null ? (
                        <QuestionMarkIcon className="h-5 w-5 text-neutral-400 mx-auto" />
                      ) : availability ? (
                        <CheckIcon className="h-6 w-6 text-green-600 mx-auto" />
                      ) : (
                        <Cross2Icon className="h-6 w-6 text-red-600 mx-auto" />
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </main>
  );
}
