/* eslint-disable react/no-unescaped-entities */
"use client";

import { motion } from "framer-motion";
import { Mountain, Map, Users, Compass } from "lucide-react";

export default function AboutUs() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20 px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold"
        >
          About Dream Tour
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-lg max-w-2xl mx-auto"
        >
          Dream Tour is your trusted travel partner for exploring the
          breathtaking beauty of Bangladesh — safely, comfortably, and
          affordably.
        </motion.p>
      </section>

      {/* Our Mission */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <h2 className="text-3xl font-semibold">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              At Dream Tour, our mission is to make traveling across Bangladesh
              simple, safe, and enjoyable for everyone. We connect travelers with
              trusted guides, amazing destinations, and premium travel
              experiences — all in one place.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Whether you're exploring the evergreen hills of Sylhet, the sandy
              beaches of Cox’s Bazar, or the historical wonders of North Bengal,
              Dream Tour ensures a smooth and memorable journey.
            </p>
          </motion.div>

          <motion.img
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
            alt="Bangladesh Nature"
            className="rounded-2xl shadow-lg object-cover w-full h-80"
          />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50 px-6">
        <h2 className="text-3xl font-semibold text-center mb-12">
          Why Choose Dream Tour?
        </h2>

        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: <Map className="w-12 h-12" />,
              title: "Bangladesh-Focused",
              desc: "We specialize only in tours within Bangladesh — we know every corner.",
            },
            {
              icon: <Users className="w-12 h-12" />,
              title: "Trusted Guides",
              desc: "Verified and trained guides to ensure safety and comfort.",
            },
            {
              icon: <Mountain className="w-12 h-12" />,
              title: "Top Destinations",
              desc: "Hand-picked locations that offer the best travel experiences.",
            },
            {
              icon: <Compass className="w-12 h-12" />,
              title: "Easy Booking",
              desc: "Seamless and fast booking process with transparent pricing.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-2xl shadow text-center"
            >
              <div className="flex justify-center text-blue-600">{item.icon}</div>
              <h3 className="font-semibold text-xl mt-4">{item.title}</h3>
              <p className="text-gray-600 mt-2">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Closing */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl font-semibold">Explore Bangladesh With Us</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mt-4">
          From hills to rivers, heritage to wildlife — Bangladesh has endless
          beauty waiting for you. Dream Tour is here to help you discover it,
          safely and beautifully.
        </p>
      </section>
    </div>
  );
}
