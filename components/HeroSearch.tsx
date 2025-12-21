import SearchBar from "./SearchBar";

export default function HeroSearch() {
  return (
    <section
      className="relative h-[520px] bg-cover bg-center"
      style={{ backgroundImage: "url('/Bg.jpg')" }}
    >
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/50" />

      {/* CONTENT */}
      <div className="relative z-10 h-full flex flex-col justify-center">
        <div className="max-w-6xl mx-auto px-6 text-white">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Explore Bali <br />
            with FourWanders
          </h1>
          <p className="mt-4 text-lg text-gray-200 max-w-xl">
            Discover unforgettable tour packages, cultural journeys,
            and breathtaking destinations in Bali.
          </p>
        </div>

        {/* SEARCH BAR */}
        <div className="max-w-6xl mx-auto px-6 mt-12 w-full">
          <SearchBar />
        </div>
      </div>
    </section>
  );
}
