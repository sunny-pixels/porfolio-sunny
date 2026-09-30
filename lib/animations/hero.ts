import { gsap, EASE } from "../gsap";
import { CLIP_OPEN } from "./reveal";

type Q = (selector: string) => Element[];

/**
 * Hero entrance: name lines → photo unveil → graph assembles → metadata.
 * Returned paused; the loader's intro signal plays it.
 */
export function buildHeroIntro(q: Q, { reduced }: { reduced: boolean }) {
  const tl = gsap.timeline({ paused: true, defaults: { ease: EASE.reveal } });

  if (reduced) {
    tl.set(q(".hero-frame"), { clipPath: CLIP_OPEN }).fromTo(
      [q(".hero-line"), q(".hero-frame"), q(".hero-graph"), q(".hero-meta")],
      { opacity: 0 },
      { opacity: 1, duration: 0.6, stagger: 0.03, ease: "none" },
    );
    return tl;
  }

  tl.fromTo(q(".hero-line"), { yPercent: 110 }, { yPercent: 0, duration: 1.2, stagger: 0.12 }, 0)
    .fromTo(
      q(".hero-frame"),
      { clipPath: "inset(100% 0% 0% 0%)" },
      { clipPath: CLIP_OPEN, duration: 1.4, ease: EASE.inOut },
      0.15,
    )
    .fromTo(q(".hero-img"), { scale: 1.25 }, { scale: 1, duration: 2 }, 0.15)
    .fromTo(q(".hero-graph"), { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "none" }, 0.3)
    .fromTo(q(".cn-edge"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.6, stagger: 0.004, ease: EASE.inOut }, 0.35)
    .fromTo(q(".cn-node"), { scale: 0 }, { scale: 1, duration: 0.8, stagger: 0.008, ease: EASE.soft }, 0.4)
    .fromTo(q(".hero-meta"), { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.06, ease: EASE.soft }, 0.7);

  return tl;
}

/** Pointer parallax on the graph layers and photo — desktop, fine pointer. */
export function heroPointer(root: HTMLElement, q: Q) {
  const layers: [Element, number][] = [
    [q(".cn-back")[0], 10],
    [q(".cn-mid")[0], 22],
    [q(".cn-front")[0], 38],
    [q(".hero-img-pointer")[0], -12],
  ];
  const tos = layers
    .filter(([el]) => el)
    .map(([el, amt]) => ({
      amt,
      x: gsap.quickTo(el, "x", { duration: 1.2, ease: "power3.out" }),
      y: gsap.quickTo(el, "y", { duration: 1.2, ease: "power3.out" }),
    }));

  const move = (e: PointerEvent) => {
    const nx = e.clientX / window.innerWidth - 0.5;
    const ny = e.clientY / window.innerHeight - 0.5;
    tos.forEach((t) => {
      t.x(nx * t.amt);
      t.y(ny * t.amt);
    });
  };

  root.addEventListener("pointermove", move);
  return () => root.removeEventListener("pointermove", move);
}

/** Scrubbed exit: layers leave at different speeds for depth. */
export function heroExit(root: Element, q: Q) {
  return gsap
    .timeline({ scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true } })
    .to(q(".hero-l1"), { yPercent: -40, ease: "none" }, 0)
    .to(q(".hero-l2"), { yPercent: -90, ease: "none" }, 0)
    .to(q(".hero-plate"), { yPercent: -18, ease: "none" }, 0)
    .to(q(".hero-graph"), { yPercent: -30, opacity: 0.2, ease: "none" }, 0);
}
