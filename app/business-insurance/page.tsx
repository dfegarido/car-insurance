import type { Metadata } from "next";
import { InsuranceLanding } from "@/components/InsuranceLanding";

export const metadata: Metadata = {
  title: "Business Insurance",
  description:
    "Compare business insurance options and get connected with licensed agents.",
};

export default function BusinessInsurancePage() {
  return (
    <InsuranceLanding
      eyebrow="Protect Your Business"
      title="Business Insurance Made Simple"
      intro="From general liability to commercial property, get connected with licensed agents who can help you cover your business."
      steps={[
        { title: "Describe Your Business", description: "Tell us your industry, size and the risks you want covered." },
        { title: "Compare Coverage", description: "A licensed agent reviews policies from carriers that serve your type of business." },
        { title: "Get Covered", description: "Choose the coverage and limits that fit your operations and budget." },
      ]}
      benefits={[
        { title: "General Liability", description: "Helps protect against claims of injury or property damage tied to your business." },
        { title: "Commercial Property", description: "Covers your building, equipment and inventory against covered losses." },
        { title: "Workers' Compensation", description: "Helps with medical costs and lost wages if an employee is hurt on the job." },
        { title: "Cyber and Professional Liability", description: "Options for data breaches and claims related to your professional services." },
      ]}
      closingTitle="Ready to Cover Your Business?"
      closingText="Contact us and a licensed agent will help you compare business insurance options."
    />
  );
}
