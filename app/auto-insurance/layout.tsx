import { AutoInsuranceAnimations } from "@/components/AutoInsuranceAnimations";
import "./auto-insurance.css";

export default function AutoInsuranceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mri-page-full">
      {children}
      <AutoInsuranceAnimations />
    </div>
  );
}
