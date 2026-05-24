"use client";

import { QuoteFormProvider } from "./QuoteFormProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return <QuoteFormProvider>{children}</QuoteFormProvider>;
}
