"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, EASE, prefersReducedMotion } from "@/lib/gsap";
import { markIntroDone } from "@/lib/intro";
import { profile } from "@/lib/content";

const SEEN_KEY = "sunny:intro-seen";

const LOG = ["resolving dependencies", "compiling interfaces", "linking systems", "ready"];

/**
 * A build log as the curtain: a stepped counter, four log lines and a
 * progress rule, then the plate wipes upward into the hero.
 * Returning visitors in the same session get a quick fade instead.
 */
export default function Loader() {
  const ref = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);
  const seenRef = useRef<boolean | null>(null);

  useGSAP(
    () => {
      const el = ref.current!;
      if (seenRef.current === null) {
        seenRef.current = false;
        try {
          seenRef.current = sessionStorage.getItem(SEEN_KEY) === "1";
          sessionStorage.setItem(SEEN_KEY, "1");
        } catch {
          /* storage unavailable — play the full intro */
        }
      }

      const finish = () => setGone(true);

      if (seenRef.current || prefersReducedMotion()) {
        gsap
          .timeline({ onComplete: finish })
          .to(el.querySelector(".ld-inner"), { opacity: 0, duration: 0.25, ease: "none" })
          .add(markIntroDone)
          .to(el, { autoAlpha: 0, duration: 0.45, ease: "none" });
        return;
      }

      const counter = { v: 0 };
      const count = el.querySelector(".ld-count")!;

      gsap
        .timeline({ onComplete: finish, defaults: { ease: EASE.reveal } })
        .fromTo(".ld-word", { yPercent: 110 }, { yPercent: 0, duration: 0.9, stagger: 0.08 }, 0.05)
        .fromTo(".ld-meta", { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "none" }, 0.15)
        .fromTo(".ld-line", { scaleX: 0 }, { scaleX: 1, duration: 1.4, ease: "steps(20)" }, 0.2)
        .fromTo(".ld-log", { opacity: 0, x: -8 }, { opacity: 1, x: 0, duration: 0.3, stagger: 0.32, ease: "none" }, 0.2)
        .to(
          counter,
          {
            v: 100,
            duration: 1.4,
            ease: "steps(20)",
            onUpdate: () => {
              count.textContent = String(Math.round(counter.v)).padStart(3, "0");
            },
          },
          0.2,
        )
        .to(".ld-word", { yPercent: -110, duration: 0.6, stagger: 0.05, ease: "power3.in" }, "+=0.1")
        .to(".ld-meta, .ld-line, .ld-log", { opacity: 0, duration: 0.3, ease: "none" }, "<")
        .add(markIntroDone, "-=0.1")
        .to(el, { clipPath: "inset(0% 0% 100% 0%)", duration: 1, ease: EASE.inOut }, "<");
    },
    { scope: ref },
  );

  if (gone) return null;

  return (
    <div
      ref={ref}
      role="status"
      aria-label={`Loading ${profile.name}'s portfolio`}
      className="fixed inset-0 z-[120] bg-ink text-chalk"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
    >
      <div className="ld-inner gutter flex h-full flex-col justify-between py-6">
        <div className="ld-meta t-micro flex justify-between text-fog">
          <span>{profile.version} — build</span>
          <span>
            <span className="ld-count tabular-nums text-chalk">000</span> %
          </span>
        </div>

        <div aria-hidden="true">
          <ul className="t-mono mb-8 space-y-1 text-[0.75rem] text-fog md:text-[0.8125rem]">
            {LOG.map((l, i) => (
              <li key={l} className="ld-log opacity-0">
                <span className="text-dusk">{i === LOG.length - 1 ? "✓" : "→"}</span> {l}
                {i === LOG.length - 1 ? "" : "…"}
              </li>
            ))}
          </ul>
          <p className="mask-line font-display text-[clamp(3.2rem,12vw,12rem)] font-semibold uppercase leading-[0.84] tracking-[-0.055em]">
            <span className="ld-word block">{profile.first}</span>
          </p>
          <p className="mask-line font-display text-[clamp(3.2rem,12vw,12rem)] font-semibold uppercase leading-[0.84] tracking-[-0.055em] text-fog">
            <span className="ld-word block">{profile.last}</span>
          </p>
          <div className="ld-line mt-8 h-px w-full origin-left bg-dusk" />
        </div>

        <div className="ld-meta t-micro flex justify-between text-fog">
          <span>{profile.role}</span>
          <span className="hidden md:inline">{profile.coordinates}</span>
        </div>
      </div>
    </div>
  );
}
