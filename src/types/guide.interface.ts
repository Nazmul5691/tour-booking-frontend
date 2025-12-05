import { IUser } from "./user.interface";

export enum GUIDE_STATUS {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED"
}

export interface IGuide {
    user: IUser | string;
    experienceYears: number;
    languages: string[];
    // documents?: string[]; 
    status: GUIDE_STATUS;
    perTourCharge: number;
    walletBalance: number;
    averageRating?: number;
    totalReviews?: number;
    createdAt?: Date;
}