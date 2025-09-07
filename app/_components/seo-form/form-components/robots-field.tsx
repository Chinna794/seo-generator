import { useForm } from "react-hook-form";
import { SeoFormInput, SeoFormKeys } from "../form-schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";

export function RobotsField({ form }: { form: ReturnType<typeof useForm<SeoFormInput>> }) {
  return (
    <Card>
      <CardHeader className="py-3">
        <CardTitle className="text-base">Robots</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center justify-between">
          <FormField
            control={form.control}
            name={`${SeoFormKeys.robots}.index` as const}
            render={({ field }) => (
              <FormItem className="flex w-full items-center justify-between">
                <FormLabel>index</FormLabel>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center justify-between">
          <FormField
            control={form.control}
            name={`${SeoFormKeys.robots}.follow` as const}
            render={({ field }) => (
              <FormItem className="flex w-full items-center justify-between">
                <FormLabel>follow</FormLabel>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center justify-between">
          <FormField
            control={form.control}
            name={`${SeoFormKeys.robots}.noarchive` as const}
            render={({ field }) => (
              <FormItem className="flex w-full items-center justify-between">
                <FormLabel>noarchive</FormLabel>
                <FormControl>
                  <Switch checked={!!field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center justify-between">
          <FormField
            control={form.control}
            name={`${SeoFormKeys.robots}.nosnippet` as const}
            render={({ field }) => (
              <FormItem className="flex w-full items-center justify-between">
                <FormLabel>nosnippet</FormLabel>
                <FormControl>
                  <Switch checked={!!field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
