import { CopyButton } from "@/components/copy-button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { getMetaTagsCode } from "@/lib/get-meta-tags";
import { useMetaTagsStore } from "@/store/use-meta-tags-store";
import { useSeoFormStore } from "@/store/use-seo-form-store";
import { AlertOctagonIcon, TagIcon, XIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { ComponentSource } from "../meta-tags-source";

export default function GenerateTagsModal({ children }: { children: React.ReactNode }) {
  const { code } = useMetaTagsStore();
  const { title, description, url, imageFile } = useSeoFormStore();

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-lg md:max-w-3xl lg:max-w-5xl [&>button:last-child]:hidden">
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="flex items-center justify-between px-6 pt-6">
            <div className="flex items-center gap-2">
              <TagIcon className="text-blue-500" />
              <p>Generated Meta Tags</p>
            </div>
            <DialogClose asChild>
              <Button variant={"ghost"} size={"icon"}>
                <XIcon />
              </Button>
            </DialogClose>
          </DialogTitle>
          <DialogDescription asChild>
            <div className="p-4">
              <Alert variant={"warning"} className="mb-2">
                <AlertOctagonIcon />
                <AlertDescription>
                  <p>Please review the generated metadata, and paths before using it in production.</p>
                </AlertDescription>
              </Alert>
              <ComponentSource
                src={getMetaTagsCode({
                  title,
                  description,
                  url,
                  imageFile,
                })}
              />
              <div className="flex items-center justify-between p-2 text-sm">
                <Label>
                  Insert this code into your{" "}
                  <Link
                    href={"https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/head"}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="rounded-sm bg-neutral-900 p-1 font-mono shadow-md transition-all hover:bg-neutral-800 hover:shadow-lg active:scale-95"
                  >
                    <code>&lt;head /&gt;</code>{" "}
                  </Link>
                  element.
                </Label>
                <CopyButton value={code} />
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
