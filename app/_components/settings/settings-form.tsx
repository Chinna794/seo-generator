import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { useSettingsStore } from "@/store/use-settings-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageUpIcon } from "lucide-react";
import { Label, NumberField } from "react-aria-components";

import { useForm } from "react-hook-form";
import { z } from "zod";
import InputNumberSettingsField from "./input-number-settings-field";

const settingsFormSchema = z.object({
  titleMaxLength: z.number().int().min(1).max(300).default(60),
  descriptionMaxLength: z.number().int().min(1).max(600).default(160),
  isFileImage: z.boolean().default(true),
});

export default function SettingsForm() {
  const {
    titleMaxLength,
    descriptionMaxLength,
    setTitleMaxLength,
    setDescriptionMaxLength,
    isFileImage,
    setIsFileImage,
  } = useSettingsStore();

  const settingsForm = useForm({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: {
      titleMaxLength,
      descriptionMaxLength,
      isFileImage,
    },
  });

  const handleSubmit = (data: z.infer<typeof settingsFormSchema>) => {
    const { titleMaxLength, descriptionMaxLength, isFileImage } = data;

    const parseNumber = (val: unknown): number | null => {
      if (typeof val === "number") return isNaN(val) ? null : val;
      if (typeof val === "string") {
        const parsed = parseInt(val, 10);
        return isNaN(parsed) ? null : parsed;
      }
      return null;
    };

    const parsedTitle = parseNumber(titleMaxLength);
    const parsedDescription = parseNumber(descriptionMaxLength);

    if (parsedTitle === null || parsedDescription === null) return;

    setTitleMaxLength(parsedTitle);
    setDescriptionMaxLength(parsedDescription);
    setIsFileImage?.(isFileImage);
  };

  return (
    <div>
      <Form {...settingsForm}>
        <form className="space-y-10" onSubmit={settingsForm.handleSubmit(handleSubmit)}>
          <FormField
            control={settingsForm.control}
            name="titleMaxLength"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <NumberField defaultValue={2048} minValue={0} {...field}>
                    <div className="*:not-first:mt-2">
                      <FormLabel asChild>
                        <Label className="text-foreground text-sm font-medium">Title Max Length</Label>
                      </FormLabel>
                      <InputNumberSettingsField />
                    </div>
                  </NumberField>
                </FormControl>
                <FormDescription>
                  <span className="text-muted-foreground mt-2 text-xs" role="region" aria-live="polite">
                    Built with{" "}
                    <a
                      className="hover:text-foreground underline"
                      href="https://react-spectrum.adobe.com/react-aria/DateField.html"
                      target="_blank"
                      rel="noopener nofollow"
                    >
                      React Aria
                    </a>
                  </span>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={settingsForm.control}
            name="descriptionMaxLength"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <NumberField minValue={0} {...field}>
                    <div className="*:not-first:mt-2">
                      <FormLabel asChild>
                        <Label className="text-foreground text-sm font-medium">Description Max Length</Label>
                      </FormLabel>
                      <InputNumberSettingsField />
                    </div>
                  </NumberField>
                </FormControl>
                <FormDescription>
                  <span className="text-muted-foreground mt-2 text-xs" role="region" aria-live="polite">
                    Built with{" "}
                    <a
                      className="hover:text-foreground underline"
                      href="https://react-spectrum.adobe.com/react-aria/DateField.html"
                      target="_blank"
                      rel="noopener nofollow"
                    >
                      React Aria
                    </a>
                  </span>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={settingsForm.control}
            name="isFileImage"
            render={({ field }) => (
              <FormItem>
                <div className="border-input has-data-[state=checked]:border-primary/50 shadow-xs relative flex w-full items-start gap-2 rounded-md border p-4 outline-none">
                  <FormControl>
                    <Switch
                      id={"isFileImage"}
                      className="order-1 h-4 w-6 after:absolute after:inset-0 [&_span]:size-3 data-[state=checked]:[&_span]:translate-x-2 data-[state=checked]:[&_span]:rtl:-translate-x-2"
                      aria-describedby={`$isFileImage-description`}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      defaultChecked
                    />
                  </FormControl>
                  <div className="flex grow items-center gap-3">
                    <ImageUpIcon />
                    <div className="grid grow gap-2">
                      <FormLabel htmlFor={"isFileImage"}>
                        Change Image Meta-Tag{" "}
                        <span className="text-muted-foreground text-xs font-normal leading-[inherit]">
                          (default: Image File)
                        </span>
                      </FormLabel>
                      <p id={`isFileImage-description`} className="text-muted-foreground text-xs">
                        Could be an Image File or URL
                      </p>
                    </div>
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between gap-5">
            <DialogClose asChild type="button">
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit" className="cursor-pointer bg-blue-600 text-white hover:bg-blue-500/90">
                Save Settings
              </Button>
            </DialogClose>
          </div>
        </form>
      </Form>
    </div>
  );
}
