
/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import { serverFetch } from "@/lib/server-fetch";
import { revalidatePath } from "next/cache";

// ============================================
// INTERFACES
// ============================================

export interface IBooking {
    _id: string;
    user: {
        _id: string;
        name: string;
        email: string;
    };
    tour: {
        _id: string;
        title: string;
        slug: string;
        location: string;
    };
    payment?: string;
    guestCount: number;
    status: "PENDING" | "CANCEL" | "COMPLETE" | "FAILED";
    baseAmount?: number;
    discountPercentage?: number;
    amountAfterDiscount?: number;
    discountDate?: Date;
    guide?: string;
    guideFee?: number;
    companyEarning?: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface IBookingMeta {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
}

export interface IBookingResponse {
    success: boolean;
    message: string;
    data: IBooking[];
    meta: IBookingMeta;
}

// ============================================
// GET MY BOOKINGS
// ============================================

export async function getMyBookings(queryString?: string): Promise<IBookingResponse> {
    try {
        const response = await serverFetch.get(
            `/booking/my-bookings${queryString ? `?${queryString}` : ""}`,
            {
                cache: "no-store",
            }
        );
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to fetch bookings");
        }

        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error("Get my bookings error:", error);
        return {
            success: false,
            message: process.env.NODE_ENV === "development" 
                ? error.message 
                : "Failed to fetch bookings",
            data: [],
            meta: {
                page: 1,
                limit: 10,
                total: 0,
                totalPage: 0,
            },
        };
    }
}

// ============================================
// GET BOOKING BY ID
// ============================================

export async function getBookingById(id: string): Promise<any> {
    try {
        const response = await serverFetch.get(`/booking/${id}`);
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to fetch booking");
        }

        const result = await response.json();
        return result.data;
    } catch (error: any) {
        console.error("Get booking by ID error:", error);
        return {
            success: false,
            message: process.env.NODE_ENV === "development" 
                ? error.message 
                : "Failed to fetch booking",
        };
    }
}

// ============================================
// CANCEL BOOKING (UPDATE STATUS)
// ============================================

export async function cancelBooking(id: string): Promise<any> {
    try {
        const response = await serverFetch.patch(`/booking/${id}`, {
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "CANCEL" }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to cancel booking");
        }

        const result = await response.json();
        
        // Revalidate the bookings page
        revalidatePath("/my-bookings");
        
        return result;
    } catch (error: any) {
        console.error("Cancel booking error:", error);
        return {
            success: false,
            message: process.env.NODE_ENV === "development" 
                ? error.message 
                : "Failed to cancel booking",
        };
    }
}

// ============================================
// CREATE BOOKING (If you need this in the future)
// ============================================

export async function createBooking(
    _prevState: any,
    formData: FormData
): Promise<any> {
    const parseNumber = (value: FormDataEntryValue | null) => {
        if (value === null || value === "") return undefined;
        const num = Number(value);
        return isNaN(num) ? undefined : num;
    };

    const bookingPayload = {
        tour: formData.get("tour") as string,
        guestCount: parseNumber(formData.get("guestCount")),
        guide: formData.get("guide") as string | undefined,
    };

    try {
        const response = await serverFetch.post("/booking/create", {
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bookingPayload),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to create booking");
        }

        const result = await response.json();
        
        // Revalidate the bookings page
        revalidatePath("/my-bookings");
        
        return result;
    } catch (error: any) {
        console.error("Create booking error:", error);
        return {
            success: false,
            message: process.env.NODE_ENV === "development" 
                ? error.message 
                : "Failed to create booking",
        };
    }
}

// ============================================
// UPDATE BOOKING STATUS (Admin/Guide functionality)
// ============================================

export async function updateBookingStatus(
    id: string,
    status: "PENDING" | "CANCEL" | "COMPLETE" | "FAILED"
): Promise<any> {
    try {
        const response = await serverFetch.patch(`/booking/${id}`, {
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to update booking status");
        }

        const result = await response.json();
        
        // Revalidate the bookings page
        revalidatePath("/my-bookings");
        revalidatePath("/admin/bookings");
        
        return result;
    } catch (error: any) {
        console.error("Update booking status error:", error);
        return {
            success: false,
            message: process.env.NODE_ENV === "development" 
                ? error.message 
                : "Failed to update booking status",
        };
    }
}

// ============================================
// DELETE BOOKING (Permanent deletion - Admin only)
// ============================================

export async function deleteBooking(id: string): Promise<any> {
    try {
        const response = await serverFetch.delete(`/booking/${id}`);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to delete booking");
        }

        const result = await response.json();
        
        // Revalidate the bookings page
        revalidatePath("/my-bookings");
        revalidatePath("/admin/bookings");
        
        return result;
    } catch (error: any) {
        console.error("Delete booking error:", error);
        return {
            success: false,
            message: process.env.NODE_ENV === "development" 
                ? error.message 
                : "Failed to delete booking",
        };
    }
}

// ============================================
// GET ALL BOOKINGS (Admin functionality)
// ============================================

export async function getAllBookings(queryString?: string): Promise<IBookingResponse> {
    try {
        const response = await serverFetch.get(
            `/booking${queryString ? `?${queryString}` : ""}`,
            {
                cache: "no-store",
            }
        );
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to fetch all bookings");
        }

        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error("Get all bookings error:", error);
        return {
            success: false,
            message: process.env.NODE_ENV === "development" 
                ? error.message 
                : "Failed to fetch bookings",
            data: [],
            meta: {
                page: 1,
                limit: 10,
                total: 0,
                totalPage: 0,
            },
        };
    }
}

// ============================================
// GET BOOKING STATISTICS (Dashboard)
// ============================================

export async function getBookingStatistics(): Promise<any> {
    try {
        const response = await serverFetch.get("/booking/statistics", {
            cache: "no-store",
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to fetch statistics");
        }

        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error("Get booking statistics error:", error);
        return {
            success: false,
            message: process.env.NODE_ENV === "development" 
                ? error.message 
                : "Failed to fetch statistics",
        };
    }
}