"use client";

import { useRef } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { fadeIn } from "@/lib/animations/text";
import { pipeline } from "@/lib/content";

type Step = (typeof pipeline)[number];

/** One pipeline stage. `--on` (0→1) is tweened by scroll to light it. */
function Stage({ p, className, vertical }: { p: Step; className: string; vertical?: boolean }) {
  const marker = (
    <span
      aria-hidden="true"
      className={`relative z-10 block size-3 shrink-0 border ${vertical ? "mt-1.5" : "-mt-[5px]"}`}
      style={{
        backgroundColor: "color-mix(in srgb, var(--color-dusk) calc(var(--on) * 100%), var(--color-graphite))",
        borderColor: "color-mix(in srgb, var(--color-dusk) calc(var(--on) * 100%), rgb(241 240 236 / 0.5))",
      }}
    />
  );
  const text = (
    <div className={vertical ? "" : "mt-4"}>
      <p className="t-micro text-fog">{p.id}</p>
      <p className="mt-1 font-display text-[1.5rem] font-medium tracking-[-0.03em]" style={{ opacity: "calc(0.35 + var(--on) * 0.65)" }}>
        {p.label}
      </p>
      <p className="t-mono mt-1 text-[0.75rem] text-fog">{p.note}</p>
    </div>
  );
  return (
    <div className={className} style={{ "--on": 0 } as React.CSSProperties}>
      {marker}
      {text}
    </div>
  );
}

/**
 * fig. 02 — the Career Lens matching pipeline, drawn by scroll. A data
 * packet travels the main line; each stage lights as it passes. Vertical on small screens.
 */
export default function PipelineDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const n = pipeline.length;
  const joinAt = pipeline.findIndex((p) => p.label === "Retrieve");

  useGSAP(
    () => {
      const root = ref.current!;
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add({ motion: MQ.motion, reduce: MQ.reduce, desktop: MQ.desktop }, (ctx) => {
        const { motion, desktop } = ctx.conditions ?? {};
        const stages = q(desktop ? ".pd-stage-d" : ".pd-stage-m");
        if (!motion) {
          fadeIn(root, { trigger: root });
          gsap.set(stages, { "--on": 1 });
          return;
        }
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: root, start: "top 78%", end: "bottom 50%", scrub: 0.6 },
        });
        if (desktop) {
          tl.fromTo(q(".pd-main"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1 }, 0)
            .fromTo(q(".pd-packet-d"), { left: "0%" }, { left: "100%", duration: 1 }, 0);
        } else {
          tl.fromTo(q(".pd-rail-m"), { scaleY: 0 }, { scaleY: 1, duration: 1 }, 0).fromTo(
            q(".pd-packet-m"),
            { top: "0%" },
            { top: "100%", duration: 1 },
            0,
          );
        }
        stages.forEach((s, i) => {
          tl.fromTo(s, { "--on": 0 }, { "--on": 1, duration: 0.08 }, Math.max(0, (i + 0.5) / n - 0.06));
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <figure ref={ref} className="relative">
      <figcaption className="t-micro flex justify-between text-fog">
        <span>fig. 02 — Career Lens · matching pipeline</span>
        <span className="hidden md:inline">scroll to run ▸</span>
      </figcaption>

      {/* Desktop: horizontal */}
      <div className="relative mt-10 hidden md:block">
        <svg aria-hidden="true" viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute inset-x-0 top-0 h-[7.5rem] w-full" fill="none">
          <path d="M0 6H1200" stroke="currentColor" strokeOpacity="0.12" vectorEffect="non-scaling-stroke" />
          <path className="pd-main" d="M0 6H1200" stroke="var(--color-dusk)" pathLength={1} strokeDasharray="1" />
        </svg>
        <span aria-hidden="true" className="pd-packet-d absolute top-[6px] z-20 -ml-1 -mt-1 block size-2 bg-dusk shadow-[0_0_0_4px_rgb(255_91_54/0.2)]" />
        <ol aria-label="Career Lens pipeline stages" className="relative grid" style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}>
          {pipeline.map((p) => (
            <li key={p.id} className="flex">
              <Stage p={p} className="pd-stage-d flex w-full flex-col items-start pr-4" />
            </li>
          ))}
        </ol>
        <p className="t-mono relative mt-8 text-[0.75rem] text-fog" style={{ marginLeft: `${(joinAt / n) * 100}%` }}>
          ↑ JSearch job feed via RapidAPI
        </p>
      </div>

      {/* Mobile: vertical */}
      <div className="relative mt-8 md:hidden">
        <span aria-hidden="true" className="absolute bottom-0 left-[5px] top-0 w-px bg-chalk/12" />
        <span aria-hidden="true" className="pd-rail-m absolute bottom-0 left-[5px] top-0 w-px origin-top bg-dusk" />
        <span aria-hidden="true" className="pd-packet-m absolute left-[1px] z-20 -mt-1 block size-2 bg-dusk" />
        <ol aria-label="Career Lens pipeline stages" className="space-y-8">
          {pipeline.map((p) => (
            <li key={p.id}>
              <Stage p={p} vertical className="pd-stage-m flex gap-5" />
            </li>
          ))}
        </ol>
      </div>
    </figure>
  );
}
