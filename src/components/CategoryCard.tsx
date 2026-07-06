import Link from "next/link";
import { Category } from "@/lib/categories";

const ACCENT: Record<Category["accent"], string> = {
  blue: "hover:shadow-glow hover:border-accent-blue/40",
  orange: "hover:border-accent-orange/40",
  red: "hover:shadow-glow-red hover:border-accent-red/40",
};

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/category/${category.slug}`}
      className={`group flex flex-col gap-3 rounded-xl border border-white/5 bg-ink-850 p-5 transition ${ACCENT[category.accent]}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-3xl">{category.icon}</span>
        <span className="text-white/20 transition group-hover:translate-x-1 group-hover:text-white/60">
          →
        </span>
      </div>
      <div>
        <h3 className="font-display text-lg font-bold text-white">
          {category.name}
        </h3>
        <p className="mt-1 text-sm text-white/45">{category.blurb}</p>
      </div>
      {category.subcategories && (
        <div className="mt-1 flex flex-wrap gap-1.5">
          {category.subcategories.map((s) => (
            <span
              key={s.slug}
              className="rounded-md bg-white/5 px-2 py-0.5 text-[11px] text-white/50"
            >
              {s.name}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
