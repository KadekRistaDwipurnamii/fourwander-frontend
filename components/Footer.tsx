import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-10">
      {/* ================= CTA ================= */}
      <div className="bg-blue-600 text-white py-14 text-center px-4">
        <h2 className="text-2xl font-bold mb-2">
          Ready for Your Bali Adventure?
        </h2>
        <p className="text-gray-200 mb-6">
          Sign up for our newsletter to get exclusive deals and travel tips!
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email address"
            className="px-4 py-2 rounded-md text-black w-full"
          />
          <button className="bg-orange-500 px-6 py-2 rounded-md text-white font-semibold">
            Subscribe
          </button>
        </div>
      </div>

      {/* ================= MAIN FOOTER ================= */}
      <div className="bg-gray-900 text-white py-12">
        <div
          className="
            max-w-7xl mx-auto px-6
            grid grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-10
          "
        >
          {/* BRAND */}
          <div>
            <h3 className="font-bold text-lg mb-2">
              FourWanders Travel Bali
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your trusted partner for exploring the beauty and culture of Bali.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/paket" className="hover:text-white">
                  Tour Packages
                </Link>
              </li>
              <li>
                <Link href="/attractions" className="hover:text-white">
                  Attractions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h4 className="font-semibold mb-3">Support</h4>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
              <li>Booking Policy</li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="font-semibold mb-3">Contact Us</h4>
            <p className="text-gray-300 text-sm leading-relaxed">
              Jl. Raya Seminyak No. 123<br />
              Bali, Indonesia
            </p>
            <p className="mt-2 text-gray-300 text-sm">
              📞 +62 895-0868-5114
            </p>
            <p className="text-gray-300 text-sm">
              ✉ info@fourwanderstravel.com
            </p>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="text-center text-gray-500 text-xs mt-10 px-4">
          © {new Date().getFullYear()} FourWanders Travel Bali. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
