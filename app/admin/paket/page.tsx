"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminPaketPage() {
  const [paket, setPaket] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/paket?per_page=1000`)
      .then(res => res.json())
      .then(data => setPaket(data.data));
  }, []);

  return (
    <>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Manajemen Paket</h1>
        <Link
          href="/admin/paket/form"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          + Tambah Paket
        </Link>
      </div>

      <div className="grid gap-4">
        {paket.map(p => (
          <div key={p.id} className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold">{p.nama}</h2>
            <p>Rp {p.harga.toLocaleString("id-ID")}</p>

            <div className="flex gap-2 mt-2">
              <Link
                href={`/admin/paket/form?id=${p.id}`}
                className="text-blue-600"
              >
                Edit
              </Link>

              <button
                className="text-red-600"
                onClick={() => hapusPaket(p.id, setPaket)}
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function hapusPaket(id: number, setPaket: any) {
  if (!confirm("Yakin hapus paket?")) return;

  fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/paket/${id}`, {
    method: "DELETE",
  }).then(() => {
    setPaket((prev: any[]) => prev.filter(p => p.id !== id));
  });
}
