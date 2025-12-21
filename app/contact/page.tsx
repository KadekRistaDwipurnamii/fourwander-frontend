"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const saveToDB = async (via: "email" | "whatsapp") => {
    await fetch("http://127.0.0.1:8000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message, via }),
    });
  };

  const sendWhatsApp = async () => {
    if (!name || !message) {
      toast.error("Name & message required");
      return;
    }

    setLoading(true);
    await saveToDB("whatsapp");

    const text = `Halo FourWanders 👋
Nama: ${name}
Email: ${email}
Pesan: ${message}`;

    window.open(
      `https://wa.me/6289508685114?text=${encodeURIComponent(text)}`,
      "_blank"
    );

    toast.success("Message sent via WhatsApp");
    setLoading(false);
  };

  const sendEmail = async () => {
    if (!name || !email || !message) {
      toast.error("All fields required");
      return;
    }

    setLoading(true);


    window.location.href = `mailto:fourwander16@gmail.com
      ?subject=Contact from ${name}
      &body=${encodeURIComponent(message)}`;

    toast.success("Redirecting to email...");
    setLoading(false);
  };

  return (
    <section className="min-h-screen bg-[#EFF6FF] py-20">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 px-6">

        {/* LEFT */}
        <div className="pt-10">
          <h1 className="text-3xl font-bold text-[#1E40AF] mb-4">
            Contact FourWanders
          </h1>

          <div className="space-y-4 mt-8 text-gray-700">
            <p>
              📧 <a href="mailto:fourwander16@gmail.com" className="text-blue-600">
                fourwander16@gmail.com
              </a>
            </p>

            <p>
              💬 <a href="https://wa.me/6289508685114" className="text-green-600">
                0895-0868-5114
              </a>
            </p>

            <p>⏰ Mon – Sun (08.00 – 22.00 WITA)</p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-xl font-semibold mb-6">Send us a message</h2>

          <input
            className="w-full mb-4 p-3 border rounded-lg"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="w-full mb-4 p-3 border rounded-lg"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <textarea
            className="w-full mb-6 p-3 border rounded-lg h-32"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <div className="flex gap-4">
            <button
              onClick={sendWhatsApp}
              disabled={loading}
              className="flex-1 bg-green-500 text-white py-3 rounded-xl font-semibold"
            >
              Send via WhatsApp
            </button>

            <button
              onClick={sendEmail}
              disabled={loading}
              className="flex-1 bg-[#1E40AF] text-white py-3 rounded-xl font-semibold"
            >
              Send via Email
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
