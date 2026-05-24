import type { Metadata } from "next";
import { CategoryArchive } from "@/components/CategoryArchive";

export const metadata: Metadata = {
  title: "Auto Insurance",
};

export default function AutoInsurancePage() {
  return <CategoryArchive slug="auto-insurance" />;
}
