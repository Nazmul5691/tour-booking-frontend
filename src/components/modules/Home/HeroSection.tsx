/* eslint-disable @typescript-eslint/no-explicit-any */
// import { Search, Calendar, Star } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { HeroProps } from "@/types/heroProps";
// import { LargeSparkleIcon, SparkleIcon } from "@/assets/icons/SparkleIcon";



// export function Hero({
//   badge = {
//     text: "AI-Powered Healthcare",
//   },
//   heading = {
//     line1: "Find Your Perfect",
//     line2: "Doctor with AI",
//   },
//   description = [
//     "Our advanced AI technology analyzes your symptoms, medical",
//     "history, and preferences to match you with the best-fit doctors",
//     "in seconds.",
//   ],
//   buttons = {
//     primary: {
//       text: "Find Your Doctor",
//     },
//     secondary: {
//       text: "Book Appointment",
//     },
//   },
//   stats = [
//     { value: "50K+", label: "Patients Served" },
//     { value: "1000+", label: "Expert Doctors" },
//     {
//       value: "4.9",
//       label: "Patient Rating",
//       icon: <Star className="size-6 fill-yellow-400 stroke-yellow-400" />,
//     },
//   ],
//   formCard = {
//     title: "AI Doctor Finder",
//     symptomLabel: "What are your symptoms?",
//     symptomPlaceholder: "e.g., headache, fever, cough",
//     specialtyLabel: "Preferred specialty",
//     specialtyOptions: [
//       "General Physician",
//       "Cardiologist",
//       "Dermatologist",
//       "Pediatrician",
//       "Orthopedic",
//     ],
//     defaultSpecialty: "General Physician",
//     submitText: "Get AI Recommendations",
//     footerText:
//       "✨ Powered by advanced AI algorithms for accurate doctor matching",
//   },
// }: HeroProps) {
//   //   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//   //     e.preventDefault();
//   //     const formData = new FormData(e.currentTarget);
//   //     const data = {
//   //       symptoms: formData.get('symptoms') as string,
//   //       specialty: formData.get('specialty') as string,
//   //     };
//   //     formCard.onSubmit?.(data);
//   //   };

//   return (
//     <div className="w-full relative">
//       {/* Radial Gradient Background from Bottom */}
//       <div
//         className="absolute inset-0 z-0 "
//         style={{
//           background:
//             "radial-gradient(125% 125% at 50% 90%, #fff 30%, #155DFC 100%)",
//         }}
//       />
//       {/* Content Container */}
//       <div className="w-full px-4 py-8 md:px-8 lg:px-16 relative">
//         <div className="mx-auto max-w-[1200px]">
//           <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
//             {/* Left Column - Hero Content */}
//             <div className="flex flex-col justify-center space-y-6">
//               {/* Badge */}
//               <div className="inline-flex items-center gap-3 self-start rounded-full bg-white px-4 py-2">
//                 <SparkleIcon />
//                 <span className="text-[11.9px] font-medium text-blue-700">
//                   {badge.text}
//                 </span>
//               </div>

//               {/* Heading */}
//               <div className="space-y-2">
//                 <h1 className="text-[51px] leading-[60px]">{heading.line1}</h1>
//                 <h1 className="text-[51px] leading-[60px]">{heading.line2}</h1>
//               </div>

//               {/* Description */}
//               <div className="space-y-1 text-[17px] leading-7 text-gray-600">
//                 {description.map((line, index) => (
//                   <p key={index}>{line}</p>
//                 ))}
//               </div>

//               {/* Buttons */}
//               <div className="flex flex-col gap-4 sm:flex-row">
//                 {buttons.primary && (
//                   <Button
//                     onClick={buttons.primary.onClick}
//                     className="h-[63.622px] gap-3 rounded-xl bg-blue-600 px-8 text-[15.3px] hover:bg-blue-700"
//                   >
//                     <Search className="size-5" />
//                     {buttons.primary.text}
//                   </Button>
//                 )}
//                 {buttons.secondary && (
//                   <Button
//                     onClick={buttons.secondary.onClick}
//                     variant="outline"
//                     className="h-[63.622px] gap-3 rounded-xl border-blue-600 px-8 text-[15.3px] text-blue-600 hover:bg-blue-50"
//                   >
//                     <Calendar className="size-5" />
//                     {buttons.secondary.text}
//                   </Button>
//                 )}
//               </div>

