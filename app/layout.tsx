import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Providers } from "@/components/Providers";
import { ScrollAnimations } from "@/components/ScrollAnimations";
import "./globals.css";
import "./typography.css";

const mulish = Mulish({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-mulish",
});

export const metadata: Metadata = {
  title: {
    default: "My Ride Insured | Affordable Auto Insurance Online",
    template: "%s – My Ride Insured",
  },
  description:
    "Save on car insurance — compare quotes from top providers with My Ride Insured.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={mulish.variable}>
      <body>
        <Providers>
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>
          <Header />
          <main id="main-content">
            {children}
            <ScrollAnimations />
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
