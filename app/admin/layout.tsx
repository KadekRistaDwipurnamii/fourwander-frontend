"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const menu = [
    { label: "Dashboard", href: "/admin/dashboard" },
    { label: "Paket", href: "/admin/paket" },
    { label: "Booking", href: "/admin/booking" },
  ];

  const logout = () => {
    // kalau nanti pakai token, hapus di sini
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* ===== SIDEBAR ===== */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6 font-bold text-xl border-b">
          Admin Panel
        </div>

        <nav className="p-4 space-y-2">
          {menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-2 rounded font-medium
                ${
                  pathname === item.href
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* ===== MAIN AREA ===== */}
      <div className="flex-1 flex flex-col">
        {/* ===== TOPBAR ===== */}
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <h1 className="font-semibold text-lg">
            FourWanders Admin
          </h1>

          <button
            onClick={logout}
            className="text-red-500 font-medium hover:underline"
          >
            Logout
          </button>
        </header>

        {/* ===== CONTENT ===== */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
