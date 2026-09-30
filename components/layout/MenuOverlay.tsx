"use client";

import { useEffect, useRef } from "react";
import { gsap, useGSAP, EASE, prefersReducedMotion } from "@/lib/gsap";
import { getLenis } from "@/lib/lenis";
import { nav, profile, socials } from "@/lib/content";
import Arrow from "@/components/ui/Arrow";

type Props = { open: boolean; onClose: () => void };

/**
 * Full-screen index (used below md). The plate wipes down, links rise
 * line by line. Focus is trapped while open; Esc closes.
 */
export default function MenuOverlay({ open, onClose }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const reduced = prefersReducedMotion();
      gsap.set(ref.current, { autoAlpha: 0 });
      tl.current = gsap
        .timeline({ paused: true })
        .set(ref.current, { autoAlpha: 1 })
        .fromTo(
          ref.current,
          { clipPath: reduced ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)", opacity: reduced ? 0 : 1 },
          { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, duration: reduced ? 0.25 : 0.8, ease: EASE.inOut },
        )
        .fromTo(
          ".mo-link",
          { yPercent: reduced ? 0 : 110 },
          { yPercent: 0, duration: 0.9, stagger: 0.05, ease: EASE.reveal },
          reduced ? 0 : 0.35,
        )
        .fromTo(".mo-meta", { opacity: 0 }, { opacity: 1, duration: 0.5, stagger: 0.04, ease: "none" }, "<0.15");
    },
    { scope: ref },
  );

  useEffect(() => {
    const t = tl.current;
    if (!t) return;
    const lenis = getLenis();
    if (open) {
      t.timeScale(1).play();
      lenis?.stop();
      document.documentElement.classList.add("is-locked");
      const id = window.setTimeout(() => {
        ref.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus();
      }, 80);
      return () => window.clearTimeout(id);
    } else {
      t.timeScale(1.6).reverse();
      lenis?.start();
      document.documentElement.classList.remove("is-locked");
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const panel = ref.current!;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const focusables = Array.from(panel.querySelectorAll<HTMLElement>("a[href], button"));
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      ref={ref}
      id="site-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      aria-hidden={!open}
      inert={!open}
      className="invisible fixed inset-0 z-[70] flex flex-col bg-ink text-chalk"
    >
      <div className="gutter flex items-center justify-between py-6">
        <p className="mo-meta font-display text-[1.05rem] font-semibold uppercase tracking-[-0.02em]">{profile.name}</p>
        <button type="button" data-autofocus onClick={onClose} className="mo-meta t-micro flex min-h-11 items-center gap-3">
          Close
          <span aria-hidden="true" className="relative block size-4">
            <span className="absolute left-0 top-1/2 h-px w-full rotate-45 bg-current" />
            <span className="absolute left-0 top-1/2 h-px w-full -rotate-45 bg-current" />
          </span>
        </button>
      </div>

      <nav aria-label="Menu" className="gutter flex flex-1 flex-col justify-center">
        <ul>
          {nav.map((l, i) => (
            <li key={l.href} className="border-t border-chalk/10 last:border-b">
              <a href={l.href} onClick={onClose} className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-3 py-[1.6vh]">
                <span className="mask-line">
                  <span className="mo-link t-micro block text-dusk">0{i + 1}</span>
                </span>
                <span className="mask-line">
                  <span className="mo-link block font-display text-[clamp(2.5rem,11vw,5rem)] font-semibold uppercase leading-[0.95] tracking-[-0.045em]">
                    {l.label}
                  </span>
                </span>
                <span className="mask-line">
                  <Arrow className="mo-link h-3.5 text-fog" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="gutter flex flex-wrap justify-between gap-4 pb-8 pt-6">
        <a href={`mailto:${profile.email}`} className="mo-meta t-small text-fog">
          {profile.email}
        </a>
        <ul className="mo-meta t-micro flex gap-5 text-fog">
          {socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noopener noreferrer">
                {s.label}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
