"use client";

import { useRef } from "react";

const reviews = [
  {
    name: "Sarah L.",
    country: "USA, October 2023",
    text: "FourWanders made our Bali trip unforgettable!",
    img: "ubudreview.jpg",
    rating: 5,
  },
  {
    name: "David P.",
    country: "Australia, Nov 2023",
    text: "Nusa Penida tour was breathtaking!",
    img: "Nuspenreview.jpg",
    rating: 5,
  },
  {
    name: "Maria K.",
    country: "Germany, Sept 2023",
    text: "Booking was super easy. Awesome trek!",
    img: "uluwatureview.jpg",
    rating: 5,
  },
  {
    name: "Ayu Puspa",
    country: "Indonesia",
    text:
      "About trip with Bali agung tours company and guide PUJA. It was super easy and memorable.",
    img: "bedugulriview.jpg",
    rating: 5,
  },
  {
    name: "Srikanth P",
    country: "India",
    text:
      "Our Bali family tour was wonderful, fresh air, calm atmosphere and amazing guide.",
    img: "kintamaniriview.jpg",
    rating: 5,
  },
  {
    name: "Ariatna R",
    country: "Indonesia",
    text:
      "Great yoga experience. The place is excellent and instructor highly recommended.",
    img: "lovinareview.jpg",
    rating: 4,
  },
];

export default function Testimonials() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-20 bg-[#EFF6FF] border-y border-blue-100">
      {/* TITLE */}
      <div className="text-center mb-12 px-4">
        <h2 className="text-3xl font-bold text-[#1E40AF]">
          What Our Travelers Say
        </h2>
        <p className="text-gray-600 mt-3 max-w-xl mx-auto">
          Real stories and moments from travelers who explored Bali with
          FourWanders.
        </p>
      </div>

      {/* CONTROLS */}
      <div className="max-w-6xl mx-auto px-6 flex justify-end gap-2 mb-4">
        <button
          onClick={() => scroll("left")}
          className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center
                     hover:bg-[#38BDF8] hover:text-white transition"
        >
          ‹
        </button>
        <button
          onClick={() => scroll("right")}
          className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center
                     hover:bg-[#38BDF8] hover:text-white transition"
        >
          ›
        </button>
      </div>

      {/* SLIDER */}
      <div
        ref={sliderRef}
        className="max-w-6xl mx-auto px-6 flex gap-6 overflow-x-auto scroll-smooth pb-6"
      >
        {reviews.map((r, i) => (
          <div
            key={i}
            className="min-w-[300px] bg-white rounded-2xl shadow hover:shadow-xl transition"
          >
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}/images/review/${r.img}`}
              alt={r.name}
              className="h-44 w-full object-cover rounded-t-2xl"
            />

            <div className="p-5">
              {/* RATING */}
              <div className="flex mb-2">
                {Array.from({ length: r.rating }).map((_, idx) => (
                  <span key={idx} className="text-[#F59E0B] text-lg">
                    ★
                  </span>
                ))}
              </div>

              <p className="italic text-gray-600 text-sm mb-3 line-clamp-3">
                “{r.text}”
              </p>

              <p className="font-semibold text-[#1E40AF]">{r.name}</p>
              <p className="text-xs text-gray-500">{r.country}</p>
            </div>
          </div>
        ))}
      </div>

      {/* FOOT NOTE */}
      <p className="text-center text-sm text-gray-500 mt-8">
        Tripadvisor rating score: <b>4.9</b> of 5, based on <b>960 reviews</b>
      </p>
    </section>
  );
}
