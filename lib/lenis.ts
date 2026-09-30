import type Lenis from "lenis";

let instance: Lenis | null = null;

export const setLenis = (l: Lenis | null) => {
  instance = l;
};

export const getLenis = () => instance;

/** Scroll to an element or hash, respecting smooth scroll when active. */
export function scrollToTarget(target: string | HTMLElement) {
  const el =
    typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
  if (!el) return;
  if (instance) {
    const lenis = instance;
    const go = () => lenis.scrollTo(el, { duration: 1.4, force: true });
    // If an overlay has paused scrolling it is about to call start(), which
    // resets Lenis — so begin the journey just after that happens.
    if (lenis.isStopped) window.setTimeout(go, 80);
    else go();
  } else {
    el.scrollIntoView({ behavior: "auto", block: "start" });
  }
}
