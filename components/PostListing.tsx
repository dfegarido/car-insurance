import { PostCard } from "./PostCard";
import { Pagination } from "./Pagination";
import { getPosts } from "@/lib/wordpress";

type Props = {
  basePath: string;
  page?: number;
  categoryId?: number;
  perPage?: number;
  showPagination?: boolean;
};

export async function PostListing({
  basePath,
  page = 1,
  categoryId,
  perPage = 10,
  showPagination = true,
}: Props) {
  const { posts, totalPages } = await getPosts({
    page,
    perPage,
    category: categoryId,
  });

  return (
    <>
      <div className="post-grid">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      {showPagination && (
        <Pagination
          basePath={basePath}
          currentPage={page}
          totalPages={totalPages}
        />
      )}
    </>
  );
}
