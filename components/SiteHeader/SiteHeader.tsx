import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";

import { ProfileSheet } from "./components/ProfileSheet/ProfileSheet";
import ClashPopover from "./components/ClashPopover";
import { Tables } from "@/types/supabase";

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
      <div className="flex w-11/12 mx-auto sm:items-center items-stretch">
        <Link href="/">
          <span className="hidden font-bold sm:inline-block">
            Virtual Avengers
          </span>
        </Link>
        {session?.user ? (
          <Link href="/planning">
            <span className="ml-6">Planning</span>
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
