"use client";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

export function AddToCartButton({ product }: { product: any }) {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    
    // Naya data structure jo checkout page ko chahiye
    const cartItem = {
      productId: product.id,
      name: product.name,
      price: Number(product.price),
      quantity: 1,
      imageUrl: product.imageUrl
    };

    // LocalStorage se cart fetch karna
    const existingCart = JSON.parse(localStorage.getItem('ash_spares_cart') || '[]');
    const existingItemIndex = existingCart.findIndex((item: any) => item.productId === product.id);

    if (existingItemIndex > -1) {
      existingCart[existingItemIndex].quantity += 1;
    } else {
      existingCart.push(cartItem);
    }

    // Wapas cart update karna
    localStorage.setItem('ash_spares_cart', JSON.stringify(existingCart));
    localStorage.setItem('ash_spares_cart', JSON.stringify(existingCart));

     // Yeh nayi line add karein:
     window.dispatchEvent(new Event("cartUpdated"));
    alert(`${product.name} cart mein add ho gaya hai!`);
    setIsAdding(false);
  };

  return (
    <button 
      onClick={handleAddToCart}
      disabled={isAdding}
      className="flex items-center justify-center gap-2 w-full bg-black text-white px-8 py-4 rounded-lg font-bold hover:bg-gray-800 transition-colors disabled:bg-gray-400 text-lg mt-6"
    >
      <ShoppingCart className="h-6 w-6" />
      {isAdding ? "Processing..." : "Add to Cart"}
    </button>
  );
}