import Link from "next/link";
import { Wrench, Mail, Phone } from "lucide-react";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Spare Parts" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
    { href: "/admin/login", label: "Admin" },
  ];

  const categories = [
    { href: "/products?category=filters", label: "Filters" },
    { href: "/products?category=braking-system", label: "Braking System" },
    { href: "/products?category=engine-parts", label: "Engine Parts" },
    { href: "/products?category=suspension", label: "Suspension" },
    { href: "/products?category=electrical-parts", label: "Electrical" },
  ];

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--muted)]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[var(--foreground)] text-[var(--background)]">
                <Wrench className="h-5 w-5" />
              </div>
              <span className="text-lg font-bold uppercase">ASH Spares</span>
            </Link>
            <p className="text-sm text-[var(--muted-foreground)]">
              Faisalabad-based automotive spare parts supplier offering quality components
              with competitive market pricing and reliable sourcing through Dubai.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-[var(--muted-foreground)]">
              <li className="flex items-start gap-2">
                <span>Faisalabad, Punjab, Pakistan</span>
              </li>
              <li>
                <a
                  href="mailto:team.ashspare@gmail.com"
                  className="flex items-center gap-2 hover:text-[var(--foreground)] transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  team.ashspare@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+92-304-7084692"
                  className="flex items-center gap-2 hover:text-[var(--foreground)] transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  +92-304-7084692
                </a>
              </li>
              <li className="flex gap-3 pt-2">
                <a
                  href="https://www.instagram.com/ash.spares/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-md border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] transition-colors"
                  aria-label="Instagram"
                >
                  <InstagramIcon />
                </a>
                <a
                  href="https://www.linkedin.com/in/mian-jabbar-dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-md border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] transition-colors"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-[var(--border)] pt-8 text-center">
          <p className="text-sm text-[var(--muted-foreground)]">
            © {currentYear} ASH Spares. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
