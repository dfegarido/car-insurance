import type { Metadata } from "next";
import { CategoryArchive } from "@/components/CategoryArchive";

export const metadata: Metadata = {
  title: "Business Insurance",
};

export default function BusinessInsurancePage() {
  return <CategoryArchive slug="business-insurance" />;
}
