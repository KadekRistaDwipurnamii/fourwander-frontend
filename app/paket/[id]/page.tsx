"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useCart } from "@/context/CartContext";

type PaketDetail = {
  id: number;
  nama: string;
  durasi: string;
  harga: number;
  harga_asli?: number;
  diskon?: number;
  harga_setelah_diskon?: number;
  deskripsi: string;
  image_url: string | null;
  gallery: string[];
  fasilitas: string[];
  itinerary: string[];
};

export default function PaketDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();

  const [paket, setPaket] = useState<PaketDetail | null>(null);
  const [tanggal, setTanggal] = useState("");
  const [jumlahOrang, setJumlahOrang] = useState(1);

  useEffect(() => {
    if (!id) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/paket/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPaket({
          ...data.paket,
          harga_asli: data.harga_asli,
          diskon: data.diskon,
          harga_setelah_diskon: data.harga_setelah_diskon,
        });
      });
  }, [id]);

  if (!paket) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  const handleAddCart = () => {
    if (!tanggal || jumlahOrang < 1) {
      alert("Isi tanggal & jumlah orang dulu");
      return;
    }

    addToCart({
      cartId: crypto.randomUUID(),
      paketId: paket.id,
      nama: paket.nama,
      harga: paket.harga,
      tanggal,
      jumlahOrang,
    });

    alert("✅ Masuk keranjang");
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">
      {/* HERO IMAGE */}
      <img
        src={paket.image_url || "/placeholder.jpg"}
        className="w-full h-[420px] object-cover rounded-3xl shadow"
        alt={paket.nama}
      />

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">{paket.nama}</h1>
          <p className="text-gray-500">{paket.durasi}</p>
        </div>

        <div className="text-right">
          {paket.diskon && paket.diskon > 0 ? (
            <>
              <p className="text-gray-400 line-through text-sm">
                Rp {paket.harga_asli?.toLocaleString("id-ID")}
              </p>

              <p className="text-green-600 text-sm font-semibold">
                Diskon - Rp {paket.diskon.toLocaleString("id-ID")}
              </p>

              <p className="text-blue-600 text-2xl font-bold">
                Rp {paket.harga_setelah_diskon?.toLocaleString("id-ID")}
              </p>
            </>
          ) : (
            <p className="text-blue-600 text-2xl font-bold">
              Rp {paket.harga.toLocaleString("id-ID")}
            </p>
          )}

          <p className="text-sm text-gray-500">per orang</p>
        </div>
      </div>

      {/* DESKRIPSI */}
      <p className="text-gray-700 leading-relaxed">{paket.deskripsi}</p>

      {/* GALERI */}
      {paket.gallery.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-3">Galeri</h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {paket.gallery.map((img, i) => (
              <img
                key={i}
                src={img}
                className="h-32 w-52 object-cover rounded-xl shadow shrink-0"
                alt={`gallery-${i}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* ITINERARY */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Itinerary</h2>
        <ul className="space-y-2">
          {paket.itinerary.map((item, i) => (
            <li
              key={i}
              className="bg-white rounded-lg p-3 shadow-sm border"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* FASILITAS */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Fasilitas</h2>
        <div className="flex flex-wrap gap-3">
          {paket.fasilitas.map((f, i) => (
            <span
              key={i}
              className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-medium"
            >
              {f}
            </span>
          ))}
        </div>
      </div>

      {/* INPUT BOOKING */}
      <div className="bg-blue-50 p-4 rounded-xl space-y-3">
        <input
          type="date"
          className="w-full border p-2 rounded"
          value={tanggal}
          onChange={(e) => setTanggal(e.target.value)}
        />

        <input
          type="number"
          min={1}
          className="w-full border p-2 rounded"
          value={jumlahOrang}
          onChange={(e) => setJumlahOrang(Number(e.target.value))}
        />

        <button
          onClick={handleAddCart}
          className="w-full bg-gray-200 py-2 rounded-xl"
        >
          + Masukkan Keranjang
        </button>
      </div>

      {/* CTA */}
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl text-lg font-semibold shadow-lg">
        Book Now
      </button>
    </div>
  );
}
