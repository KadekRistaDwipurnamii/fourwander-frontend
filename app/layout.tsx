import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import ClientLayout from "./ClientLayout";
import { Toaster } from "react-hot-toast";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FourWander Travel Bali",
  description:
    "FourWander Travel Bali adalah website pemesanan paket wisata Bali dengan itinerary lengkap, harga transparan, dan proses booking online.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="bg-gray-100">
        <AuthProvider>
          <CartProvider>
            <ClientLayout>{children}</ClientLayout>
          </CartProvider>
        </AuthProvider>

        <Toaster position="top-right" />
      </body>
    </html>
  );
}
