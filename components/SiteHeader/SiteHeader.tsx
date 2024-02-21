import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";

import { Tables } from "@/types/supabase";
import ClashPopover from "./components/ClashPopover";
import { ProfileSheet } from "./components/ProfileSheet/ProfileSheet";

export default async function SiteHeader() {
  const cookiesStore = cookies();
  const supabase = createClient(cookiesStore);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  let player: Tables<"player"> | null = null;

  if (session?.user) {
    const playerQueryResponse = await supabase
      .from("player")
      .select("*")
      .eq("user_uuid", session.user.id)
      .limit(1)
      .single();

    player = playerQueryResponse.data;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-6 sm:py-auto">
      <div className="flex w-11/12 mx-auto sm:items-center items-stretch leading-9">
        <Link href="/" className="hidden font-bold sm:inline-block">
          Virtual Avengers
        </Link>
        {session?.user ? (
          <Link href="/planning" className="ml-6 sm:inline-block">
            Planning
          </Link>
        ) : null}
        <div className="flex flex-1 justify-end space-x-2">
          <ClashPopover />
          <nav className="flex items-center">
            {player ? (
              <ProfileSheet player={player} />
            ) : (
              <Link href="/login">
                <Button className="ml-4">Connect</Button>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
