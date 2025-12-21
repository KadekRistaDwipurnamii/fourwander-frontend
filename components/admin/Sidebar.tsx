import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow">
      <h2 className="text-xl font-bold p-4">Admin Panel</h2>
      <nav className="flex flex-col gap-2 p-4">
        <Link href="/admin/dashboard">Dashboard</Link>
        <Link href="/admin/paket">Paket</Link>
        <Link href="/admin/booking">Booking</Link>
      </nav>
    </aside>
  );
}
