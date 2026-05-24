import { PostListing } from "@/components/PostListing";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ num: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { num } = await params;
  const page = parseInt(num, 10);
  return {
    title: page > 1 ? `Page ${page}` : "Home",
  };
}

export default async function HomePaginatedPage({ params }: Props) {
  const { num } = await params;
  const page = parseInt(num, 10);
  if (Number.isNaN(page) || page < 2) notFound();

  return (
    <section className="page-section expert-tips">
      <div className="container">
        <h1 className="section-title section-title-center">
          Expert Tips for Your Next Financial Move
        </h1>
        <PostListing basePath="/" page={page} perPage={10} />
      </div>
    </section>
  );
}
