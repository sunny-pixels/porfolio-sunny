import { gsap, EASE } from "../gsap";

type RevealOptions = {
  trigger?: Element | null;
  start?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
};

const once = (trigger: Element | null | undefined, start: string) =>
  trigger ? { trigger, start, toggleActions: "play none none none" } : undefined;

/**
 * Masked line / word reveal. Targets are inner spans inside an
 * overflow-clipped parent (see the `mask-line` / `mask-word` utilities).
 */
export function revealLines(targets: gsap.TweenTarget, opts: RevealOptions = {}) {
  const { trigger, start = "top 86%", delay = 0, stagger = 0.08, duration = 1.1 } = opts;
  return gsap.fromTo(
    targets,
    { yPercent: 110 },
    { yPercent: 0, duration, delay, stagger, ease: EASE.reveal, scrollTrigger: once(trigger, start) },
  );
}

/** Reduced-motion fallback: a plain, short fade. */
export function fadeIn(targets: gsap.TweenTarget, opts: RevealOptions = {}) {
  const { trigger, start = "top 90%", delay = 0, stagger = 0.03 } = opts;
  return gsap.fromTo(
    targets,
    { opacity: 0 },
    { opacity: 1, duration: 0.6, delay, stagger, ease: "none", scrollTrigger: once(trigger, start) },
  );
}

/** Short upward fade for metadata and body copy. */
export function riseIn(targets: gsap.TweenTarget, opts: RevealOptions = {}) {
  const { trigger, start = "top 88%", delay = 0, stagger = 0.06, duration = 0.9 } = opts;
  return gsap.fromTo(
    targets,
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration, delay, stagger, ease: EASE.soft, scrollTrigger: once(trigger, start) },
  );
}

/** Hairline rule drawing from the left. */
export function drawRule(targets: gsap.TweenTarget, opts: RevealOptions = {}) {
  const { trigger, start = "top 90%", delay = 0, stagger = 0.05, duration = 1.1 } = opts;
  return gsap.fromTo(
    targets,
    { scaleX: 0, transformOrigin: "left center" },
    { scaleX: 1, duration, delay, stagger, ease: EASE.inOut, scrollTrigger: once(trigger, start) },
  );
}

/**
 * Mechanical counter: the number ticks up in discrete steps like a build
 * log, rather than easing smoothly.
 */
export function countUp(el: HTMLElement, opts: RevealOptions & { to: number; pad?: number; suffix?: string }) {
  const { trigger = el, start = "top 90%", delay = 0, duration = 1.2, to, pad = 0, suffix = "" } = opts;
  const state = { v: 0 };
  const render = () => {
    el.textContent = String(Math.round(state.v)).padStart(pad, "0") + suffix;
  };
  render();
  return gsap.to(state, {
    v: to,
    duration,
    delay,
    ease: "steps(24)",
    onUpdate: render,
    scrollTrigger: once(trigger, start),
  });
}
