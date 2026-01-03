"use client";

import { ArrowDownWideNarrow } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";


export const tourSortOptions = [
    { label: "Recommended", value: "" },
    { label: "Price: low to high", value: "costFrom" },
    { label: "Price: high to low", value: "-costFrom" },
    { label: "Newest", value: "-createdAt" },
];

interface TourHeaderProps {
    countText: string;
}

export default function TourGridHeader({
    countText,
}: TourHeaderProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    // 1. Read current sort value from URL
    const currentSort = searchParams.get("sort") || "";

    // 2. Function to update the URL with new search parameters
    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            if (value === "") {
                params.delete(name);
            } else {
                params.set(name, value);
            }
            // Preserve other existing params (like page, division, tourType)
            return params.toString();
        },
        [searchParams]
    );

    // 3. Handlers
    const handleSortChange = (value: string) => {
        const queryString = createQueryString("sort", value);
        router.push(`?${queryString}`);
    };

    const handleResetSort = () => {
        handleSortChange(""); // Set sort parameter to empty string, which deletes it from URL
    };


    return (
        <div className="flex justify-between items-center mb-6 px-4 py-3 bg-white rounded-xl shadow-lg border border-gray-100">

            {/* Tour Count */}
            <div className="text-sm md:text-base font-semibold text-gray-700">
                {countText}
            </div>

            {/* Sort Section */}
            <div className="flex items-center space-x-3">

                <div className="flex items-center space-x-2">
                    <ArrowDownWideNarrow size={18} className="text-orange-500" />
                    <label
                        htmlFor="tour-sort"
                        className="text-sm font-medium text-gray-700 whitespace-nowrap hidden sm:block"
                    >
                        Sort By:
                    </label>

                    <div className="relative">
                        <select
                            id="tour-sort"
                            value={currentSort}
                            onChange={(e) => handleSortChange(e.target.value)}
                            className="appearance-none block w-full py-2 pl-3 pr-8 text-sm border border-orange-300 rounded-lg bg-orange-50/70 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 cursor-pointer transition shadow-inner"
                        >
                            {tourSortOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>

                        {/* Chevron icon */}
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Reset Button */}
                <Button
                    onClick={handleResetSort}
                    disabled={currentSort === ""}
                    className={`
                        text-xs py-1.5 h-auto px-3 rounded-lg font-semibold transition duration-200
                        ${currentSort === ""
                            ? "bg-gray-300 text-gray-600 cursor-not-allowed shadow-none"
                            : "bg-red-500 hover:bg-red-600 text-white shadow-md hover:shadow-lg"
                        }
                    `}
                    aria-label="Reset Sort"
                >
                    Reset
                </Button>
            </div>
        </div>
    );
}