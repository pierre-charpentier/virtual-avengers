"use client";

import { Tables } from "@/types/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PersonIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { DisconnectButton } from "../LogoutButton";
import { handleProfileFormSubmission } from "./actions";
import { toast } from "sonner";
import { MultiSelect } from "@/components/ui/multi-select";

export const profileFormSchema = z.object({
  gameName: z.string().min(3, {
    message: "Game name must be at least 3 characters.",
  }),
  tagLine: z.string().min(3, {
    message: "Tag line must be at least 3 characters.",
  }),
  playerUuid: z.string().uuid(),
  championPool: z
    .array(z.object({ value: z.string().min(1), label: z.string().min(1) }))
    .nullable(),
});

const champions = [
  { value: "JarvanIV", label: "Jarvan IV" },
  { value: "Ahri", label: "Ahri" },
];

export type profileFormType = z.infer<typeof profileFormSchema>;

export function ProfileSheet({ player }: { player: Tables<"player"> }) {
  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      gameName: player.game_name,
      tagLine: player.tag_line,
      playerUuid: player.uuid,
      championPool: champions.filter((c) =>
        player.champion_pool ? player.champion_pool.includes(c.value) : false
      ),
    },
  });

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="default" className="sm:ml-4 rounded-full" size="icon">
          <PersonIcon className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-2xl font-semibold tracking-tight">
            Profile
          </SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(async (data) => {
              const profileFormResponse = await handleProfileFormSubmission({
                ...data,
              });

              if (profileFormResponse?.error) {
                toast.error(profileFormResponse.error);

                return;
              }

              toast.success("Profile saved successfully");

              form.reset({
                gameName: profileFormResponse.gameName,
                playerUuid: player.uuid,
                tagLine: profileFormResponse.tagLine,
                championPool: profileFormResponse.championPool,
              });
            })}
          >
            <FormField
              control={form.control}
              name="gameName"
              render={({ field, fieldState }) => (
                <FormItem className="mb-4">
                  <FormLabel>Game name</FormLabel>
                  <FormControl>
                    <Input placeholder="vA Player" {...field} />
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tagLine"
              render={({ field, fieldState }) => (
                <FormItem className="mb-4">
                  <FormLabel>Tag line</FormLabel>
                  <FormControl>
                    <div>
                      <span className="absolute px-2 h-9 leading-[34px] border rounded-s bg-neutral-900 box-border select-none">
                        #
                      </span>
                      <Input placeholder="EUW" className="pl-10" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="championPool"
              render={({ field, fieldState }) => (
                <FormItem className="mb-4">
                  <FormLabel>Champion Pool</FormLabel>
                  <FormControl>
                    <div>
                      <MultiSelect
                        options={champions}
                        selected={field.value ?? []}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="mr-4"
              disabled={!form.formState.isDirty}
            >
              Save
            </Button>
          </form>
        </Form>
        <hr className="my-4" />
        <div className="text-right">
          <DisconnectButton />
        </div>
      </SheetContent>
    </Sheet>
  );
}
