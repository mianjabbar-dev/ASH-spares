"use client";
import { useState, useEffect } from "react";

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [formData, setFormData] = useState({ name: "", companyName: "", phone: "", city: "" });
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    const res = await fetch("/api/suppliers");
    if (res.ok) {
      const data = await res.json();
      setSuppliers(data);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Supplier add ho raha hai...");
    
    const res = await fetch("/api/suppliers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setStatus("✅ Supplier successfully record ho gaya!");
      setFormData({ name: "", companyName: "", phone: "", city: "" });
      fetchSuppliers();
      setTimeout(() => setStatus(""), 3000);
    } else {
      setStatus("❌ Error: Supplier add nahi hua.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto text-black">
      <h1 className="text-3xl font-bold mb-8">Manage Suppliers (Private)</h1>
      
      {/* Add Supplier Form */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">Add New Supplier</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <input 
            type="text" 
            placeholder="Contact Person Name" 
            required
            className="border border-gray-300 p-2 rounded"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input 
            type="text" 
            placeholder="Company/Shop Name" 
            className="border border-gray-300 p-2 rounded"
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
          />
          <input 
            type="text" 
            placeholder="Phone Number" 
            required
            className="border border-gray-300 p-2 rounded"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
          <input 
            type="text" 
            placeholder="City" 
            className="border border-gray-300 p-2 rounded"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          />
          <button type="submit" className="bg-black text-white p-2 rounded font-bold hover:bg-gray-800 md:col-span-2 lg:col-span-4 mt-2">
            Save Supplier Details
          </button>
        </form>
        {status && <p className="mt-4 font-medium text-green-600">{status}</p>}
      </div>

      {/* Suppliers Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <h2 className="text-xl font-semibold">Registered Suppliers</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-sm border-b border-gray-200">
                <th className="p-4 font-medium">Name</th>
                <th className="p-4 font-medium">Company</th>
                <th className="p-4 font-medium">Phone</th>
                <th className="p-4 font-medium">City</th>
                <th className="p-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.length > 0 ? (
                suppliers.map((supplier) => (
                  <tr key={supplier.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-4 font-medium">{supplier.name}</td>
                    <td className="p-4">{supplier.companyName || "N/A"}</td>
                    <td className="p-4">{supplier.phone}</td>
                    <td className="p-4">{supplier.city || "N/A"}</td>
                    <td className="p-4">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">
                        {supplier.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">Koi supplier add nahi hai.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}