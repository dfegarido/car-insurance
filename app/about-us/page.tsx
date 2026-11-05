import type { Metadata } from "next";
import Link from "next/link";
import { SITE_BRAND_NAME } from "@/lib/site";
import "../legal.css";

export const metadata: Metadata = {
  title: "About Us",
};

export default function AboutUsPage() {
  return (
    <div className="legal-page">
      <div className="container wp-content">
        <h1>About Us</h1>
        <p>
          {SITE_BRAND_NAME} helps people explore insurance options. Whether you
          are looking for auto, home, health or business coverage, we make it
          easier to learn about your choices and connect with licensed agents
          and carriers.
        </p>

        <h2>What We Do</h2>
        <p>
          We are not an insurer. We do not issue insurance policies or make
          coverage decisions. When you request a quote, we share your
          information with licensed insurance professionals so they can contact
          you about options that may fit your needs.
        </p>

        <h2>Our Approach</h2>
        <p>
          We aim to explain insurance in plain language, respect your privacy,
          and give you clear choices about how your information is used. Read
          our <Link href="/privacy-policy">Privacy Policy</Link> to learn more.
        </p>

        <h2>Get in Touch</h2>
        <p>
          Questions? <Link href="/contact-us">Contact us</Link> and we will be
          happy to help.
        </p>
      </div>
    </div>
  );
}
