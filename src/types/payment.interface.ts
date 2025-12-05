/* eslint-disable @typescript-eslint/no-explicit-any */
import { IBooking } from "./booking.interface";



export enum PAYMENT_STATUS {
    PAID = "PAID",
    UNPAID = "UNPAID",
    CANCELLED = "CANCELLED",
    FAILED = "FAILED",
    REFUNDED = "REFUNDED"
}

export interface IPayment {
    booking: IBooking | string;
    transactionId: string;
    baseAmount?: number;
    amount: number;
    totalAmount: number;
    guideFee?: number;
    companyEarning?: number;
    paymentGatewayData?: any;
    invoiceUrl?: string;
    status: PAYMENT_STATUS
}