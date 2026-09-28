"use client";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";

export function ProductCard({ product }: { product: any }) {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Is se button click hone par page redirect nahi hoga
    
    const cartItem = {
      productId: product.id,
      name: product.name,
      price: Number(product.price),
      quantity: 1,
      imageUrl: product.imageUrl
    };

    // Purana cart check karein
    const existingCart = JSON.parse(localStorage.getItem('ash_spares_cart') || '[]');

    // Check karein ke product pehle se cart mein toh nahi
    const existingItemIndex = existingCart.findIndex((item: any) => item.productId === product.id);

    if (existingItemIndex > -1) {
      // Agar pehle se hai, toh quantity barha dein
      existingCart[existingItemIndex].quantity += 1;
    } else {
      // Agar naya hai, toh cart mein daal dein
      existingCart.push(cartItem);
    }

    // Wapas save karein
    localStorage.setItem('ash_spares_cart', JSON.stringify(existingCart));
    
    // User ko message show karein
    alert(`${product.name} successfully cart mein add ho gaya hai!`);
  };

  return (
    <div className="group relative rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:border-black transition-colors">
      <Link href={`/products/${product.id}`} className="block relative aspect-square overflow-hidden rounded-lg mb-4 bg-gray-100">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
        )}
      </Link>

      <div>
        <h3 className="text-lg font-semibold text-black line-clamp-1">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-2">{product.category?.name || "General Parts"}</p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-lg font-bold text-black">Rs. {Number(product.price)}</span>
          <button
            onClick={handleAddToCart}
            className="bg-gray-100 p-2 rounded-full hover:bg-black hover:text-white transition-colors"
            title="Add to Cart"
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}