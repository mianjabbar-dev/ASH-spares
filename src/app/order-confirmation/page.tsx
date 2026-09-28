import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { formatPrice } from "@/lib/utils";
import { CheckCircle, ShoppingBag, Home } from "lucide-react";

interface OrderConfirmationPageProps {
  searchParams: Promise<{ orderId?: string }>;
}

export default async function OrderConfirmationPage({
  searchParams,
}: OrderConfirmationPageProps) {
  const { orderId } = await searchParams;

  if (!orderId) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Order Not Found</h1>
            <p className="text-[var(--muted-foreground)] mb-4">
              No order ID was provided.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-md bg-[var(--foreground)] text-[var(--background)]"
            >
              Continue Shopping
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const order = await prisma.order.findUnique({
    where: { orderId },
    include: {
      items: { include: { product: true } },
      customer: true,
    },
  });

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Order Not Found</h1>
            <p className="text-[var(--muted-foreground)] mb-4">
              We couldn&apos;t find order {orderId}.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-md bg-[var(--foreground)] text-[var(--background)]"
            >
              Continue Shopping
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 mb-4">
              <CheckCircle className="h-8 w-8" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Order Placed Successfully</h1>
            <p className="text-[var(--muted-foreground)]">
              Thank you for your order. We will contact you shortly.
            </p>
          </div>

          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 pb-4 border-b border-[var(--border)]">
              <div>
                <p className="text-sm text-[var(--muted-foreground)]">Order ID</p>
                <p className="text-lg font-mono font-semibold">{order.orderId}</p>
              </div>
              <div className="sm:text-right">
                <p className="text-sm text-[var(--muted-foreground)]">Status</p>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                  {order.status}
                </span>
              </div>
            </div>

            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider mb-3">
                Customer Information
              </h2>
              <div className="grid gap-2 text-sm">
                <p>
                  <span className="text-[var(--muted-foreground)]">Name:</span> {order.customer.name}
                </p>
                <p>
                  <span className="text-[var(--muted-foreground)]">Phone:</span> {order.customer.phone}
                </p>
                {order.customer.whatsapp && (
                  <p>
                    <span className="text-[var(--muted-foreground)]">WhatsApp:</span>{" "}
                    {order.customer.whatsapp}
                  </p>
                )}
                {order.customer.email && (
                  <p>
                    <span className="text-[var(--muted-foreground)]">Email:</span> {order.customer.email}
                  </p>
                )}
                <p>
                  <span className="text-[var(--muted-foreground)]">Address:</span> {order.customer.address}
                </p>
                <p>
                  <span className="text-[var(--muted-foreground)]">City:</span> {order.customer.city}
                  {order.customer.area && `, ${order.customer.area}`}
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider mb-3">Order Items</h2>
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-[var(--muted-foreground)]">
                        SKU: {item.sku} | Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium">{formatPrice(Number(item.total))}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-[var(--border)] pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[var(--muted-foreground)]">Subtotal</span>
                <span>{formatPrice(Number(order.subtotal))}</span>
              </div>
              {Number(order.discount) > 0 && (
                <div className="flex justify-between text-green-600 dark:text-green-400">
                  <span>Discount</span>
                  <span>-{formatPrice(Number(order.discount))}</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>{formatPrice(Number(order.total))}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-md bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] transition-colors"
            >
              <ShoppingBag className="h-4 w-4" /> Continue Shopping
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-md border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors"
            >
              <Home className="h-4 w-4" /> Back to Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
