"use client";
import { useState, useEffect } from "react";

export default function DiscountsPage() {
  const [discounts, setDiscounts] = useState<any[]>([]);
  const [formData, setFormData] = useState({ code: "", type: "PERCENTAGE", value: "" });
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchDiscounts();
  }, []);

  const fetchDiscounts = async () => {
    const res = await fetch("/api/discounts");
    if (res.ok) {
      const data = await res.json();
      setDiscounts(data);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Code ban raha hai...");
    
    const res = await fetch("/api/discounts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setStatus("✅ Discount Code successfully ban gaya!");
      setFormData({ code: "", type: "PERCENTAGE", value: "" });
      fetchDiscounts();
      setTimeout(() => setStatus(""), 3000);
    } else {
      setStatus("❌ Error: Code add nahi hua (Shayad isi naam ka code pehle se hai).");
    }
  };

  return (
    <div className="max-w-5xl mx-auto text-black">
      <h1 className="text-3xl font-bold mb-8">Manage Discount Codes</h1>
      
      {/* Add Discount Form */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-green-600">Create New Discount</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input 
            type="text" 
            placeholder="Code (e.g. ASH10, EID500)" 
            required
            className="border border-gray-300 p-2 rounded uppercase"
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
          />
          <select 
            className="border border-gray-300 p-2 rounded font-medium"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          >
            <option value="PERCENTAGE">Percentage Discount (%)</option>
            <option value="FIXED">Fixed Amount (Rs.)</option>
          </select>
          <input 
            type="number" 
            placeholder="Discount Value" 
            required
            className="border border-gray-300 p-2 rounded"
            value={formData.value}
            onChange={(e) => setFormData({ ...formData, value: e.target.value })}
          />
          <button type="submit" className="bg-black text-white p-2 rounded font-bold hover:bg-gray-800 md:col-span-3 mt-2">
            Generate Code
          </button>
        </form>
        {status && <p className="mt-4 font-medium text-green-600">{status}</p>}
      </div>

      {/* Discounts Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <h2 className="text-xl font-semibold">Active Discount Codes</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-sm border-b border-gray-200">
                <th className="p-4 font-medium">Code</th>
                <th className="p-4 font-medium">Type</th>
                <th className="p-4 font-medium">Value</th>
                <th className="p-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {discounts.length > 0 ? (
                discounts.map((discount) => (
                  <tr key={discount.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-4 font-bold text-green-600">{discount.code}</td>
                    <td className="p-4">{discount.type === "PERCENTAGE" ? "Percentage (%)" : "Fixed (Rs.)"}</td>
                    <td className="p-4 font-bold">{discount.value}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${discount.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {discount.active ? "Active" : "Inactive"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500">Koi discount code nahi banaya.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}