

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { getAllTours } from "@/services/admin/tourManagement";
import { MapPin, Calendar, Users, Clock, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DiscoverTours() {

    const [tours, setTours] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        const fetchTours = async () => {
            const toursData = await getAllTours();
            console.log('API Response:', toursData?.data);
            setTours(toursData?.data || []); 
            setLoading(false);
        };

        fetchTours();
    }, []);


    if (loading) {
        return (
            <div className="flex items-center justify-center h-[60vh] text-lg text-muted-foreground">
                Loading tours...
            </div>
        );
    }

    // Helper function to calculate duration in days
    const calculateDays = (start: string, end: string) => {
        const startDate = new Date(start);
        const endDate = new Date(end);
        const diffTime = endDate.getTime() - startDate.getTime();
        return Math.max(Math.ceil(diffTime / (1000 * 60 * 60 * 24)), 1); // At least 1 day
    };

    return (
        <section className="container mx-auto px-4 py-10">
            {/* Header */}
            <div className="text-center mb-12">
                <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Explore Our Destinations
                </span>
                <h1 className="text-3xl md:text-[40px] font-extrabold mt-2 leading-tight">
                    Explore{" "}
                    <span className="bg-linear-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
                        Amazing Tours
                    </span>
                </h1>
                <p className="text-gray-800 mt-4 max-w-2xl mx-auto">
                    Explore breathtaking destinations and create unforgettable memories with
                    <br />
                    our carefully curated tours around Bangladesh.
                </p>
            </div>

            {/* Tours Grid */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {tours.slice(0, 6).map((tour) => {
                    const days = calculateDays(tour.startDate, tour.endDate);
                    return (
                        <div
                            key={tour._id}
                            className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full"
                        >
                            {/* Image Container with Overlay */}
                            <div className="relative overflow-hidden">
                                <Image
                                    src={
                                        tour.images?.[0] ||
                                        "https://placehold.co/600x400?text=No+Image"
                                    }
                                    height={280}
                                    width={400}
                                    alt={tour.title}
                                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                                
                                {/* Location Badge */}
                                <div className="absolute top-4 left-4">
                                    <div className="bg-linear-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5">
                                        <MapPin size={14} />
                                        {tour.location}
                                    </div>
                                </div>
                                
                                {/* Price Badge */}
                                <div className="absolute top-4 right-4">
                                    <div className="bg-white/95 backdrop-blur-sm text-gray-900 text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                                        ৳{tour.costFrom?.toLocaleString()}
                                    </div>
                                </div>

                                {/* Duration Badge */}
                                <div className="absolute bottom-4 left-4">
                                    <div className="bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                                        <Clock size={14} />
                                        {days} {days > 1 ? "Days" : "Day"}
                                    </div>
                                </div>
                            </div>

                            {/* Content - flex-grow pushes button to bottom */}
                            <div className="px-6 py-4 space-y-2 flex flex-col grow">
                                {/* Title */}
                                <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                                    {tour.title}
                                </h2>
                                
                                {/* Description */}
                                <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                                    {tour.description}
                                </p>

                                {/* Divider */}
                                <div className="h-px bg-linear-to-r from-transparent via-gray-200 to-transparent" />

                                {/* Tour Details */}
                                <div className="space-y-2.5 grow">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <div className="bg-blue-50 p-1.5 rounded-lg">
                                            <MapPin size={16} className="text-blue-600" />
                                        </div>
                                        <span className="font-medium">Departure:</span>
                                        <span className="text-gray-800">{tour.departureLocation}</span>
                                    </div>
                                    
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <div className="bg-green-50 p-1.5 rounded-lg">
                                            <Calendar size={16} className="text-green-600" />
                                        </div>
                                        <span className="font-medium">Start Date:</span>
                                        <span className="text-gray-800">
                                            {new Date(tour.startDate).toLocaleDateString('en-US', { 
                                                month: 'short', 
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                    
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <div className="bg-purple-50 p-1.5 rounded-lg">
                                            <Users size={16} className="text-purple-600" />
                                        </div>
                                        <span className="font-medium">Max Guests:</span>
                                        <span className="text-gray-800">{tour.maxGuest} people</span>
                                    </div>
                                </div>

                                {/* CTA Button - always at bottom */}
                                <Link href={`/allTours/tours/${tour.slug}`} className="block mt-auto pt-4">
                                    <Button className="w-full bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group/btn">
                                        <span>Explore This Tour</span>
                                        <ArrowRight size={18} className="ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Load More Button */}
            <div className="text-center mt-12">
                <Link href="/allTours">
                    <Button className="bg-linear-to-r from-yellow-400 via-orange-500 to-pink-500 hover:from-yellow-500 hover:via-orange-600 hover:to-pink-600 text-white font-bold px-8 py-6 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 text-base">
                        Explore All Tours
                        <ArrowRight size={20} className="ml-2" />
                    </Button>
                </Link>
            </div>
        </section>
    );
}