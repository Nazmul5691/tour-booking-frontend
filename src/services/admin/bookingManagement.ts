
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

    // Not logged in → save pending booking and redirect
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
