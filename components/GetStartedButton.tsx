"use client";

import { useState } from "react";
import { ContactModal } from "./ContactModal";

type Props = {
  className?: string;
};

export function GetStartedButton({ className }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={className ? `btn btn-primary ${className}` : "btn btn-primary"}
        onClick={() => setOpen(true)}
      >
        Get Started
      </button>
      <ContactModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
