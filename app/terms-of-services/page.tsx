import type { Metadata } from "next";
import "../legal.css";

export const metadata: Metadata = {
  title: "Terms of Services",
};

export default function TermsPage() {
  return (
    <div className="legal-page">
      <div className="container wp-content">
        <h1>Terms of Services</h1>
        <p>
          <strong>Effective Date:</strong> June 5, 2024
        </p>
        <p>
          Welcome to homehackhub.com (the &ldquo;Website&rdquo;). By accessing or
          using our Website, you agree to comply with and be bound by the
          following Terms of Service (the &ldquo;Terms&rdquo;). Please read these
          Terms carefully before using the Website.
        </p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using the Website, you agree to be bound by these Terms
          and our Privacy Policy. If you do not agree with any part of these
          Terms, you must not use the Website.
        </p>

        <h2>2. Changes to Terms</h2>
        <p>
          We reserve the right to modify or replace these Terms at any time. We
          will notify you of any changes by posting the new Terms on the Website.
          Your continued use of the Website after such changes constitutes your
          acceptance of the new Terms.
        </p>

        <h2>3. Use of the Website</h2>
        <p>
          <strong>a. Eligibility:</strong> You must be at least 18 years old to use
          the Website.
        </p>
        <p>
          <strong>b. License:</strong> We grant you a limited, non-exclusive,
          non-transferable, and revocable license to use the Website for personal,
          non-commercial use.
        </p>
        <p>
          <strong>c. Prohibited Conduct:</strong> You agree not to: use the Website
          for any unlawful purpose; engage in any conduct that may harm the Website
          or its users; attempt to gain unauthorized access to the Website, other
          accounts, or computer systems; transmit any harmful or disruptive code.
        </p>

        <h2>4. User Content</h2>
        <p>
          <strong>a. Responsibility:</strong> You are solely responsible for any
          content you post or submit on the Website.
        </p>
        <p>
          <strong>b. License to Use:</strong> By posting content on the Website, you
          grant us a worldwide, non-exclusive, royalty-free license to use,
          reproduce, modify, and distribute your content in connection with the
          Website.
        </p>
        <p>
          <strong>c. Prohibited Content:</strong> You agree not to post content that
          is illegal, harmful, or offensive; infringes on the rights of others; or
          contains false or misleading information.
        </p>

        <h2>5. Intellectual Property</h2>
        <p>
          All content on the Website, including text, graphics, logos, and software,
          is the property of homehackhub.com or its content suppliers and protected
          by intellectual property laws. You may not use any content from the
          Website without our express written permission.
        </p>

        <h2>6. Disclaimer of Warranties</h2>
        <p>
          The Website is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;
          without warranties of any kind, either express or implied. We do not
          warrant that the Website will be uninterrupted, error-free, or free of
          viruses or other harmful components.
        </p>

        <h2>7. Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, homehackhub.com shall not be
          liable for any indirect, incidental, special, or consequential damages
          arising out of or in connection with your use of the Website.
        </p>

        <h2>8. Indemnification</h2>
        <p>
          You agree to indemnify and hold harmless homehackhub.com, its affiliates,
          and its employees from any claims, damages, losses, or expenses arising
          out of your use of the Website or your violation of these Terms.
        </p>

        <h2>9. Governing Law</h2>
        <p>
          These Terms shall be governed by and construed in accordance with the
          laws of [Your State/Country], without regard to its conflict of law
          principles.
        </p>

        <h2>10. Contact Information</h2>
        <p>
          If you have any questions about these Terms, please contact us at:{" "}
          <a href="mailto:[email protected]">[email protected]</a>
        </p>
      </div>
    </div>
  );
}
