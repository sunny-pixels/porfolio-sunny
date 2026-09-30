"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { riseIn, fadeIn, revealLines } from "@/lib/animations/text";
import { profile, socials } from "@/lib/content";
import SectionLabel from "@/components/ui/SectionLabel";
import MagneticLink from "@/components/ui/MagneticLink";
import Arrow from "@/components/ui/Arrow";

/** The terminal prompt: one clear call to action, then every channel. */
export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  useGSAP(
    () => {
      const root = ref.current!;
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add({ motion: MQ.motion, reduce: MQ.reduce }, (ctx) => {
        if (!ctx.conditions?.motion) {
          fadeIn(q(".ct-fade"), { trigger: root });
          return;
        }
        riseIn(q(".ct-prompt"), { trigger: root, start: "top 70%" });
        revealLines(q(".ct-line"), { trigger: root, start: "top 65%", stagger: 0.1, delay: 0.1 });
        riseIn(q(".ct-rise"), { trigger: q(".ct-links")[0], start: "top 92%", stagger: 0.06 });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — the mailto link still works */
    }
  };

  return (
    <section
      ref={ref}
      id="contact"
      aria-labelledby="contact-title"
      data-nav-theme="dark"
      className="gutter grid-paper relative bg-ink pb-[10vh] pt-[20vh] text-chalk"
    >
      <SectionLabel index="07" path="contact.sh" className="ct-fade text-fog">
        Contact
      </SectionLabel>

      <p className="ct-prompt ct-fade t-mono mt-[8vh] text-[0.875rem] text-fog md:text-[1rem]">
        <span className="text-dusk">~/sunny</span> $ <span className="caret text-chalk">say hello</span>
      </p>

      <h2 id="contact-title" className="t-hero mt-6">
        <span className="mask-line">
          <span className="ct-line ct-fade block">Let&apos;s build</span>
        </span>
        <span className="mask-line md:pl-[18vw]">
          <span className="ct-line ct-fade block">
            something<span className="text-dusk">.</span>
          </span>
        </span>
      </h2>

      <div className="mt-[10vh] grid grid-cols-12 items-end gap-x-4 gap-y-10">
        <div className="col-span-12 md:col-span-7">
          <p className="ct-rise ct-fade t-micro text-fog">Email — replies within a day</p>
          <div className="ct-rise ct-fade mt-4 flex flex-wrap items-center gap-x-6 gap-y-4">
            <MagneticLink
              href={`mailto:${profile.email}`}
              cursor="Write"
              strength={0.18}
              className="group items-center gap-4 font-display text-[clamp(1.35rem,3.6vw,3.5rem)] font-medium tracking-[-0.035em]"
            >
              <span className="break-all border-b border-chalk/30 pb-1 transition-colors duration-300 group-hover:border-dusk group-hover:text-dusk">
                {profile.email}
              </span>
            </MagneticLink>
            <button type="button" onClick={copy} className="t-micro min-h-11 border border-chalk/20 px-4 text-fog transition-colors hover:border-dusk hover:text-chalk">
              <span aria-live="polite">{copied ? "Copied ✓" : "Copy"}</span>
            </button>
          </div>
        </div>

        <ul className="ct-links col-span-12 md:col-span-4 md:col-start-9">
          {socials.map((s) => (
            <li key={s.label} className="ct-rise ct-fade border-t border-chalk/15">
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-4 py-4" data-cursor="Open">
                <span className="font-display text-[1.35rem] font-medium tracking-[-0.02em]">{s.label}</span>
                <span className="t-mono flex items-center gap-3 text-[0.75rem] text-fog transition-colors group-hover:text-chalk">
                  @{s.handle}
                  <Arrow direction="up-right" className="text-dusk transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
          <li className="ct-rise ct-fade border-y border-chalk/15">
            <a href={profile.resume} download className="group flex items-center justify-between gap-4 py-4">
              <span className="font-display text-[1.35rem] font-medium tracking-[-0.02em]">Résumé</span>
              <span className="t-mono flex items-center gap-3 text-[0.75rem] text-fog transition-colors group-hover:text-chalk">
                PDF · 136 KB
                <Arrow direction="down" className="text-dusk" />
              </span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