//               {/* Stats */}
//               <div className="grid grid-cols-3 gap-4 pt-4">
//                 {stats.map((stat, index) => (
//                   <div key={index} className="space-y-2">
//                     <div className="flex items-center gap-2">
//                       <p className="text-[25.5px] leading-9">{stat.value}</p>
//                       {stat.icon}
//                     </div>
//                     <p className="text-[13.6px] leading-6 text-gray-600">
//                       {stat.label}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Right Column - Form Card */}
//             <div className="flex items-center justify-center lg:justify-end">
//               <div className="w-full max-w-[559.929px] rounded-2xl bg-white p-8 shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]">
//                 {/* Card Header */}
//                 <div className="mb-6 flex items-center justify-between">
//                   <h2 className="text-[20.4px] leading-6">{formCard.title}</h2>
//                   <LargeSparkleIcon />
//                 </div>

//                 {/* Form */}
//                 <form className="space-y-6">
//                   {/* Symptoms Input */}
//                   <div className="space-y-2">
//                     <Label
//                       htmlFor="symptoms"
//                       className="text-[11.9px] text-gray-700"
//                     >
//                       {formCard.symptomLabel}
//                     </Label>
//                     <Input
//                       id="symptoms"
//                       name="symptoms"
//                       placeholder={formCard.symptomPlaceholder}
//                       className="h-[49.787px] rounded-xl border-gray-300"
//                     />
//                   </div>

//                   {/* Submit Button */}
//                   <Button
//                     type="submit"
//                     className="h-[59.986px] w-full rounded-xl bg-blue-600 text-[15.3px] hover:bg-blue-700"
//                   >
//                     {formCard.submitText}
//                   </Button>
//                 </form>

//                 {/* Footer */}
//                 <div className="mt-6 border-t border-gray-200 pt-4">
//                   <p className="text-center text-[11.9px] leading-5 text-gray-600">
//                     {formCard.footerText}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// =============================

// "use client" is required because this component uses:
// 1. React Hooks (useState)
// 2. Redux Toolkit Query Hooks (useGetDivisionsQuery)
// 3. Browser-specific interaction (Link redirection logic)


// "use client";

// import { Button } from "@/components/ui/button";
// import Link from "next/link"; // Changed from 'react-router' to 'next/link'
// import {
//     Select,
//     SelectContent,
//     SelectGroup,
//     SelectItem,
//     SelectLabel,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select";
// import { useState } from "react";
// // import { useGetDivisionsQuery } from "@/redux/features/division/division.api";
// import { CalendarCheck, Plane, Star } from "lucide-react";
// import { getAllDivisions } from "@/services/admin/divisionsManagement";

// export default async function HeroSection() {
//     // useState type is defined here to handle TypeScript strictness for the state value
//     const [selectedDivision, setSelectedDivision] = useState<string | undefined>(
//         undefined
//     );

//     // Redux Toolkit Query hook for fetching data
//     const divisionData = await getAllDivisions();

//     // Map fetched division data to Select options format
//     const divisionOption = divisionData?.data?.map(
//         (item: { _id: string; name: string }) => ({
//             label: item.name,
//             value: item._id,
//         })
//     );

//     // Construct the URL path for the search link
//     const searchPath = selectedDivision ? `/tours?division=${selectedDivision}` : "#";

//     return (
//         <section
//             className="relative flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat"
//             style={{
//                 backgroundImage:
//                     "url('https://res.cloudinary.com/dh3ej57qw/image/upload/v1755101202/srercee5tp-1755101202176-image3-jpg.jpg')",
//             }}
//         >
//             {/* Overlay */}
//             <div className="absolute inset-0 bg-black/60" />

//             <div className="relative z-10 container mx-auto px-6 grid md:grid-cols-2 items-center gap-10">
//                 {/* Left Content */}
//                 <div className="text-white space-y-6">
//                     <p className="text-sm uppercase tracking-wide text-yellow-400 font-semibold">
//                         Explore Bangladesh with Us
//                     </p>
//                     <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-white">
//                         Reveal the{" "}
//                         <br />
//                         <span className="bg-linear-to-r from-yellow-400 via-orange-500 to-rose-600 bg-clip-text text-transparent">
//                             Unseen Beauty
//                         </span>{" "}
//                         <br />
//                         of{" "}
//                         <span className="bg-linear-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
//                             Bangladesh
//                         </span>
//                     </h1>

//                     <p className="max-w-md text-gray-200 text-lg leading-relaxed">
//                         Explore over a thousand cultural sites, stunning landscapes, and the
//                         rich heritage of Bangladesh — from the world’s largest sea beach in
//                         Cox’s Bazar to the mystical Sundarbans forest.
//                     </p>
//                 </div>

//                 {/* Right Content (Glassmorphism Card) */}
//                 <div className="relative bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl shadow-2xl space-y-6 text-white">
//                     {/* Glow border effect */}
//                     <div className="absolute inset-0 rounded-3xl bg-linear-to-r from-yellow-400/20 via-orange-500/20 to-pink-500/20 blur-xl -z-10" />

