// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use server";

// import { serverFetch } from "@/lib/server-fetch";
// import { zodValidator } from "@/lib/zodValidator"; // ⬅️ NEW IMPORT
// import { createBookingZodSchema } from "@/zod/booking.validation";


// export async function createBooking(formData: FormData) { 
//     // Build validation payload from FormData
//     const validationPayload = {
//         tour: formData.get("tour") as string,           // Tour ID
//         guestCount: Number(formData.get("guestCount")), // Guest Count as a number
//     };

//     // Server-side validation using the new schema
//     const validation = zodValidator(validationPayload, createBookingZodSchema);

//     if (!validation.success || !validation.data) {
//         return {
//             success: false,
//             message: "Validation failed",
//             formData: validationPayload,
//             errors: validation.errors,
//         }
//     }

//     try {
//         // The service layer expects the validated object as the body
//         const response = await serverFetch.post("/booking", {
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(validation.data),
//             // The service layer automatically handles cache and tags
//         });

//         const result = await response.json();

//         // The expected successful result should contain { payment: "url", booking: {...} }
//         if (response.ok && result.payment) {
//             return {
//                 success: true,
//                 message: "Booking successful, proceeding to payment.",
//                 payment: result.payment, // The URL for SSLCommerz payment
//                 booking: result.booking,
//             };
//         }

//         // Handle API success but logic failure (e.g., guide not found)
//         return {
//              success: false,
//              message: result.message || "Failed to finalize booking details.",
//         }

//     } catch (error: any) {
//         console.error("Create booking error:", error);
//         return {
//             success: false,
//             message: process.env.NODE_ENV === 'development' ? error.message : 'Failed to create booking',
//             formData: validationPayload
//         };
//     }
// }








// "use server";

// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";
// import { serverFetch } from "@/lib/server-fetch";
// import { zodValidator } from "@/lib/zodValidator";
// import { createBookingZodSchema } from "@/zod/booking.validation";

// export async function createBooking(formData: FormData) {

//   const validationPayload = {
//     tour: formData.get("tour") as string,
//     guestCount: Number(formData.get("guestCount")),
//   };

//   const validation = zodValidator(validationPayload, createBookingZodSchema);

//   if (!validation.success || !validation.data) {
//     return {
//       success: false,
//       message: "Validation failed",
//       errors: validation.errors,
//     };
//   }

//   const accessToken = (await cookies()).get("accessToken")?.value;

//   // ✅ USER NOT LOGGED IN → SAVE & REDIRECT
//   if (!accessToken) {
//     (await cookies()).set("pendingBooking", JSON.stringify(validation.data), {
//       httpOnly: true,
//       path: "/",
//     });

//     redirect("/login");
//   }

//   // ✅ USER LOGGED IN → CREATE BOOKING
//   const response = await serverFetch.post("/booking", {
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(validation.data),
//   });

//   const result = await response.json();

//   if (response.ok && result.payment) {
//     return {
//       success: true,
//       payment: result.payment,
//     };
//   }

//   return {
//     success: false,
//     message: result.message || "Booking failed",
//   };
// }





/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";
import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { createBookingZodSchema } from "@/zod/booking.validation";
import { getCookie } from "../auth/tokenHandlers";

type CreateBookingResult =
    | { success: true; payment: string }
    | { success: false; message: string; errors?: any[] }
    | { redirectToLogin: string };

export async function createBooking(formData: FormData): Promise<CreateBookingResult> {
    const payload = {
        tour: formData.get("tour") as string,
        guestCount: Number(formData.get("guestCount")),
    };

    const validation = zodValidator(payload, createBookingZodSchema);

    if (!validation.success) {
        return { success: false, message: "Validation failed", errors: validation.errors };
    }

    const accessToken = await getCookie("accessToken");

    // ✅ Not logged in → save pending booking and redirect
    if (!accessToken) {
        (await cookies()).set("pendingBooking", JSON.stringify(validation.data), {
            httpOnly: true,
            path: "/",
        });

        return {
            redirectToLogin: "/login?redirect=/resume-booking",
        };
    }

    const response = await serverFetch.post("/booking", {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data),
    });

    const result = await response.json();

    if (response.ok && result.payment) {
        return { success: true, payment: result.payment };
    }

    return { success: false, message: result.message || "Booking failed" };
}
