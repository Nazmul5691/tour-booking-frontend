/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

// import ClearFiltersButton from "@/components/shared/ClearFiltersButton";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

const BookingFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (status: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (status === "ALL") {
      params.delete("status");
    } else {
      params.set("status", status);
    }

    params.set("page", "1");

    startTransition(() => {
      router.push(`/my-bookings?${params.toString()}`);
    });
  };

  return (
    <div className="space-y-3">
      {/* Row 1: Search and Refresh */}
      <div className="flex items-center gap-3">
        <SearchFilter 
          paramName="searchTerm" 
          placeholder="Search by tour name or location..." 
        />
        <RefreshButton />
      </div>

      {/* Row 2: Filter Controls */}
      {/* <div className="flex items-center gap-3">
       
        <Select
          value={searchParams.get("status") || "ALL"}
          onValueChange={handleStatusChange}
          disabled={isPending}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Status</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="COMPLETE">Completed</SelectItem>
            <SelectItem value="FAILED">Failed</SelectItem>
            <SelectItem value="CANCEL">Cancelled</SelectItem>
          </SelectContent>
        </Select>

       
        <ClearFiltersButton />
      </div> */}
    </div>
  );
};

export default BookingFilter;