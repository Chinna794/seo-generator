"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { BreadcrumbsField } from "./form-components/breadcrumbs-field";
import { CanonicalField } from "./form-components/canonical-field";
import { ContentFields } from "./form-components/content-fields";
import { DescriptionField } from "./form-components/description-field";
import { HreflangsField } from "./form-components/hreflangs-field";
import { ImagesField } from "./form-components/images-field";
import { LanguageField } from "./form-components/language-field";
import { OGField } from "./form-components/og-field";
import { RobotsField } from "./form-components/robots-field";
import { SlugField } from "./form-components/slug-field";
import { StructuredDataField } from "./form-components/structured-data-field";
import { TitleField } from "./form-components/title-field";
import { TwitterField } from "./form-components/twitter-field";
import { defaultSeoFormSchemaValue, SeoFormInput, seoFormSchema } from "./form-schema";

export function SeoForm() {
  const form = useForm<SeoFormInput>({
    resolver: zodResolver(seoFormSchema),
    defaultValues: defaultSeoFormSchemaValue,
    mode: "onBlur",
  });

  const handleSubmit = form.handleSubmit((values) => {
    // Si necesitas el output: const parsed = seoFormSchema.parse(values);
    console.log({ values });
  });

  return (
    <div className="mx-auto max-w-3xl">
      <Form {...form}>
        <form onSubmit={handleSubmit} className="grid gap-6">
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-base">Basics</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <TitleField form={form} />
              <DescriptionField form={form} />
              <SlugField form={form} />
              <CanonicalField form={form} />
              <LanguageField form={form} />
            </CardContent>
          </Card>

          <RobotsField form={form} />
          <ContentFields form={form} />
          <ImagesField form={form} />
          <OGField form={form} />
          <TwitterField form={form} />
          <HreflangsField form={form} />
          <StructuredDataField form={form} />
          <BreadcrumbsField form={form} />

          <div className="flex items-center justify-end gap-3">
            <Button type="button" variant="secondary" onClick={() => form.reset(defaultSeoFormSchemaValue)}>
              Reset
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
