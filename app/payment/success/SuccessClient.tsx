"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function SuccessClient() {
  const params = useSearchParams();
  const bookingId = params.get("booking");
  const pdfUrl = params.get("pdf");

  return (
    <div className="min-h-screen bg-[#EFF6FF] flex items-center justify-center">
      <div className="bg-white p-10 rounded-2xl shadow max-w-md w-full text-center space-y-6">
        <h1 className="text-3xl font-bold text-green-600">
          ✅ Pembayaran Berhasil
        </h1>

        <p className="text-gray-700">
          Terima kasih, pembayaran booking Anda telah berhasil.
        </p>

        <p className="text-sm text-gray-500">
          Booking ID: <b>{bookingId}</b>
        </p>

        {pdfUrl && pdfUrl !== "undefined" && (
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-blue-600 text-white py-3 rounded-xl font-semibold"
          >
            📄 Download Bukti Pembayaran (PDF)
          </a>
        )}

        <Link
          href="/"
          className="block text-blue-600 underline text-sm"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
