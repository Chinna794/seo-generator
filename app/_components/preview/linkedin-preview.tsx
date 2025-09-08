import { LinkedIn } from "@/components/icons/linkedin";
import { Label } from "@/components/ui/label";
import { getHostnameFromUrl } from "@/lib/get-hostname-from-url";
import { useSeoFormStore } from "@/store/use-seo-form-store";
import Image from "next/image";
import Link from "next/link";

export default function LinkedinPreview() {
  const { url, title, description } = useSeoFormStore();

  return (
    <div>
      <Label className="mb-6">
        <LinkedIn />
        LinkedIn
      </Label>
      <Link
        href={url!}
        target="_blank"
        rel="noopener noreferrer"
        className="group block cursor-pointer rounded-sm border bg-neutral-800 transition hover:brightness-95"
      >
        <Image src={"/placeholder.jpg"} alt="Facebook Preview" layout="responsive" width={500} height={250} />
        <div className="border-t px-3 py-2.5">
          <p>{title}</p>
          <p className="text-xs uppercase text-neutral-400">{getHostnameFromUrl(url!)}</p>
        </div>
      </Link>
    </div>
  );
}
