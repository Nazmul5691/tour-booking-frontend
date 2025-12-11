// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use server";

// import { serverFetch } from "@/lib/server-fetch";
// // You might need a Zod schema for validation, but for simplicity, we'll validate the basics here.
// // import { zodValidator } from "@/lib/zodValidator"; 
// // import { applyForTourZodSchema } from "@/zod/tour.validation"; // Assuming you create this validation schema

// interface ApplyTourResult {
//     success: boolean;
//     data?: any; // Change this to IGuideApplication if you have the type
//     message?: string;
// }


// export const applyForTourAsGuide = async (
//     _currentState: any,
//     formData: FormData,
// ): Promise<ApplyTourResult> => {
//     try {
//         // 1️⃣ Extract necessary data from the form
//         const tourId = formData.get("tourId") as string | null;
//         const message = formData.get("message") as string | null;

//         if (!tourId) {
//             return {
//                 success: false,
//                 message: "Tour ID is missing. Cannot apply.",
//             };
//         }

//         // 2️⃣ Prepare the payload for the backend
//         const payload = {
//             message: message || undefined, // Send message only if provided
//         };

        

//         // 3️⃣ Send POST request to the backend endpoint
//         // Endpoint: POST /api/v1/tours/:tourId/apply-guide
//         const res = await serverFetch.post(`/tour/${tourId}/apply-guide`, {
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(payload),
//         });

//         const result = await res.json();

//         // 4️⃣ Handle API response and return result
//         if (result.success) {
//             return {
//                 success: true,
//                 data: result.data,
//                 message: result.message || "Application submitted successfully!",
//             };
//         } else {
//             // Handle specific backend errors (e.g., already applied, not approved guide)
//             return {
//                 success: false,
//                 message: result.message || "Application failed due to an unknown error.",
//             };
//         }
//     } catch (error: any) {
//         // Handle Next.js redirects gracefully
//         if (error?.digest?.startsWith("NEXT_REDIRECT")) throw error;

//         console.error("Apply Tour Guide Error:", error);

//         return {
//             success: false,
//             message:
//                 process.env.NODE_ENV === "development"
//                     ? error.message
//                     : "An unexpected error occurred. Please try submitting again.",
//         };
//     }
// };





/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";

export interface ApplyTourResult {
    success: boolean; // Must be strictly boolean
    data?: any; // The created application object
    message?: string;
}

// 🚨 Important: This action must accept the return type as its first argument
// to match the useActionState signature.
export const applyForTourAsGuide = async (
    _currentState: ApplyTourResult, 
    formData: FormData,
): Promise<ApplyTourResult> => {
    try {
        // 1️⃣ Extract necessary data from the form
        // These fields must match the 'name' attributes in your form
        const tourId = formData.get("tourId") as string | null;
        const message = formData.get("message") as string | null;

        if (!tourId) {
            return {
                success: false,
                message: "Tour ID is missing. Cannot apply.",
            };
        }

        // 2️⃣ Prepare the payload for the backend
        const payload = {
            message: message || undefined,
        };

        // 3️⃣ Send POST request to the backend endpoint
        // Endpoint: POST /api/v1/tours/:tourId/apply-guide
        const res = await serverFetch.post(`/guide/${tourId}/apply-guide`, {
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        const result = await res.json();

        // 4️⃣ Handle API response and return result
        if (result.success) {
            return {
                success: true,
                data: result.data,
                message: result.message || "Application submitted successfully!",
            };
        } else {
            // Handle specific backend errors (e.g., already applied, not approved guide)
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