"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Trash2 } from "lucide-react";

export default function CartPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Page load hone par LocalStorage se cart uthana
  useEffect(() => {
    const savedCart = localStorage.getItem("ash_spares_cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Cart load error:", error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Cart se item delete karne ka function
  const removeItem = (productId: string) => {
    const updatedCart = cartItems.filter(item => item.productId !== productId);
    setCartItems(updatedCart);
    localStorage.setItem("ash_spares_cart", JSON.stringify(updatedCart));
    // Optional: Navbar ko update karne ke liye event fire karna
    window.dispatchEvent(new Event("cartUpdated")); 
  };

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  if (!isLoaded) return <div className="min-h-screen flex justify-center items-center text-black">Loading Cart...</div>;

  // Agar cart khali ho
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-black">
        <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
        <p className="text-gray-600 mb-8">Please add some products to view them here.</p>
        <Link href="/" className="bg-black text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors">
          Continue Shopping
        </Link>
      </div>
    );
  }

  // Agar cart mein items hon
  return (
    <div className="max-w-4xl mx-auto p-8 min-h-screen text-black">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {cartItems.map((item, index) => (
          <div key={index} className="flex items-center justify-between border-b border-gray-100 py-6 last:border-0">
            
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 bg-gray-100 rounded overflow-hidden">
                {item.imageUrl ? (
                  <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">No Image</div>
                )}
              </div>
              <div>
                <h3 className="font-bold text-lg">{item.name}</h3>
                <p className="text-sm text-gray-500">Price: Rs. {item.price}</p>
                <p className="text-sm font-medium mt-1">Qty: {item.quantity}</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <span className="font-bold text-lg">Rs. {item.price * item.quantity}</span>
              <button 
                onClick={() => removeItem(item.productId)} 
                className="text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-full transition-colors"
                title="Remove Item"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}

        <div className="mt-8 border-t border-gray-200 pt-6 flex flex-col items-end">
          <div className="text-xl mb-4 text-gray-800">
            Subtotal: <span className="font-bold text-black ml-2">Rs. {subtotal}</span>
          </div>
          <Link 
            href="/checkout" 
            className="bg-black text-white px-10 py-4 rounded-lg font-bold hover:bg-gray-800 transition-colors text-lg"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}