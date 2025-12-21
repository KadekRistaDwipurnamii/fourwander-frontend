"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function PaymentPage() {
  const { id } = useParams();
  const router = useRouter();

  // STATE LAMA (TIDAK DIUBAH)
  const [method, setMethod] = useState<"BANK" | "EWALLET" | "">("");
  const [bank, setBank] = useState("");
  const [reference, setReference] = useState("");
  const [loading, setLoading] = useState(false);

  // STATE BARU (DITAMBAH)
  const [senderName, setSenderName] = useState("");
  const [senderAccount, setSenderAccount] = useState("");
  const [ewalletType, setEwalletType] = useState("");
  const [useQris, setUseQris] = useState(false);

  const submitPayment = async () => {
    if (!method) {
      alert("Pilih metode pembayaran");
      return;
    }

    if (method === "BANK" && (!bank || !reference)) {
      alert("Lengkapi bank & nomor rekening");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:8000/api/booking/${id}/payment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            // 🔒 LOGIKA LAMA TETAP
            payment_method:
              method === "BANK"
                ? `BANK_${bank}`
                : "EWALLET_QRIS",
            payment_reference: reference || "QRIS",

            // ➕ DATA TAMBAHAN (BACKEND BOLEH PAKAI / BOLEH ABAIKAN)
            sender_name: senderName,
            sender_account: senderAccount,
            ewallet_type: ewalletType,
          }),
        }
      );

      if (!res.ok) throw new Error("Payment failed");

      const data = await res.json();

      router.push(
        `/payment/success?booking=${id}&pdf=${encodeURIComponent(data.pdf_url)}`
      );


    } catch (err) {
      alert("❌ Gagal terhubung ke server backend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#EFF6FF] flex justify-center py-20">
      <div className="bg-white p-8 rounded-2xl w-full max-w-md space-y-6 shadow">

        <h1 className="text-2xl font-bold text-[#1E40AF] text-center">
          Payment Booking
        </h1>

        {/* METODE */}
        <div className="space-y-3">
          <label className="font-semibold block">Metode Pembayaran</label>

          <label className="flex gap-2">
            <input
              type="radio"
              checked={method === "BANK"}
              onChange={() => setMethod("BANK")}
            />
            Transfer Bank
          </label>

          <label className="flex gap-2">
            <input
              type="radio"
              checked={method === "EWALLET"}
              onChange={() => setMethod("EWALLET")}
            />
            E-Wallet
          </label>
        </div>

        {/* BANK */}
        {method === "BANK" && (
          <div className="space-y-3 bg-blue-50 p-4 rounded-xl">
            <select
              className="w-full border p-3 rounded-xl"
              value={bank}
              onChange={(e) => setBank(e.target.value)}
            >
              <option value="">Pilih Bank</option>
              <option value="BCA">BCA</option>
              <option value="BRI">BRI</option>
              <option value="MANDIRI">Mandiri</option>
            </select>

            {/* INFO REKENING FOURWANDER */}
            {bank && (
              <div className="bg-white p-3 rounded-xl border text-sm">
                <p className="font-semibold">{bank} - Fourwander</p>
                <p>1234567890</p>
                <p>a.n Fourwander Travel</p>
              </div>
            )}

            {/* DATA USER */}
            <input
              placeholder="Nama rekening pengirim"
              className="w-full border p-3 rounded-xl"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
            />

            <input
              placeholder="Nomor rekening pengirim"
              className="w-full border p-3 rounded-xl"
              value={reference}
              onChange={(e) => {
                setReference(e.target.value);
                setSenderAccount(e.target.value);
              }}
            />
          </div>
        )}

        {/* E-WALLET */}
        {method === "EWALLET" && (
          <div className="space-y-4 bg-yellow-50 p-4 rounded-xl">
            <select
              className="w-full border p-3 rounded-xl"
              value={ewalletType}
              onChange={(e) => setEwalletType(e.target.value)}
            >
              <option value="">Pilih E-Wallet</option>
              <option value="OVO">OVO</option>
              <option value="GOPAY">GoPay</option>
              <option value="DANA">DANA</option>
            </select>

            {/* INFO TUJUAN */}
            {ewalletType && (
              <div className="bg-white p-3 rounded-xl border text-sm">
                <p className="font-semibold">{ewalletType} - Fourwander</p>
                <p>08xxxxxxxxxx</p>
                <p>a.n Fourwander Travel</p>
              </div>
            )}

            {/* OPSI QRIS */}
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={useQris}
                onChange={() => setUseQris(!useQris)}
              />
              Bayar menggunakan QRIS
            </label>

            {useQris && (
              <div className="text-center">
                <Image src="/qr.png" alt="QRIS" width={200} height={200} />
              </div>
            )}

            {!useQris && (
              <>
                <input
                  placeholder="Nama akun pengirim"
                  className="w-full border p-3 rounded-xl"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                />

                <input
                  placeholder="Nomor akun / HP pengirim"
                  className="w-full border p-3 rounded-xl"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                />
              </>
            )}
          </div>
        )}

        <button
          onClick={submitPayment}
          disabled={loading}
          className="w-full bg-[#1E40AF] text-white py-3 rounded-xl font-semibold disabled:opacity-50"
        >
          {loading ? "Memproses..." : "Konfirmasi Pembayaran"}
        </button>
      </div>
    </div>
  );
}
