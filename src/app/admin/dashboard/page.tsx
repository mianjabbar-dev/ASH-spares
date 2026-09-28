"use client";

export default function DashboardOverview() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-gray-500 text-sm font-medium">Pending Orders</h3>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-gray-500 text-sm font-medium">Total Products</h3>
          <p className="text-3xl font-bold mt-2 text-blue-600">0</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-gray-500 text-sm font-medium">Active Suppliers</h3>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-gray-500 text-sm font-medium">Total Revenue (PKR)</h3>
          <p className="text-3xl font-bold mt-2 text-green-600">Rs. 0</p>
        </div>
        
      </div>
    </div>
  );
}