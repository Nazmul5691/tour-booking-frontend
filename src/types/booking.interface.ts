import { IGuide } from "./guide.interface";
import { ITour } from "./tour.interface";
import { IUser } from "./user.interface";


export enum BOOKING_STATUS{
    PENDING = "PENDING",
    CANCEL = "CANCEL",
    COMPLETE = "COMPLETE",
    FAILED = "FAILED"
}

export interface IBooking {
    user: IUser | string;
    tour: ITour | string;
    payment?: string;
    guestCount: number;
    status: BOOKING_STATUS;
    baseAmount?: number;
    discountPercentage?: number;
    amountAfterDiscount?: number;
    discountDate?: Date;
    guide?: IGuide | string;
    guideFee?: number;
    companyEarning?: number;
    createdAt?: Date;
}