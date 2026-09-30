import { cn } from "@/lib/cn";

type Variant = "crosshair" | "corners" | "node" | "dots";

/**
 * Hairline ornament family — drawn from engineering drawings and graphs.
 * Always decorative, always currentColor.
 */
export default function Ornament({ variant, className }: { variant: Variant; className?: string }) {
  const common = {
    "aria-hidden": true,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1,
    className: cn("pointer-events-none", className),
  } as const;

  switch (variant) {
    case "crosshair":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="M12 0v9M12 15v9M0 12h9M15 12h9" vectorEffect="non-scaling-stroke" />
        </svg>
      );
    case "corners":
      return (
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" {...common}>
          <path
            d="M0 12V0h12M88 0h12v12M100 88v12H88M12 100H0V88"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      );
    case "node":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <circle cx="12" cy="12" r="4" vectorEffect="non-scaling-stroke" />
          <circle cx="12" cy="12" r="10" strokeDasharray="2 3" vectorEffect="non-scaling-stroke" />
        </svg>
      );
    case "dots":
      return (
        <svg viewBox="0 0 48 48" {...common} stroke="none" fill="currentColor">
          {Array.from({ length: 16 }, (_, i) => (
            <circle key={i} cx={6 + (i % 4) * 12} cy={6 + Math.floor(i / 4) * 12} r="1" />
          ))}
        </svg>
      );
  }
}
