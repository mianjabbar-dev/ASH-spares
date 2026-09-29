import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { ProductCard } from "@/components/product-card";
import { ArrowLeft, Check, X, Package } from "lucide-react";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id, active: true },
    include: { category: true },
  });

  if (!product) {
    notFound();
  }

  const relatedProducts = await prisma.product.findMany({
    where: {
      active: true,
      categoryId: product.categoryId,
      id: { not: product.id },
    },
    include: { category: true },
    take: 4,
  });

  const price = Number(product.price);
  const discountPrice = product.discountPrice ? Number(product.discountPrice) : null;
  const displayPrice = discountPrice ?? price;
  const inStock = product.stock > 0;

  // FIX: Prisma ke object ko Client Component me bhejne ke liye safe banaya
  const safeProductForCart = {
    id: product.id,
    name: product.name,
    price: Number(product.price),
    imageUrl: product.imageUrl,
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-1 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] mb-6"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Products
          </Link>

          <div className="grid gap-10 lg:grid-cols-2">
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--muted)]">
              {product.imageUrl ? (
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="flex h-full items-center justify-center text-[var(--muted-foreground)]">
                  <Package className="h-24 w-24 opacity-20" />
                </div>
              )}
            </div>

            <div className="flex flex-col">
              <div className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)] mb-2">
                {product.category?.name}
              </div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-3">
                {product.name}
              </h1>
              <p className="text-sm text-[var(--muted-foreground)] mb-4">
                SKU: <span className="font-mono">{product.sku}</span>
                {product.brand && <> | Brand: {product.brand}</>}
                {product.vehicle && <> | Fits: {product.vehicle}</>}
              </p>

              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold">{formatPrice(displayPrice)}</span>
                {discountPrice && (
                  <span className="text-xl text-[var(--muted-foreground)] line-through">
                    {formatPrice(price)}
                  </span>
                )}
                <span
                  className={`inline-flex items-center gap-1 text-sm font-medium px-2.5 py-1 rounded-full ${
                    inStock
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                  }`}
                >
                  {inStock ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                  {inStock ? `In Stock (${product.stock})` : "Out of Stock"}
                </span>
              </div>

              {product.description && (
               <div className="prose dark:prose-invert max-w-none mb-8">
                  <p className="text-[var(--muted-foreground)] leading-relaxed">
                    {product.description}
                  </p>
                </div>
              )}

              <div className="mt-auto">
                <AddToCartButton product={safeProductForCart} />
              </div>
            </div>
          </div>

          {relatedProducts.length > 0 && (
            <section className="mt-20">
              <h2 className="text-2xl font-bold tracking-tight mb-6">Related Products</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {relatedProducts.map((p) => {
                  // FIX: Related products ke liye bhi safe object banaya
                  const safeRelatedProduct = {
                    ...p,
                    price: Number(p.price)
                  };
                  return <ProductCard key={p.id} product={safeRelatedProduct} />;
                })}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    minimumFractionDigits: 0,
  }).format(price);
}