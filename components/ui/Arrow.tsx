import { cn } from "@/lib/cn";

/** Hairline editorial arrow — long shaft, small open head. */
export default function Arrow({
  className,
  direction = "right",
}: {
  className?: string;
  direction?: "right" | "up-right" | "down" | "up";
}) {
  const rotate = { right: 0, "up-right": -45, down: 90, up: -90 }[direction];
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 44 12"
      fill="none"
      className={cn("link-arrow h-[0.7em] w-auto shrink-0", className)}
      style={{ rotate: `${rotate}deg` }}
    >
      <path d="M0 6h42.5M37 1l5.5 5-5.5 5" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
