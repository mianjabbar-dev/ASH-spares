export const dynamic = "force-dynamic";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";
import {
  ShieldCheck,
  BadgeDollarSign,
  Globe,
  MapPin,
  PackageOpen,
  Headphones,
  ArrowRight,
} from "lucide-react";

export default async function HomePage() {
  const featuredProducts = await prisma.product.findMany({
    where: { active: true, featured: true },
    include: { category: true },
    take: 8,
    orderBy: { createdAt: "desc" },
  });

  const categories = await prisma.category.findMany({
    where: { active: true },
    orderBy: { name: "asc" },
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1920&q=80"
              alt="Automotive spare parts"
              fill
              className="object-cover opacity-20 dark:opacity-10"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--background)] via-[var(--background)]/80 to-transparent" />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)] mb-4">
                Faisalabad, Punjab, Pakistan
              </p>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mb-6">
                Quality Auto Spare Parts,{" "}
                <span className="text-[var(--accent)]">Built for the Road.</span>
              </h1>
              <p className="text-lg text-[var(--muted-foreground)] mb-8 max-w-xl">
                Faisalabad-based automotive spare parts supplier offering quality components
                with competitive market pricing and reliable sourcing through Dubai.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-md bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] transition-colors"
                >
                  Explore Spare Parts
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-md border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 border-b border-[var(--border)]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-3">Why Choose Us</h2>
              <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto">
                We combine quality products, competitive pricing, and reliable sourcing to keep
                your vehicles running smoothly.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: ShieldCheck,
                  title: "Quality Products",
                  text: "Carefully sourced components that meet quality standards.",
                },
                {
                  icon: BadgeDollarSign,
                  title: "Competitive Prices",
                  text: "Market-aligned pricing for retail and wholesale buyers.",
                },
                {
                  icon: Globe,
                  title: "Dubai Import & Sourcing",
                  text: "Reliable import network through Dubai, UAE.",
                },
                {
                  icon: MapPin,
                  title: "Faisalabad Based",
                  text: "Local presence in Faisalabad, Punjab, Pakistan.",
                },
                {
                  icon: PackageOpen,
                  title: "Retail & Wholesale",
                  text: "Flexible ordering for individual and bulk customers.",
                },
                {
                  icon: Headphones,
                  title: "Reliable Customer Support",
                  text: "Helpful assistance to find the right parts for your vehicle.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="group p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)] transition-colors"
                >
                  <div className="mb-4 inline-flex items-center justify-center h-12 w-12 rounded-lg bg-[var(--muted)] text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-[var(--accent-foreground)] transition-colors">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-[var(--muted-foreground)]">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Categories */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-2">Featured Categories</h2>
                <p className="text-[var(--muted-foreground)]">
                  Browse parts by category to find exactly what you need.
                </p>
              </div>
              <Link
                href="/products"
                className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-[var(--accent)] hover:underline"
              >
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/products?category=${category.slug}`}
                  className="group relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 hover:border-[var(--accent)] transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold mb-1 group-hover:text-[var(--accent)] transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sm text-[var(--muted-foreground)] line-clamp-1">
                        {category.description || "Explore products"}
                      </p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-[var(--muted-foreground)] group-hover:text-[var(--accent)] group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-20 border-t border-[var(--border)] bg-[var(--muted)]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-3">Featured Products</h2>
              <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto">
                Hand-picked quality spare parts for your vehicle.
              </p>
            </div>
            {featuredProducts.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {featuredProducts.map((product) => {
                  // FIX: Decimal error solved for Client Component
                  const safeProduct = {
                    ...product,
                    price: Number(product.price)
                  };
                  return <ProductCard key={product.id} product={safeProduct} />;
                })}
              </div>
            ) : (
              <p className="text-center text-[var(--muted-foreground)]">No featured products yet.</p>
            )}
            <div className="mt-10 text-center">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-md bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] transition-colors"
              >
                Browse All Products
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* About Business */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1200&q=80"
                  alt="Auto parts showroom"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)] mb-3">
                  About Our Business
                </p>
                <h2 className="text-3xl font-bold tracking-tight mb-5">
                  Trusted Spare Parts Partner in Faisalabad
                </h2>
                <div className="space-y-4 text-[var(--muted-foreground)]">
                  <p>
                    We are a Faisalabad-based automotive spare parts business dedicated to
                    supplying quality components for a wide range of vehicles.
                  </p>
                  <p>
                    Through our import and sourcing connections in Dubai, UAE, we bring
                    reliable products to the local market at competitive prices.
                  </p>
                  <p>
                    Whether you need a single replacement part or bulk supplies, we serve both
                    retail and wholesale customers with professionalism and care.
                  </p>
                </div>
                <div className="mt-8">
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] hover:underline"
                  >
                    Learn More About Us <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 border-t border-[var(--border)] bg-[var(--muted)]">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Looking for a specific part?
            </h2>
            <p className="text-[var(--muted-foreground)] mb-8">
              Can&apos;t find what you need? Get in touch and our team will help you source the
              right spare part.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 text-sm font-semibold rounded-md bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] transition-colors"
            >
              Contact Us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}