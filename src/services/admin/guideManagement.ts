/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { GUIDE_STATUS, IGuide } from "@/types/guide.interface";
import { IUser, Role } from "@/types/user.interface";




// export async function getAllGuides(queryString?: string, currentUserRole?: Role, currentUserId?: string) {
//     try {
//         const response = await serverFetch.get(
//             `/guide/${queryString ? `?${queryString}` : ""}`
//         );
//         const result = await response.json();

//         if (!result.success) return result;

//         // Filter users based on role
//         let filteredData: IUser[] = result.data || [];

//         filteredData = filteredData.filter((user: IUser) => {
//             // Only show ADMIN or SUPER_ADMIN
//             if (![Role.ADMIN, Role.SUPER_ADMIN].includes(user.role)) return false;

//             // If current user is ADMIN, only show their own record
//             if (currentUserRole === Role.ADMIN && user._id !== currentUserId) return false;

//             return true;
//         });

//         return {
//             ...result,
//             data: filteredData,
//         };
//     } catch (error: any) {
//         console.log(error);
//         return {
//             success: false,
//             message: process.env.NODE_ENV === "development" ? error.message : "Something went wrong",
//         };
//     }
// }


export const getAllGuides = async (
    queryString?: string
) => {
    try {
        

        // 2️⃣ Call backend API
        const response = await serverFetch.get(
            `/guide/${queryString ? `?${queryString}` : ""}`
        );

        const result = await response.json();

        if (!result.success) return result;

        // 3️⃣ Return the guides as-is; backend already filters APPROVED guides
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



// export async function updateGuideStatus(
//     userId: string,
//     status: GUIDE_STATUS
// ) {
//     try {
//         const response = await serverFetch.patch(`/guide/approvedStatus/${userId}`, {
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ status }),
//         });
//         return await response.json();
//     } catch (error: any) {
//         console.error(error);
//         return { success: false, message: error.message || "Something went wrong" };
//     }
// }




export async function updateGuideStatus(
    id: string,
    status: GUIDE_STATUS
) {
    try {
        // if (!guideId) {
        //     return { success: false, message: "Guide ID is required" };
        // }

        // if (!status) {
        //     return { success: false, message: "Status is required" };
        // }

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