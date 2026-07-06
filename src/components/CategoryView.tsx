"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { getCategory } from "@/lib/categories";
import { itemsByCategory } from "@/lib/items";
import { ItemCard } from "@/components/ItemCard";

export function CategoryView({ slug }: { slug: string }) {
  const category = getCategory(slug);
  const [sub, setSub] = useState<string>("all");

  const all = useMemo(
    () => (category ? itemsByCategory(category.slug) : []),
    [category]
  );
  const items = useMemo(
    () => (sub === "all" ? all : all.filter((i) => i.subcategory === sub)),
    [all, sub]
  );

  if (!category) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-24 text-center">
        <p className="text-white/60">Category not found.</p>
        <Link href="/marketplace" className="mt-4 inline-block text-accent-blue">
          ← Back to marketplace
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Link
        href="/marketplace"
        className="text-sm text-white/40 transition hover:text-white"
      >
        ← All categories
      </Link>

      <div className="mt-4 flex items-center gap-4">
        <span className="grid h-16 w-16 place-items-center rounded-2xl border border-white/10 bg-ink-850 text-4xl">
          {category.icon}
        </span>
        <div>
          <h1 className="font-display text-3xl font-black text-white">
            {category.name}
          </h1>
          <p className="mt-1 text-sm text-white/45">{category.blurb}</p>
        </div>
      </div>

      {category.subcategories && (
        <div className="mt-6 flex flex-wrap gap-2">
          <SubChip active={sub === "all"} onClick={() => setSub("all")}>
            All {category.name}
          </SubChip>
          {category.subcategories.map((s) => (
            <SubChip
              key={s.slug}
              active={sub === s.slug}
              onClick={() => setSub(s.slug)}
            >
              {s.name}
            </SubChip>
          ))}
        </div>
      )}

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

function SubChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg px-3.5 py-1.5 text-sm transition ${
        active
          ? "bg-accent-orange text-ink-950"
          : "border border-white/10 text-white/60 hover:border-white/25 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}
