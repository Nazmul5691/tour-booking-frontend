

/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";

export interface ApplyTourResult {
    success: boolean; 
    data?: any; 
    message?: string;
}




export const applyForTourAsGuide = async (
    _currentState: ApplyTourResult, 
    formData: FormData,
): Promise<ApplyTourResult> => {
    try {
       
        const tourId = formData.get("tourId") as string | null;
        const message = formData.get("message") as string | null;

        if (!tourId) {
            return {
                success: false,
                message: "Tour ID is missing. Cannot apply.",
            };
        }

       
        const payload = {
            message: message || undefined,
        };

       
        const res = await serverFetch.post(`/guide/${tourId}/apply-guide`, {
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        const result = await res.json();

        
        if (result.success) {
            return {
                success: true,
                data: result.data,
                message: result.message || "Application submitted successfully!",
            };
        } else {
           
            return {
                success: false,
                message: result.message || "Application failed due to an unknown error.",
            };
        }
    } catch (error: any) {
        if (error?.digest?.startsWith("NEXT_REDIRECT")) throw error;

        console.error("Apply Tour Guide Error:", error);

        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "An unexpected error occurred. Please try submitting again.",
        };
    }
};