import { gsap } from "../gsap";

type ParallaxOptions = {
  /** Travel in percent of the element's own height, applied ±. */
  amount?: number;
  trigger?: Element | null;
  scrub?: boolean | number;
};

/** Scroll-linked vertical drift. Positive amount moves against scroll. */
export function parallax(el: gsap.TweenTarget, opts: ParallaxOptions = {}) {
  const { amount = 8, trigger, scrub = true } = opts;
  return gsap.fromTo(
    el,
    { yPercent: -amount },
    {
      yPercent: amount,
      ease: "none",
      scrollTrigger: {
        trigger: (trigger ?? (el as Element)) as Element,
        start: "top bottom",
        end: "bottom top",
        scrub,
      },
    },
  );
}
