// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use server";

// import { serverFetch } from "@/lib/server-fetch";
// import { zodValidator } from "@/lib/zodValidator";
// import { createGuideZodSchema } from "@/zod/auth.validation";

// export const registerGuide = async (
//     _currentState: any,
//     formData: FormData
// ): Promise<any> => {
//     try {
//         const payload = {
//             name: formData.get("name") as string,
//             email: formData.get("email") as string,
//             password: formData.get("password") as string,
//         };

//         const validationResult = zodValidator(
//             payload,
//             createGuideZodSchema
//         );

//         if (!validationResult.success) {
//             return validationResult;
//         }

//         const res = await serverFetch.post("/user/register-guide", {
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(payload), // ✅ FIX
//         });

//         const result = await res.json();


//         return result;

//     } catch (error: any) {
//         if (error?.digest?.startsWith("NEXT_REDIRECT")) throw error;

//         console.error("Register error:", error);

//         return {
//             success: false,
//             message:
//                 process.env.NODE_ENV === "development"
//                     ? error.message
//                     : "Registration failed. Please try again.",
//         };
//     }
// };




/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { IGuide } from "@/types/guide.interface";
import { createGuideZodSchema } from "@/zod/auth.validation";

export const registerGuide = async (
    _currentState: any,
    formData: FormData,
    
): Promise<{ success: boolean; data?: IGuide; message?: string }> => {
    try {
        // 1️⃣ Prepare payload with frontend fields + logged-in user info
        const payload = {
            // email: currentUser.email,
            experienceYears: Number(formData.get("experienceYears") || 0),
            location: formData.get("location") as string,
            languages: (formData.getAll("languages") as string[]) || [],
            perTourCharge: Number(formData.get("perTourCharge") || 0),
            bio: formData.get("bio") as string,
        };

        // 2️⃣ Validate payload
        const validationResult = zodValidator(payload, createGuideZodSchema);

        if (!validationResult.success) {
            // Narrow the type so TS knows errors exist
            const errors = validationResult.errors ?? [];
            return {
                success: false,
                message: errors.map((e) => `${e.field}: ${e.message}`).join(", "),
            };
        }


        // 3️⃣ Send request to backend
        const res = await serverFetch.post("/guide/register-guide", {
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        const result = await res.json();

        // 4️⃣ Return result with proper type
        return {
            success: result.success,
            data: result.data as IGuide,
            message: result.message,
        };
    } catch (error: any) {
        if (error?.digest?.startsWith("NEXT_REDIRECT")) throw error;

        console.error("Register Guide Error:", error);

        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Guide registration failed. Please try again.",
        };
    }
};
