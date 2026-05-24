import Image from "next/image";
import { notFound } from "next/navigation";
import {
  formatDate,
  getFeaturedImage,
  getPostBySlug,
  stripHtml,
} from "@/lib/wordpress";
import "../article.css";

const RESERVED_SLUGS = new Set([
  "auto-insurance",
  "home-insurance",
  "health-insurance",
  "business-insurance",
  "contact-us",
  "privacy-policy",
  "terms-of-services",
  "page",
]);

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  if (RESERVED_SLUGS.has(slug)) return {};
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Not Found" };
  return {
    title: stripHtml(post.title.rendered),
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  if (RESERVED_SLUGS.has(slug)) notFound();

  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const image = getFeaturedImage(post);
  const title = stripHtml(post.title.rendered);

  return (
    <article className="article-page">
      <header className="article-header">
        <div className="container">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <h1>{title}</h1>
        </div>
      </header>
      {image && (
        <div className="container article-featured">
          <Image
            src={image}
            alt={title}
            width={1200}
            height={675}
            priority
            style={{ width: "100%", height: "auto", borderRadius: 8 }}
          />
        </div>
      )}
      <div
        className="container wp-content article-body"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />
    </article>
  );
}
