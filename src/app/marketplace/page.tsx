"use client";

import { useMemo, useState } from "react";
import { CATEGORIES } from "@/lib/categories";
import { ITEMS, Rarity } from "@/lib/items";
import { ItemCard } from "@/components/ItemCard";

const RARITIES: Rarity[] = ["Common", "Rare", "Epic", "Legendary", "Mythic"];
type Sort = "featured" | "low" | "high";

export default function MarketplacePage() {
  const [cat, setCat] = useState<string>("all");
  const [rarity, setRarity] = useState<string>("all");
  const [sort, setSort] = useState<Sort>("featured");
  const [q, setQ] = useState("");

  const items = useMemo(() => {
    let list = ITEMS.filter((i) => {
      if (cat !== "all" && i.category !== cat) return false;
      if (rarity !== "all" && i.rarity !== rarity) return false;
      if (q && !i.name.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [cat, rarity, sort, q]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-black text-white">
          Marketplace
        </h1>
        <p className="mt-1 text-sm text-white/45">
          {items.length} items across {CATEGORIES.length} categories.
        </p>
      </div>

      {/* Controls */}
      <div className="mb-6 space-y-4">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search items…"
          className="w-full rounded-xl border border-white/10 bg-ink-850 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-accent-blue/50"
        />
        <div className="flex flex-wrap items-center gap-2">
          <Chip active={cat === "all"} onClick={() => setCat("all")}>
            All
          </Chip>
          {CATEGORIES.map((c) => (
            <Chip
              key={c.slug}
              active={cat === c.slug}
              onClick={() => setCat(c.slug)}
            >
              {c.icon} {c.name}
            </Chip>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Chip active={rarity === "all"} onClick={() => setRarity("all")}>
            Any rarity
          </Chip>
          {RARITIES.map((r) => (
            <Chip
              key={r}
              active={rarity === r}
              onClick={() => setRarity(r)}
            >
              {r}
            </Chip>
          ))}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="ml-auto rounded-lg border border-white/10 bg-ink-850 px-3 py-1.5 text-sm text-white/80 outline-none"
          >
            <option value="featured">Sort: Featured</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      {items.length ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <p className="py-20 text-center text-white/40">
          No items match those filters.
        </p>
      )}
    </div>
  );
}

function Chip({
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
      className={`rounded-lg px-3 py-1.5 text-sm transition ${
        active
          ? "bg-accent-blue text-white"
          : "border border-white/10 text-white/60 hover:border-white/25 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}
