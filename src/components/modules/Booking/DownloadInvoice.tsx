/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { Download, FileText, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { 
    getInvoiceDownloadUrl, 
    getMyBookings,
} from "@/services/booking/bookingService";

// Define interfaces specifically for this component
interface IPayment {
    _id: string;
    status: string;
    invoiceUrl?: string;
    amount: number;
    transactionId: string;
}

interface ITour {
    _id: string;
    title: string;
    slug: string;
    location: string;
    startDate?: string; // Make it optional since it might not always be present
}

interface IBooking {
    _id: string;
    user: {
        _id: string;
        name: string;
        email: string;
    };
    tour: ITour;
    payment: IPayment;
    guestCount: number;
    status: "PENDING" | "CANCEL" | "COMPLETE" | "FAILED";
    baseAmount?: number;
    discountPercentage?: number;
    amountAfterDiscount?: number;
    totalAmount?: number;
    guide?: string;
    guideFee?: number;
    companyEarning?: number;
    createdAt: string;
    updatedAt?: string;
}

export default function InvoiceDownload() {
    const [bookings, setBookings] = useState<IBooking[]>([]);
    const [loading, setLoading] = useState(true);
    const [downloadingId, setDownloadingId] = useState<string | null>(null);

    useEffect(() => {
        fetchPaidBookings();
    }, []);

    const fetchPaidBookings = async () => {
        try {
            setLoading(true);
            const response = await getMyBookings();
            
            if (response.success && response.data) {
                // Filter only COMPLETE bookings with PAID payments
                const paidBookings = response.data.filter(
                    (booking) => 
                        booking.status === "COMPLETE" && 
                        (booking.payment as any)?.status === "PAID"
                );
                setBookings(paidBookings as unknown as IBooking[]);
            }
        } catch (error) {
            console.error("Error fetching bookings:", error);
            toast.error("Failed to fetch bookings");
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadInvoice = async (paymentId: string, tourTitle: string) => {
        try {
            setDownloadingId(paymentId);
            const invoiceUrl = await getInvoiceDownloadUrl(paymentId);

            if (invoiceUrl) {
                // Open invoice in new tab
                window.open(invoiceUrl, "_blank");
                toast.success("Invoice opened successfully");
            } else {
                toast.error("Invoice URL not found");
            }
        } catch (error) {
            console.error("Error downloading invoice:", error);
            toast.error("Failed to download invoice");
        } finally {
            setDownloadingId(null);
        }
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const formatCurrency = (amount: number) => {
        return `৳${amount.toLocaleString()}`;
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Invoice Downloads
                </h1>
                <p className="text-gray-600">
                    Download invoices for your completed paid tours
                </p>
            </div>

            {bookings.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
                    <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        No Invoices Available
                    </h3>
                    <p className="text-gray-600">
                        You don&apos;t have any completed paid bookings yet.
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {bookings.map((booking) => (
                        <div
                            key={booking._id}
                            className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow"
                        >
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        {booking.tour.title}
                                    </h3>
                                    <div className="space-y-1 text-sm text-gray-600">
                                        <p>
                                            <span className="font-medium">Booking Date:</span>{" "}
                                            {formatDate(booking.createdAt)}
                                        </p>
                                        {booking.tour.startDate && (
                                            <p>
                                                <span className="font-medium">Tour Date:</span>{" "}
                                                {formatDate(booking.tour.startDate)}
                                            </p>
                                        )}
                                        <p>
                                            <span className="font-medium">Location:</span>{" "}
                                            {booking.tour.location}
                                        </p>
                                        <p>
                                            <span className="font-medium">Guests:</span>{" "}
                                            {booking.guestCount}
                                        </p>
                                        <p>
                                            <span className="font-medium">Transaction ID:</span>{" "}
                                            {booking.payment.transactionId}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-col items-end gap-3">
                                    <div className="text-right">
                                        <p className="text-sm text-gray-600 mb-1">Total Paid</p>
                                        <p className="text-2xl font-bold text-green-600">
                                            {formatCurrency(booking.payment.amount)}
                                        </p>
                                    </div>

                                    <button
                                        onClick={() =>
                                            handleDownloadInvoice(
                                                booking.payment._id,
                                                booking.tour.title
                                            )
                                        }
                                        disabled={downloadingId === booking.payment._id}
                                        className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
                                    >
                                        {downloadingId === booking.payment._id ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Loading...
                                            </>
                                        ) : (
                                            <>
                                                <Download className="w-4 h-4" />
                                                Download Invoice
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t">
                                <div className="flex items-center gap-2">
                                    <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                                        PAID
                                    </span>
                                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                                        COMPLETE
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}