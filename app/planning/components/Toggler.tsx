"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { CheckIcon, Cross2Icon } from "@radix-ui/react-icons";
import { useRef } from "react";
import { handleTogglerAction } from "../actions";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Tables } from "@/types/supabase";

export default function Toggler({
  date,
  playerUuid,
  isAvailable,
}: {
  date: Date;
  playerUuid: Tables<"planning">["player_uuid"];
  isAvailable: null | Tables<"planning">["available"];
}) {
  const form = useForm({
    defaultValues: {
      availability:
        isAvailable === null ? "" : isAvailable ? "available" : "unavailable",
    },
  });

  const formRef = useRef<HTMLFormElement>(null);

  const handleToggleGroupChange = (
    selectedAvailability: "" | "available" | "unavailable"
  ) => {
    form.setValue("availability", selectedAvailability);

    if (formRef.current) formRef.current.requestSubmit();
  };

  return (
    <Form {...form}>
      <form
        ref={formRef}
        onSubmit={form.handleSubmit(async (data) => {
          const { error, current_availability } = await handleTogglerAction({
            playerUuid,
            date: date.toISOString(),
            availability:
              data.availability === ""
                ? null
                : data.availability === "available"
                ? true
                : false,
          });

          if (error) {
            form.setValue(
              "availability",
              current_availability === null
                ? ""
                : current_availability
                ? "available"
                : "unavailable"
            );
          }
        })}
      >
        <FormField
          control={form.control}
          name="availability"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <ToggleGroup
                  type="single"
                  onValueChange={handleToggleGroupChange}
                  {...field}
                >
                  <ToggleGroupItem
                    value="available"
                    aria-label="Toggle available"
                    className="data-[state=on]:bg-green-600"
                  >
                    <CheckIcon className="h-6 w-6" />
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="unavailable"
                    aria-label="Toggle unavailable"
                    className="data-[state=on]:bg-red-600"
                  >
                    <Cross2Icon className="h-6 w-6" />
                  </ToggleGroupItem>
                </ToggleGroup>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
