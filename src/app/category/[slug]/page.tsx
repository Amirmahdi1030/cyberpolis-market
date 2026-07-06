import { CATEGORIES } from "@/lib/categories";
import { CategoryView } from "@/components/CategoryView";

// Pre-render one static page per category (required for `output: export`).
export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export default function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  return <CategoryView slug={params.slug} />;
}
