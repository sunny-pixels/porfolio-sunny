"use client";

import { useRef } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { riseIn, drawRule, fadeIn } from "@/lib/animations/text";
import { about, profile } from "@/lib/content";
import RevealText from "@/components/ui/RevealText";
import SectionLabel from "@/components/ui/SectionLabel";
import Counter from "@/components/ui/Counter";
import Arrow from "@/components/ui/Arrow";

const META = [
  ["Role", `${profile.role} @ Blitz Infocom`],
  ["Based", profile.city],
  ["Focus", "Interfaces · AI systems · APIs"],
  ["Studying", "B.Tech CSE, PDEU"],
] as const;

/** README.md — margin metadata, one large statement, the short version. */
export default function About() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = ref.current!;
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add({ motion: MQ.motion, reduce: MQ.reduce }, (ctx) => {
        if (!ctx.conditions?.motion) {
          fadeIn(q(".ab-rise"), { trigger: root });
          return;
        }
        // Tone transition: the section scrubs from ink into chalk as it enters.
        gsap.fromTo(
          root,
          { backgroundColor: "#0d0e11", color: "#f1f0ec" },
          {
            backgroundColor: "#f1f0ec",
            color: "#0d0e11",
            ease: "none",
            scrollTrigger: { trigger: root, start: "top 90%", end: "top 25%", scrub: true },
          },
        );
        riseIn(q(".ab-rise"), { trigger: q(".ab-body")[0] });
        drawRule(q(".ab-rule"), { trigger: q(".ab-stats")[0] });
        riseIn(q(".ab-stat"), { trigger: q(".ab-stats")[0], stagger: 0.08 });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      id="about"
      aria-labelledby="about-title"
      data-nav-theme="light"
      className="gutter relative bg-chalk pb-[16vh] pt-[18vh] text-ink"
    >
      <SectionLabel index="01" path="README.md" className="text-slate">
        About
      </SectionLabel>

      <div className="mt-[8vh] grid grid-cols-12 gap-x-4 gap-y-10">
        <dl className="ab-body col-span-12 grid grid-cols-2 gap-x-4 gap-y-5 md:col-span-3 md:grid-cols-1 md:self-start">
          {META.map(([k, v]) => (
            <div key={k} className="ab-rise">
              <dt className="t-micro text-slate">{k}</dt>
              <dd className="t-small mt-1">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="col-span-12 md:col-span-9 md:col-start-4">
          <h2 id="about-title" className="sr-only">
            About
          </h2>
          <RevealText as="p" text={about.statement} className="t-editorial max-w-[22ch] text-balance" />

          <div className="mt-[8vh] grid grid-cols-9 gap-x-4 gap-y-6">
            {about.body.map((p, i) => (
              <p
                key={i}
                className={`ab-rise col-span-9 max-w-[44ch] text-[1.0625rem] leading-relaxed text-slate md:col-span-4 ${i === 0 ? "md:col-start-1" : "md:col-start-5"}`}
              >
                {p}
              </p>
            ))}
            <div className="ab-rise col-span-9 flex flex-wrap gap-x-10 gap-y-3 md:col-start-5">
              <a href={profile.resume} download className="link-line t-micro text-ember">
                Download résumé (PDF) <Arrow direction="down" />
              </a>
              <a href="#experience" className="link-line t-micro">
                Read the changelog <Arrow />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="ab-stats mt-[12vh] grid grid-cols-12 gap-x-4">
        {about.stats.map((s, i) => (
          <div key={s.label} className={`col-span-12 md:col-span-3 ${i === 0 ? "md:col-start-4" : ""}`}>
            <div className="ab-rule hairline" />
            <div className="ab-stat flex items-baseline justify-between gap-4 py-5 md:block">
              <p className="font-display text-[clamp(3rem,6vw,6.5rem)] font-medium leading-none tracking-[-0.05em]">
                <Counter to={s.value} pad={"pad" in s ? s.pad : 0} suffix={s.suffix} />
              </p>
              <p className="t-micro text-slate md:mt-3">{s.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
