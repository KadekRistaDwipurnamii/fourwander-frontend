"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();

  const [destination, setDestination] = useState("");
  const [kategori, setKategori] = useState("");
  const [date, setDate] = useState("");
  const [traveler, setTraveler] = useState(2);

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (destination) params.append("q", destination);
    if (kategori) params.append("kategori", kategori);
    if (traveler) params.append("traveler", traveler.toString());

    router.push(`/paket?${params.toString()}`);
  };

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6">

      {/* TAB */}
      <div className="flex gap-6 mb-5 text-sm font-semibold">
        <button className="border-b-2 border-blue-600 pb-2 text-blue-600">
          Tour Packages
        </button>
        <button className="text-gray-400 hover:text-blue-600">
          Attractions
        </button>
      </div>

      {/* INPUT */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <input
          type="text"
          placeholder="Where do you want to go?"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={kategori}
          onChange={(e) => setKategori(e.target.value)}
          className="border rounded-lg p-3"
        >
          <option value="">Select Activity Type</option>
          <option value="One-Day">One-Day</option>
          <option value="Island Tour">Island Tour</option>
          <option value="Full Trip">Full Trip</option>
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border rounded-lg p-3"
        />

        {/* TRAVELER COUNTER */}
        <div className="border rounded-lg p-3 flex justify-between items-center">
          <button
            onClick={() => setTraveler((t) => Math.max(1, t - 1))}
            className="font-bold text-lg"
          >
            −
          </button>
          <span className="font-semibold">{traveler} pax</span>
          <button
            onClick={() => setTraveler((t) => t + 1)}
            className="font-bold text-lg"
          >
            +
          </button>
        </div>

        <button className="bg-blue-600 text-white rounded-lg font-semibold">
          {traveler} Travelers
        </button>
      </div>

      {/* BUTTON */}
      <button
        onClick={handleSearch}
        className="mt-6 bg-blue-600 hover:bg-blue-700 transition text-white w-full py-3 rounded-lg font-semibold text-lg"
      >
        Search Tours
      </button>
    </div>
  );
}
