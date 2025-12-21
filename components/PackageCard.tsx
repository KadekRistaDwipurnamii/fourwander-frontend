type Paket = {
  nama?: string;
  harga?: number;
  durasi?: string;
  image_url?: string | null;
};

export default function PackageCard({ paket }: { paket: Paket }) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <img
        src={paket?.image_url || "/images/placeholder.jpg"}
        alt={paket?.nama || "Paket Wisata"}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h3 className="font-semibold text-lg">{paket?.nama}</h3>
        <p className="text-sm text-gray-500">{paket?.durasi}</p>

        <p className="text-blue-600 font-bold mt-2">
          Rp {paket?.harga?.toLocaleString("id-ID")}
        </p>
      </div>
    </div>
  );
}
