import { useForm } from "react-hook-form";
import { SeoFormInput, SeoFormKeys } from "../form-schema";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSeoFormStore } from "@/store/seo-form-store";

export function SlugField({ form }: { form: ReturnType<typeof useForm<SeoFormInput>> }) {
  const slugValue = useSeoFormStore((s) => s.values.slug);
  const setSlug = useSeoFormStore((s) => s.setField);

  return (
    <FormField
      control={form.control}
      name={SeoFormKeys.slug}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Slug</FormLabel>
          <FormControl>
            <Input
              placeholder="mi-post-super-seo"
              {...field}
              value={slugValue}
              onChange={(e) => setSlug(SeoFormKeys.slug, e.target.value)}
            />
          </FormControl>
          <FormDescription>kebab-case (a-z, 0-9, guiones)</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
