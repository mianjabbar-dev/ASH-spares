"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CheckoutPage() {
  const router = useRouter();
  
  // Real Cart State
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Customer Form State
  const [customer, setCustomer] = useState({ name: "", phone: "", address: "", city: "" });
  
  // Discount State
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<any>(null);
  const [discountMessage, setDiscountMessage] = useState({ type: "", text: "" });
  
  // Status State
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Page load hone par localStorage se actual cart data uthana
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

  // Live Calculations
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  let discountAmount = 0;
  if (appliedDiscount) {
    if (appliedDiscount.type === "PERCENTAGE") {
      discountAmount = (subtotal * appliedDiscount.value) / 100;
    } else {
      discountAmount = appliedDiscount.value;
    }
  }
  
  const total = subtotal - discountAmount;

  const handleApplyDiscount = async () => {
    if (!discountCode) return;
    setDiscountMessage({ type: "info", text: "Checking code..." });
    
    const res = await fetch("/api/discounts/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: discountCode }),
    });

    const data = await res.json();
    if (res.ok) {
      // Check for Minimum Order Amount (agar aapne feature rakha hai)
      if (data.minOrderAmount && subtotal < data.minOrderAmount) {
         setDiscountMessage({ type: "error", text: `Minimum order of Rs. ${data.minOrderAmount} required` });
         setAppliedDiscount(null);
         return;
      }
      setAppliedDiscount(data);
      setDiscountMessage({ type: "success", text: `Discount applied successfully!` });
    } else {
      setAppliedDiscount(null);
      setDiscountMessage({ type: "error", text: data.error || "Invalid or expired code" });
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert("Aapka cart khali hai!");
      return;
    }
    
    setIsSubmitting(true);
    setStatus("Order processing...");

    const orderData = {
      customer,
      items: cartItems,
      subtotal,
      discount: discountAmount,
      total
    };

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    if (res.ok) {
      setStatus("✅ Order Placed Successfully!");
      localStorage.removeItem("ash_spares_cart"); // Live website par order ke baad cart clear karna zaroori hai
      setTimeout(() => {
        router.push("/order-confirmation");
      }, 1500);
    } else {
      setStatus("❌ Order place karne mein masla aaya.");
      setIsSubmitting(false);
    }
  };

  // Prevent hydration mismatch aur empty cart check
  if (!isLoaded) return <div className="min-h-screen flex justify-center items-center text-black">Loading checkout...</div>;
  
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-black">
        <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
        <p className="text-gray-600 mb-8">Please add some products to checkout.</p>
        <Link href="/" className="bg-black text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8 text-black min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side - Customer Details Form */}
        <div className="flex-1 bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-fit">
          <h2 className="text-xl font-semibold mb-6">Delivery Information</h2>
          <form onSubmit={handlePlaceOrder} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input 
                type="text" required
                className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-black outline-none"
                value={customer.name}
                onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number (WhatsApp)</label>
              <input 
                type="text" required placeholder="03XXXXXXXXX"
                className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-black outline-none"
                value={customer.phone}
                onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Complete Delivery Address</label>
              <textarea 
                required className="w-full border border-gray-300 p-3 rounded h-24 focus:ring-2 focus:ring-black outline-none"
                value={customer.address}
                onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input 
                type="text" required
                className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-black outline-none"
                value={customer.city}
                onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
              />
            </div>
            
            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`w-full text-white p-4 rounded font-bold transition-colors mt-4 text-lg ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-800'}`}
            >
              {isSubmitting ? 'Processing...' : 'Place Order (Cash on Delivery)'}
            </button>
            {status && <p className="text-center font-medium text-green-600 mt-2">{status}</p>}
          </form>
        </div>

        {/* Right Side - Order Summary & Discount */}
        <div className="w-full lg:w-96 bg-gray-50 p-6 rounded-xl border border-gray-200 h-fit">
          <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
          
          <div className="flex flex-col gap-4 mb-6 border-b border-gray-200 pb-6 max-h-60 overflow-y-auto">
            {cartItems.map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span>{item.name} <span className="text-gray-500">x{item.quantity}</span></span>
                <span className="font-medium">Rs. {item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="mb-6 border-b border-gray-200 pb-6">
            <p className="text-sm font-medium text-gray-700 mb-2">Have a discount code?</p>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Enter Code" 
                className="flex-1 border border-gray-300 p-2 rounded uppercase text-sm outline-none"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                disabled={appliedDiscount !== null}
              />
              <button 
                type="button"
                onClick={handleApplyDiscount}
                disabled={appliedDiscount !== null || !discountCode}
                className="bg-gray-800 text-white px-4 py-2 rounded text-sm font-medium hover:bg-black transition-colors disabled:bg-gray-400"
              >
                {appliedDiscount ? 'Applied' : 'Apply'}
              </button>
            </div>
            {discountMessage.text && (
              <p className={`text-xs mt-2 font-medium ${discountMessage.type === 'error' ? 'text-red-600' : discountMessage.type === 'success' ? 'text-green-600' : 'text-blue-600'}`}>
                {discountMessage.text}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">Rs. {subtotal}</span>
            </div>
            {appliedDiscount && (
              <div className="flex justify-between text-green-600">
                <span>Discount ({appliedDiscount.code})</span>
                <span>- Rs. {discountAmount}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t border-gray-200">
              <span>Total</span>
              <span>Rs. {total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}