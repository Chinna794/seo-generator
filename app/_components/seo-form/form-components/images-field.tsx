import { useFieldArray, useForm } from "react-hook-form";
import { SeoFormInput, SeoFormKeys } from "../form-schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function ImagesField({ form }: { form: ReturnType<typeof useForm<SeoFormInput>> }) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: SeoFormKeys.images,
  });

  return (
    <Card>
      <CardHeader className="py-3">
        <CardTitle className="text-base">Images</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex justify-end">
          <Button type="button" variant="secondary" onClick={() => append({ url: "", alt: "" })}>
            Add image
          </Button>
        </div>
        <div className="grid gap-4">
          {fields.map((f, i) => (
            <div key={f.id} className="grid gap-2 rounded border p-3">
              <FormField
                control={form.control}
                name={`${SeoFormKeys.images}.${i}.url` as const}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://…" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`${SeoFormKeys.images}.${i}.alt` as const}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alt text</FormLabel>
                    <FormControl>
                      <Input placeholder="Describe the image" {...field} />
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
