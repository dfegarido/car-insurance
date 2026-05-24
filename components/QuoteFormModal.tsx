"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  CAR_MAKES,
  CAR_YEARS,
  CREDIT_RATING,
  EDUCATION,
  MARITAL_STATUS,
  MILEAGE,
  PRIMARY_USE,
  PROFESSIONS,
  US_STATES,
} from "@/lib/quote-form-data";
import "./quote-form-modal.css";

type Props = {
  open: boolean;
  onClose: () => void;
  initialZip?: string;
};

function Field({
  label,
  required,
  children,
  className = "",
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`quote-form-field ${className}`.trim()}>
      <label>
        {label}
        {required && <span className="required"> *</span>}
      </label>
      {children}
    </div>
  );
}

export function QuoteFormModal({ open, onClose, initialZip = "" }: Props) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [zip, setZip] = useState(initialZip);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    setZip(initialZip);
    setSubmitted(false);
    document.body.style.overflow = "hidden";

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, initialZip, onClose]);

  useEffect(() => {
    if (open && panelRef.current && !submitted) {
      const first = panelRef.current.querySelector<HTMLElement>(
        "input, select, textarea, button"
      );
      first?.focus();
    }
  }, [open, submitted]);

  if (!mounted || !open) return null;

  function handleClose() {
    setSubmitted(false);
    onClose();
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  }

  return createPortal(
    <div
      className="quote-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div className="quote-modal-backdrop" onClick={handleClose} aria-hidden="true" />
      <div className="quote-modal-panel" ref={panelRef}>
        <div className="quote-modal-header">
          <h2 id={titleId}>Get Your Auto Insurance Quote</h2>
          <button
            type="button"
            className="quote-modal-close"
            onClick={handleClose}
          >
            CLOSE
          </button>
        </div>

        <div className="quote-modal-body">
          {submitted ? (
            <div className="quote-form-success">
              <h3>Thank you!</h3>
              <p>
                Your information has been received. A licensed agent will contact
                you shortly with personalized quotes.
              </p>
              <button
                type="button"
                className="btn btn-primary quote-form-submit"
                onClick={handleClose}
              >
                Done
              </button>
            </div>
          ) : (
            <>
              <p className="quote-modal-intro">
                Complete the form below to compare rates from top providers. Fields
                marked with <span className="required">*</span> are required.
              </p>

              <form onSubmit={handleSubmit}>
                <section className="quote-form-section">
                  <h3>Vehicle Information</h3>
                  <div className="quote-form-grid">
                    <Field label="Car Year" required>
                      <select name="carYear" required defaultValue="">
                        <option value="" disabled>
                          Select year
                        </option>
                        {CAR_YEARS.map((y) => (
                          <option key={y} value={y}>
                            {y}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Car Make" required>
                      <select name="carMake" required defaultValue="">
                        <option value="" disabled>
                          Select make
                        </option>
                        {CAR_MAKES.map((m) => (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Model" required>
                      <input type="text" name="model" required placeholder="Model" />
                    </Field>
                    <Field label="Do you own this car?">
                      <div className="quote-form-radios" role="group">
                        <label>
                          <input type="radio" name="ownsCar" value="yes" defaultChecked />{" "}
                          Yes
                        </label>
                        <label>
                          <input type="radio" name="ownsCar" value="no" /> No
                        </label>
                      </div>
                    </Field>
                    <Field label="Primary Use" required>
                      <select name="primaryUse" required defaultValue="">
                        <option value="" disabled>
                          Select use
                        </option>
                        {PRIMARY_USE.map((u) => (
                          <option key={u} value={u}>
                            {u}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Mileage" required>
                      <select name="mileage" required defaultValue="">
                        <option value="" disabled>
                          Select mileage
                        </option>
                        {MILEAGE.map((m) => (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>
                </section>

                <section className="quote-form-section">
                  <h3>Driver Information</h3>
                  <div className="quote-form-grid">
                    <Field label="Marital Status" required>
                      <select name="maritalStatus" required defaultValue="">
                        <option value="" disabled>
                          Select status
                        </option>
                        {MARITAL_STATUS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Education" required>
                      <select name="education" required defaultValue="">
                        <option value="" disabled>
                          Select education
                        </option>
                        {EDUCATION.map((e) => (
                          <option key={e} value={e}>
                            {e}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Credit Rating" required>
                      <select name="creditRating" required defaultValue="">
                        <option value="" disabled>
                          Select rating
                        </option>
                        {CREDIT_RATING.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Profession" required>
                      <select name="profession" required defaultValue="">
                        <option value="" disabled>
                          Select profession
                        </option>
                        {PROFESSIONS.map((p) => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label="First Name" required>
                      <input type="text" name="firstName" required autoComplete="given-name" />
                    </Field>
                    <Field label="Last Name" required>
                      <input type="text" name="lastName" required autoComplete="family-name" />
                    </Field>
                    <Field label="Date of Birth" required>
                      <input type="date" name="dob" required />
                    </Field>
                    <Field label="Gender" required>
                      <div className="quote-form-radios" role="group">
                        <label>
                          <input type="radio" name="gender" value="male" required /> Male
                        </label>
                        <label>
                          <input type="radio" name="gender" value="female" /> Female
                        </label>
                      </div>
                    </Field>
                  </div>
                </section>

                <section className="quote-form-section">
                  <h3>Contact &amp; Address</h3>
                  <div className="quote-form-grid">
                    <Field label="Phone" required>
                      <input
                        type="tel"
                        name="phone"
                        required
                        autoComplete="tel"
                        placeholder="(555) 555-5555"
                      />
                    </Field>
                    <Field label="Email" required>
                      <input
                        type="email"
                        name="email"
                        required
                        autoComplete="email"
                      />
                    </Field>
                    <Field label="Address Line 1" className="full-width">
                      <input
                        type="text"
                        name="address1"
                        autoComplete="street-address"
                      />
                    </Field>
                    <Field label="City">
                      <input type="text" name="city" autoComplete="address-level2" />
                    </Field>
                    <Field label="State">
                      <select name="state" defaultValue="">
                        <option value="">Select state</option>
                        {US_STATES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label="ZIP Code" required>
                      <input
                        type="text"
                        name="zip"
                        required
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                        maxLength={10}
                        inputMode="numeric"
                        pattern="\d{5}(-\d{4})?"
                      />
                    </Field>
                  </div>
                </section>

                <div className="quote-form-tcpa">
                  <input type="checkbox" id="tcpa-consent" name="tcpa" required />
                  <label htmlFor="tcpa-consent">
                    By checking this box, I agree to the{" "}
                    <Link href="/terms-of-services" onClick={(e) => e.stopPropagation()}>
                      Terms and Conditions
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy-policy" onClick={(e) => e.stopPropagation()}>
                      Privacy Policy
                    </Link>{" "}
                    of My Ride Insured and authorize their representatives to contact
                    me about auto insurance and other non-insurance offers via phone
                    calls and text messages to the number I have provided. I consent
                    to receive calls and prerecorded messages through an auto-dialed
                    phone system from My Ride Insured, even if my number is listed on
                    any state, federal, or corporate Do Not Call list. I understand
                    that my consent is not required to purchase any goods or services,
                    and I may revoke it at any time. Standard message and data rates
                    may apply.
                  </label>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary quote-form-submit"
                  disabled={loading}
                >
                  {loading ? "Submitting…" : "Submit"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
