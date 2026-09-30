import { gsap, EASE } from "../gsap";

export type RevealDirection = "left" | "right" | "up" | "down";

export const CLIP_OPEN = "inset(0% 0% 0% 0%)";

export const CLIP_FROM: Record<RevealDirection, string> = {
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
  up: "inset(100% 0% 0% 0%)",
  down: "inset(0% 0% 100% 0%)",
};

type ImageRevealOptions = {
  direction?: RevealDirection;
  trigger?: Element | null;
  start?: string;
  delay?: number;
};

/** Clip-path unveil of a frame plus a settle of the image inside it. */
export function revealImage(frame: Element, inner: Element, opts: ImageRevealOptions = {}) {
  const { direction = "up", trigger = frame, start = "top 84%", delay = 0 } = opts;
  const tl = gsap.timeline({
    delay,
    scrollTrigger: trigger ? { trigger, start, toggleActions: "play none none none" } : undefined,
  });
  tl.fromTo(frame, { clipPath: CLIP_FROM[direction] }, { clipPath: CLIP_OPEN, duration: 1.4, ease: EASE.inOut }).fromTo(
    inner,
    { scale: 1.12 },
    { scale: 1, duration: 1.8, ease: EASE.reveal },
    0.1,
  );
  return tl;
}
