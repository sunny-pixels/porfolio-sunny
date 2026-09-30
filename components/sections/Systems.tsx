"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, MQ } from "@/lib/gsap";
import { riseIn, fadeIn, revealLines, drawRule } from "@/lib/animations/text";
import { systems } from "@/lib/content";
import { images } from "@/lib/images";
import SectionLabel from "@/components/ui/SectionLabel";
import BrowserFrame from "@/components/ui/BrowserFrame";
import Arrow from "@/components/ui/Arrow";
import PipelineDiagram from "./PipelineDiagram";

/**
 * AI & backend systems as spec sheets. A sticky index on the left tracks
 * which sheet is being read; the sheets carry benchmark figures.
 */
export default function Systems() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = ref.current!;
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      // Index highlighting — informational, so it runs with or without motion.
      const items = q(".sy-index-item");
      q(".sy-sheet").forEach((sheet, i) => {
        ScrollTrigger.create({
          trigger: sheet,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => {
            if (self.isActive) items.forEach((el, j) => el.classList.toggle("is-active", i === j));
          },
        });
      });

      mm.add({ motion: MQ.motion, reduce: MQ.reduce }, (ctx) => {
        if (!ctx.conditions?.motion) {
          fadeIn(q(".sy-fade"), { trigger: root });
          return;
        }
        revealLines(q(".sy-title-line"), { trigger: root, start: "top 75%" });
        riseIn(q(".sy-head-meta"), { trigger: root, start: "top 70%", delay: 0.2 });
        q(".sy-sheet").forEach((sheet) => {
          const s = gsap.utils.selector(sheet);
          drawRule(s(".sy-rule"), { trigger: sheet, start: "top 82%" });
          riseIn(s(".sy-rise"), { trigger: sheet, start: "top 78%", stagger: 0.05 });
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      id="systems"
      aria-labelledby="systems-title"
      data-nav-theme="dark"
      className="gutter relative bg-graphite pb-[18vh] pt-[18vh] text-chalk"
    >
      <SectionLabel index="04" path="systems/ai-backend" className="sy-fade text-fog">
        Systems
      </SectionLabel>

      <div className="mt-[6vh] grid grid-cols-12 items-end gap-x-4 gap-y-8">
        <h2 id="systems-title" className="t-section col-span-12 md:col-span-9">
          <span className="mask-line">
            <span className="sy-title-line sy-fade block">Under</span>
          </span>
          <span className="mask-line md:pl-[12vw]">
            <span className="sy-title-line sy-fade block">
              the hood<span className="text-dusk">.</span>
            </span>
          </span>
        </h2>
        <p className="sy-head-meta sy-fade col-span-12 max-w-[36ch] text-fog md:col-span-3 md:col-start-10">
          AI and backend work: retrieval, embeddings, guardrails and the production safeguards around them.
        </p>
      </div>

      <div className="sy-fade mt-[12vh]">
        <PipelineDiagram />
      </div>

      <div className="mt-[16vh] grid grid-cols-12 gap-x-4">
        {/* Sticky index */}
        <nav aria-label="Systems index" className="col-span-3 hidden md:block">
          <ol className="sticky top-[18vh] space-y-3">
            {systems.map((s) => (
              <li key={s.id} className="sy-index-item group">
                <a href={`#${s.id.toLowerCase()}`} className="flex items-baseline gap-3 text-fog transition-colors duration-300 group-[.is-active]:text-chalk">
                  <span className="t-micro transition-colors duration-300 group-[.is-active]:text-dusk">{s.id}</span>
                  <span className="font-display text-[1.25rem] font-medium tracking-[-0.02em]">{s.name}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="col-span-12 space-y-[14vh] md:col-span-9 md:col-start-4">
          {systems.map((s) => {
            const img = s.image ? images[s.image] : null;
            return (
              <article key={s.id} id={s.id.toLowerCase()} aria-labelledby={`${s.id}-name`} className="sy-sheet scroll-mt-24">
                <div className="sy-rule h-px origin-left bg-chalk/20" />
                <header className="sy-rise sy-fade t-micro flex justify-between gap-4 pt-4 text-fog">
                  <span>
                    <span className="text-dusk">{s.id}</span> — {s.kind}
                  </span>
                  <span className="hidden sm:inline">spec sheet</span>
                </header>

                <div className="mt-8 grid grid-cols-9 gap-x-4 gap-y-8">
                  <div className="col-span-9 lg:col-span-5">
                    <h3 id={`${s.id}-name`} className="sy-rise sy-fade t-editorial">
                      {s.name}
                    </h3>
                    <p className="sy-rise sy-fade mt-5 max-w-[48ch] leading-relaxed text-chalk/80">{s.summary}</p>
                    <ul className="sy-rise sy-fade mt-6 space-y-2">
                      {s.points.map((p) => (
                        <li key={p} className="t-small flex gap-3 text-chalk/80">
                          <span aria-hidden="true" className="t-mono text-dusk">—</span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <dl className="col-span-9 grid grid-cols-2 gap-x-4 self-start lg:col-span-4 lg:col-start-6">
                    {s.figures.map((f) => (
                      <div key={f.label} className="sy-rise sy-fade border-t border-chalk/15 pt-3">
                        <dt className="sr-only">{f.label}</dt>
                        <dd>
                          <span className="block font-display text-[clamp(2rem,3.6vw,3.75rem)] font-medium leading-none tracking-[-0.05em] text-dusk">
                            {f.value}
                          </span>
                          <span aria-hidden="true" className="t-small mt-2 block text-fog">
                            {f.label}
                          </span>
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="mt-10 grid grid-cols-9 items-end gap-x-4 gap-y-8">
                  <div className="col-span-9 lg:col-span-5">
                    <p className="sy-rise sy-fade t-mono text-[0.75rem] leading-relaxed text-fog">
                      <span className="text-chalk/60">stack:</span> [{s.stack.map((t) => `"${t}"`).join(", ")}]
                    </p>
                    <ul className="sy-rise sy-fade mt-6 flex flex-wrap gap-x-8 gap-y-3">
                      {s.links.map((l) => (
                        <li key={l.href}>
                          <a href={l.href} target="_blank" rel="noopener noreferrer" className="link-line t-micro" data-cursor="Open">
                            {l.label} <Arrow direction="up-right" className="text-dusk" />
                            <span className="sr-only"> — {s.name} (opens in a new tab)</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {img ? (
                    <a
                      href={s.links[0].href}
                      target="_blank"
                      rel="noopener noreferrer"
                      tabIndex={-1}
                      aria-hidden="true"
                      data-cursor="Open"
                      className="sy-rise sy-fade col-span-9 block sm:col-span-6 lg:col-span-4 lg:col-start-6"
                    >
                      <BrowserFrame url={s.links[0].href}>
                        <div className="img-hover relative aspect-[16/10] overflow-hidden">
                          <Image src={img.src} alt="" fill sizes="(min-width: 1024px) 26vw, 80vw" className="object-cover object-top" />
                        </div>
                      </BrowserFrame>
                    </a>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
