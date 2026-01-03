

/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, MapPin, Calendar, Users, Star } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { getMyBookings, IBooking } from "@/services/booking/bookingService";


interface Booking {
  _id: string;
  tour: {
    _id: string;
    title: string;
    location?: string;
    images?: string[];
  };
  status: string;
  guestCount: number;
  createdAt?: string; 
  hasReview?: boolean;
}

export default function Review() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    fetchPendingReviews();
  }, []);


  const fetchPendingReviews = async () => {
    try {
      setLoading(true);
      const response = await getMyBookings();
      
      console.log("All bookings:", response?.data); // ✅ Debug log
      
      const allBookings: IBooking[] = response?.data || [];

      
      const completedBookings = allBookings.filter((booking: IBooking) => 
        booking.status === "COMPLETE" && !booking.hasReview
      );

      // console.log("Completed bookings without reviews:", completedBookings); 

      setBookings(completedBookings as Booking[]);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Pending Reviews</h1>
        <p className="text-muted-foreground">
          Share your experience and help others discover great tours
        </p>
      </div>

      {bookings.length === 0 ? (
        <Card>
          <CardContent className="py-12">
            <div className="text-center">
              <Star className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No Pending Reviews</h3>
              <p className="text-muted-foreground mb-6">
                You don't have any completed tours waiting for review
              </p>
              <div className="flex gap-3 justify-center">
                <Button
                  onClick={() => router.push("/dashboard/my-bookings")}
                  variant="outline"
                >
                  View My Bookings
                </Button>
                <Button onClick={() => router.push("/allTours")}>
                  Browse Tours
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bookings.map((booking) => (
            <Card
              key={booking._id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48 w-full bg-muted">
                {booking.tour.images && booking.tour.images[0] ? (
                  <Image
                    src={booking.tour.images[0]}
                    alt={booking.tour.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <MapPin className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}
              </div>

              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg line-clamp-2">
                    {booking.tour.title}
                  </CardTitle>
                  <Badge variant="secondary" className="shrink-0">
                    Completed
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  {booking.tour.location && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{booking.tour.location}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Completed on {formatDate(booking.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{booking.guestCount} Guest{booking.guestCount > 1 ? 's' : ''}</span>
                  </div>
                </div>

                <Button
                  onClick={() =>
                    router.push(`/dashboard/review/${booking._id}`)
                  }
                  className="w-full"
                >
                  <Star className="mr-2 h-4 w-4" />
                  Write a Review
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {bookings.length > 0 && (
        <div className="mt-8 text-center">
          <p className="text-muted-foreground">
            You have <span className="font-semibold text-foreground">{bookings.length}</span>{" "}
            tour{bookings.length > 1 ? 's' : ''} waiting for your review
          </p>
        </div>
      )}
    </div>
  );
}