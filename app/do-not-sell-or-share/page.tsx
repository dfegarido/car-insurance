import type { Metadata } from "next";
import { SITE_ADDRESS, SITE_EMAIL } from "@/lib/site";
import "../legal.css";

export const metadata: Metadata = {
  title: "Do Not Sell or Share My Personal Information",
};

export default function DoNotSellOrSharePage() {
  return (
    <div className="legal-page">
      <div className="container wp-content">
        <h1>Do Not Sell or Share My Personal Information</h1>
        <p>
          When you request an insurance quote, we may share your personal
          information with third parties such as licensed insurance agents,
          carriers and marketing partners so they can contact you about
          insurance products. Under some state privacy laws, this may be
          considered a &ldquo;sale&rdquo; or &ldquo;sharing&rdquo; of personal
          information.
        </p>

        <h2>Your Choice</h2>
        <p>
          You can ask us not to sell or share your personal information at any
          time. To opt out, email{" "}
          <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a> with the subject
          &ldquo;Do Not Sell or Share&rdquo;, and include your full name and the
          email address or phone number you used on our site. You may also write
          to us at {SITE_ADDRESS}.
        </p>
        <p>
          We will process your request as required by applicable law. We will not
          treat you differently for making this request.
        </p>

        <h2>Our Partners</h2>
        <p>
          We do not maintain a fixed list of partners. The third parties who
          receive your information are licensed insurance agents, insurance
          carriers and their service providers, and the recipients may change
          over time. Contact us if you would like more information about who
          received your data.
        </p>
      </div>
    </div>
  );
}
