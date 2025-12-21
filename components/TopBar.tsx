"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

export default function TopBar() {
  const { user, logout } = useAuth();
  const { items } = useCart();

  return (
    <div className="w-full bg-blue-600 text-white text-sm py-2">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="font-medium">
          📞 Call us: +62 895-0868-5114
        </div>

        <div className="flex items-center gap-6">
          {!user ? (
            <>
              <Link href="/login" className="hover:underline">
                Login
              </Link>
              <Link href="/register" className="hover:underline">
                Register
              </Link>
            </>
          ) : (
            <>
              <span className="font-semibold flex items-center gap-1">
                👤 {user.name}
              </span>
              <button
                onClick={() => {
                    const ok = confirm("Yakin ingin logout?");
                    if (ok) {
                    logout();
                    window.location.href = "/";
                    }
                }}
                className="hover:underline text-white"
                >
                Logout
                </button>

            </>
          )}

          <Link href="/keranjang" className="relative">
        🛒
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
                {items.length}
              </span>
            )}
          </Link>

          <Link
            href="/booknow"
            className="bg-blue-800 hover:bg-blue-900 px-4 py-1.5 rounded font-semibold transition"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}
