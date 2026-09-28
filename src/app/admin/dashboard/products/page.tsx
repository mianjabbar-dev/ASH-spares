"use client";
import { useState, useEffect } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [formData, setFormData] = useState({ name: "", price: "", imageUrl: "", description: "" });
  const [status, setStatus] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    if (res.ok) {
      const data = await res.json();
      setProducts(data);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(editingId ? "Product update ho raha hai..." : "Product upload ho raha hai...");
    
    const method = editingId ? "PUT" : "POST";
    const bodyData = editingId ? { id: editingId, ...formData } : formData;

    const res = await fetch("/api/products", {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyData),
    });

    if (res.ok) {
      setStatus(editingId ? "✅ Product successfully update ho gaya!" : "✅ Product successfully add ho gaya!");
      setFormData({ name: "", price: "", imageUrl: "", description: "" });
      setEditingId(null);
      fetchProducts();
      setTimeout(() => setStatus(""), 3000);
    } else {
      setStatus("❌ Error: Operation fail ho gaya.");
    }
  };

  const handleEdit = (product: any) => {
    setEditingId(product.id);
    setFormData({ 
      name: product.name, 
      price: product.price, 
      imageUrl: product.imageUrl || "", 
      description: product.description || "" 
    });
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Form ki taraf scroll karega
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Kya aap waqayi is product ko delete karna chahte hain?")) return;
    
    const res = await fetch("/api/products", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      fetchProducts();
    } else {
      alert("Delete karne mein masla aaya.");
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ name: "", price: "", imageUrl: "", description: "" });
  };

  return (
    <div className="max-w-5xl mx-auto text-black">
      <h1 className="text-3xl font-bold mb-8">Manage Products</h1>
      
      {/* Add/Edit Product Form */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
        <h2 className="text-xl font-semibold mb-4">{editingId ? "Edit Product" : "Add New Product"}</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input 
            type="text" 
            placeholder="Product Name" 
            required
            className="border border-gray-300 p-2 rounded"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input 
            type="number" 
            placeholder="Price (PKR)" 
            required
            className="border border-gray-300 p-2 rounded"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          />
          <input 
            type="url" 
            placeholder="Image URL (https://...)" 
            required
            className="border border-gray-300 p-2 rounded md:col-span-2"
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
          />
          <textarea 
            placeholder="Product Description" 
            className="border border-gray-300 p-2 rounded md:col-span-2 h-20"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <div className="md:col-span-2 flex gap-3 mt-2">
            <button type="submit" className="flex-1 bg-black text-white p-3 rounded font-bold hover:bg-gray-800">
              {editingId ? "Update Product" : "Publish Product"}
            </button>
            {editingId && (
              <button type="button" onClick={handleCancel} className="flex-1 bg-gray-200 text-black p-3 rounded font-bold hover:bg-gray-300">
                Cancel
              </button>
            )}
          </div>
        </form>
        {status && <p className="mt-4 font-medium text-green-600">{status}</p>}
      </div>

      {/* Products List Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold">All Products</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-sm border-b border-gray-200">
                <th className="p-4 font-medium">Image</th>
                <th className="p-4 font-medium">Name</th>
                <th className="p-4 font-medium">Price (PKR)</th>
                <th className="p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-4">
                      <img src={product.imageUrl} alt={product.name} className="w-12 h-12 rounded object-cover border" />
                    </td>
                    <td className="p-4 font-medium">{product.name}</td>
                    <td className="p-4">Rs. {product.price}</td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleEdit(product)}
                          className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm font-semibold hover:bg-blue-200"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(product.id)}
                          className="bg-red-100 text-red-700 px-3 py-1 rounded text-sm font-semibold hover:bg-red-200"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500">No products found. Start adding some!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}