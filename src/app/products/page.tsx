import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ProductGrid } from "@/components/product-grid";
import { ProductFilters } from "@/components/product-filters";
import { ProductSearch } from "@/components/product-search";

interface ProductsPageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
    brand?: string;
    vehicle?: string;
    min?: string;
    max?: string;
    inStock?: string;
    sort?: string;
    page?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;

  const categories = await prisma.category.findMany({
    where: { active: true },
    orderBy: { name: "asc" },
  });

  const brands = await prisma.product.groupBy({
    by: ["brand"],
    where: { active: true, brand: { not: null } },
    orderBy: { brand: "asc" },
  });

  const vehicles = await prisma.product.groupBy({
    by: ["vehicle"],
    where: { active: true, vehicle: { not: null } },
    orderBy: { vehicle: "asc" },
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="bg-[var(--muted)] border-b border-[var(--border)]">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-3">
              Spare Parts Catalog
            </h1>
            <p className="text-[var(--muted-foreground)] max-w-2xl">
              Browse our collection of quality automotive spare parts. Use filters to find the
              right fit for your vehicle.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <ProductSearch />

          <div className="mt-8 grid gap-8 lg:grid-cols-4">
            <aside className="lg:col-span-1">
              <ProductFilters
                categories={categories}
                brands={brands.map((b) => b.brand as string)}
                vehicles={vehicles.map((v) => v.vehicle as string)}
              />
            </aside>

            <div className="lg:col-span-3">
              <Suspense fallback={<div className="text-center py-20">Loading products...</div>}>
                <ProductGrid searchParams={params} />
              </Suspense>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
