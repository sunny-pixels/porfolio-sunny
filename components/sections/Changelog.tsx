"use client";

import { useRef } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { riseIn, fadeIn, revealLines } from "@/lib/animations/text";
import { changelog } from "@/lib/content";
import SectionLabel from "@/components/ui/SectionLabel";

/**
 * Experience as a commit log: a git graph rail on the left, hash + date,
 * the role set large, and the diff (what changed) on the right.
 */
export default function Changelog() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = ref.current!;
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add({ motion: MQ.motion, reduce: MQ.reduce }, (ctx) => {
        if (!ctx.conditions?.motion) {
          fadeIn(q(".cl-fade"), { trigger: root });
          return;
        }
        revealLines(q(".cl-title-line"), { trigger: root, start: "top 75%" });
        gsap.fromTo(
          q(".cl-rail"),
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: q(".cl-list")[0], start: "top 70%", end: "bottom 60%", scrub: true },
          },
        );
        q(".cl-commit").forEach((c) => {
          const s = gsap.utils.selector(c);
          gsap.fromTo(s(".cl-node"), { scale: 0 }, { scale: 1, duration: 0.5, ease: "expo.out", scrollTrigger: { trigger: c, start: "top 70%" } });
          revealLines(s(".cl-role"), { trigger: c, start: "top 78%" });
          riseIn(s(".cl-rise"), { trigger: c, start: "top 75%", stagger: 0.05 });
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      id="experience"
      aria-labelledby="experience-title"
      data-nav-theme="light"
      className="gutter relative bg-chalk pb-[16vh] pt-[18vh] text-ink"
    >
      <SectionLabel index="05" path="CHANGELOG.md" className="cl-fade text-slate">
        Experience
      </SectionLabel>

      <h2 id="experience-title" className="t-section mt-[6vh]">
        <span className="mask-line">
          <span className="cl-title-line cl-fade block">
            Changelog<span className="text-ember">.</span>
          </span>
        </span>
      </h2>

      <ol className="cl-list relative mt-[10vh]">
        {/* Git graph rail */}
        <span aria-hidden="true" className="absolute bottom-0 left-[5px] top-2 w-px bg-ink/12" />
        <span aria-hidden="true" className="cl-rail absolute bottom-0 left-[5px] top-2 w-px origin-top bg-ember" />

        {changelog.map((c) => (
          <li key={c.hash} className="cl-commit relative grid grid-cols-12 gap-x-4 gap-y-4 pb-[10vh] pl-8 last:pb-0 md:pl-0">
            <span
              aria-hidden="true"
              className="cl-node absolute left-0 top-1.5 block size-[11px] rounded-full border border-ember bg-chalk md:left-0"
            >
              <span className="absolute inset-[3px] rounded-full bg-ember" />
            </span>

            <div className="cl-rise cl-fade t-mono col-span-12 text-[0.75rem] md:col-span-3 md:pl-10">
              <p>
                <span className="text-ember">commit {c.hash}</span>
                <span className="text-slate"> ({c.tag})</span>
              </p>
              <p className="mt-1 text-slate">{c.period}</p>
            </div>

            <div className="col-span-12 md:col-span-5 md:col-start-4">
              <h3 className="t-title">
                <span className="mask-line">
                  <span className="cl-role cl-fade block">{c.role}</span>
                </span>
              </h3>
              <p className="cl-rise cl-fade mt-2 flex flex-wrap items-baseline gap-x-3 text-slate">
                {c.href ? (
                  <a href={c.href} target="_blank" rel="noopener noreferrer" className="link-line font-medium text-ink">
                    {c.org}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : (
                  <span className="font-medium text-ink">{c.org}</span>
                )}
                <span className="t-small">{c.orgNote}</span>
              </p>
            </div>

            <ul className="col-span-12 space-y-2 md:col-span-4 md:col-start-9">
              {c.points.map((p) => (
                <li key={p} className="cl-rise cl-fade t-small flex gap-3 text-slate">
                  <span aria-hidden="true" className="t-mono text-ember">+</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}
