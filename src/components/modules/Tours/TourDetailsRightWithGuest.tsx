// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { Button } from "@/components/ui/button";
// import { createBooking } from "@/services/admin/bookingManagement";
// import { ITour } from "@/types/tour.interface";
// import { format } from "date-fns";
// import { useEffect, useState } from "react";

// interface TourDetailsRightProps {
//   tour?: ITour;
//   user?: any; // pass IUser from the page
// }

// export default function TourDetailsRightWithGuest({ tour, user }: TourDetailsRightProps) {
//   const costFrom = tour?.costFrom ?? 0;
//   const maxGuest = tour?.maxGuest ?? 1;

//   const startDate = tour?.startDate ? new Date(tour.startDate) : new Date();
//   const endDate = tour?.endDate ? new Date(tour.endDate) : new Date();
//   const durationDays = Math.ceil(
//     (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
//   );
//   const nights = durationDays > 0 ? durationDays - 1 : 0;

//   // States
//   const [guestCount, setGuestCount] = useState(1);
//   const [totalAmount, setTotalAmount] = useState(costFrom);
//   const [loading, setLoading] = useState(false);
//   const [loggedIn, setLoggedIn] = useState(false);

//   // Update total amount
//   useEffect(() => {
//     setTotalAmount(guestCount * costFrom);
//   }, [guestCount, costFrom]);

//   // ✅ Detect login using user prop and cookie
//   useEffect(() => {
//     console.log("Initial user prop:", user);

//     const checkLogin = () => {
//       const tokenCookie = document.cookie
//         .split(";")
//         .find(c => c.trim().startsWith("accessToken="));
//       const isLogged = !!tokenCookie || !!user;
//       console.log("Check login:", isLogged, tokenCookie, user);
//       setLoggedIn(isLogged);
//     };

//     checkLogin();

//     // Keep checking every 1s in case login redirect sets cookies
//     const interval = setInterval(checkLogin, 1000);
//     return () => clearInterval(interval);
//   }, [user]);

//   const incrementGuest = () => {
//     if (guestCount < maxGuest) setGuestCount(prev => prev + 1);
//   };
//   const decrementGuest = () => {
//     if (guestCount > 1) setGuestCount(prev => prev - 1);
//   };

//   const handleBooking = async (formData: FormData) => {
//     if (!loggedIn) {
//       const currentPath = window.location.pathname;
//       window.location.href = `/login?redirect=${currentPath}`;
//       return;
//     }

//     setLoading(true);
//     const result = await createBooking(formData);
//     setLoading(false);

//     if ("success" in result && result.success && result.payment) {
//       window.location.href = result.payment;
//       return;
//     }

//     if ("success" in result && !result.success) {
//       alert(result.message || "Booking failed");
//       return;
//     }

//     alert("Booking failed");
//   };

//   if (!tour) return <p>No tour data available</p>;

//   return (
//     <div className="space-y-6">
//       <form action={handleBooking}>
//         <input type="hidden" name="tour" value={tour._id} />
//         <input type="hidden" name="guestCount" value={guestCount} />

//         <div className="border p-6 rounded-lg shadow-md">
//           <h2 className="text-2xl font-bold mb-6">Booking Details</h2>

//           <div className="flex items-center gap-3 mb-4">
//             <button
//               type="button"
//               onClick={decrementGuest}
//               disabled={guestCount <= 1}
//               className="w-8 h-8 rounded-full border flex items-center justify-center disabled:opacity-50"
//             >
//               -
//             </button>
//             <span className="w-8 text-center">{guestCount}</span>
//             <button
//               type="button"
//               onClick={incrementGuest}
//               disabled={guestCount >= maxGuest}
//               className="w-8 h-8 rounded-full border flex items-center justify-center disabled:opacity-50"
//             >
//               +
//             </button>
//           </div>

//           <p className="mb-2">Price per person: ৳{costFrom.toLocaleString()}</p>
//           <p className="mb-4">Total: ৳{totalAmount.toLocaleString()}</p>

//           <Button
//             type="submit"
//             disabled={loading}
//             className="w-full text-white bg-linear-to-r from-yellow-400 via-orange-500 to-pink-500 hover:from-yellow-500 hover:to-rose-600 font-semibold"
//           >
//             {loggedIn
//               ? loading
//                 ? "Processing..."
//                 : "Create Booking"
//               : "Login First to Book"}
//           </Button>
//         </div>
//       </form>

//       {/* Tour Details */}
//       <div className="bg-gray-100 p-5 border shadow-md flex flex-col gap-4 rounded-md">
//         <h2 className="text-xl font-semibold">Tour Details</h2>
//         <div className="border" />

