import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { ContactInfoIcon } from "@/components/ContactInfoIcon";
import "../contact.css";

export const metadata: Metadata = {
  title: "Contact Us",
};

const MAP_EMBED =
  "https://maps.google.com/maps?q=123%205th%20avenue&t=m&z=16&output=embed&iwloc=near";

export default function ContactUsPage() {
  return (
    <>
      <section className="contact-hero" aria-labelledby="contact-page-title">
        <div className="container">
          <h1 id="contact-page-title">Contact Us</h1>
        </div>
      </section>

      <section className="contact-section">
        <div className="container contact-layout">
          <div className="contact-main">
            <h2>Get in Touch with Us</h2>
            <p className="contact-intro">
              We&apos;re here to answer any questions you may have. Reach out to
              us and we&apos;ll respond as soon as we can.
            </p>

            <div className="contact-info-cards">
              <article className="contact-info-card contact-info-card--full">
                <ContactInfoIcon name="map" />
                <div className="contact-info-card-body">
                  <h5>Address</h5>
                  <p>123 5th Ave, New York, NY 10021</p>
                </div>
              </article>

              <div className="contact-info-row">
                <article className="contact-info-card">
                  <ContactInfoIcon name="phone" />
                  <div className="contact-info-card-body">
                    <h5>
                      <a href="tel:+18033693440">Call Us</a>
                    </h5>
                    <p>
                      <a href="tel:+18033693440">+1 803 369 3440</a>
                    </p>
                  </div>
                </article>
                <article className="contact-info-card">
                  <ContactInfoIcon name="email" />
                  <div className="contact-info-card-body">
                    <h5>
                      <a href="mailto:info@theinsuranceprovider.com">
                        Email Us
                      </a>
                    </h5>
                    <p>
                      <a href="mailto:info@theinsuranceprovider.com">
                        info@theinsuranceprovider.com
                      </a>
                    </p>
                  </div>
                </article>
              </div>

              <article className="contact-info-card contact-info-card--emergency">
                <ContactInfoIcon name="phone" />
                <div className="contact-info-card-body">
                  <h5>
                    <a href="tel:+18033693440">
                      Emergency Roofing Service 24/7
                    </a>
                  </h5>
                  <p>
                    <a href="tel:+18033693440">+1 803 369 3440</a>
                  </p>
                </div>
              </article>
            </div>
          </div>

          <div className="contact-aside">
            <ContactForm />
            <div className="contact-map">
              <iframe
                title="Office location map"
                src={MAP_EMBED}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      <section className="estimate-section">
        <div className="container estimate-inner">
          <div className="estimate-copy">
            <h2>Need A Free Estimate?</h2>
            <p>
              Rutrum ut volutpat scelerisque auctor ultrices lectus ultrices
              ullamcorper massa diam etiam amet a, nulla pulvinar sapien.
            </p>
          </div>
          <div className="estimate-actions">
            <a href="tel:+18033693440" className="btn btn-estimate-primary">
              Get a Free Estimate
            </a>
            <a href="tel:+18033693440" className="btn btn-estimate-outline">
              Call Us Now
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
