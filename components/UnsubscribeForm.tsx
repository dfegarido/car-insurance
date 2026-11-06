"use client";

import { useState } from "react";
import { SITE_EMAIL } from "@/lib/site";

type Status = "idle" | "loading" | "success" | "error";

export function UnsubscribeForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = new FormData(form);
    const what = data.getAll("what").join(", ") || "all communications";
    data.set("name", "Unsubscribe request");
    data.set("subject", "Unsubscribe request");
    data.set("message", `Please stop: ${what}`);
    data.delete("what");

    try {
      const res = await fetch("/api/contact", { method: "POST", body: data });
      const result = (await res.json()) as { ok?: boolean };
      setStatus(res.ok && result.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="unsub-success" role="status">
        <h3>You&apos;re unsubscribed</h3>
        <p>
          We&apos;ve received your request and will process it promptly.
        </p>
      </div>
    );
  }

  return (
    <form className="unsub-form" onSubmit={handleSubmit}>
      <label>
        Email address
        <input type="email" name="email" required autoComplete="email" />
      </label>
      <fieldset className="unsub-options">
        <legend>Stop receiving</legend>
        <label>
          <input type="checkbox" name="what" value="emails" defaultChecked />{" "}
          Emails
        </label>
        <label>
          <input type="checkbox" name="what" value="calls and texts" /> Calls
          and texts
        </label>
      </fieldset>
      <button
        type="submit"
        className="btn btn-primary"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Sending..." : "Unsubscribe"}
      </button>
      {status === "error" && (
        <p className="unsub-error" role="alert">
          Something went wrong. Please email{" "}
          <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a> instead.
        </p>
      )}
    </form>
  );
}
