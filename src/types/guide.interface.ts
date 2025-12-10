import { ITour } from "./tour.interface";
import { IUser } from "./user.interface";

export enum GUIDE_STATUS {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED"
}

export enum APPLICATION_STATUS {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

// export interface IGuide {
//     user: IUser | string;
//     experienceYears: number;
//     languages: string[];
//     // documents?: string[]; 
//     status: GUIDE_STATUS;
//     perTourCharge: number;
//     walletBalance: number;
//     averageRating?: number;
//     totalReviews?: number;
//     createdAt?: Date;
// }


export interface IGuide {
  _id?: string;              // optional for UI lists
  user: string | IUser;              // user id
  experienceYears: number;
  languages: string[];
  status: GUIDE_STATUS;
  bio?: string;
  perTourCharge: number;
  walletBalance: number;
  averageRating?: number;
  totalReviews?: number;
  createdAt?: string;        // ISO Date string
}



export interface IGuideApplication {
  _id?: string;
  user: string | IUser;          // user id
  tour: string | ITour;          // tour id
  message?: string;
  status: APPLICATION_STATUS;
  createdAt?: string;
  updatedAt?: string;
}