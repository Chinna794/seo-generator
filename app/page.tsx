import { cn } from "@/lib/utils";
import styles from "./container.module.css";

export default function Home() {
  return (
    <main
      aria-labelledby="container"
      className={cn(
        "mx-auto grid h-screen max-w-6xl grid-cols-[500px_1fr] items-start justify-center gap-5 px-4 py-4 pb-0",
      )}
    >
      <div className={cn("h-full overflow-y-scroll", styles.container)}>
        form here
        <div>4</div>
        <div>5</div>
      </div>
      <div className="h-full">preview</div>
    </main>
  );
}
