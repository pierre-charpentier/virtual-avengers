import { createClient as createServerClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";
import { Button } from "../ui/button";
import ClashPopover from "./components/ClashPopover";
import { LogoutButton } from "./components/LogoutButton";

export default async function SiteHeader() {
  const cookiesStore = cookies();
  const supabase = createServerClient(cookiesStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-6 sm:py-auto">
      <div className="flex w-11/12 mx-auto sm:items-center items-stretch">
        <Link href="/">
          <span className="hidden font-bold sm:inline-block">
            Virtual Avengers
          </span>
        </Link>
        <ClashPopover />
        <div className="flex flex-1 justify-end space-x-2">
          <nav className="flex items-center">
            {user ? (
              <>
                <span className="mr-4">{user.email}</span>
                <LogoutButton />
              </>
            ) : (
              <Link href="/login">
                <Button>Connect</Button>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
