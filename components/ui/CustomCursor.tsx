"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";

/**
 * Fine-pointer cursor: a square point and a lagging bracket frame that
 * becomes a labelled tag ("Visit", "Open") over elements with `data-cursor`.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(`${MQ.fine} and ${MQ.motion}`, () => {
      const dot = dotRef.current!;
      const ring = ringRef.current!;
      const root = document.documentElement;
      root.classList.add("has-cursor");

      const dx = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power3.out" });
      const dy = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power3.out" });
      const rx = gsap.quickTo(ring, "x", { duration: 0.4, ease: "power3.out" });
      const ry = gsap.quickTo(ring, "y", { duration: 0.4, ease: "power3.out" });
      let visible = false;
      let current: string | null = null;

      const move = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        if (!visible) {
          visible = true;
          gsap.set([dot, ring], { x: e.clientX, y: e.clientY });
          gsap.to([dot, ring], { autoAlpha: 1, duration: 0.3 });
        }
        dx(e.clientX);
        dy(e.clientY);
        rx(e.clientX);
        ry(e.clientY);

        const target = (e.target as Element | null)?.closest?.("[data-cursor], a, button");
        const next = target ? (target.getAttribute("data-cursor") ?? "__link") : null;
        if (next === current) return;
        current = next;
        if (next && next !== "__link") {
          setLabel(next);
          gsap.to(ring, { scale: 1, backgroundColor: "rgba(255,91,54,1)", borderColor: "rgba(255,91,54,0)", duration: 0.45, ease: "expo.out" });
          gsap.to(dot, { scale: 0, duration: 0.2 });
        } else if (next === "__link") {
          setLabel("");
          gsap.to(ring, { scale: 0.5, backgroundColor: "rgba(255,91,54,0)", borderColor: "rgba(255,91,54,1)", duration: 0.45, ease: "expo.out" });
          gsap.to(dot, { scale: 1, duration: 0.2 });
        } else {
          setLabel("");
          gsap.to(ring, { scale: 0.32, backgroundColor: "rgba(255,91,54,0)", borderColor: "rgba(157,162,172,0.8)", duration: 0.45, ease: "expo.out" });
          gsap.to(dot, { scale: 1, duration: 0.2 });
        }
      };
      const leave = () => {
        visible = false;
        gsap.to([dot, ring], { autoAlpha: 0, duration: 0.2 });
      };

      gsap.set(ring, { scale: 0.32 });
      window.addEventListener("pointermove", move, { passive: true });
      document.addEventListener("pointerleave", leave);
      return () => {
        root.classList.remove("has-cursor");
        window.removeEventListener("pointermove", move);
        document.removeEventListener("pointerleave", leave);
      };
    });
    return () => mm.revert();
  });

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[150] hidden mix-blend-normal [@media(hover:hover)_and_(pointer:fine)]:block">
      <div
        ref={ringRef}
        className="invisible absolute left-0 top-0 -ml-10 -mt-10 flex size-20 items-center justify-center border border-fog/80 opacity-0"
      >
        <span className="t-micro text-[0.625rem] text-ink">{label}</span>
      </div>
      <div ref={dotRef} className="invisible absolute left-0 top-0 -ml-[3px] -mt-[3px] size-1.5 bg-dusk opacity-0" />
    </div>
  );
}