//         <DetailRow label="Date">
//           {format(startDate, "PP")} - {format(endDate, "PP")}
//         </DetailRow>
//         <DetailRow label="Duration">
//           {durationDays} days, {nights} nights
//         </DetailRow>
//         <DetailRow label="Destination">{tour.location}</DetailRow>
//         <DetailRow label="Departure">{startDate.toLocaleDateString("en-GB")}</DetailRow>
//         <DetailRow label="Return">{endDate.toLocaleDateString("en-GB")}</DetailRow>
//         <DetailRow label="Total Peoples">{tour.maxGuest}</DetailRow>
//       </div>
//     </div>
//   );
// }

// function DetailRow({ label, children }: { label: string; children: React.ReactNode }) {
//   return (
//     <div className="grid grid-cols-2 font-semibold justify-between">
//       <p>{label}</p>
//       <p className="text-gray-600">{children}</p>
//     </div>
//   );
// }











/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { createBooking } from "@/services/booking/bookingService";
import { ITour } from "@/types/tour.interface";
import { format } from "date-fns";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface TourDetailsRightProps {
  tour?: ITour;
  user?: any;
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
  const [isPending, startTransition] = useTransition();
  const [loggedIn, setLoggedIn] = useState(false);

  // Update total amount
  useEffect(() => {
    setTotalAmount(guestCount * costFrom);
  }, [guestCount, costFrom]);

  // Check if user is logged in
  useEffect(() => {
    setLoggedIn(!!user);
  }, [user]);

  const incrementGuest = () => {
    if (guestCount < maxGuest) setGuestCount(prev => prev + 1);
  };

  const decrementGuest = () => {
    if (guestCount > 1) setGuestCount(prev => prev - 1);
  };

  const handleBooking = async (formData: FormData) => {
    // Check if logged in
    if (!loggedIn) {
      const currentPath = window.location.pathname;
      window.location.href = `/login?redirect=${currentPath}`;
      return;
    }

    startTransition(async () => {
      try {
        const result = await createBooking(formData);

        if (result.success && result.payment) {
          // Redirect to payment gateway
          toast.success("Redirecting to payment...");
          window.location.href = result.payment;
        } else {
          toast.error(result.message || "Booking failed");
        }
      } catch (error: any) {
        toast.error(error.message || "Something went wrong");
      }
    });
  };

  if (!tour) return <p>No tour data available</p>;

  return (
    <div className="space-y-6">
      <form action={handleBooking}>
        <input type="hidden" name="tour" value={tour._id} />
        <input type="hidden" name="guestCount" value={guestCount} />

        <div className="border p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Booking Details</h2>

          {/* Guest Counter */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Number of Guests</label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={decrementGuest}
                disabled={guestCount <= 1 || isPending}
                className="w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary hover:text-white transition-colors"
              >
                -
              </button>
              <span className="w-12 text-center text-xl font-semibold">{guestCount}</span>
              <button
                type="button"
                onClick={incrementGuest}
                disabled={guestCount >= maxGuest || isPending}
                className="w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary hover:text-white transition-colors"
              >
                +
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Maximum {maxGuest} guests allowed
            </p>
          </div>

          {/* Price Breakdown */}
          <div className="space-y-2 mb-6">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Price per person:</span>
              <span className="font-semibold">৳{costFrom.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Number of guests:</span>
              <span className="font-semibold">{guestCount}</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between text-lg">
                <span className="font-bold">Total Amount:</span>
                <span className="font-bold text-primary">৳{totalAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Booking Button */}
          <Button
            type="submit"
            disabled={isPending}
            className="w-full"
            size="lg"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : loggedIn ? (
              "Proceed to Payment"
            ) : (
              "Login to Book"
            )}
          </Button>
        </div>
      </form>

      {/* Tour Details */}
      <div className="bg-muted/50 p-6 border rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Tour Details</h2>
        <div className="border-b mb-4" />

        <div className="space-y-3">
          <DetailRow label="Date">
            {format(startDate, "PP")} - {format(endDate, "PP")}
          </DetailRow>
          <DetailRow label="Duration">
            {durationDays} days, {nights} nights
          </DetailRow>
          <DetailRow label="Destination">{tour.location}</DetailRow>
          <DetailRow label="Departure">{format(startDate, "dd/MM/yyyy")}</DetailRow>
          <DetailRow label="Return">{format(endDate, "dd/MM/yyyy")}</DetailRow>
          <DetailRow label="Max Guests">{tour.maxGuest}</DetailRow>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}:</span>
      <span className="font-medium">{children}</span>
    </div>
  );
}