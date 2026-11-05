import type { Metadata } from "next";
import { InsuranceLanding } from "@/components/InsuranceLanding";

export const metadata: Metadata = {
  title: "Health Insurance",
  description:
    "Compare health insurance options and get connected with licensed agents.",
};

export default function HealthInsurancePage() {
  return (
    <InsuranceLanding
      eyebrow="Coverage for You and Your Family"
      title="Health Insurance Made Simple"
      intro="Understand your options and get connected with licensed agents who can help you compare health plans."
      steps={[
        { title: "Share Your Needs", description: "Tell us who needs coverage and what matters most, such as doctors, prescriptions or budget." },
        { title: "Compare Plans", description: "A licensed agent walks you through plans available where you live." },
        { title: "Enroll", description: "Choose a plan and complete enrollment with your agent's help." },
      ]}
      benefits={[
        { title: "Individual and Family Plans", description: "Options for one person, couples or the whole household." },
        { title: "Plain-English Guidance", description: "Premiums, deductibles and networks explained clearly, with no pressure." },
        { title: "Local Options", description: "Plans vary by state and county, so we point you to what is available near you." },
        { title: "Enrollment Support", description: "Help understanding enrollment periods and qualifying life events." },
      ]}
      closingTitle="Ready to Compare Health Plans?"
      closingText="Contact us and a licensed agent will help you find a plan that fits."
    />
  );
}
