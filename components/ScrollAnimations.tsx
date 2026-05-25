"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const ANIMATE_CLASSES = [
  "scroll-animate",
  "scroll-animate-left",
  "scroll-animate-right",
  "scroll-animate-fade",
  "scroll-animate-visible",
] as const;

/** Whole-page wrappers — never animate these (too tall → content vanishes) */
const SKIP_ROOT_CLASSES = ["article-page", "legal-page", "mri-page", "mri-page-full"];

/** Section parents that use child-specific animations instead */
const SKIP_SECTION_CLASSES = [
  "covered",
  "why-section",
  "testimonials",
  "expert-tips",
  "mri-section",
  "mri-hero",
  "mri-pain-mosaic",
  "mri-pain-section",
  "mri-zip-section",
  "mri-bottom-cta",
  "contact-hero",
];

const SECTION_SELECTOR =
  "#main-content > section:not(.hero-wrap), #main-content .archive-header, #main-content .page-section, #main-content .contact-section, #main-content .estimate-section";

const VARIANT_MAP: Record<string, string> = {
  ".covered-visual": "scroll-animate-left",
  ".covered-content": "scroll-animate-right",
  ".why-content": "scroll-animate-left",
  ".why-image": "scroll-animate-right",
};

const OBSERVER_OPTIONS: IntersectionObserverInit = {
  threshold: 0,
  rootMargin: "0px 0px -6% 0px",
};

function clearAnimations(root: ParentNode) {
  root
    .querySelectorAll(ANIMATE_CLASSES.map((c) => `.${c}`).join(", "))
    .forEach((el) => {
      el.classList.remove(...ANIMATE_CLASSES);
      (el as HTMLElement).style.transitionDelay = "";
    });
}

function isInViewport(el: Element): boolean {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight * 0.94 && rect.bottom > 0;
}

function register(
  el: Element,
  className: string,
  targets: Element[],
  delay?: string
) {
  if (SKIP_ROOT_CLASSES.some((cls) => el.classList.contains(cls))) return;
  el.classList.add(className);
  if (delay) (el as HTMLElement).style.transitionDelay = delay;
  targets.push(el);
}

function setupScrollAnimations() {
  const main = document.getElementById("main-content");
  if (!main) return () => {};

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return () => {};
  }

  clearAnimations(main);

  const targets: Element[] = [];

  /* Homepage hero */
  main.querySelectorAll(".hero-banner-body, .hero-content").forEach((el) => {
    register(el, "scroll-animate", targets);
  });

  /* Standard sections */
  main.querySelectorAll(SECTION_SELECTOR).forEach((el) => {
    const htmlEl = el as HTMLElement;
    if (SKIP_SECTION_CLASSES.some((cls) => htmlEl.classList.contains(cls))) {
      return;
    }
    if (htmlEl.querySelector(".post-grid")) {
      const title = htmlEl.querySelector(".section-title");
      if (title) register(title, "scroll-animate-fade", targets);
      return;
    }
    register(htmlEl, "scroll-animate", targets);
  });

  /* Blog / article pages — animate parts, not the full <article> */
  main.querySelectorAll(".article-header").forEach((el) => {
    register(el, "scroll-animate-fade", targets);
  });
  main.querySelectorAll(".article-featured").forEach((el) => {
    register(el, "scroll-animate-fade", targets);
  });
  main
    .querySelectorAll(
      ".article-body > p:first-of-type, .article-body > h2, .article-body > h3, .article-body > .takeaway, .article-body > ul, .article-body > blockquote"
    )
    .forEach((el, index) => {
      register(el, "scroll-animate", targets, `${Math.min(index, 12) * 0.06}s`);
    });

  /* Legal & static content pages */
  main.querySelectorAll(".legal-page > .container").forEach((el) => {
    register(el, "scroll-animate", targets);
  });

  /* Homepage split sections */
  Object.entries(VARIANT_MAP).forEach(([selector, className]) => {
    main.querySelectorAll(selector).forEach((el) => {
      register(el, className, targets);
    });
  });

  /* Cards & list items */
  main.querySelectorAll(".post-card").forEach((el, index) => {
    register(el, "scroll-animate", targets, `${(index % 4) * 0.08}s`);
  });
  main.querySelectorAll(".coverage-list li").forEach((el, index) => {
    register(el, "scroll-animate", targets, `${(index % 4) * 0.08}s`);
  });
  main.querySelectorAll(".testimonials-grid blockquote").forEach((el, index) => {
    register(el, "scroll-animate", targets, `${(index % 3) * 0.1}s`);
  });

  /* Contact page blocks */
  main
    .querySelectorAll(
      ".contact-main, .contact-aside, .contact-info-card, .estimate-copy, .estimate-actions"
    )
    .forEach((el, index) => {
      register(el, "scroll-animate", targets, `${index * 0.08}s`);
    });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("scroll-animate-visible");
        observer.unobserve(entry.target);
      }
    });
  }, OBSERVER_OPTIONS);

  targets.forEach((el) => {
    if (isInViewport(el)) {
      el.classList.add("scroll-animate-visible");
    } else {
      observer.observe(el);
    }
  });

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
