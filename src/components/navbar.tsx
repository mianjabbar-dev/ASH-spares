"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ShoppingCart, Wrench, User } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { useCart } from "@/lib/cart-context";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount } = useCart();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Spare Parts" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[var(--foreground)] text-[var(--background)]">
              <Wrench className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold tracking-tight uppercase">
              ASH Spares
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/cart"
              className="relative p-2 rounded-md border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--accent)] text-[10px] font-bold text-[var(--accent-foreground)]">
                  {itemCount}
                </span>
              )}
            </Link>
            <Link
              href="/admin/login"
              className="hidden sm:flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors"
            >
              <User className="h-4 w-4" />
              Admin
            </Link>
            <button
              className="md:hidden p-2 rounded-md border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)]"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-[var(--border)] bg-[var(--background)]">
          <nav className="flex flex-col p-4 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2 rounded-md text-base font-medium hover:bg-[var(--muted)]"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/admin/login"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2 rounded-md text-base font-medium hover:bg-[var(--muted)]"
            >
              Admin Login
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
