"use client";

import Image from "next/image";
import { CheckSquare, XSquare } from "lucide-react";
// import LocationMap from "@/components/shared/LocationMap";
import { ITour } from "@/types/tour.interface";
import LocationMap from "./LocationMap";

interface Option {
    _id: string;
    name: string;
}

interface TourDetailsLeftProps {
    tour: ITour;
    tourTypes: Option[];
    divisions: Option[];
}

export default function TourDetailsLeft({ tour, tourTypes, divisions }: TourDetailsLeftProps) {
    if (!tour) return <p>No tour data available</p>;

    const tourTypeName = tourTypes.find(t => t._id === tour.tourType)?.name || "N/A";
    const divisionName = divisions.find(d => d._id === tour.division)?.name || "N/A";

    return (
        <div className="lg:col-span-2 space-y-6">
            {/* Images */}
            <div className="w-full">
                {tour.images?.map((img: string, idx: number) => (
                    <Image key={idx} 
                    src={img} 
                    width={1000} 
                    height={600} 
                    alt={`Tour Image ${idx + 1}`} 
                    className="rounded-lg" />
                ))}
            </div>

            {/* Title & Info */}
            <div>
                <h1 className="text-2xl font-bold mb-2">{tour.title}</h1>
                <p className="text-gray-600 mb-2">{tourTypeName} | {divisionName}</p>
                <p className="text-orange-600 font-bold">৳{tour.costFrom?.toLocaleString()}</p>
            </div>

            {/* Description */}
            <div className="bg-gray-100 p-5 rounded-md">
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p>{tour.description}</p>
            </div>

            {/* Tour Plans */}
            <div className="bg-gray-100 p-5 rounded-md">
                <h2 className="text-xl font-semibold mb-2">Tour Plans</h2>
                <ol className="list-decimal list-inside space-y-1">
                    {tour.tourPlan?.map((plan: string, idx: number) => <li key={idx}>{plan}</li>)}
                </ol>
            </div>

            {/* Amenities */}
            <div className="bg-gray-100 p-5 rounded-md">
                <h2 className="text-xl font-semibold mb-2">Amenities</h2>
                <ol className="list-disc list-inside space-y-1">
                    {tour.amenities?.map((amenity: string, idx: number) => <li key={idx}>{amenity}</li>)}
                </ol>
            </div>

            {/* Included & Excluded */}
            <div className="bg-gray-100 p-5 rounded-md flex gap-4">
                <div className="flex-1">
                    <h3 className="font-semibold mb-2">Included</h3>
                    <ol className="space-y-1">
                        {tour.included?.map((item: string, idx: number) => (
                            <li key={idx} className="flex items-center gap-2">
                                <CheckSquare className="h-4 w-4 text-green-600" /> {item}
                            </li>
                        ))}
                    </ol>
                </div>
                <div className="flex-1">
                    <h3 className="font-semibold mb-2">Excluded</h3>
                    <ol className="space-y-1">
                        {tour.excluded?.map((item: string, idx: number) => (
                            <li key={idx} className="flex items-center gap-2">
                                <XSquare className="h-4 w-4 text-red-600" /> {item}
                            </li>
                        ))}
                    </ol>
                </div>
            </div>

            {/* Gallery */}
            <div className="bg-gray-100 p-5 rounded-md">
                <h2 className="text-xl font-semibold mb-2">Gallery</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
                    {tour.images?.map((img: string, idx: number) => (
                        <Image key={idx} src={img} width={300} height={200} alt={`Gallery ${idx + 1}`} className="rounded-md" />
                    ))}
                </div>
            </div>

            {/* Location Map */}
            <div className="bg-gray-100 p-5 rounded-md">
                <h2 className="text-xl font-semibold mb-2">Location</h2>
                <div className="w-full h-64">
                    <LocationMap locationName={tour.location || "Bangladesh"} />
                </div>
            </div>
        </div>
    );
}
