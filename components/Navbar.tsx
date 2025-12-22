"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="FourWanders"
            width={56}
            height={56}
          />
          <span className="text-lg font-bold text-blue-700">
            FourWanders
          </span>
        </Link>

        {/* ===== DESKTOP MENU ===== */}
        <ul className="hidden md:flex gap-10 text-sm font-medium text-gray-700 items-center">
          <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
          <li><Link href="/paket" className="hover:text-blue-600">Tour Packages</Link></li>
          <li><Link href="/attractions" className="hover:text-blue-600">Attractions</Link></li>
          <li><Link href="/about" className="hover:text-blue-600">About Us</Link></li>
          <li><Link href="/contact" className="hover:text-blue-600">Contact</Link></li>
        </ul>

        {/* ===== MOBILE HAMBURGER ===== */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle Menu"
        >
          <div className="space-y-1">
            <span className="block w-6 h-0.5 bg-gray-800"></span>
            <span className="block w-6 h-0.5 bg-gray-800"></span>
            <span className="block w-6 h-0.5 bg-gray-800"></span>
          </div>
        </button>
      </nav>

      {/* ===== MOBILE MENU DROPDOWN ===== */}
      {open && (
        <div className="md:hidden bg-white border-t">
          <ul className="flex flex-col px-6 py-4 gap-4 text-sm font-medium text-gray-700">
            <li>
              <Link href="/" onClick={() => setOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/paket" onClick={() => setOpen(false)}>
                Tour Packages
              </Link>
            </li>
            <li>
              <Link href="/attractions" onClick={() => setOpen(false)}>
                Attractions
              </Link>
            </li>
            <li>
              <Link href="/about" onClick={() => setOpen(false)}>
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" onClick={() => setOpen(false)}>
                Contact
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
