import { FaviconExample } from "@/components/favicon";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { OctagonAlertIcon } from "lucide-react";
import React from "react";

export default function GenerateTagsModal({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FaviconExample color="#2a81fb" className="size-6" />
            Your Metadata Generated
          </DialogTitle>
          <DialogDescription>
            <div className="text-muted-foreground flex items-start gap-3 text-sm">
              <OctagonAlertIcon />
              <span>Please review the generated metadata, and paths before using it in production.</span>
            </div>
          </DialogDescription>
        </DialogHeader>
        <div></div>
      </DialogContent>
    </Dialog>
  );
}
