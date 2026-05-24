import Image from "next/image";
import Link from "next/link";
import {
  SITE_BRAND_NAME,
  SITE_EMAIL,
  SITE_LOGO,
  SITE_LOGO_ALT,
} from "@/lib/site";
import "./footer.css";

const QUICK_LINKS = [
  { href: "/health-insurance", label: "Health Insurance" },
  { href: "/home-insurance", label: "Home Insurance" },
  { href: "/auto-insurance", label: "Auto Insurance" },
  { href: "/business-insurance", label: "Business Insurance" },
  { href: "/contact-us", label: "Contact Us" },
];

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="container footer-grid">
          <div className="footer-col footer-col-logo">
            <Link href="/" className="footer-logo">
              <Image
                src={SITE_LOGO}
                alt={SITE_LOGO_ALT}
                width={200}
                height={69}
              />
            </Link>
          </div>

          <div className="footer-col">
            <h2>Contact Info</h2>
            <ul className="footer-list">
              <li>
                <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>
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
              Your Hub for Clever Home Hacks: Simplify, Innovate, Thrive with
              Home Hack Hub.
            </p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p className="footer-copyright">
            Copyright © {CURRENT_YEAR} {SITE_BRAND_NAME}
          </p>
          <div className="footer-bottom-right">
            <p className="footer-powered">Powered by {SITE_BRAND_NAME}</p>
            <p className="footer-legal">
              <Link href="/privacy-policy">Privacy Policy</Link>
              <span className="footer-legal-sep"> | </span>
              <Link href="/terms-of-services">Terms of Services</Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
