"use client";

import { useEffect } from "react";
import "./contact-modal.css";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function ContactModal({ open, onClose }: Props) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="Contact form">
      <div className="modal-backdrop" onClick={onClose} aria-hidden="true" />
      <div className="modal-panel">
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close">
          CLOSE
        </button>
        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <label>
            Your name
            <input type="text" name="name" required />
          </label>
          <label>
            Your email
            <input type="email" name="email" required />
          </label>
          <label>
            Subject
            <input type="text" name="subject" required />
          </label>
          <label>
            Your message (optional)
            <textarea name="message" rows={4} />
          </label>
          <button type="submit" className="btn btn-primary">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
