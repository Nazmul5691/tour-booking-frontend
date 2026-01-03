/* eslint-disable react/no-unescaped-entities */
// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { StarRating } from "@/components/ui/star-rating";
// import { toast } from "sonner";
// import { Loader2, MapPin, User } from "lucide-react";
// import {
//   getBookingForReview,
//   createTourReview,
//   createGuideReview,
// } from "@/services/review/reviewService";
// import Image from "next/image";

// interface BookingData {
//   _id: string;
//   tour: {
//     _id: string;
//     title: string;
//     location?: string;
//     images?: string[];
//   };
//   guides?: Array<{
//     _id: string;
//     user: {
//       _id: string;
//       name: string;
//       email: string;
//     };
//   }>;
//   status: string;
// }

// export default function ReviewPage() {
//   const params = useParams();
//   const router = useRouter();
//   const bookingId = params.bookingId as string;

//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [booking, setBooking] = useState<BookingData | null>(null);

//   // Tour Review State
//   const [tourRating, setTourRating] = useState(0);
//   const [tourComment, setTourComment] = useState("");
//   const [tourReviewSubmitted, setTourReviewSubmitted] = useState(false);

//   // Guide Review State
//   const [guideRating, setGuideRating] = useState(0);
//   const [guideComment, setGuideComment] = useState("");
//   const [guideReviewSubmitted, setGuideReviewSubmitted] = useState(false);

//   useEffect(() => {
//     fetchBookingData();
//   }, [bookingId]);

//   const fetchBookingData = async () => {
//     try {
//       setLoading(true);
//       const response = await getBookingForReview(bookingId);

//       if (response.success) {
//         // Check if booking is complete
//         if (response.data.status !== "COMPLETE") {
//           toast.error("You can only review completed bookings");
//           router.push("/my-bookings");
//           return;
//         }
//         setBooking(response.data);
//       } else {
//         toast.error(response.message);
//         router.push("/my-bookings");
//       }
//     } catch (error) {
//       toast.error("Failed to load booking details");
//       router.push("/my-bookings");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleTourReviewSubmit = async () => {
//     if (tourRating === 0) {
//       toast.error("Please select a rating for the tour");
//       return;
//     }

//     try {
//       setSubmitting(true);
//       const response = await createTourReview({
//         booking: bookingId,
//         tour: booking!.tour._id,
//         rating: tourRating,
//         comment: tourComment || undefined,
//       });

//       if (response.success) {
//         toast.success("Tour review submitted successfully!");
//         setTourReviewSubmitted(true);
//       } else {
//         toast.error(response.message);
//       }
//     } catch (error) {
//       toast.error("Failed to submit tour review");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleGuideReviewSubmit = async () => {
//     if (guideRating === 0) {
//       toast.error("Please select a rating for the guide");
//       return;
//     }

//     if (!booking?.guides || booking.guides.length === 0) {
//       toast.error("No guide available for this tour");
//       return;
//     }

//     try {
//       setSubmitting(true);
//       const response = await createGuideReview({
//         booking: bookingId,
//         guide: booking.guides[0]._id, // Assuming first guide
//         rating: guideRating,
//         comment: guideComment || undefined,
//       });

//       if (response.success) {
//         toast.success("Guide review submitted successfully!");
//         setGuideReviewSubmitted(true);
//       } else {
//         toast.error(response.message);
//       }
//     } catch (error) {
//       toast.error("Failed to submit guide review");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const allReviewsSubmitted =
//     tourReviewSubmitted &&
//     (!booking?.guides || booking.guides.length === 0 || guideReviewSubmitted);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <Loader2 className="h-8 w-8 animate-spin text-primary" />
//       </div>
//     );
//   }

//   if (!booking) {
//     return null;
//   }

//   return (
//     <div className="container mx-auto py-8 px-4 max-w-4xl">
//       <h1 className="text-3xl font-bold mb-6">Share Your Experience</h1>

