import { prisma } from "@/lib/prisma";

// Yeh line ensure karegi ke dashboard hamesha fresh data dikhaye (cache na kare)
export const dynamic = "force-dynamic";

export default async function DashboardOverview() {
  let pendingOrders = 0;
  let totalProducts = 0;
  let activeSuppliers = 0;
  let totalRevenue = 0;

  try {
    // 1. Pending Orders fetch karna
    pendingOrders = await prisma.order.count({
      where: { status: "PENDING" }, // Agar aapke database mein status kuch aur hai (jaise 'pending') toh yahan change kar lein
    });

    // 2. Total Products fetch karna
    totalProducts = await prisma.product.count({
      where: { active: true }
    });

    // 3. Total Suppliers fetch karna
    activeSuppliers = await prisma.supplier.count();

    // 4. Total Revenue (Sirf "DELIVERED" orders ka paisa count karega)
    const revenueData = await prisma.order.aggregate({
      where: { status: "DELIVERED" },
      _sum: {
        totalAmount: true // Agar aapke database mein order ki total price ka field sirf 'total' ya 'amount' hai toh isay change kar lein
      }
    });
    
    totalRevenue = Number(revenueData._sum?.totalAmount || 0);

  } catch (error) {
    console.error("Dashboard data fetch karne mein masla:", error);
  }

  return (
    <div className="max-w-7xl mx-auto text-black">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Dashboard Overview</h1>
      
      {/* Grid: Mobile par 1 column, Tablet par 2, Desktop par 4 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        
        <div className="bg-white p-5 md:p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <h3 className="text-gray-500 text-xs md:text-sm font-medium uppercase tracking-wider">Pending Orders</h3>
          <p className="text-2xl md:text-3xl font-bold mt-2 text-orange-600">{pendingOrders}</p>
        </div>
        
        <div className="bg-white p-5 md:p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <h3 className="text-gray-500 text-xs md:text-sm font-medium uppercase tracking-wider">Total Products</h3>
          <p className="text-2xl md:text-3xl font-bold mt-2 text-blue-600">{totalProducts}</p>
        </div>
        
        <div className="bg-white p-5 md:p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <h3 className="text-gray-500 text-xs md:text-sm font-medium uppercase tracking-wider">Active Suppliers</h3>
          <p className="text-2xl md:text-3xl font-bold mt-2 text-purple-600">{activeSuppliers}</p>
        </div>
        
        <div className="bg-white p-5 md:p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <h3 className="text-gray-500 text-xs md:text-sm font-medium uppercase tracking-wider">Total Revenue</h3>
          <p className="text-2xl md:text-3xl font-bold mt-2 text-green-600">
            Rs. {totalRevenue.toLocaleString()}
          </p>
        </div>
        
      </div>
    </div>
  );
}