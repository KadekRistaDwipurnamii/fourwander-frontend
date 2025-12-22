"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";

export default function PaketFormPage() {
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id");

  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");

  useEffect(() => {
    if (id) {
      fetch(`http://127.0.0.1:8000/api/paket/${id}`)
        .then(res => res.json())
        .then(data => {
          setNama(data.nama);
          setHarga(data.harga);
        });
    }
  }, [id]);

  const submit = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/paket${id ? "/" + id : ""}`, {
      method: id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nama, harga }),
    });

    router.push("/admin/paket");
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">
        {id ? "Edit Paket" : "Tambah Paket"}
      </h1>

      <div className="bg-white p-6 rounded shadow space-y-4">
        <input
          className="border p-2 w-full"
          placeholder="Nama Paket"
          value={nama}
          onChange={e => setNama(e.target.value)}
        />
        <input
          type="number"
          className="border p-2 w-full"
          placeholder="Harga"
          value={harga}
          onChange={e => setHarga(e.target.value)}
        />
        <button
          onClick={submit}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Simpan
        </button>
      </div>
    </AdminLayout>
  );
}
