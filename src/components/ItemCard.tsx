import Link from "next/link";
import { Item, RARITY_COLORS } from "@/lib/items";
import { ItemArt } from "./ItemArt";

export function ItemCard({ item }: { item: Item }) {
  return (
    <Link
      href={`/item/${item.id}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-white/5 bg-ink-850 transition hover:border-white/15 hover:shadow-glow"
    >
      <div className="relative aspect-square overflow-hidden">
        <ItemArt
          seed={item.seed}
          category={item.category}
          className="h-full w-full transition duration-500 group-hover:scale-105"
        />
        <span
          className="absolute left-2 top-2 rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
          style={{
            color: RARITY_COLORS[item.rarity],
            background: "rgba(0,0,0,.5)",
            boxShadow: `inset 0 0 0 1px ${RARITY_COLORS[item.rarity]}55`,
          }}
        >
          {item.rarity}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3">
        <h3 className="truncate text-sm font-semibold text-white/90">
          {item.name}
        </h3>
        <p className="text-xs text-white/40">
          {item.minted}/{item.supply} minted
        </p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs text-white/40">Price</span>
          <span className="font-display text-sm font-bold text-accent-blue">
            {item.price} ETH
          </span>
        </div>
      </div>
    </Link>
  );
}
