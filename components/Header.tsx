"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SITE_LOGO, SITE_LOGO_ALT } from "@/lib/site";
import { StartSavingCTA } from "./StartSavingCTA";
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

  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <Link href="/" className="site-logo">
          <Image
            src={SITE_LOGO}
            alt={SITE_LOGO_ALT}
            width={200}
            height={69}
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
          <StartSavingCTA className="header-cta" />
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
  );
}
