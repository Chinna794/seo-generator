import { useForm } from "react-hook-form";
import { SeoFormInput, SeoFormKeys } from "../form-schema";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useSeoFormStore } from "@/store/seo-form-store";

export function DescriptionField({ form }: { form: ReturnType<typeof useForm<SeoFormInput>> }) {
  const descriptionValue = useSeoFormStore((s) => s.values.description);
  const setDescription = useSeoFormStore((s) => s.setField);

  return (
    <FormField
      control={form.control}
      name={SeoFormKeys.description}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Textarea
              rows={4}
              placeholder="Your SEO Description"
              className="max-h-44"
              {...field}
              value={descriptionValue}
              onChange={(e) => setDescription(SeoFormKeys.description, e.target.value)}
            />
          </FormControl>
          <FormDescription>Breve y atractiva.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
