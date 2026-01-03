"use client";

import { Button } from "@/components/ui/button";
import { MapPin, Plane } from "lucide-react";
import Image from "next/image";

export default function StartAdventure() {
    return (
        <section className="relative bg-orange-500 text-white lg:mt-30 py-22 overflow-visible">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between relative">
                {/* Left Content */}
                {/* Added items-center and text-center for small devices, reset at md */}
                <div className="md:w-1/2 z-10 space-y-5 flex flex-col items-center text-center md:items-start md:text-left">
                    <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                        Ready to Start Your Adventure?
                    </h2>
                    <p className="text-white/90 max-w-md">
                        Let us help you create the perfect journey. Our travel experts are ready to craft your dream vacation.
                    </p>
                    <Button
                        variant="secondary"
                        className="bg-white text-orange-600 hover:cursor-pointer hover:bg-orange-100 rounded-full px-6 py-2 font-semibold"
                    >
                        Explore Tours
                    </Button>
                </div>

                {/* Right Image */}
                {/* Changed absolute positioning on mobile to relative/static to prevent overflow, kept absolute for md */}
                <div className="md:w-1/2 relative flex justify-center md:justify-end mt-16 md:mt-0 w-full">
                    <Image
                        src="/images/adventure-girl.png"
                        alt="Traveler with luggage"
                        width={400}
                        height={320}
                        className="w-[300px] sm:w-[400px] md:w-[470px] object-contain relative md:absolute md:-bottom-40 right-0"
                    />

                    {/* Airplane dotted path with icons */}
                    {/* Adjusted positioning and width for mobile view */}
                    <div className="absolute -bottom-5 md:bottom-0 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-0 w-48 sm:w-56 md:w-72 opacity-70">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 300 100"
                            className="w-full"
                        >
                            <path
                                d="M0,50 Q75,10 150,50 T300,50"
                                stroke="white"
                                strokeWidth="2"
                                strokeDasharray="6 6"
                                fill="none"
                            />
                        </svg>

                        {/* Location Icon at start */}
                        <MapPin
                            size={18}
                            className="absolute -left-3.5 bottom-[40%] text-white md:size-5"
                        />

                        {/* Airplane Icon at end */}
                        <Plane
                            size={20}
                            className="absolute -right-3 bottom-[40%] text-white rotate-2 md:size-[22px]"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}