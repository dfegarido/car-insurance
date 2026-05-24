import { PostListing } from "./PostListing";
import { CATEGORY_IDS } from "@/lib/wordpress";

const CATEGORY_CONFIG: Record<
  string,
  { id: number; title: string; path: string }
> = {
  "auto-insurance": {
    id: CATEGORY_IDS.auto,
    title: "Auto Insurance",
    path: "/auto-insurance",
  },
  "home-insurance": {
    id: CATEGORY_IDS.home,
    title: "Home Insurance",
    path: "/home-insurance",
  },
  "health-insurance": {
    id: CATEGORY_IDS.health,
    title: "Health Insurance",
    path: "/health-insurance",
  },
  "business-insurance": {
    id: CATEGORY_IDS.business,
    title: "Business Insurance",
    path: "/business-insurance",
  },
};

type Props = {
  slug: keyof typeof CATEGORY_CONFIG;
  page?: number;
};

export function getCategoryConfig(slug: string) {
  return CATEGORY_CONFIG[slug as keyof typeof CATEGORY_CONFIG];
}

export async function CategoryArchive({ slug, page = 1 }: Props) {
  const config = getCategoryConfig(slug);
  if (!config) return null;

  return (
    <>
      <div className="archive-header">
        <div className="container">
          <h1>{config.title}</h1>
        </div>
      </div>
      <section className="page-section">
        <div className="container">
          <PostListing
            basePath={config.path}
            page={page}
            categoryId={config.id}
            perPage={10}
          />
        </div>
      </section>
    </>
  );
}
