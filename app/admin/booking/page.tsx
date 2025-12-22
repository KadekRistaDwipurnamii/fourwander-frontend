"use client";

import { useEffect, useState } from "react";

export default function AdminBookingPage() {
  const [booking, setBooking] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/bookings`)
      .then(res => res.json())
      .then(data => setBooking(data.data ?? data));
  }, []);

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">
        Manajemen Booking
      </h1>

      <div className="space-y-4">
        {booking.map(b => (
          <div
            key={b.id}
            className="bg-white p-4 rounded shadow"
          >
            <p className="font-semibold">{b.nama}</p>
            <p>Paket: {b.paket?.nama}</p>
            <p>Status: {b.status}</p>
            <p>
              Total: Rp{" "}
              {Number(b.total_harga).toLocaleString("id-ID")}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
