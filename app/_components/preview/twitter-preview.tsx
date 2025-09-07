import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { getHostnameFromUrl } from "@/lib/get-hostname-from-url";
import { useSeoFormStore } from "@/store/use-seo-form-store";
import Link from "next/link";

export default function TwitterPreview() {
  const { title, description, imageFile, url } = useSeoFormStore();

  return (
    <div>
      <Label className="mb-4">X (Formerly Twitter)</Label>
      <div className="flex h-[250px] w-[500px] items-end rounded-2xl bg-[url('/placeholder.jpg')] bg-cover bg-center bg-no-repeat p-4">
        <Badge variant={"secondary"} className="truncate">
          {title}
        </Badge>
      </div>
      <Link className="mt-1 text-xs text-neutral-400 hover:underline" href={"/"}>
        From {getHostnameFromUrl(url!)}
      </Link>
    </div>
  );
}
