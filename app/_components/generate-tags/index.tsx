import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowRightIcon } from "lucide-react";

export default function GenerateTags() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer bg-blue-600 text-white transition-all after:flex-1 hover:bg-blue-500/90 active:scale-95">
          Generate Metadata
          <span className="pointer-events-none flex-1">
            <ArrowRightIcon className="opacity-60" size={16} aria-hidden="true" />
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate Metadata</DialogTitle>
          <DialogDescription>
            Click &quot;Confirm&quot; to automatically generate metadata tags for your content. This will help improve
            SEO and social sharing. You can review and edit the generated tags before saving.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
