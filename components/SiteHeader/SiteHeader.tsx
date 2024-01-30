import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { createClient as createServerClient } from "@/lib/supabase/server";
import { PersonIcon } from "@radix-ui/react-icons";
import { User } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import Link from "next/link";
import ClashPopover from "./components/ClashPopover";
import { DisconnectButton } from "./components/LogoutButton";

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
              <AccountPopover user={user} />
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

async function AccountPopover({ user }: { user: User }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="default" className="sm:ml-4 rounded-full" size="icon">
          <PersonIcon className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <h3 className="text-2xl font-semibold tracking-tight">Account</h3>
        <p className="mb-4">{user.email}</p>
        <div className="text-right">
          <DisconnectButton />
        </div>
      </PopoverContent>
    </Popover>
  );
}
