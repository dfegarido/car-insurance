import Link from "next/link";
import "@/app/auto-insurance/auto-insurance.css";

type Item = { title: string; description: string };

type Props = {
  eyebrow: string;
  title: string;
  intro: string;
  steps: Item[];
  benefits: Item[];
  closingTitle: string;
  closingText: string;
};

function Cta({ label = "Talk to an Agent" }: { label?: string }) {
  return (
    <Link href="/contact-us" className="mri-btn mri-btn-primary">
      {label}
    </Link>
  );
}

export function InsuranceLanding({
  eyebrow,
  title,
  intro,
  steps,
  benefits,
  closingTitle,
  closingText,
}: Props) {
  return (
    <div className="mri-page-full">
      <div className="mri-page">
        <section className="mri-hero">
          <div className="mri-wrap mri-hero-inner">
            <div className="mri-hero-copy">
              <h4 className="mri-eyebrow">{eyebrow}</h4>
              <h1>{title}</h1>
              <p>{intro}</p>
              <Cta />
            </div>
          </div>
        </section>

        <section className="mri-section mri-steps-section">
          <div className="mri-wrap">
            <div className="mri-steps-head">
              <h4 className="mri-eyebrow">How It Works</h4>
              <h2>Three Simple Steps</h2>
            </div>
            <div className="mri-steps">
              {steps.map((s) => (
                <article key={s.title} className="mri-step">
                  <h4>{s.title}</h4>
                  <p>{s.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mri-section mri-benefits-section">
          <div className="mri-wrap mri-benefits-layout">
            <div className="mri-benefits-aside">
              <h4 className="mri-eyebrow">Why Use Us</h4>
              <h2>What You Get</h2>
              <Cta />
            </div>
            <div className="mri-benefits-grid">
              {benefits.map((b) => (
                <article key={b.title} className="mri-benefit">
                  <h3>{b.title}</h3>
                  <p>{b.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mri-zip-section">
          <div className="mri-wrap mri-zip-block">
            <h2>{closingTitle}</h2>
            <p>{closingText}</p>
            <Cta label="Contact Us" />
            <p>
              <small>
                The Insurance Provider is not an insurer. We connect you with
                licensed agents and carriers.
              </small>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
