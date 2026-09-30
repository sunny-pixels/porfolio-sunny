"use client";

import { useCallback, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP, MQ } from "@/lib/gsap";
import { onIntroDone } from "@/lib/intro";
import { nav, profile } from "@/lib/content";
import MenuOverlay from "./MenuOverlay";

type Theme = "top" | "light" | "dark";

const THEMES: Record<Theme, Record<string, string>> = {
  top: {
    "--nav-bg": "rgba(13,14,17,0)",
    "--nav-fg": "#f1f0ec",
    "--nav-line": "rgba(241,240,236,0)",
    "--nav-pad": "1.5rem",
  },
  light: {
    "--nav-bg": "rgba(241,240,236,0.92)",
    "--nav-fg": "#0d0e11",
    "--nav-line": "rgba(13,14,17,0.12)",
    "--nav-pad": "0.9rem",
  },
  dark: {
    "--nav-bg": "rgba(13,14,17,0.88)",
    "--nav-fg": "#f1f0ec",
    "--nav-line": "rgba(241,240,236,0.1)",
    "--nav-pad": "0.9rem",
  },
};

/**
 * Full-width masthead. Transparent over the hero, then adopts the tone of
 * the section beneath it (sections declare `data-nav-theme`).
 */
export default function Navbar() {
  const ref = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  useGSAP(
    () => {
      const header = ref.current!;
      gsap.set(header, THEMES.top);

      let scrolled = false;
      let sectionTheme: Theme = "dark";
      const apply = () => {
        const theme: Theme = scrolled ? sectionTheme : "top";
        gsap.to(header, { ...THEMES[theme], duration: 0.5, ease: "power3.out", overwrite: true });
      };

      ScrollTrigger.create({
        start: 80,
        end: "max",
        refreshPriority: -10,
        onEnter: () => {
          scrolled = true;
          apply();
        },
        onLeaveBack: () => {
          scrolled = false;
          apply();
        },
      });

      document.querySelectorAll<HTMLElement>("[data-nav-theme]").forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top 40px",
          end: "bottom 40px",
          refreshPriority: -10,
          onToggle: (self) => {
            if (!self.isActive) return;
            sectionTheme = (section.dataset.navTheme as Theme) ?? "dark";
            apply();
          },
        });
      });

      const items = header.querySelectorAll(".nav-item");
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.set(items, { yPercent: 120 });
        return onIntroDone(() => {
          gsap.to(items, { yPercent: 0, duration: 1, stagger: 0.04, ease: "expo.out", delay: 0.5 });
        });
      });
    },
    { scope: ref },
  );

  const close = useCallback(() => {
    setOpen(false);
    menuButton.current?.focus();
  }, []);

  return (
    <>
      <header
        ref={ref}
        className="fixed inset-x-0 top-0 z-50 text-[var(--nav-fg)] backdrop-blur-[2px]"
        style={{ backgroundColor: "var(--nav-bg)" }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
          style={{ backgroundColor: "var(--nav-line)" }}
        />
        <nav
          aria-label="Primary"
          className="gutter grid grid-cols-12 items-center gap-x-4"
          style={{ paddingBlock: "var(--nav-pad)" }}
        >
          <a href="#top" aria-label={`${profile.name} — back to top`} className="col-span-7 lg:col-span-3">
            <span className="block overflow-hidden">
              <span className="nav-item flex items-baseline gap-3">
                <span className="font-display text-[1.05rem] font-semibold uppercase tracking-[-0.02em]">
                  {profile.name}
                </span>
                <span className="t-micro hidden opacity-60 lg:inline">{profile.version}</span>
              </span>
            </span>
          </a>

          <ul className="col-span-5 col-start-5 hidden items-center gap-x-8 lg:flex">
            {nav.slice(0, 4).map((item, i) => (
              <li key={item.href} className="overflow-hidden">
                <a href={item.href} className="nav-item link-line t-micro block py-1">
                  <span className="mr-1.5 opacity-50">0{i + 1}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="col-span-5 col-start-8 flex items-center justify-end gap-8 lg:col-span-3 lg:col-start-10">
            <span className="hidden overflow-hidden lg:block">
              <span className="nav-item t-micro flex items-center gap-2 py-1">
                <span aria-hidden="true" className="relative flex size-1.5">
                  <span className="absolute inset-0 rounded-full bg-dusk [animation:pulse-dot_2s_ease-out_infinite]" />
                  <span className="relative size-1.5 rounded-full bg-dusk" />
                </span>
                <span className="opacity-80">Available</span>
              </span>
            </span>
            <span className="hidden overflow-hidden lg:block">
              <a href="#contact" className="nav-item link-line t-micro block py-1">
                Contact <span aria-hidden="true" className="link-arrow">→</span>
              </a>
            </span>
            <span className="overflow-hidden lg:hidden">
              <button
                ref={menuButton}
                type="button"
                onClick={() => setOpen(true)}
                aria-expanded={open}
                aria-controls="site-menu"
                className="nav-item t-micro flex min-h-11 items-center gap-3"
              >
                Menu
                <span aria-hidden="true" className="flex w-6 flex-col gap-[5px]">
                  <span className="h-px w-full bg-current" />
                  <span className="h-px w-2/3 self-end bg-current" />
                </span>
              </button>
            </span>
          </div>
        </nav>
      </header>

      <MenuOverlay open={open} onClose={close} />
    </>
  );
}
