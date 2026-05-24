"use client";

import { useState } from "react";
import { useQuoteForm } from "./QuoteFormProvider";
import "./zip-quote-form.css";

type Props = {
  id?: string;
  className?: string;
  buttonText?: string;
  placeholder?: string;
  variant?: "default" | "mri";
  layout?: "stacked" | "inline";
};

export function ZipQuoteForm({
  id = "zip-quote",
  className = "",
  buttonText = "Get My Quote Now",
  placeholder = "Enter your ZIP code",
  variant = "default",
  layout = "stacked",
}: Props) {
  const { openQuoteForm } = useQuoteForm();
  const [zip, setZip] = useState("");
  const [error, setError] = useState("");

  const isMri = variant === "mri";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const cleaned = zip.trim();
    if (!/^\d{5}(-\d{4})?$/.test(cleaned)) {
      setError("Please enter a valid 5-digit ZIP code.");
      return;
    }
    setError("");
    openQuoteForm(cleaned);
  }

  return (
    <form
      id={id}
      className={`zip-quote-form ${isMri ? "zip-quote-form--mri" : ""} ${isMri ? `zip-quote-form--${layout}` : ""} ${className}`.trim()}
      onSubmit={handleSubmit}
    >
      <label htmlFor={`${id}-input`} className="sr-only">
        ZIP Code
      </label>
      <input
        id={`${id}-input`}
        className="zip-quote-input"
        type="text"
        inputMode="numeric"
        autoComplete="postal-code"
        maxLength={10}
        placeholder={placeholder}
        value={zip}
        onChange={(e) => {
          const next = e.target.value.replace(/[^\d-]/g, "");
          setZip(next);
          if (error) setError("");
        }}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      <button
        type="submit"
        className={
          isMri ? "mri-btn mri-btn-primary zip-quote-btn" : "btn btn-primary zip-quote-btn"
        }
      >
        {buttonText}
      </button>
      {error && (
        <p id={`${id}-error`} className="zip-quote-error" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
