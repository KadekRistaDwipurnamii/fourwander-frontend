"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type Paket = {
  id: number;
  nama: string;
  durasi: string;
  harga: number;
  kategori: string;
  image_url: string | null;
};

export default function PaketClient() {
  const searchParams = useSearchParams();

  const q = searchParams.get("q") || "";
  const kategoriQuery = searchParams.get("kategori") || "";

  const [paket, setPaket] = useState<Paket[]>([]);
  const [loading, setLoading] = useState(true);

  const [kategori, setKategori] = useState(kategoriQuery);
  const [minHarga, setMinHarga] = useState("");
  const [maxHarga, setMaxHarga] = useState("");

  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const fetchPaket = () => {
    setLoading(true);

    const params = new URLSearchParams();
    if (q) params.append("q", q);
    if (kategori) params.append("kategori", kategori);
    if (minHarga) params.append("min_harga", minHarga);
    if (maxHarga) params.append("max_harga", maxHarga);

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/paket?page=${page}&${params.toString()}`
    )
      .then((res) => res.json())
      .then((data) => {
        setPaket(data.data);
        setLastPage(data.last_page);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchPaket();
  }, [page, q, kategori]);

  if (loading) {
    return <p className="text-center mt-20">Loading paket...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">Tour Packages</h1>

      {/* FILTER */}
      <div className="bg-white p-4 rounded-xl shadow mb-8 flex flex-wrap gap-4">
        <select
          className="border p-2 rounded"
          value={kategori}
          onChange={(e) => setKategori(e.target.value)}
        >
          <option value="">Semua Jenis</option>
          <option value="One-Day">One-Day</option>
          <option value="Island Tour">Island Tour</option>
          <option value="Full Trip">Full Trip</option>
        </select>

        <input
          type="number"
          placeholder="Min Harga"
          className="border p-2 rounded"
          value={minHarga}
          onChange={(e) => setMinHarga(e.target.value)}
        />

        <input
          type="number"
          placeholder="Max Harga"
          className="border p-2 rounded"
          value={maxHarga}
          onChange={(e) => setMaxHarga(e.target.value)}
        />

        <button
          onClick={() => {
            setPage(1);
            fetchPaket();
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded font-semibold"
        >
          Apply Filter
        </button>
      </div>  
      {/* LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paket.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-xl shadow overflow-hidden flex flex-col"
          >
            <img
              src={p.image_url || "/placeholder.jpg"}
              alt={`Paket wisata ${p.nama} di Bali`}
              className="h-48 w-full object-cover"
            />

            <div className="p-4 flex flex-col flex-1">
              <h2 className="font-semibold text-lg">{p.nama}</h2>
              <p className="text-sm text-gray-500">{p.durasi}</p>

              <p className="text-blue-600 font-bold mt-2">
                Rp {p.harga.toLocaleString("id-ID")}
              </p>

              <Link
                href={`/paket/${p.id}`}
                className="mt-auto bg-yellow-400 py-2 rounded font-semibold text-center"
              >
                View Detail
              </Link>
            </div>
          </div>
        ))}
        </div>
        {/* ✅ PAGINATION FULL WIDTH */}
        <div className="w-full flex justify-center mt-12">
          <div className="flex items-center gap-6">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-4 py-2 rounded bg-gray-200 disabled:opacity-40"
            >
              Previous
            </button>

            <span className="font-semibold">
              Page {page} of {lastPage}
            </span>

            <button
              disabled={page === lastPage}
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 rounded bg-gray-200 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </div>
  );
}
