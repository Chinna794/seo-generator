"use client";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { SeoFormInput, SeoFormKeys } from "../form-schema";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useSeoFormStore } from "@/store/seo-form-store";

export function TitleField({ form }: { form: ReturnType<typeof useForm<SeoFormInput>> }) {
  const titleValue = useSeoFormStore((s) => s.values.title);
  const setTitle = useSeoFormStore((s) => s.setField);

  return (
    <FormField
      control={form.control}
      name={SeoFormKeys.title}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Title</FormLabel>
          <FormControl>
            <Input
              placeholder="Your SEO Title"
              {...field}
              value={titleValue}
              onChange={(e) => setTitle(SeoFormKeys.title, e.target.value)}
            />
          </FormControl>
          <FormDescription>3–100 chars.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
