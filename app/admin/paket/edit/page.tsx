"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";

export default function EditPaketPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/paket/${id}`)
      .then(res => res.json())
      .then(data => {
        setNama(data.paket.nama);
        setHarga(data.paket.harga);
      });
  }, [id]);

  const submit = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/paket/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nama, harga }),
    });

    router.push("/admin/paket");
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Edit Paket</h1>

      <input value={nama} onChange={e => setNama(e.target.value)} />
      <input value={harga} onChange={e => setHarga(e.target.value)} />

      <button onClick={submit}>Update</button>
    </AdminLayout>
  );
}
