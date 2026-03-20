export default function About() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            About <span className="text-purple-600">Cartify</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
            Cartify is a modern e-commerce platform designed to simplify online
            shopping with secure payments, real-time support, and a seamless
            user experience.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Our mission is to bridge the gap between customers and quality
              products by offering a reliable, fast, and intuitive shopping
              platform. We focus on performance, security, and user
              satisfaction.
            </p>
          </div>

          <div className="bg-purple-600 text-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-3">
              Why Choose Cartify?
            </h3>
            <ul className="space-y-3 text-lg">
              <li>🛍️ Curated products</li>
              <li>⚡ Fast checkout</li>
              <li>🔐 Secure payments</li>
              <li>💬 Real-time chat support</li>
              <li>📦 Easy order tracking</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Tech Section */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">
            Built With Modern Technologies
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "React",
              "Tailwind CSS",
              "Node.js",
              "MongoDB",
              "Socket.IO",
              "JWT Auth",
              "Razorpay",
              "REST APIs",
            ].map((tech) => (
              <div
                key={tech}
                className="border rounded-lg py-4 px-6 text-gray-700 font-medium hover:shadow-md transition"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            Our Vision
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            To create a scalable and user-friendly e-commerce ecosystem that
            blends modern technology with real-world business needs.
          </p>
        </div>
      </section>
    </div>
  );
}
