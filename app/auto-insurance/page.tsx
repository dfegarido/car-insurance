import type { Metadata } from "next";
import Image from "next/image";
import { StartSavingCTA } from "@/components/StartSavingCTA";
import { ZipQuoteForm } from "@/components/ZipQuoteForm";

export const metadata: Metadata = {
  title: "Auto Insurance | Save on Car Insurance",
  description:
    "Save on car insurance — get the best rates. Compare quotes from top providers with My Ride Insured.",
};

const STEPS = [
  {
    title: "Enter Details",
    description:
      "Provide basic information about yourself and your vehicle. Our smart system quickly analyzes your details to match you with the best auto insurance options available in your area.",
    icon: "/images/mri/Background.png",
  },
  {
    title: "Compare Quotes",
    description:
      "Within seconds, view personalized insurance quotes from top providers. Easily compare rates, coverage options, and benefits side by side to find the perfect policy for your needs.",
    icon: "/images/mri/Background-1.png",
  },
  {
    title: "Get Insured",
    description:
      "Choose your ideal coverage and secure your policy instantly. Enjoy a seamless process and start driving with confidence while saving money on the best insurance deal available.",
    icon: "/images/mri/Background-2.png",
  },
];

const BENEFITS = [
  {
    title: "Lower Monthly Rates",
    description:
      "Why pay more when you don't have to? We help you find the most affordable insurance rates, so you can keep more money in your pocket.",
    icon: "/images/mri/Background.png",
  },
  {
    title: "Instant Quote Comparisons",
    description:
      "No more guesswork or hidden fees! Instantly compare multiple quotes from top providers and see the best options according to your budget and coverage needs.",
    icon: "/images/mri/Background-1.png",
  },
  {
    title: "Coverage That Fits",
    description:
      "Get insurance that works for you. Whether you need basic liability or full coverage, we help you find the right policy at the best price.",
    icon: "/images/mri/Background-2.png",
  },
  {
    title: "Fast & Without Efforts",
    description:
      "Skip the long forms and confusing processes. Our simple, quick steps make it easy to secure the best car insurance deal without the stress.",
    icon: "/images/mri/Background-3.png",
  },
];

const PAIN_MOSAIC = [
  {
    type: "image" as const,
    src: "/images/mri/Container-6-e1739388574333.jpg",
    alt: "Driver reviewing insurance savings",
  },
  {
    type: "copy" as const,
    title: "Paying Too Much Monthly?",
    description:
      "Stop overpaying! Compare multiple quotes in minutes and find the lowest rate that fits your budget perfectly.",
  },
  {
    type: "image" as const,
    src: "/images/mri/Container-1-1-e1739388648819.jpg",
    alt: "Comparing car insurance quotes",
  },
  {
    type: "copy" as const,
    title: "Confused by Insurance Options?",
    description:
      "We simplify the process! Get clear, side-by-side comparisons so you can confidently choose the best coverage.",
  },
  {
    type: "copy" as const,
    title: "Coverage Doesn't Fit You?",
    description:
      "No one-size-fits-all policies here! Find a plan according to your specific needs without paying for extras you don't need.",
  },
  {
    type: "image" as const,
    src: "/images/mri/Container-2-1-e1739388679787.jpg",
    alt: "Customized auto insurance coverage",
  },
  {
    type: "copy" as const,
    title: "Wasting Time Searching?",
    description:
      "Skip the efforts! Our fast system instantly finds top-rated insurance options so you can save time and money.",
  },
  {
    type: "image" as const,
    src: "/images/mri/Container-3-1-e1739388715556.jpg",
    alt: "Fast online car insurance search",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "I was overpaying for years until I found My Ride Insured In minutes I compared quotes and saved hundreds The process was simple fast and stress free. Highly recommend",
    name: "Luis Moreno",
    avatar: "/images/mri/Group-11-1.jpg",
  },
  {
    quote:
      "I was skeptical at first but they made everything too easy. I compared quotes in minutes and saved $50 a month",
    name: "Shoshanah Gates",
    avatar: "/images/mri/Group-11-1-1.jpg",
  },
];

export default function AutoInsurancePage() {
  return (
    <div className="mri-page">
      <section className="mri-hero">
        <div className="mri-wrap mri-hero-inner">
          <div className="mri-hero-copy">
            <h4 className="mri-eyebrow">Drive More, Spend Less on Insurance!</h4>
            <h1>Save on Car Insurance - Get the Best Rates</h1>
            <StartSavingCTA />
          </div>
        </div>
      </section>

      <section className="mri-section mri-steps-section">
        <div className="mri-wrap">
          <div className="mri-steps-head">
            <h4 className="mri-eyebrow">Our Easy Process</h4>
            <h2>
              Get the Best Car Insurance in 3 Easy Steps - Compare, Choose, and
              Save Instantly!
            </h2>
          </div>
          <div className="mri-steps">
            {STEPS.map((step) => (
              <article key={step.title} className="mri-step">
                <Image
                  src={step.icon}
                  alt=""
                  width={49}
                  height={49}
                  className="mri-step-icon"
                />
                <h4>{step.title}</h4>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mri-section mri-benefits-section">
        <div className="mri-wrap mri-benefits-layout">
          <div className="mri-benefits-aside">
            <h4 className="mri-eyebrow">Our Benefits</h4>
            <h2>Why Choose My Ride Insured?</h2>
            <StartSavingCTA />
          </div>
          <div className="mri-benefits-grid">
            {BENEFITS.map((item) => (
              <article key={item.title} className="mri-benefit">
                <Image
                  src={item.icon}
                  alt=""
                  width={49}
                  height={49}
                  className="mri-benefit-icon"
                />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mri-pain-mosaic" aria-label="Common insurance concerns">
        <div className="mri-pain-grid">
          {PAIN_MOSAIC.map((cell, index) =>
            cell.type === "image" ? (
              <div key={index} className="mri-pain-cell mri-pain-cell-image">
                <Image
                  src={cell.src}
                  alt={cell.alt}
                  width={359}
                  height={292}
                  className="mri-pain-img"
                />
              </div>
            ) : (
              <div key={index} className="mri-pain-cell mri-pain-cell-copy">
                <h3>{cell.title}</h3>
                <p>{cell.description}</p>
              </div>
            )
          )}
        </div>
      </section>

      <section className="mri-section mri-testimonials-section">
        <div className="mri-wrap">
          <div className="mri-testimonials-head">
            <h4 className="mri-eyebrow">Client Testimonials</h4>
            <h2>What Drivers Are Saying</h2>
          </div>
          <div className="mri-testimonials">
            {TESTIMONIALS.map((t) => (
              <article key={t.name} className="mri-testimonial">
                <h3>&ldquo;{t.quote}&rdquo;</h3>
                <div className="mri-testimonial-author">
                  <Image
                    src={t.avatar}
                    alt=""
                    width={56}
                    height={56}
                    className="mri-testimonial-avatar"
                  />
                  <p className="mri-testimonial-name">{t.name}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mri-zip-section" id="quote-form">
        <div className="mri-wrap mri-zip-block">
          <h4 className="mri-eyebrow">Your Best Rate Awaits</h4>
          <h2>Start Saving Now</h2>
          <p>
            Enter your ZIP code to unlock the best car insurance rates near you.
            Compare top providers instantly and find a plan that fits your
            budget.
          </p>
          <ZipQuoteForm
            id="zip-quote-main"
            variant="mri"
            layout="stacked"
            placeholder="Enter your ZIP code"
            buttonText="Compare Now"
          />
        </div>
      </section>

    </div>
  );
}
