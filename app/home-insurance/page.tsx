import type { Metadata } from "next";
import { InsuranceLanding } from "@/components/InsuranceLanding";

export const metadata: Metadata = {
  title: "Home Insurance",
  description:
    "Compare home insurance options and get connected with licensed agents.",
};

export default function HomeInsurancePage() {
  return (
    <InsuranceLanding
      eyebrow="Protect What Matters Most"
      title="Home Insurance Made Simple"
      intro="Find coverage for your house, belongings and liability, and get connected with licensed agents who can compare options for you."
      steps={[
        { title: "Tell Us About Your Home", description: "Share the basics: location, home type and the coverage you are looking for." },
        { title: "Compare Options", description: "A licensed agent reviews coverage options from carriers in your area." },
        { title: "Choose Your Policy", description: "Pick the coverage and deductible that fit your home and budget." },
      ]}
      benefits={[
        { title: "Dwelling Coverage", description: "Helps pay to repair or rebuild your home after covered damage such as fire or storms." },
        { title: "Personal Property", description: "Covers belongings like furniture, electronics and clothing if they are stolen or damaged." },
        { title: "Liability Protection", description: "Helps with costs if someone is injured on your property." },
        { title: "Living Expenses", description: "May help with temporary housing if a covered loss makes your home unlivable." },
      ]}
      closingTitle="Ready to Review Your Coverage?"
      closingText="Contact us and a licensed agent will help you compare home insurance options."
    />
  );
}