//       {/* Tour Details Card */}
//       <Card className="mb-6">
//         <CardContent className="pt-6">
//           <div className="flex gap-4">
//             {booking.tour.images && booking.tour.images[0] && (
//               <Image
//                 src={booking.tour.images[0]}
//                 alt={booking.tour.title}
//                 height={24}
//                 width={24}
//                 className="object-cover rounded-lg"
//               />
//             )}
//             <div>
//               <h2 className="text-xl font-semibold">{booking.tour.title}</h2>
//               {booking.tour.location && (
//                 <p className="text-muted-foreground flex items-center gap-1 mt-1">
//                   <MapPin className="h-4 w-4" />
//                   {booking.tour.location}
//                 </p>
//               )}
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Tour Review Form */}
//       <Card className="mb-6">
//         <CardHeader>
//           <CardTitle>Rate Your Tour Experience</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           {tourReviewSubmitted ? (
//             <div className="text-center py-8">
//               <div className="text-green-600 font-semibold mb-2">
//                 ✓ Tour review submitted successfully!
//               </div>
//               <p className="text-muted-foreground">
//                 Thank you for sharing your experience.
//               </p>
//             </div>
//           ) : (
//             <>
//               <div>
//                 <Label>Rating *</Label>
//                 <div className="mt-2">
//                   <StarRating
//                     rating={tourRating}
//                     onRatingChange={setTourRating}
//                     size="lg"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <Label htmlFor="tour-comment">
//                   Your Review (Optional)
//                 </Label>
//                 <Textarea
//                   id="tour-comment"
//                   placeholder="Share your thoughts about this tour..."
//                   value={tourComment}
//                   onChange={(e) => setTourComment(e.target.value)}
//                   rows={4}
//                   className="mt-2"
//                 />
//               </div>

//               <Button
//                 onClick={handleTourReviewSubmit}
//                 disabled={submitting || tourRating === 0}
//                 className="w-full"
//               >
//                 {submitting ? (
//                   <>
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     Submitting...
//                   </>
//                 ) : (
//                   "Submit Tour Review"
//                 )}
//               </Button>
//             </>
//           )}
//         </CardContent>
//       </Card>

//       {/* Guide Review Form - Only show if guide exists */}
//       {booking.guides && booking.guides.length > 0 && (
//         <Card className="mb-6">
//           <CardHeader>
//             <CardTitle>Rate Your Guide</CardTitle>
//             <p className="text-sm text-muted-foreground flex items-center gap-2 mt-2">
//               <User className="h-4 w-4" />
//               {booking.guides[0].user.name}
//             </p>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             {guideReviewSubmitted ? (
//               <div className="text-center py-8">
//                 <div className="text-green-600 font-semibold mb-2">
//                   ✓ Guide review submitted successfully!
//                 </div>
//                 <p className="text-muted-foreground">
//                   Thank you for rating your guide.
//                 </p>
//               </div>
//             ) : (
//               <>
//                 <div>
//                   <Label>Rating *</Label>
//                   <div className="mt-2">
//                     <StarRating
//                       rating={guideRating}
//                       onRatingChange={setGuideRating}
//                       size="lg"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <Label htmlFor="guide-comment">
//                     Your Review (Optional)
//                   </Label>
//                   <Textarea
//                     id="guide-comment"
//                     placeholder="Share your thoughts about your guide..."
//                     value={guideComment}
//                     onChange={(e) => setGuideComment(e.target.value)}
//                     rows={4}
//                     className="mt-2"
//                   />
//                 </div>

//                 <Button
//                   onClick={handleGuideReviewSubmit}
//                   disabled={submitting || guideRating === 0}
//                   className="w-full"
//                 >
//                   {submitting ? (
//                     <>
//                       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                       Submitting...
//                     </>
//                   ) : (
//                     "Submit Guide Review"
//                   )}
//                 </Button>
//               </>
//             )}
//           </CardContent>
//         </Card>
//       )}

//       {/* Done Button */}
//       {allReviewsSubmitted && (
//         <div className="text-center">
//           <Button
//             onClick={() => router.push("/my-bookings")}
//             size="lg"
//             className="px-8"
//           >
//             Done
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// }





// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { StarRating } from "@/components/ui/star-rating";
// import { toast } from "sonner";
// import { Loader2, MapPin } from "lucide-react";
// import {
//   getBookingForReview,
//   createTourReview,
// } from "@/services/review/reviewService";
// import Image from "next/image";

// interface BookingData {
//   _id: string;
//   tour: {
//     _id: string;
//     title: string;
//     location?: string;
//     images?: string[];
//   };
//   guide?: string; // ObjectId as string (not populated)
//   status: string;
// }

// export default function ReviewPage() {
//   const params = useParams();
//   const router = useRouter();
//   const bookingId = params.bookingId as string;

//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [booking, setBooking] = useState<BookingData | null>(null);

//   // Tour Review State
//   const [tourRating, setTourRating] = useState(0);
//   const [tourComment, setTourComment] = useState("");
//   const [tourReviewSubmitted, setTourReviewSubmitted] = useState(false);

//   useEffect(() => {
//     if (bookingId) {
//       fetchBookingData();
//     }
//   }, [bookingId]);

//   const fetchBookingData = async () => {
//     try {
//       setLoading(true);
//       const response = await getBookingForReview(bookingId);

//       console.log("Booking data:", response.data); // Debug log

//       if (response.success) {
//         // Check if booking is complete
//         if (response.data.status !== "COMPLETE") {
//           toast.error("You can only review completed bookings");
//           router.push("/dashboard/my-bookings");
//           return;
//         }
//         setBooking(response.data);
//       } else {
//         toast.error(response.message || "Failed to load booking details");
//         router.push("/dashboard/my-bookings");
//       }
//     } catch (error) {
//       console.error("Error fetching booking:", error);
//       toast.error("Failed to load booking details");
//       router.push("/dashboard/my-bookings");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleTourReviewSubmit = async () => {
//     if (tourRating === 0) {
//       toast.error("Please select a rating for the tour");
//       return;
//     }

//     try {
//       setSubmitting(true);
//       const response = await createTourReview({
//         booking: bookingId,
//         tour: booking!.tour._id,
//         rating: tourRating,
//         comment: tourComment || undefined,
//       });

//       if (response.success) {
//         toast.success("Tour review submitted successfully!");
//         setTourReviewSubmitted(true);

//         // Auto redirect after 2 seconds
//         setTimeout(() => {
//           router.push("/dashboard/my-bookings");
//         }, 2000);
//       } else {
//         toast.error(response.message || "Failed to submit review");
//       }
//     } catch (error) {
//       console.error("Error submitting review:", error);
//       toast.error("Failed to submit tour review");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <Loader2 className="h-8 w-8 animate-spin text-primary" />
//       </div>
//     );
//   }

//   if (!booking) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <p className="text-muted-foreground mb-4">Booking not found</p>
//           <Button onClick={() => router.push("/dashboard/my-bookings")}>
//             Go to My Bookings
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto py-8 px-4 max-w-4xl">
//       <h1 className="text-3xl font-bold mb-6">Share Your Experience</h1>

