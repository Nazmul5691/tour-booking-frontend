
/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import { serverFetch } from "@/lib/server-fetch";


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



export async function getTourBySlug(slug: string) {
    try {
        const response = await serverFetch.get(`/tour/${slug}`)
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








// tour types
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









