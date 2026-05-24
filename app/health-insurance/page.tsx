import type { Metadata } from "next";
import { CategoryArchive } from "@/components/CategoryArchive";

export const metadata: Metadata = {
  title: "Health Insurance",
};

export default function HealthInsurancePage() {
  return <CategoryArchive slug="health-insurance" />;
}
