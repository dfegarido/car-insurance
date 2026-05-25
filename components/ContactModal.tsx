"use client";

import { useEffect, useState } from "react";
import { SITE_EMAIL } from "@/lib/site";
import "./contact-modal.css";

type Props = {
  open: boolean;
  onClose: () => void;
};

type FormStatus = "idle" | "loading" | "success" | "error";

export function ContactModal({ open, onClose }: Props) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setStatus("idle");
      setErrorMessage("");
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: data,
      });
      const result = (await res.json()) as { ok?: boolean; message?: string };

      if (!res.ok || !result.ok) {
        setStatus("error");
        setErrorMessage(
          result.message ??
            "We could not send your message. Please try again or contact us directly."
        );
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage(
        "Something went wrong. Please email us directly or call +1 803 369 3440."
      );
    }
  }

  if (!open) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="Contact form">
      <div className="modal-backdrop" onClick={onClose} aria-hidden="true" />
      <div className="modal-panel">
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close">
          CLOSE
        </button>
        {status === "success" ? (
          <div className="contact-form contact-form--success" role="status">
            <h3>Thank you!</h3>
            <p>Your message has been sent. We&apos;ll respond as soon as we can.</p>
            <p>
              Or reach us at <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>
            </p>
            <button type="button" className="btn btn-primary" onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            <label>
              Your name
              <input type="text" name="name" required autoComplete="name" />
            </label>
            <label>
              Your email
              <input type="email" name="email" required autoComplete="email" />
            </label>
            <label>
              Subject
              <input type="text" name="subject" required />
            </label>
            <label>
              Your message (optional)
              <textarea name="message" rows={4} />
            </label>
            {status === "error" && (
              <p className="contact-form-error" role="alert">
                {errorMessage}
              </p>
            )}
            <button
              type="submit"
              className="btn btn-primary"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Sending…" : "Send Message"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
