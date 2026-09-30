import { gsap } from "../gsap";

/**
 * Subtle magnetic pull toward the pointer. Returns a cleanup function.
 * Only call on fine pointers with motion allowed.
 */
export function magnetic(el: HTMLElement, strength = 0.3) {
  const xTo = gsap.quickTo(el, "x", { duration: 0.9, ease: "power3.out" });
  const yTo = gsap.quickTo(el, "y", { duration: 0.9, ease: "power3.out" });
  let rect: DOMRect | null = null;

  const enter = () => {
    // Measure without the current offset so the pull stays stable.
    const r = el.getBoundingClientRect();
    const x = Number(gsap.getProperty(el, "x")) || 0;
    const y = Number(gsap.getProperty(el, "y")) || 0;
    rect = new DOMRect(r.left - x, r.top - y, r.width, r.height);
  };
  const move = (e: PointerEvent) => {
    if (!rect) enter();
    const r = rect!;
    xTo((e.clientX - (r.left + r.width / 2)) * strength);
    yTo((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const leave = () => {
    rect = null;
    xTo(0);
    yTo(0);
  };

  el.addEventListener("pointerenter", enter);
  el.addEventListener("pointermove", move);
  el.addEventListener("pointerleave", leave);
  return () => {
    el.removeEventListener("pointerenter", enter);
    el.removeEventListener("pointermove", move);
    el.removeEventListener("pointerleave", leave);
  };
}
