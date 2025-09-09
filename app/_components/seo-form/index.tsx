import FileUploader from "@/components/file-uploader";
import KeyCommand from "@/components/key-command";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getHostnameFromUrl } from "@/lib/get-hostname-from-url";
import { useSeoFormStore } from "@/store/use-seo-form-store";
import { useSettingsStore } from "@/store/use-settings-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormLabelWithCounter from "./form-label-with-counter";


export default function SeoForm() {
  const { title, setTitle, description, setDescription, imageFile, url, setUrl = () => {} } = useSeoFormStore();

  const { titleMaxLength, descriptionMaxLength } = useSettingsStore();

  const seoFormSchema = z.object({
    title: z.string().min(1, "Title is required").max(titleMaxLength, `Title must be less than ${titleMaxLength} characters`),
    description: z.string().max(descriptionMaxLength, `Description must be less than ${descriptionMaxLength} characters`).optional(),
    imageFile: z.any().optional(),
    url: z.url().optional(),
  });
  const seoForm = useForm({
    resolver: zodResolver(seoFormSchema),
    defaultValues: {
      title,
      description,
      imageFile,
    },
  });

  const onSubmit = (data: z.infer<typeof seoFormSchema>) => {
    console.log(data);
  };

  return (
    <div className="mt-6">
      <Form {...seoForm}>
        <form onSubmit={seoForm.handleSubmit(onSubmit)} className="space-y-10">
          <FormField
            control={seoForm.control}
            name={"title"}
            render={({ field }) => (
              <FormItem>
                <FormLabelWithCounter
                  count={title.length}
                  max={titleMaxLength}
                  tooltip={<p>Recommended keep titles under 60 characters for proper display in search results</p>}
                >
                  Title
                </FormLabelWithCounter>
                <FormControl>
                  <Input
                    {...field}
                    maxLength={titleMaxLength}
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    className="text-lg"
                  />
                </FormControl>
                <FormDescription>
                  <KeyCommand>&lt;title /&gt;</KeyCommand> is a required element on any HTML page to be valid markup.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={seoForm.control}
            name={"description"}
            render={({ field }) => (
              <FormItem>
                <FormLabelWithCounter
                  count={description?.length ?? 0}
                  max={descriptionMaxLength}
                  tooltip={
                    <p>Recommended keep descriptions under 160 characters for proper display in search results</p>
                  }
                >
                  Description
                </FormLabelWithCounter>
                <FormControl>
                  <Textarea
                    {...field}
                    className="max-h-32"
                    value={description}
                    onChange={(event) => setDescription?.(event.target.value)}
                    maxLength={descriptionMaxLength}
                  />
                </FormControl>
                <FormDescription>
                  Provide a short description of the page. In some situations, this description is used in the snippet
                  shown in search results.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={seoForm.control}
            name="imageFile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <FileUploader {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={seoForm.control}
            name={"url"}
            render={({ field }) => (
              <FormItem>
                <div className="*:not-first:mt-2">
                  <FormLabel>
                    Page URL <span className="text-muted-foreground text-sm font-normal">(optional)</span>
                  </FormLabel>
                  <FormControl>
                    <div className="shadow-xs flex rounded-md">
                      <span className="border-input bg-background text-muted-foreground -z-10 inline-flex items-center rounded-s-md border px-3 text-sm">
                        https://
                      </span>
                      <Input
                        {...field}
                        className="-ms-px rounded-s-none shadow-none"
                        type="text"
                        placeholder={getHostnameFromUrl(url!)!}
                        onChange={(event) => setUrl(event.target.value)}
                      />
                    </div>
                  </FormControl>
                </div>
                <FormDescription>
                  The URL of the page. This is used by search engines to index your page correctly.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
