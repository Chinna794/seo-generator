import { useForm } from "react-hook-form";
import { SeoFormInput, SeoFormKeys } from "../form-schema";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function LanguageField({ form }: { form: ReturnType<typeof useForm<SeoFormInput>> }) {
  return (
    <FormField
      control={form.control}
      name={SeoFormKeys.language}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Language</FormLabel>
          <FormControl>
            <Input placeholder="es-MX" {...field} />
          </FormControl>
          <FormDescription>ej: es, es-MX, en</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
