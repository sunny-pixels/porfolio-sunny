"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { onIntroDone } from "@/lib/intro";
import { buildHeroIntro, heroExit, heroPointer } from "@/lib/animations/hero";
import { profile } from "@/lib/content";
import { images } from "@/lib/images";
import Constellation from "./Constellation";
import Ornament from "@/components/ui/Ornament";

/**
 * The version banner. The name is set across the full width in two lines,
 * the portrait plate sits between them (line 2 overprints it), and an
 * embedding graph assembles behind.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = ref.current!;
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add({ motion: MQ.motion, reduce: MQ.reduce, desktop: MQ.desktop, fine: MQ.fine }, (ctx) => {
        const { motion, desktop, fine } = ctx.conditions ?? {};
        const intro = buildHeroIntro(q, { reduced: !motion });
        const offIntro = onIntroDone(() => intro.play());
        if (!motion) return offIntro;

        heroExit(root, q);
        const offPointer = desktop && fine ? heroPointer(root, q) : () => {};
        return () => {
          offIntro();
          offPointer();
        };
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      id="top"
      aria-label="Introduction"
      data-nav-theme="dark"
      className="grid-paper relative isolate overflow-hidden bg-ink text-chalk md:h-[100svh] md:min-h-[42rem]"
    >
      {/* Embedding graph — behind everything. */}
      <div
        aria-hidden="true"
        className="hero-graph pointer-events-none absolute -z-10 text-fog opacity-0 max-md:right-[-30vw] max-md:top-[10vh] max-md:w-[120vw] md:right-[-4vw] md:top-[4vh] md:w-[min(62vw,92vh)]"
      >
        <Constellation className="h-auto w-full" />
      </div>

      <div className="gutter relative flex h-full flex-col pb-6 pt-[calc(4.5rem+6vh)] md:pb-8 md:pt-[calc(4rem+7vh)]">
        {/* Top rail */}
        <div className="grid grid-cols-12 gap-x-4">
          <p className="hero-meta t-micro col-span-8 text-fog opacity-0 md:col-span-4">
            <span className="text-dusk">●</span> {profile.version} — stable release
          </p>
          <p className="hero-meta t-micro col-span-4 text-right text-fog opacity-0 md:col-span-3 md:col-start-10">
            {profile.coordinates}
          </p>
        </div>

        {/* Line 1 */}
        <h1 className="relative z-10 mt-[4vh] md:mt-[3vh]">
          <span className="sr-only">
            {profile.name}, {profile.role} — {profile.discipline}
          </span>
          <span aria-hidden="true" className="hero-l1 mask-line t-hero block">
            <span className="hero-line block">{profile.first}</span>
          </span>
        </h1>

        {/* Annotation under line 1 */}
        <div className="relative z-10 mt-5 grid grid-cols-12 gap-x-4 md:mt-6">
          <ul className="hero-meta t-mono col-span-12 space-y-0.5 text-[0.8125rem] text-fog opacity-0 md:col-span-4">
            <li>
              <span className="text-dusk">{"//"}</span> {profile.role}
            </li>
            <li>
              <span className="text-dusk">{"//"}</span> {profile.discipline}
            </li>
            <li>
              <span className="text-dusk">{"//"}</span> {profile.city}
            </li>
          </ul>
        </div>

        {/* Portrait plate — between the two lines. */}
        <div className="hero-plate relative z-20 mt-8 aspect-[4/5] w-full md:absolute md:right-[calc(var(--gutter)+9vw)] md:top-[calc(4rem+9vh)] md:mt-0 md:aspect-[3/4] md:w-[min(46.5vh,30vw)]">
          <div className="hero-frame relative h-full w-full overflow-hidden bg-graphite" style={{ clipPath: "inset(100% 0% 0% 0%)" }}>
            <div className="hero-img-pointer absolute -inset-[3%]">
              <div className="hero-img relative h-full w-full will-change-transform">
                <Image
                  src={images.portrait.src}
                  alt={images.portrait.alt}
                  fill
                  preload
                  quality={85}
                  sizes="(min-width: 768px) 30vw, 100vw"
                  className="object-cover"
                  style={{ objectPosition: images.portrait.position }}
                />
              </div>
            </div>
          </div>
          <Ornament variant="corners" className="hero-meta absolute -inset-2.5 text-chalk/40 opacity-0" />
          <p className="hero-meta t-micro absolute -bottom-7 left-0 text-fog opacity-0 md:bottom-auto md:right-full md:top-0 md:left-auto md:mr-5 md:whitespace-nowrap md:[writing-mode:vertical-rl] md:rotate-180">
            fig. 01 — Arabian Sea, dusk
          </p>
        </div>

        <div className="hidden flex-1 md:block" />

        {/* Line 2 — overprints the plate. */}
        <p aria-hidden="true" className="hero-l2 mask-line t-hero relative z-30 mt-10 block md:mt-0 md:text-right">
          <span className="hero-line block">{profile.last}</span>
        </p>

        {/* Bottom rail */}
        <div className="mt-8 grid grid-cols-12 items-end gap-x-4 gap-y-6 md:mt-6">
          <p className="hero-meta col-span-12 max-w-[38ch] text-[1.0625rem] leading-snug text-chalk/90 opacity-0 md:col-span-5">
            I design and engineer crafted, motion-led interfaces, and the production AI systems that run behind them.
          </p>
          <a
            href="#about"
            className="hero-meta t-micro col-span-6 flex items-center gap-3 text-fog opacity-0 md:col-span-2 md:col-start-9"
          >
            <span aria-hidden="true" className="relative block h-8 w-px overflow-hidden bg-chalk/15">
              <span className="absolute inset-x-0 top-0 h-1/2 bg-dusk [animation:scrollcue_1.6s_var(--ease-in-out-quart)_infinite]" />
            </span>
            Scroll
          </a>
          <p className="hero-meta t-micro col-span-6 flex items-center justify-end gap-2 text-fog opacity-0 md:col-span-2 md:col-start-11">
            <span className="text-dusk">●</span> {profile.status}
          </p>
        </div>
      </div>
    </section>
  );
}
