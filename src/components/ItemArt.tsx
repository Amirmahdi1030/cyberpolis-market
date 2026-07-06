import { getCategory } from "@/lib/categories";

// Offline, deterministic generative art so every item has a distinct on-brand
// visual without loading external images.
export function ItemArt({
  seed,
  category,
  icon,
  className,
}: {
  seed: number;
  category: string;
  icon?: string;
  className?: string;
}) {
  const cat = getCategory(category);
  const glyph = icon ?? cat?.icon ?? "◆";

  const rand = mulberry(seed);
  const hueA = Math.floor(rand() * 360);
  const hueB = (hueA + 40 + Math.floor(rand() * 120)) % 360;
  const rot = Math.floor(rand() * 360);
  const shapes = Array.from({ length: 5 }).map(() => ({
    cx: 10 + rand() * 80,
    cy: 10 + rand() * 80,
    r: 6 + rand() * 26,
    o: 0.12 + rand() * 0.4,
  }));

  const id = `g${seed}`;
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <linearGradient id={id} gradientTransform={`rotate(${rot} .5 .5)`}>
          <stop offset="0%" stopColor={`hsl(${hueA} 85% 22%)`} />
          <stop offset="100%" stopColor={`hsl(${hueB} 80% 12%)`} />
        </linearGradient>
      </defs>
      <rect width="100" height="100" fill={`url(#${id})`} />
      {shapes.map((s, i) => (
        <circle
          key={i}
          cx={s.cx}
          cy={s.cy}
          r={s.r}
          fill={`hsl(${(hueB + i * 30) % 360} 90% 60%)`}
          opacity={s.o}
        />
      ))}
      <text
        x="50"
        y="54"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="34"
        style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,.5))" }}
      >
        {glyph}
      </text>
    </svg>
  );
}

function mulberry(seed: number) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
