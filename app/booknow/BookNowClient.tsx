"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

type Paket = {
  id: number;
  nama: string;
  harga: number;
  diskon?: number;
  fasilitas?: string[];
  itinerary?: string[];
};

export default function BookNowClient() {
  const params = useSearchParams();
  const router = useRouter();
  const { items } = useCart();
  const { user } = useAuth();

  /* ================= AUTH GUARD ================= */
  useEffect(() => {
    if (!user) {
      alert("Silakan login terlebih dahulu untuk melakukan booking.");
      router.push("/login");
    }
  }, [user, router]);

  /* ================= CART ================= */
  const cartIds = params.get("cart")?.split(",") ?? [];
  const selected = items.find((i) => cartIds.includes(i.cartId));

  /* ================= STATE ================= */
  const [paketList, setPaketList] = useState<Paket[]>([]);
  const [paketId, setPaketId] = useState<number | "">("");
  const [detailPaket, setDetailPaket] = useState<Paket | null>(null);

  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [hp, setHp] = useState("");
  const [jumlahOrang, setJumlahOrang] = useState(1);
  const [tanggal, setTanggal] = useState("");
  const [catatan, setCatatan] = useState("");
  const [setuju, setSetuju] = useState(false);
  const [extra, setExtra] = useState<string[]>([]);

  /* ================= EXTRA ================= */
  const extraHarga: Record<string, number> = {
    makan: 200000,
    pickup: 300000,
    foto: 250000,
  };

  /* ================= PREFILL USER ================= */
  useEffect(() => {
    if (user) {
      setNama(user.name);
      setEmail(user.email);
    }
  }, [user]);

  /* ================= PREFILL CART ================= */
  useEffect(() => {
    if (selected) {
      setPaketId(selected.paketId);
      setTanggal(selected.tanggal);
      setJumlahOrang(selected.jumlahOrang);
    }
  }, [selected]);

  /* ================= FETCH LIST PAKET ================= */
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/paket?per_page=1000`)
      .then((res) => res.json())
      .then((data) => setPaketList(data.data ?? data));
  }, []);

  /* ================= FETCH DETAIL PAKET ================= */
  useEffect(() => {
    if (!paketId) {
      setDetailPaket(null);
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/paket/${paketId}`)
      .then((res) => res.json())
      .then((data) => setDetailPaket(data.paket));
  }, [paketId]);

  const paketTerpilih = paketList.find((p) => p.id === paketId);

  /* ================= HITUNG HARGA ================= */
  const hargaPaket = detailPaket?.harga ?? paketTerpilih?.harga ?? 0;
  const diskon = detailPaket?.diskon ?? paketTerpilih?.diskon ?? 0;

  const totalExtra = extra.reduce((sum, e) => sum + extraHarga[e], 0);
  const subtotal = hargaPaket * jumlahOrang + totalExtra;
  const totalAkhir = Math.max(0, subtotal - diskon);

  /* ================= EXTRA TOGGLE ================= */
  const toggleExtra = (item: string) => {
    setExtra((prev) =>
      prev.includes(item)
        ? prev.filter((x) => x !== item)
        : [...prev, item]
    );
  };

  /* ================= SUBMIT ================= */
  const submitBooking = async () => {
    if (!setuju) {
      alert("Harap setujui syarat & ketentuan");
      return;
    }

    if (!paketId || !tanggal || !nama || !hp) {
      alert("Data belum lengkap");
      return;
    }

    const payload = {
      user_id: user?.id,
      nama,
      email,
      hp,
      jumlah_orang: jumlahOrang,
      tanggal,
      paket_id: paketId,
      extra,
      catatan,
      total_harga: subtotal,
    };

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/booking`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert("Booking gagal");
        return;
      }

      router.push(`/payment/${data.booking_id}`);
    } catch {
      alert("❌ Booking gagal, coba lagi");
    }
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-[#EFF6FF] py-16 px-4 flex justify-center">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl p-8 space-y-8">

        <h1 className="text-3xl font-bold text-center text-[#1E40AF]">
          Booking Trip
        </h1>

        {/* DATA PERSONAL */}
        <section className="space-y-3">
          <h2 className="font-semibold text-lg">Data Personal</h2>
          <input className="input" value={nama} onChange={e => setNama(e.target.value)} placeholder="Nama lengkap" />
          <input className="input" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
          <input className="input" value={hp} onChange={e => setHp(e.target.value)} placeholder="Nomor HP / WhatsApp" />
        </section>

        {/* DETAIL */}
        <section className="space-y-3">
          <h2 className="font-semibold text-lg">Detail Perjalanan</h2>
          <input type="number" min={1} className="input" value={jumlahOrang} onChange={e => setJumlahOrang(Number(e.target.value))} />
          <input type="date" className="input" value={tanggal} onChange={e => setTanggal(e.target.value)} />

          <select className="input" value={paketId} onChange={e => setPaketId(Number(e.target.value))}>
            <option value="">Pilih Paket</option>
            {paketList.map(p => (
              <option key={p.id} value={p.id}>
                {p.nama} — Rp {p.harga.toLocaleString("id-ID")}
              </option>
            ))}
          </select>
        </section>

        {/* DETAIL PAKET */}
        {detailPaket && (
          <section className="space-y-4">
            <div className="bg-slate-50 border rounded-xl p-4">
              <h3 className="font-semibold mb-2">Fasilitas yang Didapat</h3>
              <ul className="list-disc pl-5 space-y-1">
                {detailPaket.fasilitas?.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-50 border rounded-xl p-4">
              <h3 className="font-semibold mb-2">Itinerary Perjalanan</h3>
              <ol className="list-decimal pl-5 space-y-1">
                {detailPaket.itinerary?.map((it, i) => (
                  <li key={i}>{it}</li>
                ))}
              </ol>
            </div>
          </section>
        )}

        {/* EXTRA */}
        <section className="space-y-2">
          <h2 className="font-semibold text-lg">Tambahan Paket</h2>
          {Object.entries(extraHarga).map(([key, harga]) => (
            <label key={key} className="flex gap-2 items-center">
              <input type="checkbox" checked={extra.includes(key)} onChange={() => toggleExtra(key)} />
              {key} (+Rp {harga.toLocaleString("id-ID")})
            </label>
          ))}
        </section>

        {/* RINGKASAN */}
        <div className="bg-[#EFF6FF] p-4 rounded-xl space-y-1">
          <p>Paket: <b>{detailPaket?.nama ?? "-"}</b></p>
          <p>Subtotal: Rp {subtotal.toLocaleString("id-ID")}</p>

          {diskon > 0 && (
            <p className="text-green-600">
              Diskon: - Rp {diskon.toLocaleString("id-ID")}
            </p>
          )}

          <p className="font-bold text-lg text-[#F59E0B]">
            Total Bayar: Rp {totalAkhir.toLocaleString("id-ID")}
          </p>
        </div>

        <label className="flex gap-2 items-center">
          <input type="checkbox" checked={setuju} onChange={() => setSetuju(!setuju)} />
          Saya menyetujui syarat & ketentuan
        </label>

        <button
          onClick={submitBooking}
          disabled={!setuju}
          className="w-full bg-[#1E40AF] text-white py-3 rounded-xl font-semibold hover:bg-blue-800 transition disabled:opacity-50"
        >
          Konfirmasi Pembayaran
        </button>

      </div>

      <style jsx>{`
        .input {
          width: 100%;
          border: 1px solid #d1d5db;
          padding: 12px;
          border-radius: 12px;
        }
      `}</style>
    </div>
  );
}
