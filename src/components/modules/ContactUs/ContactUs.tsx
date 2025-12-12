/* eslint-disable react/no-unescaped-entities */
"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactUs() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20 px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold"
        >
          Contact Us
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-lg max-w-2xl mx-auto"
        >
          We're here to help! Reach out to Dream Tour anytime for tour-related 
          information, support, or booking assistance.
        </motion.p>
      </section>

      {/* Contact Info */}
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Email */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-white shadow p-8 rounded-2xl text-center"
          >
            <Mail className="w-10 h-10 mx-auto text-blue-600" />
            <h3 className="text-xl font-semibold mt-4">Email</h3>
            <p className="text-gray-600 mt-2">dreamtour@gmail.com</p>
          </motion.div>

          {/* Phone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-white shadow p-8 rounded-2xl text-center"
          >
            <Phone className="w-10 h-10 mx-auto text-blue-600" />
            <h3 className="text-xl font-semibold mt-4">Phone</h3>
            <p className="text-gray-600 mt-2">017xxxxxxxx</p>
          </motion.div>

          {/* Office / Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-white shadow p-8 rounded-2xl text-center"
          >
            <MapPin className="w-10 h-10 mx-auto text-blue-600" />
            <h3 className="text-xl font-semibold mt-4">Location</h3>
            <p className="text-gray-600 mt-2">Bangladesh</p>
          </motion.div>
        </div>
      </section>

      {/* Footer Note */}
      <section className="py-10 px-6 text-center">
        <p className="text-gray-600 max-w-2xl mx-auto">
          Our support team is available every day to help you with bookings,
          guide information, and any travel-related questions.
        </p>
      </section>
    </div>
  );
}
