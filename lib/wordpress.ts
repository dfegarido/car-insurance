const WP_API = "https://www.theinsuranceprovider.com/wp-json/wp/v2";

export type WPPost = {
  id: number;
  slug: string;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  link: string;
  featured_media: number;
  categories: number[];
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text: string;
    }>;
  };
};

export type WPPage = {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
};

export type WPCategory = {
  id: number;
  slug: string;
  name: string;
  count: number;
};

export const CATEGORY_IDS = {
  auto: 16,
  home: 19,
  health: 18,
  business: 17,
  tips: 15,
} as const;

async function wpFetch<T>(path: string, revalidate = 3600): Promise<T> {
  const res = await fetch(`${WP_API}${path}`, {
    next: { revalidate },
  });
  if (!res.ok) {
    throw new Error(`WordPress API error: ${res.status} ${path}`);
  }
  return res.json() as Promise<T>;
}

export async function getPosts(options?: {
  page?: number;
  perPage?: number;
  category?: number;
}): Promise<{ posts: WPPost[]; total: number; totalPages: number }> {
  const page = options?.page ?? 1;
  const perPage = options?.perPage ?? 10;
  const params = new URLSearchParams({
    page: String(page),
    per_page: String(perPage),
    _embed: "1",
  });
  if (options?.category) {
    params.set("categories", String(options.category));
  }

  const res = await fetch(`${WP_API}/posts?${params}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    return { posts: [], total: 0, totalPages: 0 };
  }

  const posts = (await res.json()) as WPPost[];
  const total = Number(res.headers.get("x-wp-total") ?? 0);
  const totalPages = Number(res.headers.get("x-wp-totalpages") ?? 0);
  return { posts, total, totalPages };
}

export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  const { getStaticPostBySlug } = await import("./static-posts");
  const staticPost = getStaticPostBySlug(slug);
  if (staticPost) return staticPost;

  try {
    const posts = await wpFetch<WPPost[]>(
      `/posts?slug=${encodeURIComponent(slug)}&_embed=1`
    );
    return posts[0] ?? null;
  } catch {
    return null;
  }
}

export async function getAllPostSlugs(): Promise<string[]> {
  const slugs: string[] = [];
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages) {
    const res = await fetch(
      `${WP_API}/posts?per_page=100&page=${page}&_fields=slug`,
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) break;
    const posts = (await res.json()) as { slug: string }[];
    slugs.push(...posts.map((p) => p.slug));
    totalPages = Number(res.headers.get("x-wp-totalpages") ?? 1);
    page += 1;
  }

  return slugs;
}

export async function getPageBySlug(slug: string): Promise<WPPage | null> {
  const pages = await wpFetch<WPPage[]>(`/pages?slug=${encodeURIComponent(slug)}`);
  return pages[0] ?? null;
}

export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&#8217;/g, "'")
    .replace(/&#038;/g, "&")
    .replace(/&hellip;/g, "…")
    .replace(/\s+/g, " ")
    .trim();
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getFeaturedImage(post: WPPost): string | null {
  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  return media?.source_url ?? null;
}
