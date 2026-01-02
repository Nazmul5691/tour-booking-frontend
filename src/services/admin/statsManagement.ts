/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";

// ============================================
// INTERFACES
// ============================================

export interface IUserStats {
    totalUsers: number;
    totalActiveUsers: number;
    totalInActiveUsers: number;
    totalBlockedUsers: number;
    newUsersInLast7Days: number;
    newUsersInLast30Days: number;
    usersByRole: Array<{
        _id: string;
        count: number;
    }>;
}

export interface ITourStats {
    totalTour: number;
    totalTourByTourType: Array<{
        _id: string;
        count: number;
    }>;
    avgTourCost: Array<{
        _id: null;
        avgCostFrom: number;
    }>;
    totalTourByDivision: Array<{
        _id: string;
        count: number;
    }>;
    totalHighestBookedTour: Array<{
        _id: string;
        bookingCount: number;
        tour: {
            title: string;
            slug: string;
        };
    }>;
}

export interface IBookingStats {
    totalBooking: number;
    totalBookingByStatus: Array<{
        _id: string;
        count: number;
    }>;
    bookingsPerTour: Array<{
        _id: string;
        bookingCount: number;
        tour: {
            title: string;
            slug: string;
        };
    }>;
    avgGuestCountPerBooking: number;
    bookingsLast7Days: number;
    bookingsLast30Days: number;
    totalBookingByUniqueUsers: number;
}

export interface IPaymentStats {
    totalPayment: number;
    totalPaymentByStatus: Array<{
        _id: string;
        count: number;
    }>;
    totalRevenue: Array<{
        _id: null;
        totalRevenue: number;
    }>;
    avgPaymentAmount: Array<{
        _id: null;
        avgPaymentAMount: number;
    }>;
    paymentGatewayData: Array<{
        _id: string;
        count: number;
    }>;
}

// ============================================
// GET USER STATS
// ============================================

export async function getUserStats(): Promise<{
    success: boolean;
    message: string;
    data: IUserStats | null;
}> {
    try {
        const response = await serverFetch.get("/stats/user", {
            cache: "no-store",
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to fetch user stats");
        }

        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error("Get user stats error:", error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to fetch user stats",
            data: null,
        };
    }
}

// ============================================
// GET TOUR STATS
// ============================================

export async function getTourStats(): Promise<{
    success: boolean;
    message: string;
    data: ITourStats | null;
}> {
    try {
        const response = await serverFetch.get("/stats/tour", {
            cache: "no-store",
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to fetch tour stats");
        }

        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error("Get tour stats error:", error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to fetch tour stats",
            data: null,
        };
    }
}

// ============================================
// GET BOOKING STATS
// ============================================

export async function getBookingStats(): Promise<{
    success: boolean;
    message: string;
    data: IBookingStats | null;
}> {
    try {
        const response = await serverFetch.get("/stats/booking", {
            cache: "no-store",
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to fetch booking stats");
        }

        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error("Get booking stats error:", error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to fetch booking stats",
            data: null,
        };
    }
}

// ============================================
// GET PAYMENT STATS
// ============================================

export async function getPaymentStats(): Promise<{
    success: boolean;
    message: string;
    data: IPaymentStats | null;
}> {
    try {
        const response = await serverFetch.get("/stats/payment", {
            cache: "no-store",
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to fetch payment stats");
        }

        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error("Get payment stats error:", error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to fetch payment stats",
            data: null,
        };
    }
}

// ============================================
// GET ALL STATS (Combined)
// ============================================

export async function getAllStats() {
    const [userStats, tourStats, bookingStats, paymentStats] = await Promise.all([
        getUserStats(),
        getTourStats(),
        getBookingStats(),
        getPaymentStats(),
    ]);

    return {
        userStats,
        tourStats,
        bookingStats,
        paymentStats,
    };
}