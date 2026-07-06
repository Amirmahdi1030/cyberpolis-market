export type Category = {
  slug: string;
  name: string;
  icon: string; // emoji glyph used in the generative art + chips
  blurb: string;
  accent: "blue" | "orange" | "red";
  subcategories?: { slug: string; name: string }[];
};

export const CATEGORIES: Category[] = [
  {
    slug: "skins",
    name: "Skins",
    icon: "🧥",
    blurb: "Wearable cosmetics — each slot sold separately.",
    accent: "blue",
    subcategories: [
      { slug: "pants", name: "Pants" },
      { slug: "shirts", name: "Shirts" },
      { slug: "hoodies", name: "Hoodies" },
      { slug: "shoes", name: "Shoes" },
    ],
  },
  {
    slug: "guns",
    name: "Guns",
    icon: "🔫",
    blurb: "Weapons and weapon skins.",
    accent: "red",
    subcategories: [
      { slug: "weapons", name: "Guns" },
      { slug: "gun-skins", name: "Gun Skins" },
    ],
  },
  {
    slug: "hair",
    name: "Hair",
    icon: "💇",
    blurb: "Hairstyles and colors.",
    accent: "orange",
  },
  {
    slug: "face",
    name: "Face",
    icon: "🙂",
    blurb: "Faces, expressions and makeup.",
    accent: "blue",
  },
  {
    slug: "character",
    name: "Character",
    icon: "🧍",
    blurb: "Complete, ready-to-play characters.",
    accent: "orange",
  },
  {
    slug: "accessory",
    name: "Accessory",
    icon: "🎒",
    blurb: "Bags, glasses, jewelry and more.",
    accent: "blue",
  },
  {
    slug: "emotes",
    name: "Emotes",
    icon: "🕺",
    blurb: "Animations, dances and expressions.",
    accent: "red",
  },
  {
    slug: "pets",
    name: "Pets",
    icon: "🐾",
    blurb: "Companions that follow your character.",
    accent: "orange",
  },
  {
    slug: "vehicles",
    name: "Vehicles",
    icon: "🏍️",
    blurb: "Mounts, bikes and rides.",
    accent: "blue",
  },
  {
    slug: "bundles",
    name: "Bundles",
    icon: "📦",
    blurb: "Curated sets at a package price.",
    accent: "red",
  },
];

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
