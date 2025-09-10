import { CopyButton } from "@/components/copy-button";
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
import { getMetaTagsCode } from "@/lib/get-meta-tags";
import { useMetaTagsStore } from "@/store/use-meta-tags-store";
import { useSeoFormStore } from "@/store/use-seo-form-store";
import { OctagonAlertIcon, TagIcon, XIcon } from "lucide-react";
import React from "react";
import { ComponentSource } from "../metatags-source";

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
            <div className="p-6">
              <span className="text-muted-foreground group mb-4 flex max-w-xl items-center gap-3 rounded-md bg-neutral-900 p-3 text-sm">
                <OctagonAlertIcon className="text-orange-400" />
                <span className="text-orange-300 transition-colors group-hover:text-orange-400">
                  Please review the generated metadata, and paths before using it in production.
                </span>
              </span>
              <ComponentSource
                src={getMetaTagsCode({
                  title,
                  description,
                  url,
                  imageFile,
                })}
              />
              <div className="flex items-center justify-between p-2 text-sm">
                <p>
                  Insert this code into your <code>&lt;head /&gt;</code> element.
                </p>
                <CopyButton value={code} />
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
