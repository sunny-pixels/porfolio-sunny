"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { magnetic } from "@/lib/animations/magnetic";
import { cn } from "@/lib/cn";

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
  cursor?: string;
  strength?: number;
  external?: boolean;
};

/** Anchor with a restrained magnetic pull on fine pointers. */
export default function MagneticLink({
  href,
  children,
  className,
  cursor = "Open",
  strength = 0.28,
  external,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(`${MQ.fine} and ${MQ.motion}`, () => magnetic(ref.current!, strength));
    return () => mm.revert();
  });

  return (
    <a
      ref={ref}
      href={href}
      data-cursor={cursor}
      className={cn("inline-flex will-change-transform", className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
