import { IDivision } from "./division.interface";
import { IGuide } from "./guide.interface";

export interface ITourType {
    _id: string;
    name: string;
}

export interface ITour {
    _id: string; 
    title: string;
    slug: string;
    description?: string;
    images?: string[]; 
    location?: string;
    costFrom?: number;
    
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
    
    
    division: string | IDivision; 
    tourType: string | ITourType;
    guides?: string[] | IGuide[]; 
    
   
    deleteImages?: string[]; 
    averageRating?: number;
    totalReviews?: number;
    discountDate?: string; 
    discountPercentage?: number;
}