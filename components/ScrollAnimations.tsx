"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const SECTION_SELECTOR =
  "#main-content > section:not(.hero-wrap), #main-content .archive-header, #main-content article, #main-content .legal-page, #main-content .contact-section, #main-content .estimate-section";

const STAGGER_SELECTOR =
  "#main-content .post-card, #main-content .coverage-list li, #main-content .testimonials-grid blockquote";

const VARIANT_MAP: Record<string, string> = {
  ".covered-visual": "scroll-animate-left",
  ".covered-content": "scroll-animate-right",
  ".why-content": "scroll-animate-left",
  ".why-image": "scroll-animate-right",
};

const SKIP_SECTION_CLASSES = ["covered", "why-section", "testimonials", "expert-tips"];

function setupScrollAnimations() {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return () => {};

  document
    .querySelectorAll(
      ".scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-fade, .scroll-animate-visible"
    )
    .forEach((el) => {
      el.classList.remove(
        "scroll-animate",
        "scroll-animate-left",
        "scroll-animate-right",
        "scroll-animate-fade",
        "scroll-animate-visible"
      );
      (el as HTMLElement).style.transitionDelay = "";
    });

  const targets: Element[] = [];

  document.querySelectorAll(SECTION_SELECTOR).forEach((el) => {
    const htmlEl = el as HTMLElement;

    if (SKIP_SECTION_CLASSES.some((cls) => htmlEl.classList.contains(cls))) {
      return;
    }

    if (htmlEl.querySelector(".post-grid")) {
      const title = htmlEl.querySelector(".section-title");
      if (title) {
        title.classList.add("scroll-animate-fade");
        targets.push(title);
      }
      return;
    }

    htmlEl.classList.add("scroll-animate");
    targets.push(htmlEl);
  });

  Object.entries(VARIANT_MAP).forEach(([selector, className]) => {
    document.querySelectorAll(`#main-content ${selector}`).forEach((el) => {
      el.classList.add(className);
      targets.push(el);
    });
  });

  document.querySelectorAll(STAGGER_SELECTOR).forEach((el, index) => {
    el.classList.add("scroll-animate");
    (el as HTMLElement).style.transitionDelay = `${(index % 4) * 0.1}s`;
    targets.push(el);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("scroll-animate-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -48px 0px" }
  );

  targets.forEach((el) => observer.observe(el));

  return () => observer.disconnect();
}

export function ScrollAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    let cleanup = () => {};
    const frame = requestAnimationFrame(() => {
      cleanup = setupScrollAnimations();
    });
    return () => {
      cancelAnimationFrame(frame);
      cleanup();
    };
  }, [pathname]);

  return null;
}
