import DiscordLoginButton from "@/components/DiscordLoginButton";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const supabase = createClient(cookies());

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Redirect if already connected
  if (session?.user) {
    redirect("/");
  }

  return (
    <main className="mt-6 text-center lg:mt-12">
      <DiscordLoginButton />
    </main>
  );
}
