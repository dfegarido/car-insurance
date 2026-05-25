"use client";

import { useState } from "react";
import { SITE_EMAIL } from "@/lib/site";

type FormStatus = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

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

  if (status === "success") {
    return (
      <div className="contact-page-form contact-page-form--success" role="status">
        <h3>Thank you!</h3>
        <p>
          Your message has been sent. We&apos;ll get back to you as soon as we
          can.
        </p>
        <p>
          Need a faster response? Call{" "}
          <a href="tel:+18033693440">+1 803 369 3440</a> or email{" "}
          <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>.
        </p>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setStatus("idle")}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      className="contact-page-form"
      onSubmit={handleSubmit}
    >
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
        <textarea name="message" rows={5} />
      </label>

      {status === "error" && (
        <p className="contact-form-error" role="alert">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        className="btn btn-primary btn-submit"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Sending…" : "Submit"}
      </button>
    </form>
  );
}
