
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
        
        const payload = {
            // email: currentUser.email,
            experienceYears: Number(formData.get("experienceYears") || 0),
            location: formData.get("location") as string,
            languages: (formData.getAll("languages") as string[]) || [],
            perTourCharge: Number(formData.get("perTourCharge") || 0),
            bio: formData.get("bio") as string,
        };

        // Validate payload
        const validationResult = zodValidator(payload, createGuideZodSchema);

        if (!validationResult.success) {
            const errors = validationResult.errors ?? [];
            return {
                success: false,
                message: errors.map((e) => `${e.field}: ${e.message}`).join(", "),
            };
        }


        const res = await serverFetch.post("/guide/register-guide", {
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        const result = await res.json();

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
