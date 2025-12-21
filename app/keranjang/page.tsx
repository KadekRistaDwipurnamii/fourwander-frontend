"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useState } from "react";

export default function CartPage() {
  const { items, removeFromCart, updateItem } = useCart();

  // 🔒 hanya 1 paket boleh dipilih
  const [selected, setSelected] = useState<string | null>(null);

  const toggleSelect = (id: string) => {
    setSelected((prev) => (prev === id ? null : id));
  };

  const hitungTotal = (item: any) =>
    (item.harga ?? 0) * (item.jumlahOrang ?? 1);

  const totalDipilih = selected
    ? hitungTotal(items.find((i) => i.cartId === selected))
    : 0;

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold">Keranjang</h1>
        <p className="text-gray-500">Keranjang kosong</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Keranjang</h1>

      {items.map((item) => {
        const checked = selected === item.cartId;

        return (
          <div
            key={item.cartId}
            className={`border rounded-xl p-4 space-y-3 bg-white ${
              checked ? "ring-2 ring-blue-500" : ""
            }`}
          >
            {/* PILIH PAKET */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggleSelect(item.cartId)}
              />
              <b>{item.nama}</b>
            </label>

            {/* EDIT TANGGAL */}
            <div>
              <label className="text-sm text-gray-500">Tanggal</label>
              <input
                type="date"
                value={item.tanggal}
                onChange={(e) =>
                  updateItem(item.cartId, { tanggal: e.target.value })
                }
                className="border p-2 rounded w-full"
              />
            </div>

            {/* EDIT JUMLAH ORANG */}
            <div>
              <label className="text-sm text-gray-500">Jumlah Orang</label>
              <input
                type="number"
                min={1}
                value={item.jumlahOrang}
                onChange={(e) =>
                  updateItem(item.cartId, {
                    jumlahOrang: Number(e.target.value),
                  })
                }
                className="border p-2 rounded w-full"
              />
            </div>

            {/* TOTAL */}
            <p className="font-medium">
              Total: Rp {hitungTotal(item).toLocaleString("id-ID")}
            </p>

            {/* HAPUS */}
            <button
              onClick={() => {
                if (selected === item.cartId) setSelected(null);
                removeFromCart(item.cartId);
              }}
              className="text-red-500 text-sm"
            >
              Hapus
            </button>
          </div>
        );
      })}

      {/* FOOTER */}
      <div className="border-t pt-4 flex justify-between font-bold">
        <span>Total Dipilih</span>
        <span>Rp {totalDipilih.toLocaleString("id-ID")}</span>
      </div>

      <Link
        href={selected ? `/booknow?cart=${selected}` : "#"}
        className={`block text-center py-3 rounded-xl font-semibold ${
          !selected
            ? "bg-gray-300 text-gray-500 pointer-events-none"
            : "bg-blue-600 text-white"
        }`}
      >
        Booking Paket Terpilih
      </Link>
    </div>
  );
}