//                     <h2 className="text-2xl font-bold text-center bg-linear-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
//                         Find Your Perfect Tour
//                     </h2>

//                     {/* Division Select */}
//                     <Select onValueChange={(value) => setSelectedDivision(value)}>
//                         <SelectTrigger className="w-full bg-white/20 border border-white/30 text-gray-900">
//                             <SelectValue
//                                 placeholder={
//                                     <span className="text-gray-900">Select Division</span>
//                                 }
//                             />
//                         </SelectTrigger>
//                         <SelectContent className="bg-white/90 text-gray-900">
//                             <SelectGroup>
//                                 <SelectLabel>Divisions</SelectLabel>
//                                 {divisionOption?.map(
//                                     (item: { value: string; label: string }) => (
//                                         <SelectItem key={item.value} value={item.value}>
//                                             {item.label}
//                                         </SelectItem>
//                                     )
//                                 )}
//                             </SelectGroup>
//                         </SelectContent>
//                     </Select>

//                     {/* Icons Row */}
//                     <div className="flex justify-around text-white/90 pt-2">
//                         <div className="flex flex-col items-center gap-2">
//                             <Plane className="h-6 w-6 text-cyan-400" />
//                             <span className="text-sm font-medium">Online Tours</span>
//                         </div>
//                         <div className="flex flex-col items-center gap-2">
//                             <Star className="h-6 w-6 text-pink-400" />
//                             <span className="text-sm font-medium">Top Rated</span>
//                         </div>
//                         <div className="flex flex-col items-center gap-2">
//                             <CalendarCheck className="h-6 w-6 text-yellow-400" />
//                             <span className="text-sm font-medium">Booking Now</span>
//                         </div>
//                     </div>

//                     {/* Search Button */}
//                     {selectedDivision ? (
//                         <Button
//                             asChild
//                             className="w-full mt-4 text-white bg-linear-to-r from-yellow-400 via-orange-500 to-pink-500 hover:from-yellow-500 hover:to-rose-600"
//                         >
//                             {/* Changed Link component usage to Next.js format */}
//                             <Link href={searchPath}>Search</Link>
//                         </Button>
//                     ) : (
//                         <Button
//                             disabled
//                             className="w-full mt-4 bg-white/30 text-white border border-white/30"
//                         >
//                             Search
//                         </Button>
//                     )}
//                 </div>
//             </div>
//         </section>
//     );
// }



// =============================



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
            className="relative flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage:
                    "url('https://res.cloudinary.com/dh3ej57qw/image/upload/v1755101202/srercee5tp-1755101202176-image3-jpg.jpg')",
            }}
        >
            <div className="absolute inset-0 bg-black/60" />

            <div className="relative z-10 container mx-auto px-6 grid md:grid-cols-2 items-center gap-10">
                {/* Left Content */}
                <div className="text-white space-y-6">
                    <p className="text-sm uppercase tracking-wide text-yellow-400 font-semibold">
                        Explore Bangladesh with Us
                    </p>

                    <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-white">
                        Reveal the <br />
                        <span className="bg-linear-to-r from-yellow-400 via-orange-500 to-rose-600 bg-clip-text text-transparent">
                            Unseen Beauty
                        </span>{" "}
                        <br />
                        of{" "}
                        <span className="bg-linear-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                            Bangladesh
                        </span>
                    </h1>

                    <p className="max-w-md text-gray-200 text-lg leading-relaxed">
                        Explore over a thousand cultural sites, stunning landscapes, and the
                        rich heritage of Bangladesh — from the world’s largest sea beach in
                        Cox’s Bazar to the mystical Sundarbans forest.
                    </p>
                </div>

                {/* Right Content */}
                <div className="relative bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl shadow-2xl space-y-6 text-white">
                    <div className="absolute inset-0 rounded-3xl bg-linear-to-r from-yellow-400/20 via-orange-500/20 to-pink-500/20 blur-xl -z-10" />

                    <h2 className="text-2xl font-bold text-center bg-linear-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
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
                            <Plane className="h-6 w-6 text-cyan-400" />
                            <span className="text-sm font-medium">Online Tours</span>
                        </div>

                        <div className="flex flex-col items-center gap-2">
                            <Star className="h-6 w-6 text-pink-400" />
                            <span className="text-sm font-medium">Top Rated</span>
                        </div>

                        <div className="flex flex-col items-center gap-2">
                            <CalendarCheck className="h-6 w-6 text-yellow-400" />
                            <span className="text-sm font-medium">Booking Now</span>
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
