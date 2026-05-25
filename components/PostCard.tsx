import Image from "next/image";
import Link from "next/link";
import {
  formatDate,
  getFeaturedImage,
  stripHtml,
  type WPPost,
} from "@/lib/wordpress";

export function PostCard({ post }: { post: WPPost }) {
  const image = getFeaturedImage(post);
  const title = stripHtml(post.title.rendered);
  const excerpt = stripHtml(post.excerpt.rendered);

  return (
    <article className="post-card">
      <Link href={`/${post.slug}`}>
        {image ? (
          <Image
            src={image}
            alt={title}
            width={580}
            height={325}
            className="post-card-image"
          />
        ) : (
          <div className="post-card-image post-card-placeholder" />
        )}
      </Link>
      <time className="post-card-date" dateTime={post.date}>
        {formatDate(post.date)}
      </time>
      <h3 className="post-card-title">
        <Link href={`/${post.slug}`}>{title}</Link>
      </h3>
      {excerpt ? <p className="post-card-excerpt">{excerpt}</p> : null}
      <Link href={`/${post.slug}`} className="post-card-read-more">
        Read more
      </Link>
    </article>
  );
}
