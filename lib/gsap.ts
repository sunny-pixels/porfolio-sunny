"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  gsap.defaults({ ease: "expo.out", duration: 1 });
}

export { gsap, ScrollTrigger, useGSAP };

/** Easing vocabulary — precise and mechanical, never bouncy. */
export const EASE = {
  reveal: "expo.out",
  soft: "power3.out",
  inOut: "power4.inOut",
  drift: "sine.inOut",
} as const;

/** Media-query conditions used with gsap.matchMedia() across the site. */
export const MQ = {
  motion: "(prefers-reduced-motion: no-preference)",
  reduce: "(prefers-reduced-motion: reduce)",
  desktop: "(min-width: 768px)",
  mobile: "(max-width: 767px)",
  fine: "(hover: hover) and (pointer: fine)",
} as const;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia(MQ.reduce).matches;
