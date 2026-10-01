"use client";

export default function DashboardOverview() {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Dashboard Overview</h1>
      
      {/* Grid: Mobile par 1 column, Tablet par 2, Desktop par 4 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        
        <div className="bg-white p-5 md:p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <h3 className="text-gray-500 text-xs md:text-sm font-medium uppercase tracking-wider">Pending Orders</h3>
          <p className="text-2xl md:text-3xl font-bold mt-2">0</p>
        </div>
        
        <div className="bg-white p-5 md:p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <h3 className="text-gray-500 text-xs md:text-sm font-medium uppercase tracking-wider">Total Products</h3>
          <p className="text-2xl md:text-3xl font-bold mt-2 text-blue-600">0</p>
        </div>
        
        <div className="bg-white p-5 md:p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <h3 className="text-gray-500 text-xs md:text-sm font-medium uppercase tracking-wider">Active Suppliers</h3>
          <p className="text-2xl md:text-3xl font-bold mt-2">0</p>
        </div>
        
        <div className="bg-white p-5 md:p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <h3 className="text-gray-500 text-xs md:text-sm font-medium uppercase tracking-wider">Total Revenue</h3>
          <p className="text-2xl md:text-3xl font-bold mt-2 text-green-600">Rs. 0</p>
        </div>
        
      </div>
    </div>
  );
}