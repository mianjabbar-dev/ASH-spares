import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { CartProvider } from "@/lib/cart-context";

export const metadata: Metadata = {
  title: "ASH Spares | Auto Spare Parts Faisalabad",
  description:
    "Quality automotive spare parts in Faisalabad with competitive pricing and reliable sourcing through Dubai.",
  openGraph: {
    title: "ASH Spares | Auto Spare Parts Faisalabad",
    description:
      "Quality automotive spare parts in Faisalabad with competitive pricing and reliable sourcing through Dubai.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-[var(--background)] text-[var(--foreground)]">
        <ThemeProvider>
          <CartProvider>{children}</CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
