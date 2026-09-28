"use client";
import { useState, useEffect } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await fetch("/api/orders");
    if (res.ok) {
      const data = await res.json();
      setOrders(data);
    }
    setLoading(false);
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    const res = await fetch("/api/orders", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: orderId, status: newStatus }),
    });

    if (res.ok) {
      fetchOrders(); // Status update hone ke baad list refresh karega
    } else {
      alert("Status update fail ho gaya.");
    }
  };

  if (loading) return <div className="text-black">Orders load ho rahe hain...</div>;

  return (
    <div className="max-w-6xl mx-auto text-black">
      <h1 className="text-3xl font-bold mb-8">Manage Orders</h1>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <h2 className="text-xl font-semibold">All Customer Orders</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-sm border-b border-gray-200">
                <th className="p-4 font-medium">Order ID</th>
                <th className="p-4 font-medium">Customer Details</th>
                <th className="p-4 font-medium">Items</th>
                <th className="p-4 font-medium">Total Amount</th>
                <th className="p-4 font-medium">Status Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-4 font-bold text-blue-600">{order.orderId}</td>
                    <td className="p-4">
                      <p className="font-semibold">{order.customer?.name}</p>
                      <p className="text-sm text-gray-600">{order.customer?.phone}</p>
                      <p className="text-xs text-gray-500">{order.customer?.address}, {order.customer?.city}</p>
                    </td>
                    <td className="p-4">
                      <ul className="text-sm list-disc pl-4">
                        {order.items.map((item: any) => (
                          <li key={item.id}>{item.name} (x{item.quantity})</li>
                        ))}
                      </ul>
                    </td>
                    <td className="p-4 font-bold">Rs. {order.total}</td>
                    <td className="p-4">
                      <select 
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className={`p-2 rounded text-sm font-semibold border ${
                          order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                          order.status === 'SHIPPED' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                          order.status === 'DELIVERED' ? 'bg-green-100 text-green-800 border-green-200' :
                          'bg-red-100 text-red-800 border-red-200'
                        }`}
                      >
                        <option value="PENDING">Pending</option>
                        <option value="CONFIRMED">Confirmed</option>
                        <option value="PROCESSING">Processing</option>
                        <option value="SHIPPED">Shipped</option>
                        <option value="DELIVERED">Delivered</option>
                        <option value="CANCELLED">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">Abhi tak koi order receive nahi hua.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}