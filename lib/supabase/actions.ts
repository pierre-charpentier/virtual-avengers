import { type CookieOptions, createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import Env from "@/lib/env";
import { Database } from "@/types/supabase";

export function createClient(cookieStore: ReturnType<typeof cookies>) {
  return createServerClient<Database>(
    Env.NEXT_PUBLIC_SUPABASE_URL,
    Env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: "", ...options });
        },
      },
    }
  );
}
