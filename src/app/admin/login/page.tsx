"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Yeh credentials aapki .env file ya hardcoded secure values hongi
    if (credentials.username === "team.ashspare" && credentials.password === "TE@M.@SHspare2000") {
      // Login successful hone par browser mein ek flag set kar denge
      document.cookie = "adminAuth=true; path=/; max-age=86400"; // 1 din ke liye login
      router.push("/admin/dashboard");
    } else {
      setError("❌ Username ya Password ghalt hai!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full border border-gray-200">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-black">ASH Spares Admin</h1>
          <p className="text-gray-500 text-sm mt-2">Sirf authorized personnel ke liye</p>
        </div>
        
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input 
              type="text" 
              required
              className="w-full border border-gray-300 p-3 rounded-lg text-black focus:ring-2 focus:ring-black outline-none"
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              required
              className="w-full border border-gray-300 p-3 rounded-lg text-black focus:ring-2 focus:ring-black outline-none"
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
          </div>
          
          {error && <p className="text-red-500 text-sm font-medium text-center">{error}</p>}
          
          <button type="submit" className="w-full bg-black text-white p-3 rounded-lg font-bold hover:bg-gray-800 transition-colors mt-2">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}