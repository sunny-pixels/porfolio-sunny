"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { riseIn, drawRule, fadeIn, revealLines } from "@/lib/animations/text";
import { deployments } from "@/lib/content";
import { images } from "@/lib/images";
import SectionLabel from "@/components/ui/SectionLabel";
import Arrow from "@/components/ui/Arrow";

/**
 * Client deployments as a ruled index. On fine pointers a live preview
 * follows the cursor and swaps to whichever row is hovered.
 */
export default function Deployments() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = ref.current!;
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add({ motion: MQ.motion, reduce: MQ.reduce }, (ctx) => {
        if (!ctx.conditions?.motion) {
          fadeIn(q(".dp-fade"), { trigger: root });
          return;
        }
        revealLines(q(".dp-title-line"), { trigger: root, start: "top 75%" });
        riseIn(q(".dp-head-meta"), { trigger: root, start: "top 70%", delay: 0.2 });
        drawRule(q(".dp-rule"), { trigger: q(".dp-list")[0], stagger: 0.08 });
        riseIn(q(".dp-cell"), { trigger: q(".dp-list")[0], stagger: 0.03 });
      });

      mm.add(`${MQ.fine} and ${MQ.motion} and ${MQ.desktop}`, () => {
        const preview = q(".dp-preview")[0] as HTMLElement;
        const shots = q(".dp-shot") as HTMLElement[];
        const list = q(".dp-list")[0] as HTMLElement;
        const xTo = gsap.quickTo(preview, "x", { duration: 0.6, ease: "power3.out" });
        const yTo = gsap.quickTo(preview, "y", { duration: 0.6, ease: "power3.out" });
        let active = -1;

        const show = (i: number) => {
          if (i === active) return;
          active = i;
          shots.forEach((s, j) => gsap.to(s, { opacity: j === i ? 1 : 0, duration: 0.35, ease: "none", overwrite: true }));
        };
        const move = (e: PointerEvent) => {
          const r = list.getBoundingClientRect();
          xTo(e.clientX - r.left);
          yTo(e.clientY - r.top);
          const row = (e.target as Element).closest<HTMLElement>("[data-row]");
          if (row) show(Number(row.dataset.row));
        };
        const enter = (e: PointerEvent) => {
          const r = list.getBoundingClientRect();
          gsap.set(preview, { x: e.clientX - r.left, y: e.clientY - r.top });
          gsap.to(preview, { autoAlpha: 1, scale: 1, duration: 0.5, ease: "expo.out" });
        };
        const leave = () => {
          active = -1;
          gsap.to(preview, { autoAlpha: 0, scale: 0.9, duration: 0.35, ease: "power2.out" });
        };

        gsap.set(preview, { autoAlpha: 0, scale: 0.9 });
        list.addEventListener("pointerenter", enter);
        list.addEventListener("pointermove", move);
        list.addEventListener("pointerleave", leave);
        return () => {
          list.removeEventListener("pointerenter", enter);
          list.removeEventListener("pointermove", move);
          list.removeEventListener("pointerleave", leave);
        };
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      id="clients"
      aria-labelledby="clients-title"
      data-nav-theme="light"
      className="gutter relative bg-chalk pb-[18vh] pt-[18vh] text-ink"
    >
      <SectionLabel index="03" path="deployments/production" className="dp-fade text-slate">
        Client work
      </SectionLabel>

      <div className="mt-[6vh] grid grid-cols-12 items-end gap-x-4 gap-y-8">
        <h2 id="clients-title" className="t-section col-span-12 md:col-span-9">
          <span className="mask-line">
            <span className="dp-title-line dp-fade block">In production</span>
          </span>
          <span className="mask-line md:pl-[16vw]">
            <span className="dp-title-line dp-fade block">
              for clients<span className="text-ember">.</span>
            </span>
          </span>
        </h2>
        <p className="dp-head-meta dp-fade col-span-12 max-w-[34ch] text-slate md:col-span-3 md:col-start-10">
          Company and commerce sites built for clients in India, the United States and the UAE.
        </p>
      </div>

      <div className="relative mt-[10vh]">
        {/* Column heads */}
        <div className="t-micro hidden grid-cols-12 gap-x-4 pb-3 text-slate md:grid">
          <span className="col-span-1">No.</span>
          <span className="col-span-5">Client</span>
          <span className="col-span-4">What it does · Region</span>
          <span className="col-span-2 text-right">Domain</span>
        </div>

        <ul className="dp-list relative">
          {deployments.map((d, i) => (
            <li key={d.name} data-row={i} className="relative">
              <div className="dp-rule h-px origin-left bg-ink/20" />
              <a
                href={d.url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="Visit"
                className="group grid grid-cols-12 items-baseline gap-x-4 gap-y-2 py-6 md:py-[3.2vh]"
              >
                <span className="dp-cell dp-fade t-micro col-span-2 text-slate md:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="dp-cell dp-fade col-span-10 font-display text-[clamp(1.9rem,3.6vw,4.25rem)] font-medium leading-[0.95] tracking-[-0.045em] transition-[color,transform] duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-3 group-hover:text-ember md:col-span-5 md:whitespace-nowrap">
                  {d.name}
                </span>
                <span className="dp-cell dp-fade col-span-10 col-start-3 md:col-span-4 md:col-start-auto">
                  <span className="t-small block text-ink/80">{d.what}</span>
                  <span className="t-micro mt-1 block text-slate">
                    {d.region} · {d.stack}
                  </span>
                </span>
                <span className="dp-cell dp-fade t-mono col-span-10 col-start-3 flex items-center gap-3 text-[0.75rem] md:col-span-2 md:col-start-auto md:justify-end">
                  <span className="truncate">{d.domain}</span>
                  <Arrow direction="up-right" className="shrink-0 text-ember" />
                </span>
                <span className="sr-only"> (opens in a new tab)</span>

                {/* Mobile / touch: inline thumbnail */}
                <span className="dp-cell dp-fade relative col-span-10 col-start-3 mt-4 block aspect-[16/10] overflow-hidden border border-ink/15 bg-bone md:hidden">
                  <Image
                    src={images[d.image].src}
                    alt={images[d.image].alt}
                    fill
                    sizes="80vw"
                    className="object-cover"
                    style={{ objectPosition: images[d.image].position }}
                  />
                </span>
              </a>
            </li>
          ))}
          <li aria-hidden="true" className="dp-rule h-px origin-left bg-ink/20" />
        </ul>

        {/* Cursor preview (fine pointers) */}
        <div
          aria-hidden="true"
          className="dp-preview pointer-events-none invisible absolute left-0 top-0 z-20 hidden w-[24vw] -translate-x-1/2 -translate-y-[110%] md:block"
          style={{ opacity: 0 }}
        >
          <div className="relative aspect-[16/10] overflow-hidden border border-ink/25 bg-bone">
            {deployments.map((d, i) => (
              <div key={d.name} className="dp-shot absolute inset-0" style={{ opacity: i === 0 ? 1 : 0 }}>
                <Image src={images[d.image].src} alt="" fill sizes="24vw" className="object-cover object-top" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
