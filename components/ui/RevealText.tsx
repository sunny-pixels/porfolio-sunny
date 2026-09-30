"use client";

import { Fragment, useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { revealLines, fadeIn } from "@/lib/animations/text";
import { cn } from "@/lib/cn";

type Props = {
  as?: ElementType;
  /** Explicit, art-directed line breaks. */
  lines?: ReactNode[];
  /** Plain text split word-by-word (used when `lines` is absent). */
  text?: string;
  className?: string;
  lineClassName?: string | ((index: number) => string);
  delay?: number;
  stagger?: number;
  start?: string;
  id?: string;
};

/**
 * Masked typographic reveal — line by line or word by word.
 * Text stays in the DOM as real, selectable, accessible copy.
 */
export default function RevealText({
  as: Tag = "p",
  lines,
  text,
  className,
  lineClassName,
  delay = 0,
  stagger,
  start = "top 86%",
  id,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const items = el.querySelectorAll(".rt-item");
      const mm = gsap.matchMedia();
      // Conditions include the breakpoint so hidden (display:none) variants
      // are re-evaluated when the layout switches.
      mm.add({ motion: MQ.motion, reduce: MQ.reduce, desktop: MQ.desktop }, (ctx) => {
        if (!el.getClientRects().length) return;
        if (!ctx.conditions?.motion) {
          fadeIn(el, { trigger: el });
          return;
        }
        revealLines(items, {
          trigger: el,
          start,
          delay,
          stagger: stagger ?? (lines ? 0.09 : 0.025),
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  const lineClass = (i: number) =>
    typeof lineClassName === "function" ? lineClassName(i) : lineClassName;

  return (
    <Tag ref={ref} id={id} className={className}>
      {lines
        ? lines.map((line, i) => (
            <span key={i} className={cn("mask-line", lineClass(i))}>
              <span className="rt-item block will-change-transform">{line}</span>
            </span>
          ))
        : (text ?? "").split(" ").map((word, i, all) => (
            <Fragment key={i}>
              <span className="mask-word">
                <span className="rt-item inline-block will-change-transform">{word}</span>
              </span>
              {i < all.length - 1 ? " " : null}
            </Fragment>
          ))}
    </Tag>
  );
}
