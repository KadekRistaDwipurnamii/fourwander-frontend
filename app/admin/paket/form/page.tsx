export default function PaketFormPage() {
  return (
    <div className="max-w-xl bg-white p-6 rounded shadow">
      <h1 className="text-xl font-bold mb-4">Tambah Paket</h1>

      <input className="border p-2 w-full mb-3" placeholder="Nama Paket" />
      <input className="border p-2 w-full mb-3" placeholder="Harga" />
      <input className="border p-2 w-full mb-3" placeholder="Durasi" />

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Simpan
      </button>
    </div>
  );
  
}
