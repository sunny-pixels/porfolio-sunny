"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { revealImage, type RevealDirection } from "@/lib/animations/reveal";
import { parallax as parallaxTween } from "@/lib/animations/parallax";
import { fadeIn } from "@/lib/animations/text";
import type { SiteImage } from "@/lib/images";
import { cn } from "@/lib/cn";

type Props = {
  image: SiteImage;
  sizes: string;
  className?: string;
  frameClassName?: string;
  direction?: RevealDirection;
  /** Parallax travel in % (0 disables). */
  parallax?: number;
  preload?: boolean;
  cursor?: string;
  delay?: number;
};

/**
 * Clip-path image unveil with an inner scale settle and optional scroll
 * parallax. Three wrappers (frame → drift → scale) so transforms never fight.
 */
export default function RevealImage({
  image,
  sizes,
  className,
  frameClassName,
  direction = "up",
  parallax = 0,
  preload,
  cursor,
  delay = 0,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const frame = root.querySelector(".ri-frame")!;
      const scaler = root.querySelector(".ri-scale")!;
      const drift = root.querySelector(".ri-drift")!;
      const mm = gsap.matchMedia();
      mm.add({ motion: MQ.motion, reduce: MQ.reduce, desktop: MQ.desktop }, (ctx) => {
        if (!root.getClientRects().length) return;
        if (!ctx.conditions?.motion) {
          fadeIn(frame, { trigger: root });
          return;
        }
        revealImage(frame, scaler, { direction, trigger: root, delay });
        if (parallax) parallaxTween(drift, { amount: parallax, trigger: root });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={cn("relative", className)} data-cursor={cursor}>
      <div className={cn("ri-frame img-hover relative h-full w-full overflow-hidden bg-graphite", frameClassName)}>
        <div className={cn("ri-drift absolute inset-x-0", parallax ? "-inset-y-[8%]" : "inset-y-0")}>
          <div className="ri-scale relative h-full w-full will-change-transform">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes={sizes}
              preload={preload}
              quality={85}
              className="object-cover"
              style={{ objectPosition: image.position }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
