import { CATEGORIES } from "./categories";

export type Rarity = "Common" | "Rare" | "Epic" | "Legendary" | "Mythic";

export type Item = {
  id: string;
  name: string;
  category: string; // category slug
  subcategory?: string; // subcategory slug
  rarity: Rarity;
  price: number; // in native token (e.g. ETH), testnet
  creator: string;
  supply: number;
  minted: number;
  seed: number; // drives the generative art
};

const RARITIES: Rarity[] = ["Common", "Rare", "Epic", "Legendary", "Mythic"];

const NAME_PARTS: Record<string, string[]> = {
  skins: ["Neon", "Carbon", "Vaporwave", "Glacier", "Ember", "Onyx", "Prism"],
  guns: ["Reaper", "Phantom", "Viper", "Tempest", "Havoc", "Nova", "Wraith"],
  hair: ["Cyber", "Retro", "Wild", "Sleek", "Frost", "Solar", "Void"],
  face: ["Stoic", "Grin", "Warpaint", "Chrome", "Feral", "Serene", "Mask"],
  character: ["Ronin", "Sentinel", "Nomad", "Specter", "Warden", "Drifter"],
  accessory: ["Halo", "Talisman", "Visor", "Chain", "Relic", "Sigil", "Aura"],
  emotes: ["Flux", "Groove", "Salute", "Taunt", "Wave", "Breaker", "Pulse"],
  pets: ["Byte", "Fang", "Pixel", "Shade", "Comet", "Nyx", "Volt"],
  vehicles: ["Raptor", "Blitz", "Drift", "Cyclone", "Rogue", "Titan", "Zephyr"],
  bundles: ["Genesis", "Apex", "Prime", "Vanguard", "Eclipse", "Overdrive"],
};

const SUFFIX = ["Edition", "Pack", "Set", "Skin", "Drop", "Series", "Kit"];

// Deterministic pseudo-random so the catalog is stable between renders.
function rng(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

function buildCatalog(): Item[] {
  const items: Item[] = [];
  let counter = 1;

  for (const cat of CATEGORIES) {
    const subs = cat.subcategories ?? [{ slug: undefined as any, name: "" }];
    const perGroup = cat.subcategories ? 4 : 8;

    for (const sub of subs) {
      for (let i = 0; i < perGroup; i++) {
        const seed = counter * 7919;
        const rand = rng(seed);
        const names = NAME_PARTS[cat.slug] ?? ["Mystic"];
        const name = `${names[Math.floor(rand() * names.length)]} ${
          sub.name || cat.name
        } ${SUFFIX[Math.floor(rand() * SUFFIX.length)]}`;

        const rarity = RARITIES[Math.floor(rand() * RARITIES.length)];
        const rarityMult =
          { Common: 1, Rare: 2.2, Epic: 4.5, Legendary: 9, Mythic: 18 }[rarity] ??
          1;
        const price = Number((0.004 * rarityMult * (0.6 + rand())).toFixed(4));
        const supply = Math.floor(10 + rand() * 990);

        items.push({
          id: String(counter),
          name,
          category: cat.slug,
          subcategory: sub.slug,
          rarity,
          price,
          creator: "0x" + (seed.toString(16) + "cyber").slice(0, 8) + "…" ,
          supply,
          minted: Math.floor(rand() * supply),
          seed,
        });
        counter++;
      }
    }
  }
  return items;
}

export const ITEMS: Item[] = buildCatalog();

export function getItem(id: string): Item | undefined {
  return ITEMS.find((i) => i.id === id);
}

export function itemsByCategory(slug: string): Item[] {
  return ITEMS.filter((i) => i.category === slug);
}

export function featuredItems(n = 8): Item[] {
  return [...ITEMS]
    .filter((i) => i.rarity === "Legendary" || i.rarity === "Mythic")
    .slice(0, n);
}

export const RARITY_COLORS: Record<Rarity, string> = {
  Common: "#8a8a99",
  Rare: "#0a84ff",
  Epic: "#a855f7",
  Legendary: "#ff9500",
  Mythic: "#ff3b30",
};
