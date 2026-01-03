/* eslint-disable @typescript-eslint/no-explicit-any */



"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, MapPin, Users, Calendar, Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IUser } from "@/types/user.interface";

interface TourCardProps {
  item: any;
  tourTypes: any[];
  user: IUser | null;
}

export default function TourCard({ item, tourTypes, user }: TourCardProps) {
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  const images = item.images?.length
    ? item.images
    : ["https://placehold.co/600x400/FF5722/FFFFFF?text=Tour+Image"];

  const matchedType = tourTypes.find((t: any) => t._id === item.tourType);
  const tourTypeName = matchedType?.name || "Tour";

  const nextImage = () => setActiveImgIndex((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setActiveImgIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  const getDuration = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diff =
      Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) || 1;
    return `${diff} Day${diff > 1 ? "s" : ""}, ${diff - 1} Night${diff > 2 ? "s" : ""}`;
  };

  return (
    <div className="relative bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">

      {/* IMAGE SLIDER */}
      <div className="relative w-full h-56 overflow-hidden">
        <Link href={`/tours/${item._id}`}>
          <Image
            src={images[activeImgIndex]}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-500"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src =
                "https://placehold.co/600x400/FF5722/FFFFFF?text=Tour+Image";
            }}
          />
        </Link>

        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-700 p-1.5 rounded-full shadow"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-700 p-1.5 rounded-full shadow"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}
      </div>

      {/* BODY */}
      <div className="px-5 py-4">
        <div className="mb-2 flex flex-row items-center">
          <Book className="w-4 h-4 mr-1 text-orange-500" />
          {tourTypeName}
        </div>

        <h3 className="text-lg font-bold text-gray-800 hover:text-orange-600 transition-colors">
          {item.title}
        </h3>

        <div className="flex items-center text-gray-600 mt-1 text-sm">
          <MapPin className="w-4 h-4 mr-1 " />
          {item.departureLocation || item.location}
        </div>

        {/* PRICE + BUTTON */}
        <div className="mt-2 flex flex-row justify-between items-end">
          <div className="flex flex-col">
            <div className="mb-1">
              <span className="text-gray-600 text-sm">Starts From </span>
              <span className="text-orange-600 font-bold text-lg">
                ৳{item.costFrom?.toLocaleString()}
              </span>

              {item.oldPrice && (
                <span className="line-through text-gray-400 ml-2">
                  ৳{item.oldPrice}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Button
              asChild
              className="text-sm text-white bg-linear-to-r from-yellow-400 via-orange-500 to-pink-500 hover:from-yellow-500 hover:to-rose-600 font-semibold"
            >
              <Link href={`/allTours/tours/${item.slug}`}>View Details</Link>
            </Button>

            {/* CONDITIONAL: Become Guide button */}
            {user?.guideStatus === "APPROVED" && (
              <Link href={`/apply-for-tour-as-guide/${item._id}`}>
                <Button
                  className="text-sm bg-green-500 hover:bg-green-600 text-white font-semibold"
                  onClick={() => console.log("Become Guide clicked")}
                >
                  Become Guide for this tour
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* INFO ROW */}
        <div className="relative flex items-center text-gray-600 text-sm border-t mt-3 pt-3">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4 text-orange-500" />
            {getDuration(item.startDate, item.endDate)}
          </div>

          <div className="absolute left-1/2 transform -translate-x-1/2">|</div>

          <div className="flex items-center gap-1 ml-auto">
            <Users className="w-4 h-4 text-orange-500" />
            {item.maxGuest || "N/A"} Guests
          </div>
        </div>
      </div>
    </div>
  );
}
