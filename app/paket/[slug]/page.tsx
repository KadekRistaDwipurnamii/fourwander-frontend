"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useCart } from "@/context/CartContext";

type PaketDetail = {
  id: number;
  nama: string;
  slug: string;
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
  const params = useParams();
  const slug = params?.slug as string;
  const [paket, setPaket] = useState<PaketDetail | null>(null);
  const { addToCart } = useCart();
  const [tanggal, setTanggal] = useState("");
  const [jumlahOrang, setJumlahOrang] = useState(1);

  useEffect(() => {
    if (!slug) return;
    
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/paket/slug/${slug}`)
      .then(res => res.json())
      .then(data => {
        setPaket({
          ...data.paket,
          harga_asli: data.harga_asli,
          diskon: data.diskon,
          harga_setelah_diskon: data.harga_setelah_diskon,
        });
      });
  }, [slug]);

  if (!paket) return <p className="text-center mt-20">Loading...</p>;

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

      <img
        src={paket.image_url || "/placeholder.jpg"}
        className="w-full h-[420px] object-cover rounded-3xl shadow"
      />

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{paket.nama}</h1>
          <p className="text-gray-500">{paket.durasi}</p>
        </div>
        <div className="text-right">
          <p className="text-blue-600 text-2xl font-bold">
            Rp {(paket.harga_setelah_diskon ?? paket.harga).toLocaleString("id-ID")}
          </p>
          <p className="text-sm text-gray-500">per orang</p>
        </div>
      </div>

      <p>{paket.deskripsi}</p>

      <h2 className="text-xl font-semibold">Itinerary</h2>
      <ul className="space-y-2">
        {paket.itinerary.map((i, idx) => (
          <li key={idx} className="p-3 border rounded">{i}</li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold">Fasilitas</h2>
      <div className="flex flex-wrap gap-2">
        {paket.fasilitas.map((f, i) => (
          <span key={i} className="bg-blue-100 px-3 py-1 rounded-full">
            {f}
          </span>
        ))}
      </div>

      <input type="date" onChange={e => setTanggal(e.target.value)} />
      <input type="number" min={1} value={jumlahOrang} onChange={e => setJumlahOrang(+e.target.value)} />

      <button onClick={handleAddCart} className="bg-blue-600 text-white py-3 rounded">
        + Masukkan Keranjang
      </button>
    </div>
  );
}
