/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { IsActive, IUser, Role } from "@/types/user.interface";
import { createAdminZodSchema, updateAdminZodSchema } from "@/zod/admin.validation";



export const createAdmin = async (payload: Partial<IUser>) => {
    const validation = zodValidator(payload, createAdminZodSchema);

    if (!validation.success || !validation.data) {
        return {
            success: false,
            message: "Fill the form. Password must be 8 characters long include one upper, one lower and one special character. Must input valid email address",
            errors: validation.errors,
            formData: payload,
        };
    }

    try {
        
        const response = await serverFetch.post("/user/create-admin", {
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(validation.data),
        });

        const result = await response.json();

        return result;
    } catch (error: any) {
        console.error("Create admin error:", error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to create admin",
            formData: payload,
        };
    }
};



export async function getAdmins(queryString?: string, currentUserRole?: Role, currentUserId?: string) {
    try {
        const response = await serverFetch.get(
            `/user/all-users${queryString ? `?${queryString}` : ""}`
        );
        const result = await response.json();

        if (!result.success) return result;

        // Filter users based on role
        let filteredData: IUser[] = result.data || [];

        filteredData = filteredData.filter((user: IUser) => {
            // Only show ADMIN or SUPER_ADMIN
            if (![Role.ADMIN, Role.SUPER_ADMIN].includes(user.role)) return false;

            // If current user is ADMIN, only show their own record
            if (currentUserRole === Role.ADMIN && user._id !== currentUserId) return false;

            return true;
        });

        return {
            ...result,
            data: filteredData,
        };
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: process.env.NODE_ENV === "development" ? error.message : "Something went wrong",
        };
    }
}


/**
 * GET ADMIN BY ID
 * API: GET /admin/:id
 */
export async function getAdminById(id: string) {
    try {
        const response = await serverFetch.get(`/admin/${id}`)
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



/**
 * UPDATE ADMIN
 * API: PATCH /admin/:id
 */
export async function updateAdmin(id: string, _prevState: any, formData: FormData) {
    const validationPayload: any = {
        name: formData.get("name") as string,
        contactNumber: formData.get("contactNumber") as string,
    };

    const validation = zodValidator(validationPayload, updateAdminZodSchema);
    if (!validation.success && validation.errors) {
        return {
            success: validation.success,
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
        };
    }

    try {
        const response = await serverFetch.patch(`/admin/${id}`, {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(validation.data),
        });

        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error("Update admin error:", error);
        return {
            success: false,
            message: process.env.NODE_ENV === 'development' ? error.message : 'Failed to update admin',
            formData: validationPayload
        };
    }
}



/**
 * SOFT DELETE ADMIN
 * API: DELETE /admin/soft/:id
 */
export async function softDeleteAdmin(id: string) {
    try {
        const response = await serverFetch.delete(`/admin/soft/${id}`)
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



/**
 * HARD DELETE ADMIN
 * API: DELETE /admin/:id
 */
// export async function deleteAdmin(id: string) {
//     try {
//         const response = await serverFetch.delete(`/admin/${id}`)
//         const result = await response.json();
//         return result;
//     } catch (error: any) {
//         console.log(error);
//         return {
//             success: false,
//             message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
//         };
//     }
// }



export const deleteAdmin = async (id: string) => {
    try {
        const response = await serverFetch.delete(`/user/${id}`);
        const result = await response.json();

        return result; 
    } catch (error: any) {
        console.error("Delete admin error:", error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to delete admin",
        };
    }
};



export async function updateAdminStatus(
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

