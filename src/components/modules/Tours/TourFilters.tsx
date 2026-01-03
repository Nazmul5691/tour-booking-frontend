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
import { useSearchParams, useRouter, usePathname } from "next/navigation";


interface Option {
    value: string;
    label: string;
}

interface TourFiltersProps {
    divisionOption: Option[];
    tourTypeOptions: Option[];
    divisionIsLoading: boolean;
    tourTypeIsLoading: boolean;
}


export default function TourFilters({
    divisionOption,
    tourTypeOptions,
    divisionIsLoading,
    tourTypeIsLoading,
}: TourFiltersProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentSearchParams = new URLSearchParams(searchParams.toString());

    const selectedDivision = currentSearchParams.get("division") || "";
    const selectedTourType = currentSearchParams.get("tourType") || "";


    const handleDivisionChange = (value: string) => {
       
        const params = new URLSearchParams(searchParams.toString());

        // Remove 'page' parameter when applying a filter
        params.delete("page");

        if (value === "clear_division") {
            params.delete("division");
        } else {
            params.set("division", value);
        }

        router.push(pathname + '?' + params.toString());
    };

    const handleTourTypeChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("page"); 

        
        if (value === "clear_tourtype") {
            params.delete("tourType");
        } else {
            params.set("tourType", value);
        }
        router.push(pathname + '?' + params.toString());
    };

    const handleClearFilter = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("division");
        params.delete("tourType");
        params.delete("page"); 
        params.delete("searchTerm"); 

        // Push the cleared URL
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
                    value={selectedDivision}
                    disabled={divisionIsLoading}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Division" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Divisions</SelectLabel>
                            <SelectItem key="all-divisions" value="clear_division">
                                All Divisions
                            </SelectItem>
                            {divisionOption?.map((item: { value: string; label: string }) => (
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
                    value={selectedTourType}
                    disabled={tourTypeIsLoading}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Tour Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Tour Types</SelectLabel>
                            <SelectItem key="all-types" value="clear_tourtype">
                                All Tour Types
                            </SelectItem>
                            {tourTypeOptions?.map(
                                (item: { value: string; label: string }) => (
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