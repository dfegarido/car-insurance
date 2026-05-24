"use client";

import Link from "next/link";
import "./footer.css";

const QUICK_LINKS = [
  { href: "/health-insurance", label: "Health Insurance" },
  { href: "/home-insurance", label: "Home Insurance" },
  { href: "/auto-insurance", label: "Auto Insurance" },
  { href: "/business-insurance", label: "Business Insurance" },
  { href: "/contact-us", label: "Contact Us" },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-col">
          <h2>Stay in the Loop</h2>
          <p>
            Join our newsletter for tips, updates, and exclusive offers to help
            you achieve financial freedom.
          </p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Your email" aria-label="Email" />
            <button type="submit" className="btn btn-accent">
              Subscribe
            </button>
          </form>
        </div>

        <div className="footer-col">
          <h2>Contact Info</h2>
          <ul className="footer-list">
            <li>
              <a href="mailto:info@theinsuranceprovider.com">
                info@theinsuranceprovider.com
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h2>Quick Links</h2>
          <ul className="footer-list">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h2>Our Service</h2>
          <p>
            Your Hub for Clever Home Hacks: Simplify, Innovate, Thrive with Home
            Hack Hub.
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>Copyright © 2026 The Insurance Provider</p>
          <p className="footer-powered">
            Powered by The Insurance Provider
            <br />
            <Link href="/privacy-policy">Privacy Policy</Link>
            {" | "}
            <Link href="/terms-of-services">Terms of Services</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
