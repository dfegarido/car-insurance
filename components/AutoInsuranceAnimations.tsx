"use client";

import { useEffect } from "react";

const ANIMATE_CLASSES = [
  "scroll-animate",
  "scroll-animate-left",
  "scroll-animate-right",
  "scroll-animate-fade",
  "scroll-animate-visible",
] as const;

function clearAnimations(root: ParentNode) {
  root
    .querySelectorAll(ANIMATE_CLASSES.map((c) => `.${c}`).join(", "))
    .forEach((el) => {
      el.classList.remove(...ANIMATE_CLASSES);
      (el as HTMLElement).style.transitionDelay = "";
    });
}

function observe(targets: Element[]): IntersectionObserver {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("scroll-animate-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  targets.forEach((el) => observer.observe(el));
  return observer;
}

function setupAutoInsuranceAnimations() {
  const page = document.querySelector("#main-content .mri-page");
  if (!page) return () => {};

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return () => {};
  }

  clearAnimations(page);

  const targets: Element[] = [];

  page.querySelectorAll(".mri-steps-head").forEach((el) => {
    el.classList.add("scroll-animate-fade");
    targets.push(el);
  });

  page.querySelectorAll(".mri-step").forEach((el, index) => {
    el.classList.add("scroll-animate");
    (el as HTMLElement).style.transitionDelay = `${index * 0.12}s`;
    targets.push(el);
  });

  page.querySelectorAll(".mri-benefits-aside").forEach((el) => {
    el.classList.add("scroll-animate-left");
    targets.push(el);
  });

  page.querySelectorAll(".mri-benefit").forEach((el, index) => {
    el.classList.add("scroll-animate");
    (el as HTMLElement).style.transitionDelay = `${(index % 2) * 0.08 + Math.floor(index / 2) * 0.1}s`;
    targets.push(el);
  });

  page.querySelectorAll(".mri-pain-cell-image").forEach((el) => {
    el.classList.add("scroll-animate-fade");
    targets.push(el);
  });

  page.querySelectorAll(".mri-pain-cell-copy").forEach((el, index) => {
    el.classList.add(
      index % 2 === 0 ? "scroll-animate-left" : "scroll-animate-right"
    );
    targets.push(el);
  });

  page.querySelectorAll(".mri-testimonials-head").forEach((el) => {
    el.classList.add("scroll-animate-fade");
    targets.push(el);
  });

  page.querySelectorAll(".mri-testimonial").forEach((el, index) => {
    el.classList.add("scroll-animate");
    (el as HTMLElement).style.transitionDelay = `${index * 0.14}s`;
    targets.push(el);
  });

  const zipBlock = page.querySelector(".mri-zip-block");
  if (zipBlock) {
    zipBlock.querySelectorAll(":scope > *").forEach((el, index) => {
      el.classList.add("scroll-animate-fade");
      (el as HTMLElement).style.transitionDelay = `${index * 0.08}s`;
      targets.push(el);
    });
  }

  const observer = observe(targets);

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
