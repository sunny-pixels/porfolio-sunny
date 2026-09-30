import { gsap, ScrollTrigger } from "../gsap";

/**
 * Seamless horizontal loop. The track must contain its content twice so
 * that translating by -50% lands on an identical frame.
 */
export function marqueeLoop(track: HTMLElement, { speed = 40, reverse = false } = {}) {
  const distance = track.scrollWidth / 2;
  const tween = gsap.fromTo(
    track,
    { xPercent: reverse ? -50 : 0 },
    { xPercent: reverse ? 0 : -50, ease: "none", duration: distance / speed, repeat: -1 },
  );
  // Start deep inside the infinite timeline so a negative timeScale can
  // play "backwards" indefinitely without hitting time 0.
  tween.totalTime(tween.duration() * 400);
  return tween;
}

/**
 * Couples a set of loops to scroll: velocity briefly accelerates them and
 * scroll direction sets which way they drift. Settles back slowly.
 */
export function bindScrollVelocity(tweens: gsap.core.Tween[], trigger: Element) {
  let direction = 1;
  return ScrollTrigger.create({
    trigger,
    start: "top bottom",
    end: "bottom top",
    onUpdate(self) {
      direction = self.direction;
      const boost = Math.min(Math.abs(self.getVelocity()) / 450, 3.5);
      tweens.forEach((t) => {
        gsap.to(t, {
          timeScale: direction * (1 + boost),
          duration: 0.35,
          overwrite: true,
          onComplete: () => {
            gsap.to(t, { timeScale: direction, duration: 1.6, ease: "power2.out", overwrite: true });
          },
        });
      });
    },
  });
}