//       {/* Tour Details Card */}
//       <Card className="mb-6">
//         <CardContent className="pt-6">
//           <div className="flex gap-4">
//             {booking.tour.images && booking.tour.images[0] && (
//               <div className="relative w-24 h-24 shrink-0">
//                 <Image
//                   src={booking.tour.images[0]}
//                   alt={booking.tour.title}
//                   fill
//                   className="object-cover rounded-lg"
//                 />
//               </div>
//             )}
//             <div className="flex-1">
//               <h2 className="text-xl font-semibold">{booking.tour.title}</h2>
//               {booking.tour.location && (
//                 <p className="text-muted-foreground flex items-center gap-1 mt-1">
//                   <MapPin className="h-4 w-4" />
//                   {booking.tour.location}
//                 </p>
//               )}
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Tour Review Form */}
//       <Card className="mb-6">
//         <CardHeader>
//           <CardTitle>Rate Your Tour Experience</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           {tourReviewSubmitted ? (
//             <div className="text-center py-8">
//               <div className="text-green-600 font-semibold mb-2 text-lg">
//                 ✓ Tour review submitted successfully!
//               </div>
//               <p className="text-muted-foreground mb-4">
//                 Thank you for sharing your experience.
//               </p>
//               <p className="text-sm text-muted-foreground">
//                 Redirecting to your bookings...
//               </p>
//             </div>
//           ) : (
//             <>
//               <div>
//                 <Label>Rating *</Label>
//                 <div className="mt-2">
//                   <StarRating
//                     rating={tourRating}
//                     onRatingChange={setTourRating}
//                     size="lg"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <Label htmlFor="tour-comment">Your Review (Optional)</Label>
//                 <Textarea
//                   id="tour-comment"
//                   placeholder="Share your thoughts about this tour..."
//                   value={tourComment}
//                   onChange={(e) => setTourComment(e.target.value)}
//                   rows={4}
//                   className="mt-2"
//                 />
//               </div>

//               <Button
//                 onClick={handleTourReviewSubmit}
//                 disabled={submitting || tourRating === 0}
//                 className="w-full"
//               >
//                 {submitting ? (
//                   <>
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     Submitting...
//                   </>
//                 ) : (
//                   "Submit Tour Review"
//                 )}
//               </Button>
//             </>
//           )}
//         </CardContent>
//       </Card>

//       {/* Back Button */}
//       <div className="text-center">
//         <Button
//           onClick={() => router.push("/dashboard/my-bookings")}
//           variant="outline"
//           size="lg"
//           className="px-8"
//           disabled={submitting}
//         >
//           Back to My Bookings
//         </Button>
//       </div>
//     </div>
//   );
// }







/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { StarRating } from "@/components/ui/star-rating";
import { toast } from "sonner";
import { Loader2, MapPin, AlertCircle } from "lucide-react";
import {
  getBookingForReview,
  createTourReview,
} from "@/services/review/reviewService";
import Image from "next/image";

interface BookingData {
  _id: string;
  tour: {
    _id: string;
    title: string;
    location?: string;
    images?: string[];
  };
  guide?: string;
  status: string;
  hasReview?: boolean;
}

