"use client";

import { Fragment, useRef } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { marqueeLoop, bindScrollVelocity } from "@/lib/animations/marquee";
import { marqueeWords } from "@/lib/content";

function Row({ outline }: { outline?: boolean }) {
  // Content repeated for a seamless -50% loop.
  const run = [...marqueeWords, ...marqueeWords];
  return (
    <>
      {[0, 1].map((copy) => (
        <span key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1 ? true : undefined}>
          {run.map((w, i) => (
            <Fragment key={`${copy}-${i}`}>
              <span
                className={
                  outline
                    ? "t-mono px-[0.6em] text-[clamp(1.25rem,2.4vw,2.5rem)] leading-none text-fog"
                    : "px-[0.28em] font-display text-[clamp(4rem,11vw,13rem)] font-semibold uppercase leading-[0.9] tracking-[-0.05em]"
                }
              >
                {outline ? `import ${w.toLowerCase().replace(/[^a-z0-9]/g, "")}` : w}
              </span>
              <span
                aria-hidden="true"
                className={outline ? "t-mono text-dusk" : "font-display text-[clamp(2.5rem,6vw,7rem)] leading-none text-dusk"}
              >
                {outline ? ";" : "/"}
              </span>
            </Fragment>
          ))}
        </span>
      ))}
    </>
  );
}

/** Two counter-running rows whose speed answers scroll velocity. */
export default function Marquee() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = ref.current!;
      const [a, b] = Array.from(root.querySelectorAll<HTMLElement>(".mq-track"));
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const t1 = marqueeLoop(a, { speed: 70 });
        const t2 = marqueeLoop(b, { speed: 45, reverse: true });
        bindScrollVelocity([t1, t2], root);
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      aria-label={`Working stack: ${marqueeWords.join(", ")}`}
      data-nav-theme="dark"
      className="relative overflow-hidden border-y border-chalk/10 bg-ink py-[10vh] text-chalk"
    >
      <div className="mq-track flex w-max will-change-transform">
        <Row />
      </div>
      <div className="mt-[4vh] border-t border-chalk/10 pt-[3vh]">
        <div className="mq-track flex w-max will-change-transform">
          <Row outline />
        </div>
      </div>
    </section>
  );
}
