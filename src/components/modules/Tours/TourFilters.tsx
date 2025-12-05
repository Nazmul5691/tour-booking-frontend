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
// FIX: Import Next.js specific routing hooks
import { useSearchParams, useRouter, usePathname } from "next/navigation";

// Props interface defined to receive pre-fetched data
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

// FIX: Component now accepts filter options as props, removing incorrect client-side fetch attempts
export default function TourFilters({
    divisionOption,
    tourTypeOptions,
    divisionIsLoading,
    tourTypeIsLoading,
}: TourFiltersProps) {
    // FIX: Use correct Next.js hooks
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Read current search params from the hook
    const currentSearchParams = new URLSearchParams(searchParams.toString());

    // Get currently selected values
    // When the parameter is absent, it defaults to "", which is the correct value for the Select component's 'unselected' state.
    const selectedDivision = currentSearchParams.get("division") || "";
    const selectedTourType = currentSearchParams.get("tourType") || "";


    const handleDivisionChange = (value: string) => {
        // Always start with the current search parameters
        const params = new URLSearchParams(searchParams.toString());

        // Remove 'page' parameter when applying a filter
        params.delete("page");

        // FIX: Check for the special 'clear_division' value
        if (value === "clear_division") {
            // Delete the division parameter to clear the filter
            params.delete("division");
        } else {
            // Set the selected division value
            params.set("division", value);
        }

        // Update URL
        router.push(pathname + '?' + params.toString());
    };

    const handleTourTypeChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("page"); // Remove 'page' parameter when applying a filter

        // FIX: Check for the special 'clear_tourtype' value
        if (value === "clear_tourtype") {
            // Delete the tourType parameter to clear the filter
            params.delete("tourType");
        } else {
            // Set the selected tour type value
            params.set("tourType", value);
        }
        router.push(pathname + '?' + params.toString());
    };

    const handleClearFilter = () => {
        // Delete all filter parameters
        const params = new URLSearchParams(searchParams.toString());
        params.delete("division");
        params.delete("tourType");
        params.delete("page"); // Also clear pagination when clearing filters
        params.delete("searchTerm"); // Assuming you might have a search term too

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
                    // Select value must be a string. Use the current selection.
                    value={selectedDivision}
                    disabled={divisionIsLoading}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Division" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Divisions</SelectLabel>
                            {/* FIX: Use a non-empty string value for the clear option */}
                            <SelectItem key="all-divisions" value="clear_division">
                                All Divisions
                            </SelectItem>
                            {/* Option mapping props থেকে আসছে */}
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
                            {/* FIX: Use a non-empty string value for the clear option */}
                            <SelectItem key="all-types" value="clear_tourtype">
                                All Tour Types
                            </SelectItem>
                            {/* Option mapping props থেকে আসছে */}
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