export default function ReviewPage() {
  const params = useParams();
  const router = useRouter();
  const bookingId = params.bookingId as string;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [booking, setBooking] = useState<BookingData | null>(null);
  const [alreadyReviewed, setAlreadyReviewed] = useState(false);

  // Tour Review State
  const [tourRating, setTourRating] = useState(0);
  const [tourComment, setTourComment] = useState("");
  const [tourReviewSubmitted, setTourReviewSubmitted] = useState(false);

  useEffect(() => {
    if (bookingId) {
      fetchBookingData();
    }
  }, [bookingId]);

  const fetchBookingData = async () => {
    try {
      setLoading(true);
      const response = await getBookingForReview(bookingId);

      console.log("Booking data:", response); // Debug log

      if (response.success) {
        const bookingData = response.data;

        // Check if booking is complete
        if (bookingData.status !== "COMPLETE") {
          toast.error("You can only review completed bookings");
          router.push("/dashboard/my-bookings");
          return;
        }

        // Check if already reviewed
        if (bookingData.hasReview) {
          setAlreadyReviewed(true);
          toast.info("You have already reviewed this tour");
        }

        setBooking(bookingData);
      } else {
        toast.error(response.message || "Failed to load booking details");
        router.push("/dashboard/my-bookings");
      }
    } catch (error) {
      console.error("Error fetching booking:", error);
      toast.error("Failed to load booking details");
      router.push("/dashboard/my-bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleTourReviewSubmit = async () => {
    if (tourRating === 0) {
      toast.error("Please select a rating for the tour");
      return;
    }

    if (alreadyReviewed) {
      toast.error("You have already reviewed this tour");
      return;
    }

    try {
      setSubmitting(true);
      const response = await createTourReview({
        booking: bookingId,
        tour: booking!.tour._id,
        rating: tourRating,
        comment: tourComment || undefined,
      });

      if (response.success) {
        toast.success("Tour review submitted successfully!");
        setTourReviewSubmitted(true);

        // Auto redirect after 2 seconds
        setTimeout(() => {
          router.push("/dashboard/review");
        }, 2000);
      } else {
        // Handle duplicate review error
        if (response.message?.includes("Already reviewed")) {
          setAlreadyReviewed(true);
          toast.error("You have already reviewed this tour");
        } else {
          toast.error(response.message || "Failed to submit review");
        }
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit tour review");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <p className="text-lg font-semibold mb-2">Booking not found</p>
          <p className="text-muted-foreground mb-4">
            The booking you're looking for doesn't exist or you don't have access to it.
          </p>
          <Button onClick={() => router.push("/dashboard/my-bookings")}>
            Go to My Bookings
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => router.push("/dashboard/review")}
          className="mb-4"
        >
          ← Back to Pending Reviews
        </Button>
        <h1 className="text-3xl font-bold">Share Your Experience</h1>
      </div>

      {/* Tour Details Card */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            {booking.tour.images && booking.tour.images[0] ? (
              <div className="relative w-24 h-24 shrink-0">
                <Image
                  src={booking.tour.images[0]}
                  alt={booking.tour.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            ) : (
              <div className="w-24 h-24 shrink-0 bg-muted rounded-lg flex items-center justify-center">
                <MapPin className="h-8 w-8 text-muted-foreground" />
              </div>
            )}
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{booking.tour.title}</h2>
              {booking.tour.location && (
                <p className="text-muted-foreground flex items-center gap-1 mt-1">
                  <MapPin className="h-4 w-4" />
                  {booking.tour.location}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Already Reviewed Alert */}
      {alreadyReviewed && !tourReviewSubmitted && (
        <Card className="mb-6 border-yellow-200 bg-yellow-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-yellow-900">
                  Already Reviewed
                </h3>
                <p className="text-sm text-yellow-800">
                  You have already submitted a review for this tour. Each booking can only be reviewed once.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tour Review Form */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Rate Your Tour Experience</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {tourReviewSubmitted ? (
            <div className="text-center py-8">
              <div className="text-green-600 font-semibold mb-2 text-lg">
                ✓ Tour review submitted successfully!
              </div>
              <p className="text-muted-foreground mb-4">
                Thank you for sharing your experience.
              </p>
              <p className="text-sm text-muted-foreground">
                Redirecting to pending reviews...
              </p>
            </div>
          ) : alreadyReviewed ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">
                You have already reviewed this tour.
              </p>
              <Button
                onClick={() => router.push("/dashboard/review")}
                variant="outline"
              >
                View Pending Reviews
              </Button>
            </div>
          ) : (
            <>
              <div>
                <Label>Rating *</Label>
                <div className="mt-2">
                  <StarRating
                    rating={tourRating}
                    onRatingChange={setTourRating}
                    size="lg"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="tour-comment">Your Review (Optional)</Label>
                <Textarea
                  id="tour-comment"
                  placeholder="Share your thoughts about this tour..."
                  value={tourComment}
                  onChange={(e) => setTourComment(e.target.value)}
                  rows={4}
                  className="mt-2"
                />
              </div>

              <Button
                onClick={handleTourReviewSubmit}
                disabled={submitting || tourRating === 0 || alreadyReviewed}
                className="w-full"
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Tour Review"
                )}
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex gap-3 justify-center">
        <Button
          onClick={() => router.push("/dashboard/review")}
          variant="outline"
          size="lg"
          disabled={submitting}
        >
          Pending Reviews
        </Button>
        <Button
          onClick={() => router.push("/dashboard/my-bookings")}
          variant="outline"
          size="lg"
          disabled={submitting}
        >
          My Bookings
        </Button>
      </div>
    </div>
  );
}