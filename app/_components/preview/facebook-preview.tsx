import { Label } from "@/components/ui/label";
import { getHostnameFromUrl } from "@/lib/get-hostname-from-url";
import { useSeoFormStore } from "@/store/use-seo-form-store";
import Image from "next/image";

export default function FacebookPreview() {
  const { url, title, description } = useSeoFormStore();

  return (
    <div>
      <Label className="mb-6">Facebook</Label>
      <div className="group w-[500px] cursor-pointer rounded-sm border bg-neutral-800 transition hover:brightness-95">
        <Image src={"/placeholder.jpg"} alt="Facebook Preview" layout="responsive" width={500} height={250} />
        <div className="border-t px-3 py-2.5">
          <p className="text-sm uppercase text-neutral-400">{getHostnameFromUrl(url!)}</p>
          <p className="font-semibold">{title}</p>
          <p className="truncate text-sm text-neutral-400">{description}</p>
        </div>
      </div>
    </div>
  );
}
