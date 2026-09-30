import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  url: string;
  children: ReactNode;
  className?: string;
  tone?: "dark" | "light";
};

/**
 * A hairline "window": a single mono address line over the screenshot.
 * No traffic lights, no skeuomorphic chrome — just enough to say "live site".
 */
export default function BrowserFrame({ url, children, className, tone = "dark" }: Props) {
  const host = url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  return (
    <div
      className={cn(
        "flex flex-col border",
        tone === "dark" ? "border-chalk/15 bg-graphite" : "border-ink/15 bg-bone",
        className,
      )}
    >
      <div
        className={cn(
          "t-mono flex items-center gap-3 border-b px-3 py-2 text-[0.6875rem]",
          tone === "dark" ? "border-chalk/15 text-fog" : "border-ink/15 text-slate",
        )}
      >
        <span aria-hidden="true" className="flex gap-1">
          <span className="size-1.5 rounded-full bg-current opacity-50" />
          <span className="size-1.5 rounded-full bg-current opacity-30" />
          <span className="size-1.5 rounded-full bg-current opacity-20" />
        </span>
        <span className="truncate">https://{host}</span>
        <span className="ml-auto flex shrink-0 items-center gap-1.5">
          <span aria-hidden="true" className="relative flex size-1.5">
            <span className="absolute inset-0 rounded-full bg-dusk [animation:pulse-dot_2s_ease-out_infinite]" />
            <span className="relative size-1.5 rounded-full bg-dusk" />
          </span>
          live
        </span>
      </div>
      <div className="relative flex-1">{children}</div>
    </div>
  );
}
