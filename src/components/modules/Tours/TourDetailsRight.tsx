"use client";

import { Button } from "@/components/ui/button";
import { ITour } from "@/types/tour.interface";
import Link from "next/link";

interface TourDetailsRightProps {
    tour: ITour;
}

export default function TourDetailsRight({ tour }: TourDetailsRightProps) {
    if (!tour) return <p>No tour data available</p>;

    const startDate = tour.startDate ? new Date(tour.startDate) : new Date();
    const endDate = tour.endDate ? new Date(tour.endDate) : new Date();
    const durationDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const nights = durationDays > 0 ? durationDays - 1 : 0;

    return (
        <div className="space-y-6">
            <div className="bg-gray-100 p-5 border shadow-md rounded-md space-y-3">
                <h2 className="text-xl font-semibold">Tour Details</h2>
                <div className="grid grid-cols-2">
                    <span>Date:</span>
                    <span>{startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}</span>
                </div>
                <div className="grid grid-cols-2">
                    <span>Duration:</span>
                    <span>{durationDays} days, {nights} nights</span>
                </div>
                <div className="grid grid-cols-2">
                    <span>Destination:</span>
                    <span>{tour.location}</span>
                </div>
                <div className="grid grid-cols-2">
                    <span>Max Guests:</span>
                    <span>{tour.maxGuest}</span>
                </div>
                <div className="grid grid-cols-2">
                    <span>Cost From:</span>
                    <span>৳{tour.costFrom?.toLocaleString()}</span>
                </div>
            </div>

            {/* Book Now Button */}
            <Button className="w-full bg-linear-to-r from-yellow-400 via-orange-500 to-pink-500 hover:from-yellow-500 hover:to-rose-600 font-semibold">
                <Link href={`/bookTour/${tour.slug}`}>Book Now</Link>
            </Button>
        </div>
    );
}
