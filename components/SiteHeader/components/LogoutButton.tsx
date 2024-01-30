"use client";

import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../../ui/button";

export function LogoutButton({
  className,
}: {
  className?: string | undefined;
}) {
  const [loggingOut, setLoggingOut] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  const handlerLogout = async () => {
    setLoggingOut(true);

    await supabase.auth.signOut();

    router.refresh();
  };

  return (
    <Button
      className={cn(className)}
      onClick={handlerLogout}
      disabled={loggingOut}
    >
      Disconnect
    </Button>
  );
}
