/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use server";

// import { serverFetch } from "@/lib/server-fetch";


// // export async function getAllTours() {
// //     try {
// //         const response = await serverFetch.get("/tour", {
// //             cache: "force-cache",
// //             next: { tags: ["tours-list"] }
// //         })
// //         const result = await response.json();
// //         return result;
// //     } catch (error: any) {
// //         console.log(error);
// //         return {
// //             success: false,
// //             message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
// //         };
// //     }
// // }


// export async function getAllTours(queryString?: string) {
//     try {
//         const response = await serverFetch.get(`/tour${queryString ? `?${queryString}` : ""}`, {
//             cache: "force-cache",
//             next: { tags: ["tours-list"] }
//         })
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

"use server";

import { serverFetch } from "@/lib/server-fetch";

// Define the expected query structure, which matches the backend's Record<string, string> idea
type Query = Record<string, any>;

export async function getAllTours(queryString?: string) {
    try {
        const response = await serverFetch.get(`/tour${queryString ? `?${queryString}` : ""}`, {
            cache: "force-cache",
            next: { tags: ["tours-list"] }
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


export async function getAllTourTypes(queryString?: string) {
    try {
        const response = await serverFetch.get(`/tour/tour-types${queryString ? `?${queryString}` : ""}`, {
            cache: "force-cache",
            next: { tags: ["tours-types-list"] }
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










// // Updated to accept a query object and convert it to a query string
// export async function getAllTourTypes(query?: Query) {
//     let queryString = "";

//     // 💡 FIX: Convert the query object (Record<string, any>) into a URLSearchParams string
//     if (query) {
//         const params = new URLSearchParams();
//         for (const key in query) {
//             // Ensure values are not undefined/null before setting
//             if (query[key] !== undefined && query[key] !== null) {
//                 params.set(key, String(query[key]));
//             }
//         }
//         queryString = params.toString();
//     }

//     const urlPath = `/tour-types${queryString ? `?${queryString}` : ""}`;

//     try {
//         const response = await serverFetch.get(urlPath, {
//             cache: "force-cache",
//             next: { tags: ["tours-types-list"] }
//         })
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