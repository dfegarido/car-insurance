"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const ANIMATE_CLASSES = [
  "scroll-animate",
  "scroll-animate-left",
  "scroll-animate-right",
  "scroll-animate-fade",
  "scroll-animate-card-media",
  "scroll-animate-visible",
] as const;

const EXPERT_TIPS_ROOT = ".expert-tips, .page-section.expert-tips";

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
  "estimate-section",
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

/** Article detail pages — animate blocks inside body, not the whole wrapper */
function getArticleContentBlocks(main: HTMLElement): Element[] {
  const wp = main.querySelector(".article-page .article-body .wp-content");
  if (!wp) return [];

  const prose = wp.querySelector(":scope > .article-prose");
  if (prose) {
    return Array.from(prose.querySelectorAll(":scope > *"));
  }

  return Array.from(wp.querySelectorAll(":scope > *"));
}

/** Expert Tips post cards — image lift, then text stagger */
function registerExpertTipsCards(main: HTMLElement, targets: Element[]) {
  main.querySelectorAll(`${EXPERT_TIPS_ROOT} .section-title`).forEach((el) => {
    register(el, "scroll-animate-fade", targets);
  });

  main.querySelectorAll(`${EXPERT_TIPS_ROOT} .post-card`).forEach((card, index) => {
    const baseDelay = `${(index % 6) * 0.12}s`;

    const media = card.querySelector(
      ".post-card-image, .post-card-placeholder, a .post-card-image"
    );
    if (media) {
      register(media, "scroll-animate-card-media", targets, baseDelay);
    }

    const textParts = card.querySelectorAll(
      ".post-card-date, .post-card-title, .post-card-excerpt"
    );
    textParts.forEach((el, partIndex) => {
      register(
        el,
        "scroll-animate",
        targets,
        `${(index % 6) * 0.12 + 0.08 + partIndex * 0.05}s`
      );
    });
  });

  main.querySelectorAll(`${EXPERT_TIPS_ROOT} .pagination`).forEach((el) => {
    register(el, "scroll-animate-fade", targets, "0.2s");
  });
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

  const categoryListingRoot = ".page-section:not(.expert-tips)";

  /* Standard sections */
  main.querySelectorAll(SECTION_SELECTOR).forEach((el) => {
    const htmlEl = el as HTMLElement;
    if (
      htmlEl.classList.contains("archive-header") &&
      main.querySelector(categoryListingRoot)
    ) {
      return;
    }
    if (SKIP_SECTION_CLASSES.some((cls) => htmlEl.classList.contains(cls))) {
      return;
    }
    if (htmlEl.querySelector(".post-grid")) {
      /* Listing grids use card-level animations (expert-tips, category archives) */
      if (
        htmlEl.classList.contains("expert-tips") ||
        (htmlEl.classList.contains("page-section") &&
          !htmlEl.classList.contains("expert-tips"))
      ) {
        return;
      }
      const title = htmlEl.querySelector(".section-title");
      if (title) register(title, "scroll-animate-fade", targets);
      return;
    }
    register(htmlEl, "scroll-animate", targets);
  });

  /* Article detail pages (Expert Tips card links) */
  main.querySelectorAll(".article-page .article-header .container").forEach((el) => {
    register(el, "scroll-animate", targets);
  });
  main.querySelectorAll(".article-page .article-featured").forEach((el) => {
    register(el, "scroll-animate", targets, "0.08s");
  });
  getArticleContentBlocks(main).forEach((el, index) => {
    register(el, "scroll-animate", targets, `${(index % 10) * 0.07}s`);
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

  registerExpertTipsCards(main, targets);

  /* Home / Health / Business insurance listings + paginated subpages */
  main.querySelectorAll(".archive-header .container").forEach((el) => {
    if (main.querySelector(categoryListingRoot)) {
      register(el, "scroll-animate", targets);
    }
  });
  main.querySelectorAll(`${categoryListingRoot} .post-card`).forEach((el, index) => {
    register(el, "scroll-animate", targets, `${(index % 6) * 0.1}s`);
  });
  main.querySelectorAll(`${categoryListingRoot} .pagination`).forEach((el) => {
    register(el, "scroll-animate-fade", targets, "0.12s");
  });

  /* Other post grids — fade text blocks only (whole-card opacity hid titles/excerpts) */
  main.querySelectorAll(".post-card-date, .post-card-title, .post-card-excerpt").forEach((el, index) => {
    if (el.closest(EXPERT_TIPS_ROOT)) return;
    if (el.closest(categoryListingRoot)) return;
    register(el, "scroll-animate-fade", targets, `${(index % 6) * 0.05}s`);
  });
  main.querySelectorAll(".coverage-list li").forEach((el, index) => {
    register(el, "scroll-animate", targets, `${(index % 4) * 0.08}s`);
  });
  main.querySelectorAll(".testimonials-card").forEach((el, index) => {
    register(el, "scroll-animate", targets, `${(index % 3) * 0.1}s`);
  });

  /* Contact page blocks — not estimate CTA (narrow column bug when animated) */
  main
    .querySelectorAll(
      ".contact-main, .contact-aside, .contact-info-card"
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
