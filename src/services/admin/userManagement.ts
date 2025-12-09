/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { IsActive } from "@/types/user.interface";
import { updateUserZodSchema } from "@/zod/user.validation";


export async function getAllUsers(queryString?: string) {
    try {
        const response = await serverFetch.get(`/user/all-users${queryString ? `?${queryString}` : ""}`,
            {
                // cache: "force-cache",
                cache: "no-cache",
                // next: { tags: ["tours-list"] },
            }

        );
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


export async function getSingleUserById(id: string) {
    try {
        const response = await serverFetch.get(`user/${id}`)
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


export async function updateUser(id: string, _prevState: any, formData: FormData) {
    const validationPayload: any = {
        name: formData.get("name") as string,
        contactNumber: formData.get("contactNumber") as string,
        address: formData.get("address") as string,
    };

    const validation = zodValidator(validationPayload, updateUserZodSchema);
    if (!validation.success && validation.errors) {
        return {
            success: false,
            message: "Validation failed",
            formData: validationPayload,
            errors: validation.errors,
        };
    }

    if (!validation.data) {
        return {
            success: false,
            message: "Validation failed",
            formData: validationPayload,
            errors: [{ field: "unknown", message: "Invalid data" }],
        };
    }
    try {

        const response = await serverFetch.patch(`/user/${id}`, {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(validation.data),
        });

        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error("Update patient error:", error);
        return {
            success: false,
            message: process.env.NODE_ENV === 'development' ? error.message : 'Failed to update patient',
            formData: validationPayload
        };
    }
}


export async function updateUserStatus(
    userId: string,
    isActive: IsActive
) {
    try {
        const response = await serverFetch.patch(`/user/${userId}/status`, {
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ isActive }),
        });
        return await response.json();
    } catch (error: any) {
        console.error(error);
        return { success: false, message: error.message || "Something went wrong" };
    }
}

/**
 * SOFT DELETE PATIENT
 * API: DELETE /patient/soft/:id
 */
export async function deleteUser(id: string) {
    try {
        const response = await serverFetch.delete(`/user/${id}`)
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


