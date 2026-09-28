import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "./product-card";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductGridProps {
  searchParams: {
    q?: string;
    category?: string;
    brand?: string;
    vehicle?: string;
    min?: string;
    max?: string;
    inStock?: string;
    sort?: string;
    page?: string;
  };
}

const PAGE_SIZE = 12;

export async function ProductGrid({ searchParams }: ProductGridProps) {
  const page = Math.max(1, parseInt(searchParams.page || "1", 10));

  const where: any = { active: true };

  if (searchParams.q) {
    where.OR = [
      { name: { contains: searchParams.q, mode: "insensitive" } },
      { sku: { contains: searchParams.q, mode: "insensitive" } },
      { description: { contains: searchParams.q, mode: "insensitive" } },
    ];
  }

  if (searchParams.category) {
    where.category = { slug: searchParams.category };
  }

  if (searchParams.brand) {
    where.brand = { equals: searchParams.brand, mode: "insensitive" };
  }

  if (searchParams.vehicle) {
    where.vehicle = { equals: searchParams.vehicle, mode: "insensitive" };
  }

  if (searchParams.min || searchParams.max) {
    where.price = {};
    if (searchParams.min) where.price.gte = parseFloat(searchParams.min);
    if (searchParams.max) where.price.lte = parseFloat(searchParams.max);
  }

  if (searchParams.inStock === "true") {
    where.stock = { gt: 0 };
  }

  let orderBy: any = { createdAt: "desc" };
  switch (searchParams.sort) {
    case "price_asc":
      orderBy = { price: "asc" };
      break;
    case "price_desc":
      orderBy = { price: "desc" };
      break;
    case "newest":
      orderBy = { createdAt: "desc" };
      break;
    case "featured":
      orderBy = [{ featured: "desc" }, { createdAt: "desc" }];
      break;
  }

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: { category: true },
      orderBy,
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.product.count({ where }),
  ]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  const buildPageLink = (p: number) => {
    const params = new URLSearchParams(searchParams as Record<string, string>);
    params.set("page", p.toString());
    return `/products?${params.toString()}`;
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-[var(--muted-foreground)]">
          Showing {products.length} of {total} products
        </p>
      </div>

      {products.length > 0 ? (
        <>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-2">
              <Link
                href={buildPageLink(page - 1)}
                className={`inline-flex items-center px-3 py-2 rounded-md border border-[var(--border)] bg-[var(--card)] text-sm ${
                  page <= 1 ? "pointer-events-none opacity-50" : "hover:bg-[var(--muted)]"
                }`}
              >
                <ChevronLeft className="h-4 w-4" />
              </Link>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Link
                  key={p}
                  href={buildPageLink(p)}
                  className={`inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium ${
                    p === page
                      ? "bg-[var(--foreground)] text-[var(--background)]"
                      : "border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--muted)]"
                  }`}
                >
                  {p}
                </Link>
              ))}
              <Link
                href={buildPageLink(page + 1)}
                className={`inline-flex items-center px-3 py-2 rounded-md border border-[var(--border)] bg-[var(--card)] text-sm ${
                  page >= totalPages ? "pointer-events-none opacity-50" : "hover:bg-[var(--muted)]"
                }`}
              >
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </>
      ) : (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-12 text-center">
          <h3 className="text-lg font-semibold mb-2">No products found</h3>
          <p className="text-sm text-[var(--muted-foreground)]">
            Try adjusting your search or filters to find what you&apos;re looking for.
          </p>
        </div>
      )}
    </div>
  );
}
