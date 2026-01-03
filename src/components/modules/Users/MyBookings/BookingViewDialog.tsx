
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Calendar, 
  MapPin, 
  Users, 
  DollarSign, 
  Tag, 
  User,
  Mail,
  ExternalLink
} from "lucide-react";
import { IBooking } from "@/services/booking/bookingService";
import { Button } from "@/components/ui/button";

interface Props {
  open: boolean;
  onClose: () => void;
  booking: IBooking | null;
}


interface IPayment {
  _id: string;
  transactionId?: string;
  amount?: number;
  status?: string;
  invoiceUrl?: string;
}

const BookingViewDialog = ({ open, onClose, booking }: Props) => {
  if (!booking) return null;

  const formatDate = (date?: string) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount?: number) => {
    if (!amount) return "৳0";
    return `৳${amount.toLocaleString()}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETE":
        return "bg-green-500/10 text-green-600 border-green-500/20";
      case "PENDING":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
      case "FAILED":
        return "bg-red-500/10 text-red-600 border-red-500/20";
      case "CANCEL":
        return "bg-gray-500/10 text-gray-600 border-gray-500/20";
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-500/20";
    }
  };

  // Extract payment object safely with proper typing
  const payment = (typeof booking.payment === 'object' && booking.payment !== null 
    ? booking.payment 
    : null) as IPayment | null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl">Booking Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6">
          {/* Status Badge */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <Badge variant="outline" className={getStatusColor(booking.status)}>
              {booking.status}
            </Badge>
            <span className="text-xs sm:text-sm text-muted-foreground break-all">
              ID: {booking._id}
            </span>
          </div>

          <Separator />

          {/* Tour Information */}
          <div>
            <h3 className="font-semibold text-base sm:text-lg mb-3">Tour Information</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-2 sm:space-x-3">
                <Tag className="h-4 sm:h-5 w-4 sm:w-5 text-muted-foreground mt-0.5 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm text-muted-foreground">Tour Name</p>
                  <p className="font-medium text-sm sm:text-base wrap-break-word">{booking.tour.title}</p>
                </div>
              </div>
              <div className="flex items-start space-x-2 sm:space-x-3">
                <MapPin className="h-4 sm:h-5 w-4 sm:w-5 text-muted-foreground mt-0.5 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm text-muted-foreground">Location</p>
                  <p className="font-medium text-sm sm:text-base wrap-break-word">{booking.tour.location}</p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Customer Information */}
          <div>
            <h3 className="font-semibold text-base sm:text-lg mb-3">Customer Information</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-2 sm:space-x-3">
                <User className="h-4 sm:h-5 w-4 sm:w-5 text-muted-foreground mt-0.5 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm text-muted-foreground">Name</p>
                  <p className="font-medium text-sm sm:text-base wrap-break-word">{booking.user.name}</p>
                </div>
              </div>
              <div className="flex items-start space-x-2 sm:space-x-3">
                <Mail className="h-4 sm:h-5 w-4 sm:w-5 text-muted-foreground mt-0.5 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm text-muted-foreground">Email</p>
                  <p className="font-medium text-sm sm:text-base break-all">{booking.user.email}</p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Booking Details */}
          <div>
            <h3 className="font-semibold text-base sm:text-lg mb-3">Booking Details</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-2 sm:space-x-3">
                <Users className="h-4 sm:h-5 w-4 sm:w-5 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Number of Guests</p>
                  <p className="font-medium text-sm sm:text-base">{booking.guestCount}</p>
                </div>
              </div>
              <div className="flex items-start space-x-2 sm:space-x-3">
                <Calendar className="h-4 sm:h-5 w-4 sm:w-5 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Booking Date</p>
                  <p className="font-medium text-sm sm:text-base">{formatDate(booking.createdAt)}</p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Payment Details */}
          <div>
            <h3 className="font-semibold text-base sm:text-lg mb-3">Payment Details</h3>
            <div className="space-y-3 bg-muted/50 p-3 sm:p-4 rounded-lg">
              <div className="flex justify-between text-sm sm:text-base">
                <span className="text-muted-foreground">Base Amount</span>
                <span className="font-medium">{formatCurrency(booking.baseAmount)}</span>
              </div>
              
              {booking.discountPercentage && booking.discountPercentage > 0 && (
                <>
                  <div className="flex justify-between text-green-600 text-sm sm:text-base">
                    <span>
                      Discount ({booking.discountPercentage}%)
                    </span>
                    <span className="font-medium">
                      -{formatCurrency(
                        (booking.baseAmount || 0) - (booking.amountAfterDiscount || 0)
                      )}
                    </span>
                  </div>
                  <Separator />
                </>
              )}
              
              <div className="flex justify-between text-base sm:text-lg">
                <span className="font-semibold">Total Amount</span>
                <span className="font-bold text-primary">
                  {formatCurrency(booking.amountAfterDiscount)}
                </span>
              </div>

              {booking.guideFee && (
                <>
                  <Separator />
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-muted-foreground">Guide Fee</span>
                    <span>{formatCurrency(booking.guideFee)}</span>
                  </div>
                </>
              )}

              {booking.companyEarning && (
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-muted-foreground">Company Earning</span>
                  <span>{formatCurrency(booking.companyEarning)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Payment Information */}
          {payment && (
            <>
              <Separator />
              <div>
                <h3 className="font-semibold text-base sm:text-lg mb-3">Payment Information</h3>
                <div className="space-y-2 bg-muted/30 p-3 sm:p-4 rounded-lg">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-muted-foreground">Transaction ID</span>
                    <span className="font-mono break-all">{payment.transactionId || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-muted-foreground">Payment Status</span>
                    <Badge variant="outline" className={getStatusColor(payment.status || 'PENDING')}>
                      {payment.status || 'PENDING'}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-muted-foreground">Amount Paid</span>
                    <span className="font-medium">{formatCurrency(payment.amount)}</span>
                  </div>
                  {payment.invoiceUrl && (
                    <div className="pt-2">
                      <a 
                        href={payment.invoiceUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex"
                      >
                        <Button variant="outline" size="sm" className="w-full sm:w-auto">
                          View Invoice
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingViewDialog;