"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ContactModal } from "./ContactModal";
import "./header.css";

const NAV_LINKS = [
  { href: "/health-insurance", label: "Health Insurance" },
  { href: "/home-insurance", label: "Home Insurance" },
  { href: "/auto-insurance", label: "Auto Insurance" },
  { href: "/business-insurance", label: "Business Insurance" },
  { href: "/contact-us", label: "Contact Us" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <>
      <header className="site-header">
        <div className="container site-header-inner">
          <Link href="/" className="site-logo">
            <Image
              src="/images/logo-2.png"
              alt="The Insurance Provider"
              width={150}
              height={52}
              priority
            />
          </Link>

          <nav className={`site-nav ${menuOpen ? "open" : ""}`} aria-label="Main">
            <ul>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} onClick={() => setMenuOpen(false)}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-header-actions">
            <button
              type="button"
              className="btn btn-primary header-cta"
              onClick={() => setContactOpen(true)}
            >
              Get Started
            </button>
            <button
              type="button"
              className="menu-toggle"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
