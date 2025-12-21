export default function Footer() {
  return (
    <footer className="mt-10">
      <div className="bg-blue-600 text-white py-14 text-center">
        <h2 className="text-2xl font-bold mb-2">Ready for Your Bali Adventure?</h2>
        <p className="text-gray-200 mb-6">
          Sign up for our newsletter to get exclusive deals and travel tips!
        </p>

        <div className="flex justify-center gap-2">
          <input
            type="text"
            placeholder="Enter your email address"
            className="px-4 py-2 rounded-md w-80 text-black"
          />
          <button className="bg-orange-500 px-4 py-2 rounded-md text-white">
            Subscribe
          </button>
        </div>
      </div>

      <div className="bg-gray-900 text-white py-10">
        <div className="max-w-7xl mx-auto grid grid-cols-4 gap-10 px-6">

          <div>
            <h3 className="font-bold mb-2">FourWanders Travel Bali</h3>
            <p className="text-gray-400 text-sm">
              Your trusted partner for exploring the beauty and culture of Bali.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Quick Links</h4>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>Home</li>
              <li>Tour Packages</li>
              <li>Attractions</li>
              <li>Blog</li>
              <li>FAQ</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Support</h4>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>Contact Us</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
              <li>Booking Policy</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Contact Us</h4>
            <p className="text-gray-300 text-sm">
              Jl. Raya Seminyak No. 123, Bali, Indonesia
            </p>
            <p className="mt-2 text-gray-300 text-sm">📞 +62 812-3456-7890</p>
            <p className="text-gray-300 text-sm">✉ info@fourwanderstravel.com</p>
          </div>

        </div>
      </div>
    </footer>
  );
}
