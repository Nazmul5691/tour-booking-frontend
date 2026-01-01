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
  Mail
} from "lucide-react";
import { IBooking } from "@/services/booking/bookingService";

interface Props {
  open: boolean;
  onClose: () => void;
  booking: IBooking | null;
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

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Booking Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status Badge */}
          <div className="flex justify-between items-center">
            <Badge variant="outline" className={getStatusColor(booking.status)}>
              {booking.status}
            </Badge>
            <span className="text-sm text-muted-foreground">
              ID: {booking._id}
            </span>
          </div>

          <Separator />

          {/* Tour Information */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Tour Information</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Tag className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Tour Name</p>
                  <p className="font-medium">{booking.tour.title}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">{booking.tour.location}</p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Customer Information */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Customer Information</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{booking.user.name}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{booking.user.email}</p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Booking Details */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Booking Details</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Number of Guests</p>
                  <p className="font-medium">{booking.guestCount}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Booking Date</p>
                  <p className="font-medium">{formatDate(booking.createdAt)}</p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Payment Details */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Payment Details</h3>
            <div className="space-y-3 bg-muted/50 p-4 rounded-lg">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Base Amount</span>
                <span className="font-medium">{formatCurrency(booking.baseAmount)}</span>
              </div>
              
              {booking.discountPercentage && booking.discountPercentage > 0 && (
                <>
                  <div className="flex justify-between text-green-600">
                    <span className="text-sm">
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
              
              <div className="flex justify-between text-lg">
                <span className="font-semibold">Total Amount</span>
                <span className="font-bold text-primary">
                  {formatCurrency(booking.amountAfterDiscount)}
                </span>
              </div>

              {booking.guideFee && (
                <>
                  <Separator />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Guide Fee</span>
                    <span>{formatCurrency(booking.guideFee)}</span>
                  </div>
                </>
              )}

              {booking.companyEarning && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Company Earning</span>
                  <span>{formatCurrency(booking.companyEarning)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Payment ID */}
          {booking.payment && (
            <>
              <Separator />
              <div>
                <p className="text-sm text-muted-foreground">Payment ID</p>
                <p className="font-mono text-sm">{booking.payment}</p>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingViewDialog;