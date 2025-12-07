/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { createBooking } from "@/services/admin/bookingManagement";
import { ITour } from "@/types/tour.interface";
import { format } from "date-fns";
import { useEffect, useState } from "react";

interface TourDetailsRightProps {
  tour?: ITour;
  user?: any; // pass IUser from the page
}

export default function TourDetailsRightWithGuest({ tour, user }: TourDetailsRightProps) {
  const costFrom = tour?.costFrom ?? 0;
  const maxGuest = tour?.maxGuest ?? 1;

  const startDate = tour?.startDate ? new Date(tour.startDate) : new Date();
  const endDate = tour?.endDate ? new Date(tour.endDate) : new Date();
  const durationDays = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  const nights = durationDays > 0 ? durationDays - 1 : 0;

  // States
  const [guestCount, setGuestCount] = useState(1);
  const [totalAmount, setTotalAmount] = useState(costFrom);
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  // Update total amount
  useEffect(() => {
    setTotalAmount(guestCount * costFrom);
  }, [guestCount, costFrom]);

  // ✅ Detect login using user prop and cookie
  useEffect(() => {
    console.log("Initial user prop:", user);

    const checkLogin = () => {
      const tokenCookie = document.cookie
        .split(";")
        .find(c => c.trim().startsWith("accessToken="));
      const isLogged = !!tokenCookie || !!user;
      console.log("Check login:", isLogged, tokenCookie, user);
      setLoggedIn(isLogged);
    };

    checkLogin();

    // Keep checking every 1s in case login redirect sets cookies
    const interval = setInterval(checkLogin, 1000);
    return () => clearInterval(interval);
  }, [user]);

  const incrementGuest = () => {
    if (guestCount < maxGuest) setGuestCount(prev => prev + 1);
  };
  const decrementGuest = () => {
    if (guestCount > 1) setGuestCount(prev => prev - 1);
  };

  const handleBooking = async (formData: FormData) => {
    if (!loggedIn) {
      const currentPath = window.location.pathname;
      window.location.href = `/login?redirect=${currentPath}`;
      return;
    }

    setLoading(true);
    const result = await createBooking(formData);
    setLoading(false);

    if ("success" in result && result.success && result.payment) {
      window.location.href = result.payment;
      return;
    }

    if ("success" in result && !result.success) {
      alert(result.message || "Booking failed");
      return;
    }

    alert("Booking failed");
  };

  if (!tour) return <p>No tour data available</p>;

  return (
    <div className="space-y-6">
      <form action={handleBooking}>
        <input type="hidden" name="tour" value={tour._id} />
        <input type="hidden" name="guestCount" value={guestCount} />

        <div className="border p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Booking Details</h2>

          <div className="flex items-center gap-3 mb-4">
            <button
              type="button"
              onClick={decrementGuest}
              disabled={guestCount <= 1}
              className="w-8 h-8 rounded-full border flex items-center justify-center disabled:opacity-50"
            >
              -
            </button>
            <span className="w-8 text-center">{guestCount}</span>
            <button
              type="button"
              onClick={incrementGuest}
              disabled={guestCount >= maxGuest}
              className="w-8 h-8 rounded-full border flex items-center justify-center disabled:opacity-50"
            >
              +
            </button>
          </div>

          <p className="mb-2">Price per person: ৳{costFrom.toLocaleString()}</p>
          <p className="mb-4">Total: ৳{totalAmount.toLocaleString()}</p>

          <Button
            type="submit"
            disabled={loading}
            className="w-full text-white bg-linear-to-r from-yellow-400 via-orange-500 to-pink-500 hover:from-yellow-500 hover:to-rose-600 font-semibold"
          >
            {loggedIn
              ? loading
                ? "Processing..."
                : "Create Booking"
              : "Login First to Book"}
          </Button>
        </div>
      </form>

      {/* Tour Details */}
      <div className="bg-gray-100 p-5 border shadow-md flex flex-col gap-4 rounded-md">
        <h2 className="text-xl font-semibold">Tour Details</h2>
        <div className="border" />

        <DetailRow label="Date">
          {format(startDate, "PP")} - {format(endDate, "PP")}
        </DetailRow>
        <DetailRow label="Duration">
          {durationDays} days, {nights} nights
        </DetailRow>
        <DetailRow label="Destination">{tour.location}</DetailRow>
        <DetailRow label="Departure">{startDate.toLocaleDateString("en-GB")}</DetailRow>
        <DetailRow label="Return">{endDate.toLocaleDateString("en-GB")}</DetailRow>
        <DetailRow label="Total Peoples">{tour.maxGuest}</DetailRow>
      </div>
    </div>
  );
}

function DetailRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-2 font-semibold justify-between">
      <p>{label}</p>
      <p className="text-gray-600">{children}</p>
    </div>
  );
}
