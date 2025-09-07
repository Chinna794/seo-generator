import { useFieldArray, useForm } from "react-hook-form";
import { SeoFormInput, SeoFormKeys } from "../form-schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function HreflangsField({ form }: { form: ReturnType<typeof useForm<SeoFormInput>> }) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: SeoFormKeys.hreflangs,
  });

  return (
    <Card>
      <CardHeader className="py-3">
        <CardTitle className="text-base">Hreflangs</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex justify-end">
          <Button type="button" variant="secondary" onClick={() => append({ lang: "", url: "" })}>
            Add hreflang
          </Button>
        </div>
        <div className="grid gap-4">
          {fields.map((f, i) => (
            <div key={f.id} className="grid gap-2 rounded border p-3">
              <FormField
                control={form.control}
                name={`${SeoFormKeys.hreflangs}.${i}.lang` as const}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lang</FormLabel>
                    <FormControl>
                      <Input placeholder="es-MX" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`${SeoFormKeys.hreflangs}.${i}.url` as const}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/es-mx/…" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button type="button" variant="destructive" onClick={() => remove(i)}>
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
