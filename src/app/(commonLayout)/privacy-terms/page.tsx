/* eslint-disable react/no-unescaped-entities */
"use client";

import { motion } from "framer-motion";
import { Shield, FileText, Lock, AlertCircle } from "lucide-react";
import { useState } from "react";

export default function PrivacyPolicyPage() {
  const [activeTab, setActiveTab] = useState<"privacy" | "terms">("privacy");

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20 px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold"
        >
          Privacy Policy & Terms
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-lg max-w-2xl mx-auto"
        >
          Your privacy and trust matter to us. Learn how we protect your data
          and the terms of using Dream Tour services.
        </motion.p>
      </section>

      {/* Tab Navigation */}
      <section className="py-8 px-6 max-w-5xl mx-auto">
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setActiveTab("privacy")}
            className={`px-8 py-3 rounded-lg font-semibold transition-all ${
              activeTab === "privacy"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Privacy Policy
          </button>
          <button
            onClick={() => setActiveTab("terms")}
            className={`px-8 py-3 rounded-lg font-semibold transition-all ${
              activeTab === "terms"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Terms & Conditions
          </button>
        </div>
      </section>

      {/* Privacy Policy Content */}
      {activeTab === "privacy" && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-10 px-6 max-w-5xl mx-auto"
        >
          <div className="bg-white shadow-lg rounded-2xl p-8 space-y-8">
            {/* Introduction */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
                <h2 className="text-2xl font-semibold">Introduction</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                At Dream Tour, we are committed to protecting your privacy and
                ensuring the security of your personal information. This Privacy
                Policy explains how we collect, use, and safeguard your data
                when you use our services.
              </p>
            </div>

            {/* Information We Collect */}
            <div>
              <h3 className="text-xl font-semibold mb-3">
                Information We Collect
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>
                    Personal information (name, email, phone number) provided
                    during booking
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>
                    Payment information processed securely through trusted
                    payment gateways
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>
                    Travel preferences and booking history to improve your
                    experience
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>
                    Device and usage data to enhance our website performance
                  </span>
                </li>
              </ul>
            </div>

            {/* How We Use Your Information */}
            <div>
              <h3 className="text-xl font-semibold mb-3">
                How We Use Your Information
              </h3>
              <p className="text-gray-600 leading-relaxed mb-3">
                We use your information to:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Process bookings and provide tour services</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Send booking confirmations and travel updates</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Improve our services based on user feedback</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>
                    Communicate promotional offers (you can opt-out anytime)
                  </span>
                </li>
              </ul>
            </div>

            {/* Data Security */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Lock className="w-8 h-8 text-blue-600" />
                <h3 className="text-xl font-semibold">Data Security</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                We implement industry-standard security measures to protect your
                data from unauthorized access, disclosure, or misuse. Your
                payment information is encrypted and processed through secure
                channels. However, no system is 100% secure, and we encourage
                you to use strong passwords and keep your login credentials
                safe.
              </p>
            </div>

            {/* Your Rights */}
            <div>
              <h3 className="text-xl font-semibold mb-3">Your Rights</h3>
              <p className="text-gray-600 leading-relaxed">
                You have the right to access, update, or delete your personal
                information at any time. If you wish to exercise these rights or
                have any concerns, please contact us at dreamtour@gmail.com.
              </p>
            </div>

            {/* Changes to Privacy Policy */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Updates to This Policy
                  </h3>
                  <p className="text-gray-600">
                    Dream Tour reserves the right to update this Privacy Policy
                    as needed. Any changes will be posted on this page with an
                    updated effective date.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Terms & Conditions Content */}
      {activeTab === "terms" && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-10 px-6 max-w-5xl mx-auto"
        >
          <div className="bg-white shadow-lg rounded-2xl p-8 space-y-8">
            {/* Introduction */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-8 h-8 text-blue-600" />
                <h2 className="text-2xl font-semibold">
                  Terms & Conditions
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                By accessing and using Dream Tour's services, you agree to
                comply with the following terms and conditions. Please read them
                carefully before making any bookings.
              </p>
            </div>

            {/* Booking Terms */}
            <div>
              <h3 className="text-xl font-semibold mb-3">Booking Terms</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>
                    All bookings must be confirmed with full payment or a
                    deposit as specified
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>
                    Prices are subject to change based on availability and
                    seasonal demand
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>
                    Confirmation emails will be sent within 24 hours of booking
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>
                    It is your responsibility to provide accurate contact and
                    travel information
                  </span>
                </li>
              </ul>
            </div>

            {/* Cancellation & Refund Policy */}
            <div>
              <h3 className="text-xl font-semibold mb-3">
                Cancellation & Refund Policy
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>
                    Cancellations made 7+ days before departure: Full refund
                    minus processing fee
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>
                    Cancellations made 3-6 days before departure: 50% refund
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>
                    Cancellations within 48 hours of departure: No refund
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>
                    Refunds will be processed within 7-10 business days
                  </span>
                </li>
              </ul>
            </div>

            {/* User Responsibilities */}
            <div>
              <h3 className="text-xl font-semibold mb-3">
                User Responsibilities
              </h3>
              <p className="text-gray-600 leading-relaxed mb-3">
                As a traveler using Dream Tour services, you agree to:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>
                    Arrive at designated meeting points on time
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>
                    Follow safety guidelines provided by tour guides
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>
                    Respect local communities, culture, and the environment
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>
                    Carry valid identification and required travel documents
                  </span>
                </li>
              </ul>
            </div>

            {/* Limitation of Liability */}
            <div>
              <h3 className="text-xl font-semibold mb-3">
                Limitation of Liability
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Dream Tour acts as an intermediary between travelers and service
                providers (guides, hotels, transport). We are not liable for any
                loss, injury, or damage during your trip unless caused directly
                by our negligence. We recommend purchasing travel insurance for
                added protection.
              </p>
            </div>

            {/* Changes to Itinerary */}
            <div>
              <h3 className="text-xl font-semibold mb-3">
                Changes to Itinerary
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Dream Tour reserves the right to modify tour itineraries due to
                unforeseen circumstances such as weather conditions, road
                closures, or safety concerns. We will notify you of any
                significant changes as soon as possible.
              </p>
            </div>

            {/* Contact Information */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Questions or Concerns?
                  </h3>
                  <p className="text-gray-600">
                    If you have any questions about these terms or need
                    clarification, feel free to reach out to us at
                    dreamtour@gmail.com or call us at 017xxxxxxxx.
                  </p>
                </div>
              </div>
            </div>

            {/* Effective Date */}
            <div className="text-center pt-6 border-t">
              <p className="text-sm text-gray-500">
                Last Updated: January 2025
              </p>
            </div>
          </div>
        </motion.section>
      )}
    </div>
  );
}