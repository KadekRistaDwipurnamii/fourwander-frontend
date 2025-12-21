"use client";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"   // taruh logo di /public/logo.png
            alt="FourWanders"
            width={56}
            height={56}
          />
          <span className="text-lg font-bold text-blue-700">
            FourWanders
          </span>
        </Link>

        {/* MENU */}
        <ul className="flex gap-10 text-sm font-medium text-gray-700 items-center">
          <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
          <li><Link href="/paket" className="hover:text-blue-600">Tour Packages</Link></li>
          <li><Link href="/attractions" className="hover:text-blue-600">Attractions</Link></li>
          <li><Link href="/about" className="hover:text-blue-600">About Us</Link></li>
          <li><Link href="/contact" className="hover:text-blue-600">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}
