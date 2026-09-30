"use client";

import { useRef } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { countUp } from "@/lib/animations/text";
import { cn } from "@/lib/cn";

type Props = { to: number; pad?: number; suffix?: string; className?: string };

/** Stepped numeric counter; renders the final value for SSR and reduced motion. */
export default function Counter({ to, pad = 0, suffix = "", className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const final = String(to).padStart(pad, "0") + suffix;

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MQ.motion, () => {
      const tween = countUp(ref.current!, { to, pad, suffix });
      return () => {
        tween.kill();
        if (ref.current) ref.current.textContent = final;
      };
    });
    return () => mm.revert();
  });

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {final}
    </span>
  );
}
