import React, { useState } from "react";
import { toast } from "react-toastify";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // For now just simulate submission
    toast.success("Message sent successfully!");

    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 py-12">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10">
        
        {/* LEFT SIDE - INFO */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            Contact Us
          </h1>
          <p className="text-gray-600 mb-6">
            Have questions about your order, products, or delivery? 
            We’re here to help.
          </p>

          <div className="space-y-4 text-gray-700">
            <div>
              <p className="font-semibold">📍 Address</p>
              <p>Kollam, Kerala, India</p>
            </div>

            <div>
              <p className="font-semibold">📞 Phone</p>
              <p>+91 98765 43210</p>
            </div>

            <div>
              <p className="font-semibold">✉ Email</p>
              <p>support@cartify.com</p>
            </div>

            <div>
              <p className="font-semibold">🕒 Working Hours</p>
              <p>Mon – Sat: 9:00 AM – 6:00 PM</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - FORM */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
              <label className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Message
              </label>
              <textarea
                name="message"
                rows="4"
                value={form.message}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
