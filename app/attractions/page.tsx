import Link from "next/link";

const attractions = [
  { name: "Ubud", desc: "Culture, rice terraces, art villages", image: "/ubud.jpg" },
  { name: "Kintamani", desc: "Volcano views & cool mountain air", image: "/batur.jpg" },
  { name: "Bedugul", desc: "Lakes & temples in the highlands", image: "/ulun_danu.jpg" },
  { name: "Uluwatu", desc: "Cliffs, sunset & Kecak dance", image: "/uluwatu.jpg" },
  { name: "Nusa Penida", desc: "Dramatic cliffs & blue ocean", image: "/Nuspen.jpg" },
  { name: "Tanah Lot", desc: "Iconic sea temple at sunset", image: "/tanahlot.jpg" },
];

export default function AttractionsPage() {
  return (
    <main className="bg-gradient-to-b from-white to-[#EFF6FF]">

      {/* HERO */}
      <section className="py-24 text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1E40AF]">
          Bali Attractions
        </h1>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
          Discover Bali’s most iconic destinations and hidden gems.
        </p>
      </section>

      {/* GRID */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {attractions.map((a, i) => (
            <div
              key={i}
              className="
                group bg-white rounded-3xl overflow-hidden
                shadow-md hover:shadow-2xl
                transition-all duration-500
                hover:-translate-y-3
              "
            >
              <img
                src={a.image}
                alt={a.name}
                className="h-56 w-full object-cover group-hover:scale-110 transition-transform duration-700"
              />

              <div className="p-6">
                <h3 className="text-lg font-semibold">{a.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{a.desc}</p>

                <Link
                  href={`/paket`}
                  className="inline-block mt-4 text-[#1E40AF] font-semibold hover:underline"
                >
                  View Tour Packages →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
