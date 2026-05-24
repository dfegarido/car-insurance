import Link from "next/link";

type Props = {
  basePath: string;
  currentPage: number;
  totalPages: number;
};

export function Pagination({ basePath, currentPage, totalPages }: Props) {
  if (totalPages <= 1) return null;

  const pages: (number | "ellipsis")[] = [];
  const showPages = 5;
  let start = Math.max(1, currentPage - 2);
  let end = Math.min(totalPages, start + showPages - 1);
  start = Math.max(1, end - showPages + 1);

  if (start > 1) {
    pages.push(1);
    if (start > 2) pages.push("ellipsis");
  }
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < totalPages) {
    if (end < totalPages - 1) pages.push("ellipsis");
    pages.push(totalPages);
  }

  const pageHref = (page: number) =>
    page === 1 ? basePath : `${basePath}/page/${page}`;

  return (
    <nav className="pagination" aria-label="Pagination">
      {currentPage > 1 && (
        <Link href={pageHref(currentPage - 1)} aria-label="Previous page">
          ‹
        </Link>
      )}
      {pages.map((page, i) =>
        page === "ellipsis" ? (
          <span key={`e-${i}`}>…</span>
        ) : (
          <Link
            key={page}
            href={pageHref(page)}
            className={page === currentPage ? "active" : undefined}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </Link>
        )
      )}
      {currentPage < totalPages && (
        <Link href={pageHref(currentPage + 1)} aria-label="Next page">
          ›
        </Link>
      )}
    </nav>
  );
}
