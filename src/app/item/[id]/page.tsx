import Link from "next/link";
import { notFound } from "next/navigation";
import { getItem, ITEMS, RARITY_COLORS } from "@/lib/items";
import { getCategory } from "@/lib/categories";
import { ItemArt } from "@/components/ItemArt";
import { ItemCard } from "@/components/ItemCard";
import { BuyButton } from "@/components/BuyButton";

export function generateStaticParams() {
  return ITEMS.map((i) => ({ id: i.id }));
}

export default function ItemPage({ params }: { params: { id: string } }) {
  const item = getItem(params.id);
  if (!item) notFound();

  const category = getCategory(item.category);
  const sub = category?.subcategories?.find((s) => s.slug === item.subcategory);
  const related = ITEMS.filter(
    (i) => i.category === item.category && i.id !== item.id
  ).slice(0, 5);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-6 flex items-center gap-2 text-sm text-white/40">
        <Link href="/marketplace" className="hover:text-white">
          Marketplace
        </Link>
        <span>/</span>
        <Link href={`/category/${item.category}`} className="hover:text-white">
          {category?.name}
        </Link>
        {sub && (
          <>
            <span>/</span>
            <span className="text-white/60">{sub.name}</span>
          </>
        )}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Art */}
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-ink-850">
          <ItemArt
            seed={item.seed}
            category={item.category}
            className="aspect-square w-full"
          />
        </div>

        {/* Details */}
        <div>
          <span
            className="inline-block rounded-md px-2.5 py-1 text-xs font-semibold uppercase tracking-wider"
            style={{
              color: RARITY_COLORS[item.rarity],
              background: "rgba(255,255,255,.04)",
              boxShadow: `inset 0 0 0 1px ${RARITY_COLORS[item.rarity]}55`,
            }}
          >
            {item.rarity}
          </span>
          <h1 className="mt-3 font-display text-3xl font-black text-white sm:text-4xl">
            {item.name}
          </h1>
          <p className="mt-2 text-sm text-white/45">
            {category?.icon} {category?.name}
            {sub ? ` · ${sub.name}` : ""}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Field label="Creator" value={item.creator} />
            <Field label="Token standard" value="ERC-1155" />
            <Field
              label="Supply"
              value={`${item.minted} / ${item.supply} minted`}
            />
            <Field label="Network" value="Testnet (Sepolia)" />
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-ink-850 p-5">
            <div className="mb-4 flex items-end justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-white/40">
                  Current price
                </p>
                <p className="font-display text-3xl font-black text-white">
                  {item.price}{" "}
                  <span className="text-lg text-accent-blue">ETH</span>
                </p>
              </div>
            </div>
            <BuyButton item={item} />
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 font-display text-2xl font-black text-white">
            More {category?.name}
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {related.map((r) => (
              <ItemCard key={r.id} item={r} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/5 bg-ink-850 p-3">
      <p className="text-xs uppercase tracking-wider text-white/35">{label}</p>
      <p className="mt-1 truncate text-sm text-white/85">{value}</p>
    </div>
  );
}
