"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { formatPrice } from "@/lib/utils";
import { Minus, Plus, Trash2, ShoppingCart, ArrowRight, Tag } from "lucide-react";

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeItem,
    subtotal,
    discount,
    total,
    discountCode,
    clearDiscount,
  } = useCart();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight mb-8">Shopping Cart</h1>

          {items.length === 0 ? (
            <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-12 text-center">
              <ShoppingCart className="mx-auto h-12 w-12 text-[var(--muted-foreground)] mb-4" />
              <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
              <p className="text-[var(--muted-foreground)] mb-6">
                Browse our products and add items to your cart.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-md bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] transition-colors"
              >
                Explore Spare Parts
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <div
                    key={item.productId}
                    className="flex gap-4 rounded-xl border border-[var(--border)] bg-[var(--card)] p-4"
                  >
                    <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-[var(--muted)]">
                      {item.imageUrl ? (
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <ShoppingCart className="absolute inset-0 m-auto h-8 w-8 text-[var(--muted-foreground)]" />
                      )}
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between">
                        <Link
                          href={`/products/${item.productId}`}
                          className="font-semibold hover:text-[var(--accent)] transition-colors"
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => removeItem(item.productId)}
                          className="text-[var(--muted-foreground)] hover:text-red-500 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-xs text-[var(--muted-foreground)] mb-2">SKU: {item.sku}</p>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center rounded-md border border-[var(--border)] bg-[var(--background)]">
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            className="px-2 py-1 hover:bg-[var(--muted)]"
                            aria-label="Decrease"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            className="px-2 py-1 hover:bg-[var(--muted)] disabled:opacity-50"
                            disabled={item.quantity >= item.stock}
                            aria-label="Increase"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">
                            {formatPrice((item.discountPrice || item.price) * item.quantity)}
                          </p>
                          <p className="text-xs text-[var(--muted-foreground)]">
                            {formatPrice(item.discountPrice || item.price)} each
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-1">
                <div className="sticky top-24 rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 space-y-4">
                  <h2 className="text-lg font-semibold">Order Summary</h2>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[var(--muted-foreground)]">Subtotal</span>
                      <span className="font-medium">{formatPrice(subtotal)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600 dark:text-green-400">
                        <span className="flex items-center gap-1">
                          <Tag className="h-3 w-3" /> Discount ({discountCode})
                        </span>
                        <span className="font-medium">-{formatPrice(discount)}</span>
                      </div>
                    )}
                    <div className="border-t border-[var(--border)] pt-2 flex justify-between text-base font-bold">
                      <span>Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>

                  {discount > 0 && (
                    <button
                      onClick={clearDiscount}
                      className="text-xs text-[var(--accent)] hover:underline"
                    >
                      Remove discount code
                    </button>
                  )}

                  <Link
                    href="/checkout"
                    className="block w-full text-center px-6 py-3 text-sm font-semibold rounded-md bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] transition-colors"
                  >
                    Proceed to Checkout
                  </Link>
                  <Link
                    href="/products"
                    className="block w-full text-center px-6 py-3 text-sm font-semibold rounded-md border border-[var(--border)] bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] transition-colors"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
