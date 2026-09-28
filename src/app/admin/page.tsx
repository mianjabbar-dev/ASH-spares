"use client";
import { useState } from "react";

export default function AdminPanel() {
  const [formData, setFormData] = useState({ name: "", price: "", imageUrl: "", description: "" });
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Product upload ho raha hai... Wait karein.");
    
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setStatus("✅ Zabardast! Product add ho gaya. Apna Home Page check karein.");
      setFormData({ name: "", price: "", imageUrl: "", description: "" }); // Form clear kar dega
    } else {
      setStatus("❌ Error: Product add nahi hua.");
    }
  };

  return (
    <div className="p-10 max-w-2xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">ASH Spares - Admin Panel</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-black">Add New Product</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input 
            type="text" 
            placeholder="Product Name (Misal: Brake Pads)" 
            required
            className="border border-gray-300 p-2 rounded text-black"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input 
            type="number" 
            placeholder="Price (PKR)" 
            required
            className="border border-gray-300 p-2 rounded text-black"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          />
          <input 
            type="text" 
            placeholder="Image URL (Unsplash waghera ka link)" 
            required
            className="border border-gray-300 p-2 rounded text-black"
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
          />
          <textarea 
            placeholder="Product Description" 
            className="border border-gray-300 p-2 rounded text-black h-24"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <button type="submit" className="bg-black text-white p-3 rounded hover:bg-gray-800 font-bold mt-2">
            Publish Product
          </button>
        </form>
        {status && <p className="mt-4 font-medium text-green-600">{status}</p>}
      </div>
    </div>
  );
}