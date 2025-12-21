"use client";

import { useEffect, useState } from "react";

type DashboardData = {
  total_booking: number;
  pendapatan: number;
  paket_aktif: number;
  user_baru: number;
};

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/admin/dashboard")
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading dashboard...</p>;
  if (!data) return <p>Gagal load data</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card title="Total Booking" value={data.total_booking} />
        <Card
          title="Pendapatan"
          value={`Rp ${data.pendapatan.toLocaleString("id-ID")}`}
        />
        <Card title="Paket Aktif" value={data.paket_aktif} />
        <Card title="User Baru" value={data.user_baru} />
      </div>
    </div>
  );
}

function Card({ title, value }: { title: string; value: any }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <p className="text-gray-500">{title}</p>
      <h2 className="text-xl font-bold mt-2">{value}</h2>
    </div>
  );
}
