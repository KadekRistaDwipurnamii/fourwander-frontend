"use client";

import { usePathname } from "next/navigation";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // 👉 DETEKSI ADMIN
  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      {/* USER ONLY */}
      {!isAdmin && <TopBar />}
      {!isAdmin && <Navbar />}

      {children}

      {/* USER ONLY */}
      {!isAdmin && <Footer />}
    </>
  );
}
