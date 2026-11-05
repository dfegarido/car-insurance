import type { Metadata } from "next";
import Link from "next/link";
import {
  SITE_ADDRESS,
  SITE_BRAND_NAME,
  SITE_EMAIL,
  SITE_LEGAL_ENTITY,
} from "@/lib/site";
import "../legal.css";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="legal-page">
      <div className="container wp-content">
        <h1>Privacy Policy</h1>

        <h2>Who We Are</h2>
        <p>
          {SITE_BRAND_NAME} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) is operated by{" "}
          {SITE_LEGAL_ENTITY}, {SITE_ADDRESS}. Our website is
          https://www.theinsuranceprovider.com. We are not an insurer. We connect
          consumers with licensed insurance agents and carriers.
        </p>

        <h2>Information We Collect</h2>
        <p>
          When you request a quote or contact us, we collect the information you
          provide, which may include your name, phone number, email address, ZIP
          code, city and state, date of birth, and details needed for an
          insurance quote, such as vehicle information, driving and coverage
          details. We also collect technical information such as your IP address,
          browser type, device and pages visited, using cookies and similar
          technologies.
        </p>

        <h2>How We Use Your Information</h2>
        <p>
          We use your information to respond to your requests, match you with
          licensed agents and carriers, contact you about insurance options
          (including by phone, text and email where you have given consent),
          operate and improve the site, and comply with the law.
        </p>

        <h2>Who We Share Your Information With</h2>
        <p>
          If you request a quote, we share your information with licensed
          insurance agents, insurance carriers, marketing partners and service
          providers so they can contact you and provide quotes or services. We do
          not maintain a fixed list of partners, and recipients may change over
          time. This sharing may be considered a &ldquo;sale&rdquo; or
          &ldquo;sharing&rdquo; of personal information under some state laws.
          You can opt out at any time on our{" "}
          <Link href="/do-not-sell-or-share">
            Do Not Sell or Share My Personal Information
          </Link>{" "}
          page. We may also disclose information when required by law.
        </p>

        <h2>Cookies and Tracking</h2>
        <p>
          We use cookies and similar technologies to keep the site working,
          understand how it is used and measure marketing. You can control
          cookies through your browser settings.
        </p>

        <h2>Your Privacy Rights</h2>
        <p>
          Depending on where you live, you may have the right to know what
          personal information we collect, request access to or deletion of your
          information, correct it, and opt out of its sale or sharing. To make a
          request, email <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>. We
          will not discriminate against you for exercising your rights.
        </p>

        <h2>How Long We Keep Your Information</h2>
        <p>
          We keep personal information only as long as needed for the purposes
          described here, or as required by law.
        </p>

        <h2>Security</h2>
        <p>
          We use reasonable safeguards to protect your information, but no
          method of transmission or storage is completely secure.
        </p>

        <h2>Children</h2>
        <p>Our site is not intended for anyone under 18.</p>

        <h2>Changes to This Policy</h2>
        <p>
          We may update this policy from time to time. The latest version will
          always be posted on this page.
        </p>

        <h2>Contact Us</h2>
        <p>
          Questions about this policy? Email{" "}
          <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a> or write to{" "}
          {SITE_ADDRESS}.
        </p>
      </div>
    </div>
  );
}
