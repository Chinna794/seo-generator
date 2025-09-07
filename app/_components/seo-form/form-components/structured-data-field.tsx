import { useForm } from "react-hook-form";
import { SeoFormInput, SeoFormKeys } from "../form-schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export function StructuredDataField({ form }: { form: ReturnType<typeof useForm<SeoFormInput>> }) {
  return (
    <Card>
      <CardHeader className="py-3">
        <CardTitle className="text-base">Structured Data</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <FormField
          control={form.control}
          name={`${SeoFormKeys.structuredData}.type` as const}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Article">Article</SelectItem>
                    <SelectItem value="WebPage">WebPage</SelectItem>
                    <SelectItem value="Product">Product</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`${SeoFormKeys.structuredData}.author` as const}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author</FormLabel>
              <FormControl>
                <Input placeholder="Author name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid gap-2 md:grid-cols-2">
          <FormField
            control={form.control}
            name={`${SeoFormKeys.structuredData}.publishedAt` as const}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Published At (ISO)</FormLabel>
                <FormControl>
                  <Input placeholder="2025-09-01T10:00:00.000Z" {...field} />
                </FormControl>
                <FormDescription>ISO 8601</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`${SeoFormKeys.structuredData}.modifiedAt` as const}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Modified At (ISO)</FormLabel>
                <FormControl>
                  <Input placeholder="2025-09-03T09:00:00.000Z" {...field} />
                </FormControl>
                <FormDescription>ISO 8601</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
