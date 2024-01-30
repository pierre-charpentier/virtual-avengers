"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "./ui/button";
import { DiscordLogoIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

export default function DiscordLoginButton({
  className,
}: {
  className?: string | undefined;
}) {
  const supabase = createClient();

  async function handleDiscord() {
    await supabase.auth.signInWithOAuth({
      provider: "discord",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
        queryParams: {
          prompt: "none",
        },
      },
    });
  }

  return (
    <Button
      className={cn(className)}
      onClick={() => {
        handleDiscord();
      }}
    >
      <DiscordLogoIcon className="mr-2 h-4 w-4" />
      Connect with Discord
    </Button>
  );
}
