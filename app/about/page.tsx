"use client";

import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="bg-white">

      {/* HERO */}
      <section className="bg-gradient-to-b from-[#EFF6FF] to-white py-24">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1E40AF]">
            About FourWanders
          </h1>
          <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
            Crafting meaningful travel experiences in Bali with local insight,
            personal service, and unforgettable journeys.
          </p>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
          
          {/* TEXT */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Who We Are
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              <strong>FourWanders Travel Bali</strong> is a locally-based travel
              company dedicated to showcasing the true beauty of Bali beyond
              typical tourist destinations.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We believe travel should feel personal. That’s why every journey
              we offer is thoughtfully designed to match your travel style,
              pace, and expectations — whether you seek adventure, culture, or
              relaxation.
            </p>
          </div>

          {/* IMAGE */}
          <div className="relative h-80 rounded-3xl overflow-hidden shadow-lg">
            <Image
              src="/about-bali.jpg"
              alt="About FourWanders Bali"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-20 bg-[#EFF6FF]">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10">
          
          <div className="bg-white p-8 rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold text-[#1E40AF] mb-3">
              Our Mission
            </h3>
            <p className="text-gray-600 leading-relaxed">
              To deliver authentic and high-quality travel experiences that
              connect travelers with Bali’s culture, nature, and people — while
              maintaining comfort, safety, and trust.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold text-[#1E40AF] mb-3">
              Our Vision
            </h3>
            <p className="text-gray-600 leading-relaxed">
              To become a trusted travel partner for those seeking meaningful,
              responsible, and memorable journeys across Bali and Indonesia.
            </p>
          </div>

        </div>
      </section>

      {/* WHY FOURWANDERS (RINGKAS) */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-12">
            Why Travel With Us
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            
            <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-tr from-blue-500 to-sky-400 flex items-center justify-center text-white text-2xl">
                📍
              </div>
              <h4 className="font-semibold mb-2">Local Experts</h4>
              <p className="text-sm text-gray-600">
                Experienced local guides who truly understand Bali.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-tr from-orange-400 to-yellow-400 flex items-center justify-center text-white text-2xl">
                🤝
              </div>
              <h4 className="font-semibold mb-2">Personal Service</h4>
              <p className="text-sm text-gray-600">
                Friendly, flexible, and tailored to your needs.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-tr from-blue-700 to-blue-500 flex items-center justify-center text-white text-2xl">
                ⭐
              </div>
              <h4 className="font-semibold mb-2">Trusted Experience</h4>
              <p className="text-sm text-gray-600">
                Carefully curated trips with comfort and safety in mind.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#1E40AF] to-[#38BDF8] text-white">
        <div className="text-center px-6">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Explore Bali With Us?
          </h2>
          <p className="mb-8 text-white/90">
            Discover unforgettable journeys crafted just for you.
          </p>
          <Link
            href="/paket"
            className="inline-block bg-[#F59E0B] hover:bg-[#d48806] text-white px-10 py-4 rounded-2xl font-semibold transition"
          >
            Explore Tour Packages
          </Link>
        </div>
      </section>

    </main>
  );
}
