import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";
import { featuredItems, ITEMS } from "@/lib/items";
import { CategoryCard } from "@/components/CategoryCard";
import { ItemCard } from "@/components/ItemCard";

export default function Home() {
  const featured = featuredItems(10);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      {/* Hero */}
      <section className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-blue" />
            Powered by Cyberpolis · Web3 game economy
          </span>
          <h1 className="mt-6 font-display text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-6xl">
            Own your{" "}
            <span className="bg-gradient-to-r from-accent-blue via-accent-orange to-accent-red bg-clip-text text-transparent">
              in-game gear
            </span>{" "}
            as real assets
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-white/55 sm:text-lg">
            A game-cosmetics NFT marketplace. Trade skins, guns, hair, faces,
            full characters and accessories. Sign in and pay directly with your
            wallet.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link
              href="/marketplace"
              className="rounded-xl bg-gradient-to-r from-accent-blue to-accent-red px-6 py-3 font-display text-sm font-bold text-white transition hover:opacity-90"
            >
              Explore marketplace
            </Link>
            <Link
              href="/category/character"
              className="rounded-xl border border-white/10 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-white/25"
            >
              Browse characters
            </Link>
          </div>

          <div className="mt-10 flex items-center justify-center gap-8 text-center">
            <Stat label="Items" value={`${ITEMS.length}+`} />
            <Stat label="Categories" value={String(CATEGORIES.length)} />
            <Stat label="Fees" value="Low-gas L2" />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8">
        <SectionHead
          title="Shop by category"
          desc="Every slot is its own asset — mix and match to build a look."
          href="/marketplace"
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c) => (
            <CategoryCard key={c.slug} category={c} />
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="py-12">
        <SectionHead
          title="Featured drops"
          desc="Legendary and mythic cosmetics from across the catalog."
          href="/marketplace"
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {featured.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-display text-2xl font-black text-white">{value}</div>
      <div className="text-xs uppercase tracking-wider text-white/40">
        {label}
      </div>
    </div>
  );
}

function SectionHead({
  title,
  desc,
  href,
}: {
  title: string;
  desc: string;
  href: string;
}) {
  return (
    <div className="mb-6 flex items-end justify-between">
      <div>
        <h2 className="font-display text-2xl font-black text-white">{title}</h2>
        <p className="mt-1 text-sm text-white/45">{desc}</p>
      </div>
      <Link
        href={href}
        className="hidden text-sm text-accent-blue transition hover:text-white sm:block"
      >
        View all →
      </Link>
    </div>
  );
}
