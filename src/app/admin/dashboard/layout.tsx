"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { LayoutDashboard, Package, ShoppingCart, Users, Tag, LogOut } from "lucide-react";
import { useEffect, useState } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Security check: Agar login cookie nahi hai toh wapas login page par bhej do
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
    document.cookie = "adminAuth=; path=/; max-age=0"; // Cookie delete kardo
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen flex bg-gray-50 text-black">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-black">ASH Spares</h2>
          <p className="text-sm text-gray-500">Mian Jabbar - CEO</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-black text-white' : 'hover:bg-gray-100 text-gray-700'}`}>
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
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}