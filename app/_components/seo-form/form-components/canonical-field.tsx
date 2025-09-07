import { useForm } from "react-hook-form";
import { SeoFormInput, SeoFormKeys } from "../form-schema";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function CanonicalField({ form }: { form: ReturnType<typeof useForm<SeoFormInput>> }) {
  return (
    <FormField
      control={form.control}
      name={SeoFormKeys.canonicalUrl}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Canonical URL</FormLabel>
          <FormControl>
            <Input placeholder="https://example.com/path" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
