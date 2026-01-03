/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { CalendarCheck, Plane, Star } from "lucide-react";
import { getAllDivisions } from "@/services/admin/divisionsManagement";

export default function HeroSection() {
    const [selectedDivision, setSelectedDivision] = useState<string | undefined>(undefined);
    const [divisionOption, setDivisionOption] = useState<any[]>([]);

    // Load data on client side
    useEffect(() => {
        const fetchDivisions = async () => {
            const divisionData = await getAllDivisions();

            const options = divisionData?.data?.map((item: { _id: string; name: string }) => ({
                label: item.name,
                value: item._id,
            }));

            setDivisionOption(options);
        };

        fetchDivisions();
    }, []);

    const searchPath = selectedDivision ? `/allTours?division=${selectedDivision}` : "#";

    return (
        <section
            className="relative flex items-center pt-10 lg:pt-0 justify-center min-h-screen bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage:
                    "url('https://res.cloudinary.com/dh3ej57qw/image/upload/v1755101202/srercee5tp-1755101202176-image3-jpg.jpg')",
            }}
        >
            <div className="absolute inset-0 bg-black/60" />

            <div className="relative z-10 container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-10 py-12 md:py-0">
                {/* Left Content */}
                <div className="text-white space-y-4 md:space-y-6 text-center md:text-left">
                    <p className="text-xs md:text-sm uppercase tracking-wide text-yellow-400 font-semibold">
                        Explore Bangladesh with Us
                    </p>

                    <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-white">
                        Reveal the <br className="hidden md:block" />
                        <span className="bg-linear-to-r from-yellow-400 via-orange-500 to-rose-600 bg-clip-text text-transparent">
                            Unseen Beauty
                        </span>{" "}
                        <br />
                        of{" "}
                        <span className="bg-linear-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                            Bangladesh
                        </span>
                    </h1>

                    <p className="max-w-md mx-auto md:mx-0 text-gray-200 text-base md:text-lg leading-relaxed">
                        Explore over a thousand cultural sites, stunning landscapes, and the
                        rich heritage of Bangladesh — from the world’s largest sea beach in
                        Cox’s Bazar to the mystical Sundarbans forest.
                    </p>
                </div>

                {/* Right Content */}
                <div className="relative bg-white/10 backdrop-blur-md border border-white/20 p-6 md:p-8 rounded-3xl shadow-2xl space-y-6 text-white w-full max-w-md mx-auto">
                    <div className="absolute inset-0 rounded-3xl bg-linear-to-r from-yellow-400/20 via-orange-500/20 to-pink-500/20 blur-xl -z-10" />

                    <h2 className="text-xl md:text-2xl font-bold text-center bg-linear-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
                        Find Your Perfect Tour
                    </h2>

                    {/* Division Select */}
                    <Select onValueChange={(value) => setSelectedDivision(value)}>
                        <SelectTrigger className="w-full bg-white/20 border border-white/30 text-gray-900">
                            <SelectValue
                                placeholder={<span className="text-gray-900">Select Division</span>}
                            />
                        </SelectTrigger>

                        <SelectContent className="bg-white/90 text-gray-900">
                            <SelectGroup>
                                <SelectLabel>Divisions</SelectLabel>
                                {divisionOption?.map((item: any) => (
                                    <SelectItem key={item.value} value={item.value}>
                                        {item.label}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    {/* Icons Row */}
                    <div className="flex justify-around text-white/90 pt-2">
                        <div className="flex flex-col items-center gap-2">
                            <Plane className="h-5 w-5 md:h-6 md:w-6 text-cyan-400" />
                            <span className="text-[10px] md:text-sm font-medium">Online Tours</span>
                        </div>

                        <div className="flex flex-col items-center gap-2">
                            <Star className="h-5 w-5 md:h-6 md:w-6 text-pink-400" />
                            <span className="text-[10px] md:text-sm font-medium">Top Rated</span>
                        </div>

                        <div className="flex flex-col items-center gap-2">
                            <CalendarCheck className="h-5 w-5 md:h-6 md:w-6 text-yellow-400" />
                            <span className="text-[10px] md:text-sm font-medium">Booking Now</span>
                        </div>
                    </div>

                    {/* Search Button */}
                    {selectedDivision ? (
                        <Button
                            asChild
                            className="w-full mt-4 text-white bg-linear-to-r from-yellow-400 via-orange-500 to-pink-500 hover:from-yellow-500 hover:to-rose-600"
                        >
                            <Link href={searchPath}>Search</Link>
                        </Button>
                    ) : (
                        <Button
                            disabled
                            className="w-full mt-4 bg-white/30 text-white border border-white/30"
                        >
                            Search
                        </Button>
                    )}
                </div>
            </div>
        </section>
    );
}