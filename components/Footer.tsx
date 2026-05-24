import Image from "next/image";
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
      <div className="footer-main">
        <div className="container footer-grid">
          <div className="footer-col footer-col-logo">
            <Link href="/" className="footer-logo">
              <Image
                src="/images/logo-2.png"
                alt="The Insurance Provider"
                width={180}
                height={62}
              />
            </Link>
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
              Your Hub for Clever Home Hacks: Simplify, Innovate, Thrive with
              Home Hack Hub.
            </p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p className="footer-copyright">
            Copyright © 2026 The Insurance Provider
          </p>
          <div className="footer-bottom-right">
            <p className="footer-powered">Powered by The Insurance Provider</p>
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
