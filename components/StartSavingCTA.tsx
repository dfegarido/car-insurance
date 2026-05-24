"use client";

import { useQuoteForm } from "./QuoteFormProvider";

type Props = {
  className?: string;
  label?: string;
};

export function StartSavingCTA({
  className = "",
  label = "Start Saving Today",
}: Props) {
  const { openQuoteForm } = useQuoteForm();

  return (
    <button
      type="button"
      className={`mri-btn mri-btn-primary ${className}`.trim()}
      onClick={() => openQuoteForm()}
    >
      {label}
    </button>
  );
}
