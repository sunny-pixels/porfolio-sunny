import { cn } from "@/lib/cn";

type Props = {
  index: string;
  children: React.ReactNode;
  /** Right-hand file-path style annotation, e.g. "releases/featured". */
  path?: string;
  className?: string;
};

/** Release-notes section marker: § 03 ——— Selected releases */
export default function SectionLabel({ index, children, path, className }: Props) {
  return (
    <p className={cn("t-micro flex items-center gap-4", className)}>
      <span className="tabular-nums">§ {index}</span>
      <span aria-hidden="true" className="h-px w-10 bg-current opacity-40" />
      <span>{children}</span>
      {path ? <span className="ml-auto hidden normal-case tracking-normal opacity-60 md:inline">~/{path}</span> : null}
    </p>
  );
}
