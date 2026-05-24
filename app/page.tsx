import Image from "next/image";
import Link from "next/link";
import { PostListing } from "@/components/PostListing";
import { GetStartedButton } from "@/components/GetStartedButton";
import "./home.css";

const COVERAGE_ITEMS = [
  {
    image: "/images/list-1.webp",
    title: "AUTO INSURANCE ADVICE",
    description:
      "Get tips on finding the best coverage and lowering your car insurance costs.",
    href: "/auto-insurance",
  },
  {
    image: "/images/list-2.webp",
    title: "HOME INSURANCE TIPS",
    description:
      "Learn how to protect your biggest investment and save on premiums.",
    href: "/home-insurance",
  },
  {
    image: "/images/list-3.webp",
    title: "HEALTH INSURANCE INSIGHTS",
    description:
      "Discover how to choose the best health plan for you and your family.",
    href: "/health-insurance",
  },
  {
    image: "/images/list-4.webp",
    title: "BUSINESS INSURANCE HELP",
    description:
      "From small businesses to big ventures, we'll guide you through what you need to keep your business safe.",
    href: "/business-insurance",
  },
];

const INSURANCE_TYPES = [
  { image: "/images/auto-insurance.webp", label: "Auto", href: "/auto-insurance" },
  { image: "/images/insurance-home.webp", label: "Home", href: "/home-insurance" },
  { image: "/images/business.webp", label: "Business", href: "/business-insurance" },
  { image: "/images/health.webp", label: "Health", href: "/health-insurance" },
];

const TESTIMONIALS = [
  {
    name: "Barbara, 43",
    quote:
      "As a small business owner, I always felt overwhelmed trying to figure out what coverage I needed. Their business insurance guide was a game-changer for me. I'm finally confident that my business is properly insured!",
  },
  {
    name: "Timothy, 39",
    quote:
      "As a small business owner, I always felt overwhelmed trying to figure out what coverage I needed. Their business insurance guide was a game-changer for me. I'm finally confident that my business is properly insured!",
  },
  {
    name: "Darlene, 32",
    quote:
      "I never realized how many discounts I was missing out on until I read their tips on auto insurance. I used their advice to negotiate with my provider, and now I'm saving over $300 a year. Highly recommend this site!",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="hero-wrap">
        <div className="container">
          <div className="hero-banner">
            <div className="hero-banner-overlay" aria-hidden="true" />
            <div className="hero-banner-body">
              <div className="hero-content">
                <h1>Your Go-To Guide for Everything Insurance</h1>
                <p>
                  At Insurance Matters, we break it all down into
                  <br />
                  simple, helpful, and actionable tips—so you can
                  <br />
                  make smart choices without the stress.
                </p>
                <GetStartedButton className="hero-cta" />
              </div>
            </div>
            <nav className="hero-nav" aria-label="Insurance categories">
              {INSURANCE_TYPES.map((type, index) => (
                <Link
                  key={type.label}
                  href={type.href}
                  className={`hero-nav-item ${index === 0 ? "first" : ""} ${index === INSURANCE_TYPES.length - 1 ? "last" : ""}`}
                >
                  <Image
                    src={type.image}
                    alt=""
                    width={109}
                    height={110}
                    className="hero-nav-icon"
                  />
                  <span>{type.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </section>

      <section className="trusted">
        <div className="container">
          <p className="trusted-label">As Trusted By</p>
          <Image
            src="/images/logos.webp"
            alt="Trusted by logos"
            width={1200}
            height={90}
            className="trusted-logos"
          />
        </div>
      </section>

      <section className="covered">
        <div className="container covered-inner">
          <div className="covered-visual">
            <Image
              src="/images/left-image.webp"
              alt=""
              width={659}
              height={1064}
              className="covered-image"
            />
          </div>
          <div className="covered-content">
            <h2 className="section-title">
              We&apos;ve Got You
              <br />
              Covered
            </h2>
            <ul className="coverage-list">
              {COVERAGE_ITEMS.map((item) => (
                <li key={item.title}>
                  <Image
                    src={item.image}
                    alt=""
                    width={175}
                    height={175}
                    className="coverage-icon"
                  />
                  <div>
                    <Link href={item.href}>
                      <strong>{item.title}</strong>
                    </Link>
                    <p>{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="expert-tips">
        <div className="container">
          <h2 className="section-title section-title-center">
            Expert Tips for Your Next Financial Move
          </h2>
          <PostListing basePath="/" page={1} perPage={10} />
        </div>
      </section>

      <section className="why-section">
        <div className="container why-inner">
          <div className="why-content">
            <h2 className="section-title">Why Insurance Matters?</h2>
            <p>
              We get it—there are plenty of resources out there about insurance,
              but we like to do things differently. Our goal is to be your go-to
              friend for all things insurance. Here&apos;s why thousands trust
              Insurance Matters:
            </p>
            <ul>
              <li>
                <strong>Real-Life Tips:</strong> No confusing jargon, just
                practical advice you can actually use.
              </li>
              <li>
                <strong>Unbiased Recommendations:</strong> We don&apos;t push
                products; we focus on helping you find what&apos;s best for your
                needs.
              </li>
              <li>
                <strong>Wide Coverage:</strong> From home and auto to business
                and health, we&apos;ve got every angle covered.
              </li>
            </ul>
            <Link href="/" className="btn btn-accent">
              Get debt help now
            </Link>
          </div>
          <div className="why-image">
            <Image
              src="/images/right.webp"
              alt=""
              width={531}
              height={360}
            />
          </div>
        </div>
      </section>

      <section className="testimonials">
        <div className="container">
          <h2 className="section-title section-title-center">
            What Our Readers Think
          </h2>
          <Image
            src="/images/testimonials.webp"
            alt=""
            width={1195}
            height={410}
            className="testimonials-bg"
          />
          <div className="testimonials-grid">
            {TESTIMONIALS.map((t) => (
              <blockquote key={t.name}>
                <Image
                  src="/images/star.webp"
                  alt=""
                  width={100}
                  height={20}
                  className="stars"
                />
                <p>
                  <strong>{t.name}</strong>
                  <br />
                  &ldquo;{t.quote}&rdquo;
                </p>
              </blockquote>
            ))}
          </div>
          <p className="testimonials-disclaimer">
            Custimers&apos; endorsement is a compensated testimonial. Individual
            results are not typical and will vary.
          </p>
        </div>
      </section>
    </>
  );
}
