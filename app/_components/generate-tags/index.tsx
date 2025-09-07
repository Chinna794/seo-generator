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
      <DialogTrigger>
        <Button className="bg-[#1877f2] text-white after:flex-1 hover:bg-[#1877f2]/90">
          Generate Metadata
          <span className="pointer-events-none flex-1">
            <ArrowRightIcon className="opacity-60" size={16} aria-hidden="true" />
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your data from our
            servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
