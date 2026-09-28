import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { MapPin, Globe, Users, Target, Award, Truck } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-[var(--muted)] border-b border-[var(--border)]">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)] mb-3">
              About Us
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-5 max-w-3xl">
              Your Reliable Partner for Auto Spare Parts in Faisalabad
            </h1>
            <p className="text-lg text-[var(--muted-foreground)] max-w-2xl">
              Quality components, competitive pricing, and dependable sourcing through Dubai.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="relative h-96 rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1200&q=80"
                  alt="Automotive parts workshop"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-5">
                <h2 className="text-3xl font-bold tracking-tight">Who We Are</h2>
                <p className="text-[var(--muted-foreground)] leading-relaxed">
                  Based in Faisalabad, Punjab, Pakistan, we are an automotive spare parts business
                  committed to keeping vehicles on the road. We supply a wide range of quality
                  parts for cars, covering everything from filters and braking components to
                  engine, suspension, and electrical parts.
                </p>
                <p className="text-[var(--muted-foreground)] leading-relaxed">
                  Our sourcing network extends to Dubai, UAE, allowing us to import reliable
                  products and offer them at competitive market prices. We serve both individual
                  customers and wholesale buyers with the same dedication to service.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 border-t border-[var(--border)] bg-[var(--muted)]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-3">Our Values</h2>
              <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto">
                Built on trust, quality, and customer focus.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: Award,
                  title: "Quality First",
                  text: "We prioritize reliable products that meet customer expectations.",
                },
                {
                  icon: Globe,
                  title: "Global Sourcing",
                  text: "Import connections through Dubai help us bring better options to Pakistan.",
                },
                {
                  icon: Users,
                  title: "Customer Focused",
                  text: "We listen to our customers and help them find the right parts.",
                },
                {
                  icon: Truck,
                  title: "Retail & Wholesale",
                  text: "Flexible quantities for individual buyers, workshops, and resellers.",
                },
                {
                  icon: MapPin,
                  title: "Local Presence",
                  text: "Conveniently located in Faisalabad to serve Punjab and beyond.",
                },
                {
                  icon: Target,
                  title: "Long-Term Vision",
                  text: "We aim to become a trusted name in the automotive spare parts market.",
                },
              ].map((v) => (
                <div
                  key={v.title}
                  className="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)]"
                >
                  <div className="mb-4 inline-flex items-center justify-center h-12 w-12 rounded-lg bg-[var(--muted)] text-[var(--accent)]">
                    <v.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{v.title}</h3>
                  <p className="text-sm text-[var(--muted-foreground)]">{v.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CEO Section */}
        <section className="py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)] mb-3">
              Meet Our Leadership
            </p>
            <h2 className="text-3xl font-bold tracking-tight mb-8">Chief Executive Officer</h2>
            <div className="inline-block mb-6">
              <div className="h-40 w-40 rounded-full bg-[var(--muted)] border-4 border-[var(--accent)] mx-auto overflow-hidden flex items-center justify-center">
                <Users className="h-16 w-16 text-[var(--muted-foreground)]" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-2">MIAN JABBAR</h3>
            <p className="text-[var(--muted-foreground)] mb-6 max-w-xl mx-auto">
              Leading the business with a focus on quality sourcing, competitive pricing, and
              strong customer relationships.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="https://www.linkedin.com/in/mian-jabbar-dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-md border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] transition-colors"
              >
                LinkedIn Profile
              </a>
              <a
                href="https://www.linkedin.com/in/saad-riaz-90aa05382/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-md border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] transition-colors"
              >
                LinkedIn Profile 2
              </a>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 border-t border-[var(--border)] bg-[var(--muted)]">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Get in Touch</h2>
            <p className="text-[var(--muted-foreground)] mb-8">
              Have questions about a product or need help finding the right part? We are here to
              help.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 text-sm font-semibold rounded-md bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
