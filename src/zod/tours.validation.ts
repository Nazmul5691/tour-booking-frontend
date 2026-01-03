import { z } from "zod";



export const createTourZodSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    location: z.string().optional(),
    // images: z.array(z.string()),
    costFrom: z.number().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    tourType: z.string(),
    included: z.array(z.string()).optional(),
    excluded: z.array(z.string()).optional(),
    amenities: z.array(z.string()).optional(),
    tourPlan: z.array(z.string()).optional(),
    maxGuest: z.number().optional(),
    minAge: z.number().optional(),
    division: z.string(),
    departureLocation: z.string().optional(),
    arrivalLocation: z.string().optional(),
    guides: z.array(z.string()).optional(),
    discountDate: z.string().optional(),
    discountPercentage: z.number().optional(),
    // files will be handled separately via FormData
});


// ---------------- UPDATE TOUR ----------------
export const updateTourZodSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    location: z.string().optional(),
    costFrom: z.number().optional(),
    images: z.array(z.string()).optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    tourType: z.string().optional(),
    included: z.array(z.string()).optional(),
    excluded: z.array(z.string()).optional(),
    amenities: z.array(z.string()).optional(),
    tourPlan: z.array(z.string()).optional(),
    maxGuest: z.number().optional(),
    minAge: z.number().optional(),
    division: z.string().optional(),
    departureLocation: z.string().optional(),
    arrivalLocation: z.string().optional(),
    guides: z.array(z.string()).optional(),
    discountDate: z.string().optional(),
    discountPercentage: z.number().optional(),
    deleteImages: z.array(z.string()).optional(),
    // files will be handled separately via FormData
});


export const createTourTypeZodSchema = z.object({
    name: z.string(),
});



