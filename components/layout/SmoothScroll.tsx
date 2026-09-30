"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { onIntroDone } from "@/lib/intro";
import { setLenis, scrollToTarget } from "@/lib/lenis";

/**
 * Weighted smooth scrolling (Lenis) driven by GSAP's ticker so every
 * ScrollTrigger stays in lockstep. Disabled for reduced motion.
 * Also owns: scroll lock during the intro, and in-page anchor links.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const root = document.documentElement;
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    if (!location.hash) window.scrollTo(0, 0);

    let lenis: Lenis | null = null;
    let tick: ((time: number) => void) | null = null;

    if (!prefersReducedMotion()) {
      lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
      });
      setLenis(lenis);
      lenis.on("scroll", ScrollTrigger.update);
      tick = (time) => lenis!.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }

    root.classList.add("is-locked");
    lenis?.stop();
    const off = onIntroDone(() => {
      root.classList.remove("is-locked");
      lenis?.start();
      ScrollTrigger.refresh();
    });

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return;
      const a = (e.target as Element | null)?.closest?.('a[href^="#"]');
      if (!a) return;
      const hash = a.getAttribute("href")!;
      const el = hash === "#top" ? document.body : document.querySelector<HTMLElement>(hash);
      if (!el) return;
      e.preventDefault();
      scrollToTarget(el);
      history.replaceState(null, "", hash === "#top" ? location.pathname : hash);
      // Move focus for keyboard and assistive tech users.
      if (hash !== "#top") {
        if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
        el.focus({ preventScroll: true });
      }
    };
    document.addEventListener("click", onClick);

    // Fonts shift line lengths — re-measure once they are ready.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      off();
      document.removeEventListener("click", onClick);
      root.classList.remove("is-locked");
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
