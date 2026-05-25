"use client";

import { useEffect } from "react";

const ANIMATE_CLASSES = [
  "scroll-animate",
  "scroll-animate-left",
  "scroll-animate-right",
  "scroll-animate-fade",
  "scroll-animate-visible",
] as const;

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
  el.classList.add(className);
  if (delay) (el as HTMLElement).style.transitionDelay = delay;
  targets.push(el);
}

function setupAutoInsuranceAnimations() {
  const page = document.querySelector("#main-content .mri-page");
  if (!page) return () => {};

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return () => {};
  }

  clearAnimations(page);

  const targets: Element[] = [];

  page.querySelectorAll(".mri-hero-copy").forEach((el) => {
    register(el, "scroll-animate", targets);
  });

  page.querySelectorAll(".mri-steps-head").forEach((el) => {
    register(el, "scroll-animate-fade", targets);
  });

  page.querySelectorAll(".mri-step").forEach((el, index) => {
    register(el, "scroll-animate", targets, `${index * 0.1}s`);
  });

  page.querySelectorAll(".mri-benefits-aside").forEach((el) => {
    register(el, "scroll-animate-left", targets);
  });

  page.querySelectorAll(".mri-benefit").forEach((el, index) => {
    register(
      el,
      "scroll-animate",
      targets,
      `${(index % 2) * 0.08 + Math.floor(index / 2) * 0.1}s`
    );
  });

  page.querySelectorAll(".mri-pain-cell-image").forEach((el) => {
    register(el, "scroll-animate-fade", targets);
  });

  page.querySelectorAll(".mri-pain-cell-copy").forEach((el, index) => {
    register(
      el,
      index % 2 === 0 ? "scroll-animate-left" : "scroll-animate-right",
      targets
    );
  });

  page.querySelectorAll(".mri-testimonials-head").forEach((el) => {
    register(el, "scroll-animate-fade", targets);
  });

  page.querySelectorAll(".mri-testimonial").forEach((el, index) => {
    register(el, "scroll-animate", targets, `${index * 0.12}s`);
  });

  const zipBlock = page.querySelector(".mri-zip-block");
  if (zipBlock) {
    zipBlock.querySelectorAll(":scope > *").forEach((el, index) => {
      register(el, "scroll-animate-fade", targets, `${index * 0.08}s`);
    });
  }

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

  return () => {
    observer.disconnect();
    clearAnimations(page);
  };
}

export function AutoInsuranceAnimations() {
  useEffect(() => {
    let cleanup = () => {};
    const frame = requestAnimationFrame(() => {
      cleanup = setupAutoInsuranceAnimations();
    });
    return () => {
      cancelAnimationFrame(frame);
      cleanup();
    };
  }, []);

  return null;
}
