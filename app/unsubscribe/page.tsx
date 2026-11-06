import type { Metadata } from "next";
import { UnsubscribeForm } from "@/components/UnsubscribeForm";
import "../contact.css";
import "./unsubscribe.css";

export const metadata: Metadata = {
  title: "Unsubscribe",
};

export default function UnsubscribePage() {
  return (
    <>
      <section className="contact-hero" aria-labelledby="unsub-title">
        <div className="container">
          <h1 id="unsub-title">Unsubscribe</h1>
        </div>
      </section>
      <section className="unsub-section">
        <div className="container">
          <div className="unsub-card">
            <h2>We&apos;re sorry to see you go</h2>
            <p className="unsub-intro">
              Enter your email address to stop receiving marketing messages from
              us. Requests are processed promptly.
            </p>
            <UnsubscribeForm />
          </div>
        </div>
      </section>
    </>
  );
}
