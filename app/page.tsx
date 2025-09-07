"use client";
import { cn } from "@/lib/utils";
import styles from "./container.module.css";
import Header from "./_components/header";

export default function Home() {
  return (
    <main aria-labelledby="container" className={cn("mx-auto h-screen max-w-6xl px-8 xl:px-4")}>
      <Header />
      <section className="grid grid-cols-[500px_1fr] items-start justify-center gap-5">
        <div className={cn("h-full overflow-y-scroll", styles.container)}>form here</div>
        <div className="h-full">preview</div>
      </section>
    </main>
  );
}
