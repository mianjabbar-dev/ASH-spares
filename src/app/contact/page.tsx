import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";

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

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="bg-[var(--muted)] border-b border-[var(--border)]">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)] mb-3">
              Contact Us
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-5">
              Let&apos;s Connect
            </h1>
            <p className="text-lg text-[var(--muted-foreground)] max-w-2xl">
              Need a specific part? Have questions about pricing or availability? Reach out to our
              team.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold tracking-tight mb-4">Business Information</h2>
                <p className="text-[var(--muted-foreground)] mb-6">
                  We are based in Faisalabad, Punjab, Pakistan, and source products through Dubai,
                  UAE.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--muted)] text-[var(--accent)]">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Location</h3>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      Faisalabad, Punjab, Pakistan
                    </p>
                    <p className="text-xs text-[var(--muted-foreground)] mt-1">
                      Import / Sourcing: Dubai, UAE
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--muted)] text-[var(--accent)]">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <a
                      href="mailto:team.ashspare@gmail.com"
                      className="text-sm text-[var(--muted-foreground)] hover:text-[var(--accent)] transition-colors"
                    >
                      team.ashspare@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--muted)] text-[var(--accent)]">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Phone / WhatsApp</h3>
                    <a
                      href="tel:+92-304-7084692"
                      className="text-sm text-[var(--muted-foreground)] hover:text-[var(--accent)] transition-colors block"
                    >
                      +92-304-7084692
                    </a>
                    <a
                      href="https://wa.me/923047084692"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[var(--muted-foreground)] hover:text-[var(--accent)] transition-colors"
                    >
                      +92-304-7084692
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Follow Us</h3>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://www.instagram.com/ash.spares/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] transition-colors"
                  >
                    <InstagramIcon /> Instagram
                  </a>
                  <a
                    href="https://www.linkedin.com/in/mian-jabbar-dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] transition-colors"
                  >
                    <LinkedinIcon /> LinkedIn
                  </a>
                  <a
                    href="https://wa.me/923047084692"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] transition-colors"
                  >
                    <MessageCircle className="h-4 w-4" /> WhatsApp
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8">
              <h2 className="text-2xl font-bold tracking-tight mb-4">Send a Message</h2>
              <p className="text-sm text-[var(--muted-foreground)] mb-6">
                Use the buttons above to contact us directly, or visit our spare parts catalog.
              </p>
              <div className="space-y-4">
                <Link
                  href="/products"
                  className="block w-full text-center px-6 py-3 text-sm font-semibold rounded-md bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] transition-colors"
                >
                  Browse Products
                </Link>
                <a
                  href="mailto:team.ashspare@gmail.com"
                  className="block w-full text-center px-6 py-3 text-sm font-semibold rounded-md border border-[var(--border)] bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] transition-colors"
                >
                  Email Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
