/**
 * The hero object: an embedding space. Three depth layers of points joined
 * to their nearest neighbours, a nod to the 768-d vectors behind Career
 * Lens. Deterministic (seeded) so server and client render identically.
 */

type Pt = { x: number; y: number; r: number };

function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function cloud(seed: number, count: number, spread: number): Pt[] {
  const rand = rng(seed);
  return Array.from({ length: count }, () => {
    // Gaussian-ish clustering toward the centre of the field.
    const a = rand() * Math.PI * 2;
    const d = Math.pow(rand(), 0.7) * spread;
    return {
      x: +(300 + Math.cos(a) * d).toFixed(2),
      y: +(300 + Math.sin(a) * d).toFixed(2),
      r: +(0.8 + rand() * 1.6).toFixed(2),
    };
  });
}

function edges(pts: Pt[], k: number, max: number) {
  const out: [Pt, Pt][] = [];
  pts.forEach((p, i) => {
    pts
      .map((q, j) => ({ q, j, d: Math.hypot(p.x - q.x, p.y - q.y) }))
      .filter(({ j, d }) => j > i && d < max)
      .sort((a, b) => a.d - b.d)
      .slice(0, k)
      .forEach(({ q }) => out.push([p, q]));
  });
  return out;
}

const LAYERS = [
  { depth: "back", pts: cloud(7, 46, 290), k: 2, max: 90, opacity: 0.35 },
  { depth: "mid", pts: cloud(19, 30, 250), k: 2, max: 110, opacity: 0.6 },
  { depth: "front", pts: cloud(42, 14, 220), k: 1, max: 150, opacity: 1 },
] as const;

/** Indices of front nodes rendered as accent "matches". */
const ACCENTS = new Set([2, 7, 11]);

export default function Constellation({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 600" aria-hidden="true" className={className} fill="none">
      {LAYERS.map((layer) => (
        <g key={layer.depth} className={`cn-layer cn-${layer.depth}`} opacity={layer.opacity}>
          {edges(layer.pts, layer.k, layer.max).map(([a, b], i) => (
            <line
              key={i}
              className="cn-edge"
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="currentColor"
              strokeWidth="0.6"
              strokeOpacity="0.45"
              pathLength={1}
              strokeDasharray="1"
            />
          ))}
          {layer.pts.map((p, i) => {
            const accent = layer.depth === "front" && ACCENTS.has(i);
            return (
              <g key={i} className="cn-node" style={{ transformOrigin: `${p.x}px ${p.y}px` }}>
                {accent ? (
                  <>
                    <circle cx={p.x} cy={p.y} r={9} stroke="var(--color-dusk)" strokeWidth="0.6" strokeDasharray="2 2.5" />
                    <circle cx={p.x} cy={p.y} r={3} fill="var(--color-dusk)" />
                  </>
                ) : (
                  <circle cx={p.x} cy={p.y} r={p.r} fill="currentColor" />
                )}
              </g>
            );
          })}
        </g>
      ))}
      {/* Axis ticks, like a plotted embedding projection. */}
      <g className="cn-axis" stroke="currentColor" strokeOpacity="0.3" strokeWidth="0.6">
        <path d="M20 580H580M20 580V20" />
        {Array.from({ length: 11 }, (_, i) => (
          <path key={i} d={`M${20 + i * 56} 580v6M14 ${580 - i * 56}h6`} />
        ))}
      </g>
    </svg>
  );
}
