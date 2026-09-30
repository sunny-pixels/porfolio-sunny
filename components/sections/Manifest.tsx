"use client";

import { useRef } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { riseIn, fadeIn, revealLines, drawRule } from "@/lib/animations/text";
import { manifest, socials } from "@/lib/content";
import SectionLabel from "@/components/ui/SectionLabel";
import Counter from "@/components/ui/Counter";
import Arrow from "@/components/ui/Arrow";

const leetcode = socials.find((s) => s.label === "LeetCode")!;

/** Skills as a manifest: dependency groups set as ruled columns. */
export default function Manifest() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = ref.current!;
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add({ motion: MQ.motion, reduce: MQ.reduce }, (ctx) => {
        if (!ctx.conditions?.motion) {
          fadeIn(q(".mf-fade"), { trigger: root });
          return;
        }
        revealLines(q(".mf-title-line"), { trigger: root, start: "top 75%" });
        riseIn(q(".mf-side"), { trigger: root, start: "top 65%", delay: 0.2 });
        drawRule(q(".mf-rule"), { trigger: q(".mf-grid")[0], stagger: 0.06 });
        riseIn(q(".mf-item"), { trigger: q(".mf-grid")[0], stagger: 0.012, duration: 0.7 });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      id="stack"
      aria-labelledby="stack-title"
      data-nav-theme="light"
      className="gutter relative border-t border-ink/10 bg-bone pb-[18vh] pt-[16vh] text-ink"
    >
      <SectionLabel index="06" path="package.json" className="mf-fade text-slate">
        Stack
      </SectionLabel>

      <div className="mt-[6vh] grid grid-cols-12 gap-x-4 gap-y-12">
        <div className="col-span-12 md:col-span-4">
          <h2 id="stack-title" className="t-section">
            <span className="mask-line">
              <span className="mf-title-line mf-fade block">Manifest</span>
            </span>
          </h2>
          <div className="mf-side mf-fade mt-10 max-w-[30ch] border-t border-ink/20 pt-4">
            <p className="font-display text-[clamp(3rem,5vw,5rem)] font-medium leading-none tracking-[-0.05em]">
              <Counter to={300} suffix="+" />
            </p>
            <p className="t-small mt-3 text-slate">
              Data-structures and algorithms problems solved across LeetCode, Code360 and other platforms.
            </p>
            <a href={leetcode.href} target="_blank" rel="noopener noreferrer" className="link-line t-micro mt-5 text-ember">
              LeetCode profile <Arrow direction="up-right" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>

        <div className="mf-grid col-span-12 grid grid-cols-1 gap-x-4 gap-y-12 sm:grid-cols-2 md:col-span-8 md:col-start-5 lg:grid-cols-3">
          {manifest.map((g) => (
            <div key={g.key}>
              <p className="mf-item mf-fade t-mono text-[0.8125rem] text-slate">
                <span className="text-ember">&quot;{g.key}&quot;</span>: {"{"}
              </p>
              <div className="mf-rule mt-3 h-px origin-left bg-ink/25" />
              <ul>
                {g.items.map((it) => (
                  <li key={it} className="mf-item mf-fade flex items-baseline justify-between border-b border-ink/10 py-2.5">
                    <span className="text-[0.975rem]">{it}</span>
                    <span aria-hidden="true" className="t-mono text-[0.6875rem] text-slate">
                      ✓
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
