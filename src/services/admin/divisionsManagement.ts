/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { createDivisionZodSchema } from "@/zod/division.validation";



export async function createDivision(_prevState: any, formData: FormData) {
    // ✅ Build validation payload (NO FILE HERE)
    const validationPayload = {
        name: formData.get("name") as string,
        description: formData.get("description") as string | undefined,
    };

    // ✅ Zod validation
    const validatedPayload = zodValidator(
        validationPayload,
        createDivisionZodSchema
    );

    if (!validatedPayload.success && validatedPayload.errors) {
        return {
            success: false,
            message: "Validation failed",
            formData: validationPayload,
            errors: validatedPayload.errors,
        };
    }

    if (!validatedPayload.data) {
        return {
            success: false,
            message: "Validation failed",
            formData: validationPayload,
        };
    }

    // ✅ Build FormData for backend (multer compatible)
    const backendFormData = new FormData();
    backendFormData.append("name", validatedPayload.data.name);

    if (validatedPayload.data.description) {
        backendFormData.append(
            "description",
            validatedPayload.data.description
        );
    }

    const file = formData.get("file");
    if (file instanceof File && file.size > 0) {
        backendFormData.append("file", file);
    }

    try {
        const response = await serverFetch.post("/division/create", {
            body: backendFormData,
        });

        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error("Create division error:", error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to create division",
            formData: validationPayload,
        };
    }
}



export async function getAllDivisions() {
    try {
        const response = await serverFetch.get("/division", {
            cache: "no-store",
        })
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}




export async function deleteDivision(id: string) {
    console.log("Deleting division ID:", id); // <- Add this
    try {
        const response = await serverFetch.delete(`/division/${id}`);
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error("Delete division error:", error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to delete division",
        };
    }
}