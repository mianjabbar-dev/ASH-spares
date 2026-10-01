"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { LayoutDashboard, Package, ShoppingCart, Users, Tag, LogOut, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false); // Mobile menu state

  useEffect(() => {
    if (!document.cookie.includes("adminAuth=true")) {
      router.push("/admin/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-black">Loading Admin Panel...</div>;

  const menuItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Products", href: "/admin/dashboard/products", icon: Package },
    { name: "Orders", href: "/admin/dashboard/orders", icon: ShoppingCart },
    { name: "Suppliers", href: "/admin/dashboard/suppliers", icon: Users },
    { name: "Discounts", href: "/admin/dashboard/discounts", icon: Tag },
  ];

  const handleLogout = () => {
    document.cookie = "adminAuth=; path=/; max-age=0";
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen flex bg-gray-50 text-black">
      
      {/* Mobile Top Header (Sirf mobile par show hoga) */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-30 shadow-sm">
        <h2 className="text-xl font-bold text-black">ASH Spares</h2>
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)} 
          className="p-2 rounded-md hover:bg-gray-100 transition-colors"
        >
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Overlay Background (Jab menu open ho) */}
      {sidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Responsive Navigation */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>
        <div className="p-6 border-b border-gray-200 hidden md:block">
          <h2 className="text-2xl font-bold text-black">ASH Spares</h2>
          <p className="text-sm text-gray-500">Mian Jabbar - CEO</p>
        </div>
        
        <div className="p-4 border-b border-gray-200 md:hidden flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-black">Admin Panel</h2>
              <p className="text-sm text-gray-500">Mian Jabbar</p>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="p-2 bg-gray-100 rounded-md"><X className="h-5 w-5"/></button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                onClick={() => setSidebarOpen(false)} // Mobile par click hone par menu band ho jayega
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-black text-white shadow-md' : 'hover:bg-gray-100 text-gray-700'}`}>
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-gray-200">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 w-full rounded-lg hover:bg-red-50 text-red-600 transition-colors">
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 pt-20 md:p-8 md:pt-8 w-full overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}