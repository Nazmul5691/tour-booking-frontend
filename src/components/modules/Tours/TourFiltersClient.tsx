// components/tours/TourFiltersClient.jsx
"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
// Next.js-এর জন্য useSearchParams ইমপোর্ট করুন (যদি App Router ব্যবহার করেন)
import { useSearchParams, useRouter, usePathname } from "next/navigation"; 

// Props এর জন্য ইন্টারফেস ডিফাইন করা হলো
interface Option {
    value: string;
    label: string;
}

interface TourFiltersClientProps {
    divisionOption: Option[];
    tourTypeOptions: Option[];
    divisionIsLoading: boolean;
    tourTypeIsLoading: boolean;
}

export default function TourFiltersClient({
    divisionOption,
    tourTypeOptions,
    divisionIsLoading,
    tourTypeIsLoading,
}: TourFiltersClientProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams(); // searchParams কে সরাসরি state/setter হিসেবে ব্যবহার করা যায় না

    const currentSearchParams = new URLSearchParams(searchParams.toString());
    
    const selectedDivision = currentSearchParams.get("division") || undefined;
    const selectedTourType = currentSearchParams.get("tourType") || undefined;

    const handleDivisionChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        // যদি Select-এ কোনো ডিফল্ট বা ক্লিয়ার ভ্যালু থাকে (যেমন ""), তবে ডিলিট করুন
        if (value) {
            params.set("division", value);
        } else {
            params.delete("division");
        }
        // URL আপডেট করুন
        router.push(pathname + '?' + params.toString());
    };

    const handleTourTypeChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set("tourType", value);
        } else {
            params.delete("tourType");
        }
        router.push(pathname + '?' + params.toString());
    };

    const handleClearFilter = () => {
        // division ও tourType parameter ডিলিট করা হলো
        const params = new URLSearchParams(searchParams.toString());
        params.delete("division");
        params.delete("tourType");
        router.push(pathname + '?' + params.toString());
    };

    return (
        <div className="col-span-3 w-full h-[220px] border border-muted rounded-md p-5 space-y-4">
            <div className="flex justify-between items-center">
                <h1>Filters</h1>
                <Button size="sm" variant="outline" onClick={handleClearFilter}>
                    Clear Filter
                </Button>
            </div>
            <div>
                <Label className="mb-2">Division to visit</Label>
                <Select
                    onValueChange={handleDivisionChange}
                    // SelectValue এ সঠিক মান দেখানোর জন্য ভ্যালু সেট করুন
                    value={selectedDivision ? selectedDivision : ""} 
                    disabled={divisionIsLoading}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Division" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Divisions</SelectLabel>
                            {/* Option mapping props থেকে আসছে */}
                            {divisionOption?.map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Label className="mb-2">Tour Type</Label>
                <Select
                    onValueChange={handleTourTypeChange}
                    value={selectedTourType ? selectedTourType : ""}
                    disabled={tourTypeIsLoading}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Tour Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Tour Types</SelectLabel>
                            {/* Option mapping props থেকে আসছে */}
                            {tourTypeOptions?.map(
                                (item) => (
                                    <SelectItem key={item.value} value={item.value}>
                                        {item.label}
                                    </SelectItem>
                                )
                            )}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}