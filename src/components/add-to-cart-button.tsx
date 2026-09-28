"use client";

import { useState } from "react";
import { ShoppingCart, Minus, Plus, Check } from "lucide-react";
import { useCart } from "@/lib/cart-context";

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    sku: string;
    price: number | string | { toString(): string };
    discountPrice: number | string | { toString(): string } | null;
    stock: number;
    imageUrl: string | null;
  };
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const price = Number(product.price);
  const discountPrice = product.discountPrice ? Number(product.discountPrice) : null;
  const inStock = product.stock > 0;

  const handleAdd = () => {
    if (!inStock) return;
    addItem({
      productId: product.id,
      name: product.name,
      sku: product.sku,
      price,
      discountPrice,
      imageUrl: product.imageUrl,
      quantity,
      stock: product.stock,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center rounded-md border border-[var(--border)] bg-[var(--card)]">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-3 py-2 hover:bg-[var(--muted)] disabled:opacity-50"
            disabled={!inStock}
            aria-label="Decrease quantity"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-10 text-center text-sm font-semibold">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
            className="px-3 py-2 hover:bg-[var(--muted)] disabled:opacity-50"
            disabled={!inStock || quantity >= product.stock}
            aria-label="Increase quantity"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <button
          onClick={handleAdd}
          disabled={!inStock}
          className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-md bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {added ? (
            <>
              <Check className="h-4 w-4" /> Added
            </>
          ) : (
            <>
              <ShoppingCart className="h-4 w-4" /> Add to Cart
            </>
          )}
        </button>
      </div>
      {!inStock && (
        <p className="text-sm text-red-600 dark:text-red-400">This product is currently out of stock.</p>
      )}
    </div>
  );
}
