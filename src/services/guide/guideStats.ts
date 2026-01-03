/* eslint-disable @typescript-eslint/no-explicit-any */
// services/guide/guideStatsService.ts
"use server";

import { serverFetch } from "@/lib/server-fetch";

export interface IGuideStats {
    walletBalance: number;
    totalTours: number;
    pendingApplications: number;
    approvedApplications: number;
    rejectedApplications: number;
    totalApplications: number;
    availableTours: number;
}



export async function getGuideStats(): Promise<{
    success: boolean;
    message: string;
    data: IGuideStats | null;
}> {
    try {
        const response = await serverFetch.get("/guide/stats", {
            cache: "no-store",
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to fetch guide stats");
        }

        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error("Get guide stats error:", error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to fetch guide stats",
            data: null,
        };
    }
}




export async function getGuideInfo(): Promise<any> {
    try {
        const response = await serverFetch.get("/guide/me", {
            cache: "no-store",
        });

        if (!response.ok) {
            throw new Error("Failed to fetch guide info");
        }

        const result = await response.json();
        return result.data;
    } catch (error: any) {
        console.error("Get guide info error:", error);
        return null;
    }
}