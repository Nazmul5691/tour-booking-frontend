/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { GUIDE_STATUS, IGuide } from "@/types/guide.interface";
import { IUser, Role } from "@/types/user.interface";
import { revalidateTag } from "next/cache";



export type GetGuideApplicationsParams = {
    page?: number;
    limit?: number;
    status?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
};






export const getAllGuides = async (
    queryString?: string
) => {
    try {

        const response = await serverFetch.get(
            `/guide/${queryString ? `?${queryString}` : ""}`
        );

        const result = await response.json();

        if (!result.success) return result;

        return result;
    } catch (error: any) {
        console.error("Get All Guides Error:", error);
        return {
            success: false,
            message: process.env.NODE_ENV === "development"
                ? error.message
                : "Something went wrong",
            data: [],
        };
    }
};



export const getSingleGuide = async (
    guideId: string
) => {
    try {
        if (!guideId) {
            return { success: false, message: "Guide ID is required" };
        }

        const response = await serverFetch.get(`/guide/${guideId}`);
        const result = await response.json();

        if (!result.success) {
            return {
                success: false,
                message: result.message || "Failed to fetch guide",
            };
        }

        return {
            success: true,
            data: result.data as IGuide,
            message: result.message,
        };
    } catch (error: any) {
        console.error("Get Single Guide Error:", error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Something went wrong while fetching guide",
        };
    }
};



export async function updateGuideStatus(
    id: string,
    status: GUIDE_STATUS
) {
    try {

        const response = await serverFetch.patch(`/guide/approvedStatus/${id}`, {
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status }),
        });

        const result = await response.json();

        if (!result.success) {
            return {
                success: false,
                message: result.message || "Failed to update guide status",
            };
        }

        return {
            success: true,
            data: result.data,
            message: result.message || "Guide status updated successfully",
        };
    } catch (error: any) {
        console.error("Update Guide Status Error:", error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Something went wrong while updating guide status",
        };
    }
}



export const getGuideApplications = async (
    params: GetGuideApplicationsParams = {}
) => {
    const searchParams = new URLSearchParams();

    // Dynamically attach query params
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            searchParams.append(key, String(value));
        }
    });

    const response = await serverFetch.get(
        `/guide/guide-applications?${searchParams.toString()}`,
        {
            cache: "no-store",
            next: { tags: ["guide-applications"] },
        }
    );

    const result = await response.json();

    if (!result?.success) {
        throw new Error(result?.message || "Failed to fetch guide applications");
    }

    return {
        data: result.data,
        meta: result.meta,
    };
};



export async function updateApplicationStatusAction(
    applicationId: string,
    status: "APPROVED" | "REJECTED"
) {
    try {
        if (!applicationId) {
            return { success: false, message: "Application ID is required" };
        }

        if (!status) {
            return { success: false, message: "Status is required" };
        }

        
        const response = await serverFetch.patch(
            `/guide/guide-applications/${applicationId}`,
            {
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            }
        );

        const result = await response.json();

        if (!result.success) {
            return {
                success: false,
                message: result.message || "Failed to update application status",
                data: null,
            };
        }

        revalidateTag("guide-applications", "");

        return {
            success: true,
            message: result.message || "Application status updated successfully",
            data: result.data,
        };
    } catch (error: any) {
        console.error("Update Application Status Error:", error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Something went wrong while updating application status",
            data: null,
        };
    }
}



export const getMyApplicationsForTourGuide = async () => {
  try {
    const res = await serverFetch.get("/guide/tour-guide-application");
    const result = await res.json()
        
    return result.data;
    
  } catch (error) {
    console.error("Error fetching guide applications:", error);
    return [];
  }
};