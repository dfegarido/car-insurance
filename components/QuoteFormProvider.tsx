"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { QuoteFormModal } from "./QuoteFormModal";

type QuoteFormContextValue = {
  openQuoteForm: (initialZip?: string) => void;
};

const QuoteFormContext = createContext<QuoteFormContextValue | null>(null);

export function QuoteFormProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [initialZip, setInitialZip] = useState("");

  const openQuoteForm = useCallback((zip = "") => {
    setInitialZip(zip);
    setOpen(true);
  }, []);

  const value = useMemo(
    () => ({ openQuoteForm }),
    [openQuoteForm]
  );

  return (
    <QuoteFormContext.Provider value={value}>
      {children}
      <QuoteFormModal
        open={open}
        onClose={() => setOpen(false)}
        initialZip={initialZip}
      />
    </QuoteFormContext.Provider>
  );
}

export function useQuoteForm() {
  const ctx = useContext(QuoteFormContext);
  if (!ctx) {
    throw new Error("useQuoteForm must be used within QuoteFormProvider");
  }
  return ctx;
}
