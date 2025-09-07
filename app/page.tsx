"use client";
import { cn } from "@/lib/utils";
import OfficialDebuggers from "./_components/debugger";
import Header from "./_components/header";
import FacebookPreview from "./_components/preview/facebook-preview";
import GooglePreview from "./_components/preview/google-preview";
import SlackPreview from "./_components/preview/slack-preview";
import TwitterPreview from "./_components/preview/twitter-preview";
import SeoForm from "./_components/seo-form";

export default function Home() {
  return (
    <main aria-labelledby="container" className={cn("mx-auto max-w-6xl px-8 pb-12 xl:px-4")}>
      <Header />
      <section className="mt-10 grid grid-cols-[350px_1fr] items-start justify-center gap-20">
        <div className={cn("sticky top-0 h-fit overflow-y-auto")}>
          <p className={"containerTitle"}>Metadata</p>
          <SeoForm />
          <OfficialDebuggers />
        </div>
        <div>
          <p className={"containerTitle"}>Preview</p>
          <div className="mt-6 space-y-10">
            <GooglePreview />
            <TwitterPreview />
            <FacebookPreview />
            <SlackPreview />
          </div>
        </div>
      </section>
    </main>
  );
}
