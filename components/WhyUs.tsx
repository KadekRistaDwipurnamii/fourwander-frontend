export default function WhyUs() {
  return (
    <section className="py-20 bg-white">
      {/* TITLE */}
      <div className="text-center mb-14 px-4">
        <h2 className="text-3xl font-bold text-[#1E40AF]">
          Why Choose <span className="text-[#38BDF8]">FourWanders</span>?
        </h2>
        <p className="text-gray-600 mt-3 max-w-xl mx-auto">
          We craft meaningful travel experiences with local insight and personal touch.
        </p>
      </div>

      {/* CARDS */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        {/* CARD 1 */}
        <div className="bg-[#EFF6FF] rounded-2xl p-8 text-center hover:shadow-xl transition">
          <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-[#38BDF8] flex items-center justify-center text-white text-3xl">
            📍
          </div>
          <h3 className="font-semibold text-lg mb-2 text-[#1E40AF]">
            Local Expertise
          </h3>
          <p className="text-gray-600 text-sm">
            Our team consists of passionate locals who know Bali beyond tourist spots.
          </p>
        </div>

        {/* CARD 2 */}
        <div className="bg-[#EFF6FF] rounded-2xl p-8 text-center hover:shadow-xl transition">
          <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-[#F59E0B] flex items-center justify-center text-white text-3xl">
            📦
          </div>
          <h3 className="font-semibold text-lg mb-2 text-[#1E40AF]">
            Customizable Packages
          </h3>
          <p className="text-gray-600 text-sm">
            Flexible itineraries tailored to your travel style and schedule.
          </p>
        </div>

        {/* CARD 3 */}
        <div className="bg-[#EFF6FF] rounded-2xl p-8 text-center hover:shadow-xl transition">
          <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-[#1E40AF] flex items-center justify-center text-white text-3xl">
            🎧
          </div>
          <h3 className="font-semibold text-lg mb-2 text-[#1E40AF]">
            24/7 Support
          </h3>
          <p className="text-gray-600 text-sm">
            Travel worry-free with round-the-clock assistance.
          </p>
        </div>
      </div>
    </section>
  );
}
