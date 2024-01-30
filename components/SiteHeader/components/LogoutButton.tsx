"use client";

import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../../ui/button";

export function DisconnectButton({
  className,
}: {
  className?: string | undefined;
}) {
  const supabase = createClient();
  const router = useRouter();

  const [disconnecting, setDisconnecting] = useState(false);

  const handlerLogout = async () => {
    setDisconnecting(true);

    await supabase.auth.signOut();

    router.refresh();
  };

  return (
    <Button
      className={cn(className)}
      onClick={handlerLogout}
      disabled={disconnecting}
    >
      Disconnect
    </Button>
  );
}
