import type { Metadata } from "next";
import { CategoryArchive } from "@/components/CategoryArchive";

export const metadata: Metadata = {
  title: "Home Insurance",
};

export default function HomeInsurancePage() {
  return <CategoryArchive slug="home-insurance" />;
}
