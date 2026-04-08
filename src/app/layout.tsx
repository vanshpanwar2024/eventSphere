import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import Footer from "@/components/Footer";
import SessionWrapper from "@/components/SessionWrapper";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-serif",
});

const montserrat = Montserrat({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Event Sphere",
  description: "A modern event booking and management platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${montserrat.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans bg-[#070707] text-[#dcdcdc]" suppressHydrationWarning>
        <SessionWrapper>
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}
