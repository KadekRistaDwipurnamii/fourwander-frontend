"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Paket = {
  id: number;
  nama: string;
  durasi: string;
  harga: number;
  image_url: string | null;
};

export default function TourPackages() {
  const [paket, setPaket] = useState<Paket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/paket?per_page=3`)
      .then((res) => res.json())
      .then((data) => {
        const items = data.data ?? data;
        setPaket(items.slice(0, 3));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="py-20 pb-14 bg-gradient-to-b from-[#EFF6FF] to-white">
      
      {/* HEADER */}
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1E40AF]">
          Our Top Bali Tour Packages
        </h2>
        <p className="text-gray-600 mt-2">
          Handpicked adventures for every traveler.
        </p>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading packages...</p>
      ) : (
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-6">
          {paket.map((p) => (
            <div
              key={p.id}
              className="
                group bg-white rounded-3xl overflow-hidden
                transition-all duration-500 ease-out
                shadow-[0_10px_25px_rgba(0,0,0,0.08)]
                hover:-translate-y-3 hover:scale-[1.02]
                hover:shadow-[0_25px_50px_rgba(30,64,175,0.25)]
              "
            >
              {/* IMAGE */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={p.image_url || '/placeholder.jpg'}
                  alt={p.nama}
                  className="
                    h-full w-full object-cover
                    transition-transform duration-700
                    group-hover:scale-110
                  "
                />

                {/* GRADIENT OVERLAY */}
                <div className="
                  absolute inset-0
                  bg-gradient-to-t from-black/40 via-black/10 to-transparent
                  opacity-0 group-hover:opacity-100
                  transition-opacity duration-500
                " />
              </div>

              {/* CONTENT */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-semibold text-gray-800">
                  {p.nama}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  {p.durasi}
                </p>

                <p className="text-[#1E40AF] font-bold text-lg mt-4">
                  Rp {p.harga.toLocaleString("id-ID")}
                </p>

                <Link
                  href={`/paket/${p.id}`}
                  className="
                    mt-auto inline-block text-center
                    bg-[#F59E0B] text-white
                    py-3 rounded-xl font-semibold
                    transition-all duration-300
                    hover:bg-[#d48806]
                    hover:shadow-lg
                  "
                >
                  View Detail
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CTA */}
      <div className="text-center mt-12">
        <Link
          href="/paket"
          className="
            inline-flex items-center gap-2
            bg-[#1E40AF] hover:bg-[#1e3a8a]
            text-white px-10 py-4
            rounded-2xl font-semibold
            shadow-lg hover:shadow-xl
            transition-all duration-300
          "
        >
          View All Packages →
        </Link>
      </div>
    </section>
  );
}
