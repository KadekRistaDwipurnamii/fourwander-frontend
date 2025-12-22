"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

export default function TopBar() {
  const { user, logout } = useAuth();
  const { items } = useCart();

  return (
    <div className="w-full bg-blue-600 text-white text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">

        {/* LEFT */}
        <div className="flex items-center gap-2 sm:gap-4">
          <span className="hidden sm:inline">📞 +62 895-0868-5114</span>
          <span className="sm:hidden">📞 Call</span>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3 sm:gap-6">

          {!user ? (
            <>
              <Link href="/login" className="hover:underline">
                Login
              </Link>
              <Link href="/register" className="hover:underline hidden sm:inline">
                Register
              </Link>
            </>
          ) : (
            <>
              <span className="hidden sm:flex items-center gap-1 font-semibold">
                👤 {user.name}
              </span>

              <button
                onClick={() => {
                  if (confirm("Yakin ingin logout?")) {
                    logout();
                    window.location.href = "/";
                  }
                }}
                className="hover:underline"
              >
                Logout
              </button>
            </>
          )}

          {/* CART */}
          <Link href="/keranjang" className="relative">
            🛒
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-1.5 rounded-full">
                {items.length}
              </span>
            )}
          </Link>

          {/* BOOK NOW */}
          <Link
            href="/booknow"
            className="bg-blue-800 px-3 py-1 rounded font-semibold text-xs sm:text-sm"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}
