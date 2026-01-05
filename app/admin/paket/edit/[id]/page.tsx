"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditPaketPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");
  const [durasi, setDurasi] = useState("");
  const [kategori, setKategori] = useState("");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/paket/${id}`)
      .then(res => res.json())
      .then(data => {
        const p = data.paket;
        setNama(p.nama);
        setHarga(p.harga);
        setDurasi(p.durasi);
        setKategori(p.kategori);
        setLoading(false);
      });
  }, [id]);

  const submit = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/paket/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nama,
        harga,
        durasi,
        kategori,
      }),
    });

    router.push("/admin/paket");
    router.refresh();
  };

  if (loading) {
    return <p>Loading data paket...</p>;
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Edit Paket Wisata</h1>

      {/* INFO PAKET */}
      <div className="bg-gray-50 border rounded p-4 mb-6">
        <h2 className="font-semibold mb-2">Informasi Paket</h2>
        <p><b>Nama:</b> {nama}</p>
        <p><b>Harga:</b> Rp {Number(harga).toLocaleString("id-ID")}</p>
        <p><b>Durasi:</b> {durasi}</p>
        <p><b>Kategori:</b> {kategori}</p>
      </div>

      {/* FORM EDIT */}
      <div className="bg-white border rounded p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium">Nama Paket</label>
          <input
            className="border p-2 w-full rounded"
            value={nama}
            onChange={e => setNama(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Harga</label>
          <input
            type="number"
            className="border p-2 w-full rounded"
            value={harga}
            onChange={e => setHarga(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Durasi</label>
          <input
            className="border p-2 w-full rounded"
            value={durasi}
            onChange={e => setDurasi(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Kategori</label>
          <input
            className="border p-2 w-full rounded"
            value={kategori}
            onChange={e => setKategori(e.target.value)}
          />
        </div>

        <div className="pt-4 flex gap-3">
          <button
            onClick={submit}
            className="bg-blue-600 text-white px-5 py-2 rounded"
          >
            Update Paket
          </button>

          <button
            onClick={() => router.back()}
            className="bg-gray-200 px-5 py-2 rounded"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
}
