import { FaviconExample } from "@/components/favicon";
import { Label } from "@/components/ui/label";
import { useSeoFormStore } from "@/store/use-seo-form-store";
import Image from "next/image";
import Link from "next/link";

export default function SlackPreview() {
  const { title, description, url } = useSeoFormStore();
  return (
    <div>
      <Label className="mb-6">Slack</Label>
      <div className="group max-w-[500px] cursor-pointer space-y-2 rounded-r-lg border-l-4 border-neutral-700 bg-neutral-900/50 p-4 pl-4">
        <div className="flex items-center gap-2">
          <FaviconExample color="#2a81fb" className="size-5" />
          <Link href={url!} className="capitalize text-neutral-500">
            {title.slice(0, 35)}
          </Link>
        </div>
        <p className="font-semibold text-[#1698e4] group-hover:underline">{title}</p>
        <p className="text-neutral-300">{description}</p>
        <Image src={"/placeholder.jpg"} alt="Slack Preview" width={350} height={200} className="rounded-md" />
      </div>
    </div>
  );
}
