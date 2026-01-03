"use client";

import { Column } from "@/components/shared/ManagementTable";
import { ITour } from "@/types/tour.interface";
import { IDivision } from "@/types/division.interface";
import { ITourType } from "@/types/tour.interface";

export const tourColumns: Column<ITour>[] = [
    {
        header: "Title",
        accessor: tour => tour.title,
    },
    {
        header: "Division",
        accessor: tour =>
            typeof tour.division === "string"
                ? "—"
                : (tour.division as IDivision).name,
    },
    {
        header: "Tour Type",
        accessor: tour =>
            typeof tour.tourType === "string"
                ? "—"
                : (tour.tourType as ITourType).name,
    },
    {
        header: "Cost",
        accessor: tour => `৳ ${tour.costFrom ?? 0}`,
    },
    {
        header: "Duration",
        accessor: tour => {
            if (!tour.startDate || !tour.endDate) return "—";
            const start = new Date(tour.startDate);
            const end = new Date(tour.endDate);
            return (
                Math.ceil(
                    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
                ) + " Days"
            );
        },
    },
];
