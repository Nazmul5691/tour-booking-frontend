import { IDivision } from "./division.interface";
import { IGuide } from "./guide.interface";

export interface ITourType {
    _id: string;
    name: string;
}

export interface ITour {
    _id: string; // Add the unique identifier (standard for frontend data)
    title: string;
    slug: string;
    description?: string;
    images?: string[]; // Array of image URLs
    location?: string;
    costFrom?: number;
    // Dates are typically returned as ISO 8601 strings from the backend
    startDate?: string; 
    endDate?: string; 
    departureLocation?: string;
    arrivalLocation?: string;
    included?: string[];
    excluded?: string[]
    amenities?: string[];
    tourPlan?: string[];
    maxGuest?: number;
    minAge?: number;
    
    // Foreign Key References
    // Backend ObjectId (Types.ObjectId) is represented as string or the populated object on the frontend
    division: string | IDivision; 
    tourType: string | ITourType;
    guides?: string[] | IGuide[]; // Array of ID strings or populated guide objects
    
    // Other fields
    deleteImages?: string[]; 
    averageRating?: number;
    totalReviews?: number;
    discountDate?: string; // Stored as Date in Mongoose, retrieved as string
    discountPercentage?: number;
}