import { CategoryArchive } from "@/components/CategoryArchive";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ num: string }> };

export default async function BusinessInsurancePaginated({ params }: Props) {
  const page = parseInt((await params).num, 10);
  if (Number.isNaN(page) || page < 2) notFound();
  return <CategoryArchive slug="business-insurance" page={page} />;
}
