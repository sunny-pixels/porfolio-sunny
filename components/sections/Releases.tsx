"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, MQ, EASE } from "@/lib/gsap";
import { riseIn, fadeIn, revealLines } from "@/lib/animations/text";
import { revealImage } from "@/lib/animations/reveal";
import { releases } from "@/lib/content";
import { images } from "@/lib/images";
import SectionLabel from "@/components/ui/SectionLabel";
import BrowserFrame from "@/components/ui/BrowserFrame";
import MagneticLink from "@/components/ui/MagneticLink";
import Arrow from "@/components/ui/Arrow";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Selected releases — the signature interaction. On desktop (motion allowed)
 * the three featured builds travel horizontally through a pinned stage with
 * a progress rule. Elsewhere they stack as full-width editorial plates.
 */
export default function Releases() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = ref.current!;
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add({ motion: MQ.motion, reduce: MQ.reduce, desktop: MQ.desktop }, (ctx) => {
        const { motion, desktop } = ctx.conditions ?? {};
        if (!motion) {
          fadeIn(q(".rl-fade"), { trigger: root });
          return;
        }

        revealLines(q(".rl-title-line"), { trigger: q(".rl-head")[0] });
        riseIn(q(".rl-head-meta"), { trigger: q(".rl-head")[0], delay: 0.2 });

        if (!desktop) {
          q(".rl-slide").forEach((slide) => {
            const s = gsap.utils.selector(slide);
            revealImage(s(".rl-frame")[0], s(".rl-img")[0], { trigger: slide, start: "top 80%" });
            riseIn(s(".rl-rise"), { trigger: slide, start: "top 75%" });
          });
          return;
        }

        const pin = q(".rl-pin")[0] as HTMLElement;
        const track = q(".rl-track")[0] as HTMLElement;
        const slides = q(".rl-slide") as HTMLElement[];
        const counter = q(".rl-count")[0];
        const distance = () => track.scrollWidth - window.innerWidth;

        const travel = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: pin,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            snap: { snapTo: 1 / (slides.length - 1), duration: { min: 0.3, max: 0.7 }, ease: "power2.inOut" },
            onUpdate: (self) => {
              const i = Math.round(self.progress * (slides.length - 1));
              counter.textContent = pad(i + 1);
            },
          },
        });

        gsap.fromTo(
          q(".rl-progress"),
          { scaleX: 1 / slides.length },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: { trigger: pin, start: "top top", end: () => `+=${distance()}`, scrub: true },
          },
        );

        // Each slide's copy and screenshot arrive as it crosses into view.
        slides.forEach((slide, i) => {
          const s = gsap.utils.selector(slide);
          const st =
            i === 0
              ? { trigger: pin, start: "top 60%" }
              : { trigger: slide, containerAnimation: travel, start: "left 70%" };
          gsap
            .timeline({ scrollTrigger: { ...st, toggleActions: "play none none none" } })
            .fromTo(s(".rl-frame"), { clipPath: "inset(0% 0% 0% 100%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: EASE.inOut }, 0)
            .fromTo(s(".rl-img"), { scale: 1.12 }, { scale: 1, duration: 1.8, ease: EASE.reveal }, 0.1)
            .fromTo(s(".rl-rise"), { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.06, ease: EASE.soft }, 0.15);

          if (i > 0) {
            // A slight counter-drift on the screenshot while the track moves.
            gsap.fromTo(
              s(".rl-img-drift"),
              { xPercent: 6 },
              {
                xPercent: -2,
                ease: "none",
                scrollTrigger: { trigger: slide, containerAnimation: travel, start: "left right", end: "right left", scrub: true },
              },
            );
          }
        });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="work" aria-labelledby="work-title" data-nav-theme="dark" className="relative bg-ink text-chalk">
      <header className="rl-head gutter pt-[18vh]">
        <SectionLabel index="02" path="releases/featured" className="rl-fade text-fog">
          Selected work
        </SectionLabel>
        <div className="mt-[6vh] grid grid-cols-12 items-end gap-x-4 gap-y-8">
          <h2 id="work-title" className="t-section col-span-12 md:col-span-8">
            <span className="mask-line">
              <span className="rl-title-line rl-fade block">Selected</span>
            </span>
            <span className="mask-line md:pl-[8vw]">
              <span className="rl-title-line rl-fade block">
                releases<span className="text-dusk">.</span>
              </span>
            </span>
          </h2>
          <p className="rl-head-meta rl-fade col-span-12 max-w-[36ch] text-fog md:col-span-3 md:col-start-10">
            Three brand sites I designed and built end-to-end: concept, typography, motion and engineering.
          </p>
        </div>
      </header>

      <div className="rl-pin relative mt-[8vh] md:motion-safe:mt-[4vh] md:motion-safe:h-[100svh] md:motion-safe:overflow-hidden">
        {/* Progress rail (pinned desktop only) */}
        <div className="gutter pointer-events-none absolute inset-x-0 bottom-6 z-10 hidden items-center gap-6 md:motion-safe:flex">
          <p className="t-micro text-fog">
            <span className="rl-count text-chalk">01</span> / {pad(releases.length)}
          </p>
          <div className="relative h-px flex-1 bg-chalk/15">
            <div className="rl-progress absolute inset-0 origin-left bg-dusk" />
          </div>
          <p className="t-micro text-fog">Scroll to browse</p>
        </div>

        <ol className="rl-track flex flex-col gap-[14vh] pb-[16vh] md:motion-safe:h-full md:motion-safe:w-max md:motion-safe:flex-row md:motion-safe:gap-0 md:motion-safe:pb-0">
          {releases.map((r, i) => {
            const img = images[r.image];
            return (
              <li
                key={r.slug}
                className="rl-slide gutter grid grid-cols-12 content-center gap-x-4 gap-y-8 md:motion-safe:h-full md:motion-safe:w-screen md:motion-safe:pb-16 md:motion-safe:pt-20"
              >
                {/* Copy column */}
                <div className="col-span-12 flex flex-col md:col-span-4 lg:col-span-4">
                  <p className="rl-rise rl-fade flex items-baseline gap-4">
                    <span className="font-display text-[clamp(4rem,9vw,10rem)] font-semibold leading-[0.8] tracking-[-0.06em] text-dusk tabular-nums">
                      {pad(i + 1)}
                    </span>
                    <span className="t-micro text-fog">
                      Release
                      <br />
                      {r.sector}
                    </span>
                  </p>
                  <h3 className="rl-rise rl-fade t-editorial mt-8">{r.name}</h3>
                  <p className="rl-rise rl-fade t-micro mt-2 text-fog">
                    {r.client} · {r.location}
                  </p>
                  <p className="rl-rise rl-fade mt-6 max-w-[40ch] text-[0.975rem] leading-relaxed text-chalk/80">
                    {r.summary}
                  </p>
                  <ul className="rl-rise rl-fade mt-6 border-t border-chalk/12">
                    {r.highlights.map((h) => (
                      <li key={h} className="t-small flex gap-3 border-b border-chalk/12 py-2 text-chalk/85">
                        <span aria-hidden="true" className="t-mono text-dusk">+</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                  <p className="rl-rise rl-fade t-mono mt-5 text-[0.75rem] text-fog">{r.stack.join(" · ")}</p>
                  <div className="rl-rise rl-fade mt-8">
                    <MagneticLink href={r.url} external cursor="Visit" className="link-line t-micro text-chalk">
                      Visit live site <Arrow direction="up-right" className="text-dusk" />
                      <span className="sr-only"> — {r.client} (opens in a new tab)</span>
                    </MagneticLink>
                  </div>
                </div>

                {/* Stage */}
                <div className={`col-span-12 md:col-span-8 md:col-start-5 md:self-center ${i % 2 ? "max-md:pl-[8vw]" : "max-md:pr-[8vw]"}`}>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="Visit"
                    aria-label={`${r.client} — open live site in a new tab`}
                    className="block md:ml-auto md:w-[min(100%,calc((100svh-13rem)*1.6))]"
                  >
                    <BrowserFrame url={r.url}>
                      <div className="rl-frame img-hover relative aspect-[16/10] overflow-hidden bg-graphite">
                        <div className="rl-img-drift absolute -inset-x-[6%] inset-y-0">
                          <div className="rl-img relative h-full w-full will-change-transform">
                            <Image
                              src={img.src}
                              alt={img.alt}
                              fill
                              quality={85}
                              sizes="(min-width: 768px) 64vw, 92vw"
                              className="object-cover"
                              style={{ objectPosition: img.position }}
                            />
                          </div>
                        </div>
                      </div>
                    </BrowserFrame>
                  </a>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
