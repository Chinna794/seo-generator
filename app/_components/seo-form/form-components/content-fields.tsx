import { useFieldArray, useForm } from "react-hook-form";
import { SeoFormInput, SeoFormKeys } from "../form-schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function ContentFields({ form }: { form: ReturnType<typeof useForm<SeoFormInput>> }) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: `${SeoFormKeys.content}.headings` as const,
  });

  return (
    <Card>
      <CardHeader className="py-3">
        <CardTitle className="text-base">Content</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <FormField
          control={form.control}
          name={`${SeoFormKeys.content}.h1` as const}
          render={({ field }) => (
            <FormItem>
              <FormLabel>H1</FormLabel>
              <FormControl>
                <Input placeholder="Main heading (H1)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`${SeoFormKeys.content}.wordCount` as const}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Word Count</FormLabel>
              <FormControl>
                <Input type="number" min={0} {...field} />
              </FormControl>
              <FormDescription>≥ 300</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Separator />

        <div className="grid gap-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Headings (H2/H3)</h4>
            <Button type="button" variant="secondary" onClick={() => append({ level: "h2", text: "" })}>
              Add heading
            </Button>
          </div>

          <div className="grid gap-4">
            {fields.map((f, i) => (
              <div key={f.id} className="grid gap-2 rounded border p-3">
                <FormField
                  control={form.control}
                  name={`${SeoFormKeys.content}.headings.${i}.level` as const}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Level</FormLabel>
                      <FormControl>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="h2">H2</SelectItem>
                            <SelectItem value="h3">H3</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`${SeoFormKeys.content}.headings.${i}.text` as const}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Text</FormLabel>
                      <FormControl>
                        <Input placeholder="Section heading text" {...field} />
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
        </div>
      </CardContent>
    </Card>
  );
}
