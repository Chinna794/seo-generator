import { Google } from "@/components/icons/google";
import { Label } from "@/components/ui/label";
import { useSeoFormStore } from "@/store/use-seo-form-store";
import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";

export default function GooglePreview() {
  const { title, description, imageFile, url } = useSeoFormStore();

  return (
    <div>
      <Label className="mb-6">
        <Google />
        Google
      </Label>
      <div className="">
        <Link href={url!} className="font-semibold text-[#99c3ff] transition hover:brightness-125">
          {title}
        </Link>
        <span className="flex items-center text-sm text-[#00b339] transition hover:underline">
          {url} <ChevronDownIcon className="size-4" />
        </span>
        <p className="text-sm text-neutral-400">{description}</p>
      </div>
    </div>
  );
}
