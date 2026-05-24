import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import "../contact.css";

export const metadata: Metadata = {
  title: "Contact Us",
};

export default function ContactUsPage() {
  return (
    <>
      <div className="archive-header">
        <div className="container">
          <h1>Contact Us</h1>
        </div>
      </div>

      <section className="page-section contact-section">
        <div className="container contact-grid">
          <div>
            <h2>Get in Touch with Us</h2>
            <p>
              We&apos;re here to answer any questions you may have. Reach out to
              us and we&apos;ll respond as soon as we can.
            </p>

            <div className="contact-details">
              <div className="contact-block">
                <h3>Address</h3>
                <p>123 5th Ave, New York, NY 10021</p>
              </div>
              <div className="contact-block">
                <h3>Call Us</h3>
                <p>
                  <a href="tel:+18033693440">+1 803 369 3440</a>
                </p>
              </div>
              <div className="contact-block">
                <h3>Email Us</h3>
                <p>
                  <a href="mailto:info@theinsuranceprovider.com">
                    info@theinsuranceprovider.com
                  </a>
                </p>
              </div>
              <div className="contact-block">
                <h3>Emergency Roofing Service 24/7</h3>
                <p>
                  <a href="tel:+18033693440">+1 803 369 3440</a>
                </p>
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>

      <section className="estimate-section">
        <div className="container estimate-inner">
          <div>
            <h2>Need A Free Estimate?</h2>
            <p>
              Rutrum ut volutpat scelerisque auctor ultrices lectus ultrices
              ullamcorper massa diam etiam amet a, nulla pulvinar sapien.
            </p>
          </div>
          <div className="estimate-actions">
            <a href="tel:+18033693440" className="btn btn-primary">
              Get a Free Estimate
            </a>
            <a href="tel:+18033693440" className="btn btn-accent">
              Call Us Now
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
